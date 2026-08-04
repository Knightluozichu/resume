"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

type NodeSpec = {
  id: string;
  label: string;
  title: string;
  content: string;
  failure?: { title: string; desc: string };
};

type ChapterSpec = {
  title: string;
  subtitle: string;
  nodes: NodeSpec[];
};

const CHAPTERS: Record<string, ChapterSpec> = {
  map: {
    title: "Redis 设计与实现学习路径",
    subtitle: "四部分递进：数据结构 → 单机 → 集群 → 功能",
    nodes: [
      { id: "s1", label: "数据结构", title: "第一部分 · 内部数据结构", content: "SDS、链表、字典、跳表、整数集合、压缩列表是 Redis 全部对象的地基。每种结构都针对特定访问模式优化，对象系统按数据规模在编码间切换。" },
      { id: "s2", label: "单机", title: "第二部分 · 单机数据库", content: "对象、数据库、RDB/AOF 持久化、事件、客户端与服务器构成单机全貌。理解单线程事件循环是理解 Redis 性能的钥匙。" },
      { id: "s3", label: "集群", title: "第三部分 · 多机协作", content: "复制、哨兵与集群层层递进：从数据冗余到自动故障转移，再到 16384 槽的水平分片。", failure: { title: "脑裂", desc: "主库失联时哨兵切走流量，旧主恢复后产生双写。修法：min-replicas 配置与客户端路由校验。" } },
      { id: "s4", label: "功能", title: "第四部分 · 高级功能", content: "发布订阅、事务、Lua、排序、位数组、慢日志与监视器，覆盖日常使用的全部工具面。" },
    ],
  },
  "01": {
    title: "Redis 概述",
    subtitle: "内存数据结构服务器的定位与边界",
    nodes: [
      { id: "m", label: "内存存储", title: "内存中的数据商店", content: "Redis 把数据放在内存获得微秒级读写，持久化负责把内存状态安全地搬到磁盘。内存是性能来源，也是容量边界。" },
      { id: "d", label: "数据结构", title: "五种对象类型", content: "字符串、列表、哈希、集合、有序集合覆盖缓存、计数、排行等主流场景。每种类型背后有多种编码实现。" },
      { id: "t", label: "单线程", title: "单线程事件循环", content: "单线程免除锁与上下文切换，命令原子执行。代价是任何慢命令都会阻塞全部请求。", failure: { title: "慢命令", desc: "KEYS、大 SMEMBERS 等 O(N) 命令阻塞服务器数秒。修法：用 SCAN 系列分批，监控慢日志。" } },
      { id: "f", label: "功能面", title: "超越缓存的能力", content: "持久化、复制、Lua、事务、发布订阅让 Redis 从缓存升级为消息与计算平台。" },
    ],
  },
  "02": {
    title: "简单动态字符串 SDS",
    subtitle: "len、free、buf 三字段的设计哲学",
    nodes: [
      { id: "l", label: "len", title: "len · 已用长度", content: "len 记录已用字节数，取长度 O(1)，不再需要 strlen 的 O(N) 扫描。二进制安全由此而来——内容可以是任意字节。" },
      { id: "f", label: "free", title: "free · 剩余空间", content: "free 记录 buf 中未用字节。追加时先看 free 够不够，避免每次写入都重新分配内存。" },
      { id: "b", label: "buf", title: "buf · 字节数组", content: "buf 承载实际内容，兼容部分 C 字符串函数（末尾仍有 \\0），但可以安全存储二进制数据。" },
      { id: "p", label: "预分配", title: "空间预分配与惰性释放", content: "扩容时预分配额外空间减少重分配次数；缩短后空间不立即归还，留着下次再用。", failure: { title: "内存碎片", desc: "大量短长交替的字符串让预分配空间闲置，内存占用远超实际内容。修法：大 value 场景关注内存碎片率。" } },
    ],
  },
  "03": {
    title: "链表",
    subtitle: "双端无环链表的简单与通用",
    nodes: [
      { id: "h", label: "表头表尾", title: "head / tail / len", content: "表头表尾指针让两端操作 O(1)，len 字段让计数 O(1)。列表键的 LPUSH/RPOP 全靠这个结构。" },
      { id: "n", label: "节点", title: "prev / next 双指针", content: "每个节点带前后指针，可以双向遍历。无环设计让表头表尾的 prev/next 指向 NULL，边界判断简单。" },
      { id: "v", label: "多态", title: "void* 多态存储", content: "节点值用 void 指针保存，任何类型都能装进同一个链表。发布订阅的频道订阅者列表也是它。" },
    ],
  },
  "04": {
    title: "字典",
    subtitle: "双哈希表与渐进 rehash",
    nodes: [
      { id: "t", label: "双表", title: "ht[0] / ht[1]", content: "字典常备两个哈希表：平时只用 ht[0]，rehash 期间新旧共存。这是渐进迁移的舞台。" },
      { id: "c", label: "链地址", title: "链地址法解决冲突", content: "哈希冲突的键挂成链表。链过长时查找退化为 O(N)，负载因子触发扩容保持短链。" },
      { id: "r", label: "渐进搬迁", title: "渐进 rehash 三步", content: "rehash 不一次搬完：每次增删查都顺手搬一个桶，把成本摊到日常操作里。", failure: { title: "rehash 卡死", desc: "rehash 中途服务器长期低负载，搬迁迟迟不完，内存双倍占用。修法：监控 hash 表状态，必要时主动触发。" } },
      { id: "a", label: "应用", title: "字典是万物底座", content: "数据库键空间、哈希键大 value、过期键字典都用字典实现。理解字典就理解了 Redis 的存储中枢。" },
    ],
  },
  "05": {
    title: "跳表",
    subtitle: "随机层数撑起的有序索引",
    nodes: [
      { id: "l", label: "多层", title: "多层索引结构", content: "每层都是有序链表，上层是下层的快速通道。从顶层向左下走，平均 O(logN) 定位任意元素。" },
      { id: "r", label: "随机层数", title: "随机化层数分配", content: "新节点按概率掷出层数，无需旋转平衡。实现比红黑树简单，最坏情况概率极低。" },
      { id: "z", label: "zset 应用", title: "zset 的排序骨架", content: "成员多或分数长时 zset 用跳表存成员-分数对，支持 ZRANGE 与 ZRANGEBYSCORE 的范围查询。", failure: { title: "范围误用", desc: "把 zset 当排行榜只取 Top10 却用全量遍历命令。修法：用 ZREVRANGE 带 LIMIT，避免 O(N) 扫描。" } },
    ],
  },
  "06": {
    title: "整数集合",
    subtitle: "有序数组与类型升级",
    nodes: [
      { id: "a", label: "有序数组", title: "紧凑有序数组", content: "整数集合把元素存成有序无重复数组，二分查找 O(logN)，内存连续友好。" },
      { id: "u", label: "升级", title: "类型升级机制", content: "元素超出当前编码范围时整体升级到更宽类型（int16→int32→int64），一次到位。" },
      { id: "n", label: "不降级", title: "只升不降的规则", content: "升级后即使大元素被删除也不降级，避免频繁类型转换。小集合场景下内存最优。", failure: { title: "集合膨胀", desc: "往整数集合塞入大数后，整个集合按最宽类型存储，内存翻倍。修法：元素范围差异大时改用哈希编码。" } },
    ],
  },
  "07": {
    title: "压缩列表",
    subtitle: "连续内存的极致紧凑",
    nodes: [
      { id: "c", label: "连续内存", title: "一块连续内存", content: "压缩列表把多个小元素塞进一块连续内存，消除指针开销，缓存友好。" },
      { id: "e", label: "变长编码", title: "变长编码字段", content: "每个节点的长度与前驱长度按内容变长编码，小元素只占一两字节，大元素自动扩展。" },
      { id: "u", label: "连锁更新", title: "连锁更新风险", content: "头部插入超长元素会迫使后续节点逐个扩展长度字段，最坏 O(N²)。", failure: { title: "连锁更新", desc: "在超长元素后频繁插入，级联扩展拖慢写入。修法：控制元素大小均匀，避免极端长度混合。" } },
      { id: "t", label: "转换阈值", title: "元素过多自动转换", content: "元素数量或大小超过阈值，压缩列表自动转为常规结构（哈希表/跳表），性能与内存再平衡。" },
    ],
  },
  "08": {
    title: "对象系统",
    subtitle: "类型、编码与引用计数",
    nodes: [
      { id: "t", label: "类型", title: "五种对象类型", content: "redisObject 的 type 字段区分字符串、列表、哈希、集合、有序集合，命令执行前做类型检查。" },
      { id: "e", label: "编码", title: "编码随规模切换", content: "同一类型在不同数据规模下用不同编码（如哈希的 ziplist 与 hashtable），自动透明切换。" },
      { id: "r", label: "引用计数", title: "引用计数与共享", content: "refcount 管理对象生命周期，相同小整数值全局共享，节省重复存储。", failure: { title: "类型误用", desc: "对错误类型执行命令返回 WRONGTYPE。修法：先用 TYPE 确认，或用各类型安全命令探测。" } },
    ],
  },
  "09": {
    title: "数据库",
    subtitle: "键空间与过期策略",
    nodes: [
      { id: "d", label: "键空间", title: "键空间字典", content: "每个逻辑数据库是一个字典：键是字符串，值是 redisObject。所有读写都落在这个字典上。" },
      { id: "e", label: "过期字典", title: "过期时间字典", content: "设了 TTL 的键另登记在过期字典，记录到期时间戳，支撑惰性删除与定期抽查。" },
      { id: "x", label: "删除策略", title: "惰性 + 定期双保险", content: "访问时检查过期（惰性），后台定期随机抽查一批（定期），内存与 CPU 间取平衡。", failure: { title: "过期堆积", desc: "大量键同时过期造成定期删除压力，或惰性删除让内存迟迟不释放。修法：错开 TTL 加随机抖动。" } },
    ],
  },
  "10": {
    title: "RDB 持久化",
    subtitle: "快照、fork 与写时复制",
    nodes: [
      { id: "s", label: "快照", title: "时间点紧凑快照", content: "RDB 把某一时刻的全量数据写成紧凑二进制文件，体积小、恢复快，适合备份与灾备。" },
      { id: "f", label: "fork", title: "BGSAVE 派生子进程", content: "BGSAVE fork 子进程写盘，父进程继续服务。SAVE 则全程阻塞，生产环境禁用。" },
      { id: "c", label: "写时复制", title: "写时复制保一致", content: "fork 后父子共享内存页，父进程写入时复制页面，子进程看到的是 fork 时刻的一致视图。", failure: { title: "fork 放大", desc: "大内存实例 fork 缓慢且写时复制翻倍内存。修法：控制实例大小，低峰执行 BGSAVE。" } },
      { id: "l", label: "丢失窗口", title: "间隔内数据会丢", content: "两次快照之间的写入在崩溃时丢失。对丢失敏感的场景必须叠加 AOF。" },
    ],
  },
  "11": {
    title: "AOF 持久化",
    subtitle: "追加、fsync 与重写",
    nodes: [
      { id: "a", label: "追加", title: "逐条追加写命令", content: "AOF 把每个写命令追加到文件末尾，恢复时重放命令重建数据，比 RDB 丢失窗口小得多。" },
      { id: "f", label: "fsync", title: "三种 fsync 策略", content: "always 每条都落盘最安全最慢，everysec 每秒一次是推荐折中，no 交给 OS 最危险。" },
      { id: "r", label: "重写", title: "重写压缩冗余", content: "同一键的多次修改合并为最终状态的一条命令，文件体积可控，重写也在子进程进行。", failure: { title: "AOF 膨胀", desc: "重写不及时文件无限增长，恢复时间拉长。修法：监控 auto-aof-rewrite 触发率与文件大小。" } },
      { id: "m", label: "混合持久化", title: "RDB + AOF 混合", content: "新重写以 RDB 格式开头记录全量，后接 AOF 增量，兼顾加载速度与数据安全。" },
    ],
  },
  "12": {
    title: "事件",
    subtitle: "文件事件与时间事件",
    nodes: [
      { id: "f", label: "文件事件", title: "文件事件驱动 I/O", content: "套接字的可读可写事件驱动命令处理：accept、read、write 都是事件处理器，单线程完成全部网络 I/O。" },
      { id: "t", label: "时间事件", title: "时间事件做定时任务", content: "serverCron 是主要时间事件，负责过期删除、rehash 推进、复制心跳等周期维护。" },
      { id: "r", label: "Reactor", title: "Reactor 单线程分发", content: "多路复用（epoll/kqueue/select）监听所有套接字，就绪时分发给对应处理器，没有线程切换开销。", failure: { title: "事件饥饿", desc: "某个处理器耗时过长，后续事件排队饿死。修法：处理器内禁止阻塞，大任务拆分或异步化。" } },
    ],
  },
  "13": {
    title: "客户端",
    subtitle: "缓冲区与生命周期管理",
    nodes: [
      { id: "i", label: "输入缓冲", title: "输入缓冲区", content: "客户端命令先入输入缓冲区再解析执行，允许流水线式连续发送多条命令。" },
      { id: "o", label: "输出缓冲", title: "两级输出缓冲", content: "固定小缓冲 + 可变链表：小回复直接放固定区，大回复挂链表，防止单次写阻塞。" },
      { id: "s", label: "状态与关闭", title: "状态跟踪与关闭条件", content: "服务器记录每个客户端的标志与状态，输出超限、空闲超时或显式命令都会触发关闭。", failure: { title: "输出积压", desc: "慢客户端让输出缓冲无限增长拖垮内存。修法：client-output-buffer-limit 分类限制。" } },
    ],
  },
  "14": {
    title: "服务器",
    subtitle: "命令管线与周期维护",
    nodes: [
      { id: "p", label: "命令管线", title: "读取到回复全流程", content: "读命令、查表、执行、写回复：每个命令走完整管线，慢日志在管线末端统计执行耗时。" },
      { id: "c", label: "serverCron", title: "serverCron 周期维护", content: "默认每秒 10 次：推进过期删除、渐进 rehash、关闭空闲客户端、更新统计与复制心跳。" },
      { id: "b", label: "启动流程", title: "启动初始化序列", content: "读配置、初始化数据结构、恢复持久化文件、进入事件循环，启动各阶段都有日志可查。", failure: { title: "启动失败", desc: "AOF/RDB 损坏导致启动拒绝。修法：备份持久化文件，必要时用修复工具。" } },
    ],
  },
  "15": {
    title: "复制",
    subtitle: "全量、增量与 PSYNC",
    nodes: [
      { id: "f", label: "全量同步", title: "全量同步打底", content: "从库首次连接：主库 BGSAVE 生成 RDB 发给从库，加载后再追缓冲区的增量命令。" },
      { id: "i", label: "命令传播", title: "命令持续传播", content: "同步完成后主库把每个写命令实时发给从库，从库执行相同命令保持一致。" },
      { id: "p", label: "PSYNC", title: "PSYNC 断线续传", content: "断线重连用 offset 与 runid 判断能否部分同步，命中积压缓冲区就免全量。", failure: { title: "积压不足", desc: "断线太久积压缓冲区已覆盖，只能全量重传，大实例雪崩。修法：调大 repl-backlog-size。" } },
      { id: "r", label: "只读从库", title: "从库默认只读", content: "从库默认拒绝写入防止数据分叉，读写分离时只读副本分担查询。" },
    ],
  },
  "16": {
    title: "哨兵",
    subtitle: "监控、判定与故障转移",
    nodes: [
      { id: "m", label: "监控", title: "哨兵持续监控", content: "哨兵集群定期 PING 主从库与互哨，收集可达性与复制状态信息。" },
      { id: "d", label: "下线判定", title: "主观 + 客观下线", content: "单哨兵超时判主观下线，多数哨兵确认才判客观下线，防止单点误判。" },
      { id: "f", label: "故障转移", title: "选举领头执行切换", content: "哨兵间选出领头，挑最优从库升主，改写其他从库复制方向并通知客户端。", failure: { title: "误判切换", desc: "网络抖动造成误判，频繁切换放大不可用。修法：down-after-milliseconds 适当调大。" } },
    ],
  },
  "17": {
    title: "集群",
    subtitle: "16384 槽与去中心化",
    nodes: [
      { id: "s", label: "槽", title: "16384 个槽位", content: "键按 CRC16 映射到固定槽，槽是分配与迁移的最小单位，节点负责一段槽区间。" },
      { id: "g", label: "gossip", title: "gossip 交换拓扑", content: "节点间 gossip 协议交换视角，新节点加入与故障下线最终全网一致。" },
      { id: "m", label: "重分片", title: "在线重新分片", content: "槽可以在线迁移：源节点逐步导出，目标节点导入，期间 ASK 转向保证访问不中断。", failure: { title: "跨槽操作", desc: "MGET、事务跨槽直接报错。修法：hash tag 让相关键落同槽，或客户端拆分。" } },
      { id: "f", label: "故障转移", title: "集群自动故障转移", content: "主库失联后其从库发起选举获胜升主，集群无需哨兵即可自愈。" },
    ],
  },
  "18": {
    title: "发布订阅",
    subtitle: "频道与模式两种形态",
    nodes: [
      { id: "c", label: "频道", title: "频道订阅", content: "SUBSCRIBE 订阅具名频道，PUBLISH 向频道广播，订阅者即时收到消息。" },
      { id: "p", label: "模式", title: "模式匹配订阅", content: "PSUBSCRIBE 按通配符匹配频道名，一次订阅一族频道，如 news.*。" },
      { id: "f", label: "即发即弃", title: "消息不持久", content: "发布时无订阅者在线，消息直接丢弃。需要可靠投递请用 Stream 或队列。", failure: { title: "消息丢失", desc: "把 pub/sub 当可靠队列用，断线期消息全丢。修法：可靠性要求高的场景换 Stream。" } },
    ],
  },
  "19": {
    title: "事务",
    subtitle: "MULTI/EXEC 与 WATCH",
    nodes: [
      { id: "q", label: "命令队列", title: "MULTI 开始排队", content: "MULTI 之后命令只入队不执行，EXEC 一次性顺序执行全部，期间不被打断。" },
      { id: "w", label: "WATCH", title: "WATCH 乐观锁", content: "WATCH 监视键，EXEC 前被改动则整体放弃，实现检查再设置的原子更新。" },
      { id: "n", label: "不回滚", title: "事务不支持回滚", content: "队列中某命令执行失败，其余命令照常执行，Redis 事务没有回滚机制。", failure: { title: "误期回滚", desc: "以为 DISCARD 能回滚已 EXEC 的事务。修法：失败路径在应用层补偿，或用 Lua 脚本。" } },
    ],
  },
  "20": {
    title: "Lua 脚本",
    subtitle: "原子执行的嵌入式计算",
    nodes: [
      { id: "a", label: "原子性", title: "脚本整体原子执行", content: "EVAL 的脚本在执行期间不被其他命令插入，等同一条复合原子命令。" },
      { id: "c", label: "缓存", title: "EVALSHA 脚本缓存", content: "SCRIPT LOAD 预载脚本得 SHA1，EVALSHA 按摘要调用，省去重复传输。" },
      { id: "r", label: "复制传播", title: "按效果传播", content: "脚本效果转为命令写入 AOF 与复制流，从库重放得到相同结果。", failure: { title: "脚本阻塞", desc: "长脚本阻塞整个服务器。修法：脚本保持短平快，设置 lua-time-limit 监控。" } },
    ],
  },
  "21": {
    title: "SORT 排序",
    subtitle: "外部键驱动的灵活排序",
    nodes: [
      { id: "s", label: "排序", title: "SORT 基础排序", content: "SORT 对列表、集合、有序集合按键值排序，默认数值升序，ALPHA 切字典序。" },
      { id: "b", label: "BY", title: "BY 引用外部键", content: "BY weight_* 让每个元素按对应外部键的值排序，排序依据与元素本身解耦。" },
      { id: "g", label: "GET", title: "GET 取回外部值", content: "GET field_* 在排序结果里返回关联外部键内容，一次命令拼出完整视图。", failure: { title: "大集合排序", desc: "对百万级集合 SORT 是阻塞操作。修法：控制集合规模，用 STORE 缓存结果。" } },
    ],
  },
  "22": {
    title: "位数组",
    subtitle: "字符串承载的位操作",
    nodes: [
      { id: "b", label: "位模型", title: "字符串即位数组", content: "位图本质是字符串，SETBIT/GETBIT 按偏移读写单个位，5 亿位只占 60MB。" },
      { id: "c", label: "统计", title: "BITCOUNT 统计", content: "BITCOUNT 数置位数量，适合签到、在线状态等稀疏布尔统计场景。" },
      { id: "o", label: "位运算", title: "BITOP 位逻辑", content: "BITOP 对多个位图做 AND/OR/XOR/NOT，交集并集一条命令完成。", failure: { title: "大偏移写", desc: "对大偏移 SETBIT 触发整块内存分配。修法：按用户段分键，控制单键大小。" } },
    ],
  },
  "23": {
    title: "慢查询日志",
    subtitle: "定位性能杀手的第一现场",
    nodes: [
      { id: "t", label: "阈值", title: "超时阈值可配", content: "slowlog-log-slower-than 设微秒阈值，超过即记录，默认 10ms 可按需调紧。" },
      { id: "r", label: "记录", title: "记录执行耗时", content: "只计命令执行时间，不含排队与网络，直接指向真正的慢命令。" },
      { id: "a", label: "分析", title: "定期审查与清理", content: "SLOWLOG GET 定期审查，找出可优化对象，RESET 清理避免内存占用。", failure: { title: "忽视慢日志", desc: "线上抖动却从不看慢日志。修法：把慢日志纳入巡检，超阈值告警。" } },
    ],
  },
  "24": {
    title: "MONITOR 监视器",
    subtitle: "实时命令流的调试窗口",
    nodes: [
      { id: "s", label: "实时流", title: "实时回放缓命令", content: "MONITOR 连接后，服务器把执行的每条命令实时转发给监视客户端。" },
      { id: "d", label: "调试", title: "诊断期临时窗口", content: "调试期观察真实命令流：谁在写、写的什么、频率多高，一目了然。" },
      { id: "c", label: "成本", title: "性能代价显著", content: "每个命令都多一份转发，监视期间吞吐明显下降，生产环境慎用。", failure: { title: "忘记断开", desc: "MONITOR 长挂拖慢线上服务。修法：诊断完成立即断开，生产用慢日志替代。" } },
    ],
  },
  review: {
    title: "全书总复习",
    subtitle: "结构、单机、集群、功能四环闭环",
    nodes: [
      { id: "s", label: "结构", title: "底层结构决定性能", content: "六种数据结构按场景与规模选择编码，对象系统在它们之上统一类型与编码。" },
      { id: "p", label: "持久", title: "持久化保证数据安全", content: "RDB 快照与 AOF 日志互补，混合持久化兼顾恢复速度与丢失窗口。" },
      { id: "c", label: "集群", title: "集群保障可用与扩展", content: "复制打底、哨兵切换、集群分片，可用性与容量逐层递进。", failure: { title: "单环断裂", desc: "只懂命令不懂机制，线上事故无法定位。修法：每环至少能讲清一个故障场景。" } },
      { id: "f", label: "功能", title: "功能面覆盖日常需求", content: "事务、Lua、pub/sub、位图与运维工具构成完整使用面。" },
    ],
  },
};

const VIEW_W = 780;
const NODE_H = 88;
const NODE_Y = 132;
const GAP = 16;

export function RdiStructureLab({ chapter }: { chapter: string }) {
  const spec = CHAPTERS[chapter] ?? CHAPTERS.map;
  const [selected, setSelected] = useState(spec.nodes[0].id);
  const [injectFaults, setInjectFaults] = useState(false);

  const reset = useCallback(() => {
    setSelected(spec.nodes[0].id);
    setInjectFaults(false);
  }, [spec]);

  const nodeW = (VIEW_W - 40 - (spec.nodes.length - 1) * GAP) / spec.nodes.length;
  const nodeX = (i: number) => 20 + i * (nodeW + GAP);
  const stage = spec.nodes.find((n) => n.id === selected)!;
  const viewH = 330;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ {spec.title}
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${viewH}`}
          className="w-full"
          role="img"
          aria-label={spec.title}
        >
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize={16} fill={C.primary} fontWeight={600}>
            {spec.title}
          </text>
          <text x={VIEW_W / 2} y={78} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {spec.subtitle}；点击节点查看详情
          </text>

          {spec.nodes.slice(0, -1).map((n, i) => {
            const x1 = nodeX(i) + nodeW;
            const x2 = nodeX(i + 1);
            const y = NODE_Y + NODE_H / 2;
            return (
              <g key={`arrow-${n.id}`}>
                <line x1={x1} y1={y} x2={x2 - 4} y2={y} stroke={C.border} strokeWidth={1.5} />
                <polygon points={`${x2 - 4},${y - 4} ${x2 - 4},${y + 4} ${x2},${y}`} fill={C.border} />
              </g>
            );
          })}

          {spec.nodes.map((n, i) => {
            const x = nodeX(i);
            const cx = x + nodeW / 2;
            const isSel = selected === n.id;
            const isFail = injectFaults && !!n.failure;
            return (
              <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
                <rect
                  x={x}
                  y={NODE_Y}
                  width={nodeW}
                  height={NODE_H}
                  rx={8}
                  fill={C.elevated}
                  stroke={isSel ? C.accent : isFail ? C.danger : C.border}
                  strokeWidth={isSel ? 2 : 1}
                />
                <circle
                  cx={cx}
                  cy={NODE_Y + 22}
                  r={11}
                  fill={isSel ? C.accent : isFail ? C.danger : C.bg}
                  stroke={isSel ? C.accent : isFail ? C.danger : C.border}
                  strokeWidth={1}
                />
                <text
                  x={cx}
                  y={NODE_Y + 26}
                  textAnchor="middle"
                  fontSize={12}
                  fill={isSel || isFail ? C.bg : C.secondary}
                  fontWeight={600}
                >
                  {i + 1}
                </text>
                <text x={cx} y={NODE_Y + 54} textAnchor="middle" fontSize={12} fill={C.primary}>
                  {n.label}
                </text>
                {isFail && (
                  <text
                    x={cx}
                    y={NODE_Y + NODE_H + 22}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.danger}
                    fontWeight={500}
                  >
                    {n.failure!.title}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: C.accent }} />
            <span className="text-sm font-medium" style={{ color: C.primary }}>
              {stage.title}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>
            {stage.content}
          </p>
          {injectFaults && stage.failure && (
            <div className="mt-3 rounded-control border p-3" style={{ background: C.elevated, borderColor: C.danger }}>
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: C.danger }} />
                <span className="text-xs font-semibold" style={{ color: C.danger }}>
                  故障注入 · {stage.failure.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.secondary }}>
                {stage.failure.desc}
              </p>
            </div>
          )}
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <button
            onClick={() => setInjectFaults(!injectFaults)}
            className="relative h-5 w-9 rounded-full border border-border transition-colors"
            style={{ background: injectFaults ? C.accent : C.elevated }}
            aria-label="注入常见故障"
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform"
              style={{ transform: injectFaults ? "translateX(16px)" : "translateX(0)" }}
            />
          </button>
          <span className="text-sm" style={{ color: C.secondary }}>
            注入常见故障（高亮各环节的失败模式）
          </span>
        </label>
      </div>
    </div>
  );
}
