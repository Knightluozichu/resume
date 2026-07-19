#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "redis-design-implementation";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/redis-design-implementation-v2-profiles.json");

const SOURCES = {
  book: "https://huangz.works/redisbook1e/",
  annotated: "https://github.com/huangzworks/redis-3.0-annotated",
  redis30: "https://github.com/redis/redis/tree/3.0/src",
  persistence: "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/",
};

const FILES = {
  "rdi-01-introduction": "server.c",
  "rdi-02-simple-dynamic-string": "sds.c",
  "rdi-03-linked-list": "adlist.c",
  "rdi-04-dictionary": "dict.c",
  "rdi-05-skiplist": "t_zset.c",
  "rdi-06-integer-set": "intset.c",
  "rdi-07-ziplist": "ziplist.c",
  "rdi-08-object": "object.c",
  "rdi-09-database": "db.c",
  "rdi-10-rdb-persistence": "rdb.c",
  "rdi-11-aof-persistence": "aof.c",
  "rdi-12-event": "ae.c",
  "rdi-13-client": "networking.c",
  "rdi-14-server": "server.c",
  "rdi-15-replication": "replication.c",
  "rdi-16-sentinel": "sentinel.c",
  "rdi-17-cluster": "cluster.c",
  "rdi-18-pubsub": "pubsub.c",
  "rdi-19-transaction": "multi.c",
  "rdi-20-lua": "scripting.c",
  "rdi-21-sort": "sort.c",
  "rdi-22-bit-array": "bitops.c",
  "rdi-23-slow-log": "slowlog.c",
  "rdi-24-monitor": "server.c",
};

function model(studio, axisA, levelsA, axisB, levelsB, fault, command, practiceMode = "simulation") {
  return {
    studio,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    fault,
    command,
    practiceMode,
  };
}

const MODELS = {
  "rdi-official-learning-map": model("24章源码依赖导航台", "追踪跨度", ["单结构", "单章闭环", "跨四部分"], "证据层级", ["目录", "源码", "运行与反例"], "把24章当成互不相关的命令清单，无法从一次请求追到持久化与复制", "git -C redis-3.0-annotated rev-parse HEAD", "design"),
  "rdi-01-introduction": model("版本边界与阅读索引台", "结论范围", ["命令表象", "函数路径", "Redis 3.0边界"], "阅读入口", ["目录", "注释源码", "运行验证"], "用新版Redis的listpack、Streams或线程模型解释书中的3.0实现", "git checkout 3.0 && git rev-parse HEAD", "design"),
  "rdi-02-simple-dynamic-string": model("SDS字节与扩容轨迹台", "写入长度", ["短写入", "跨预留空间", "含零字节"], "空间状态", ["有free", "刚好写满", "需要扩容"], "按C字符串的strlen和终止零推断SDS长度，截断二进制载荷", "rg 'sdsMakeRoomFor|sdslen|sdsRemoveFreeSpace' src/sds.c", "calculation"),
  "rdi-03-linked-list": model("双向链表所有权台", "变更动作", ["头插", "尾插", "删除中点"], "边界位置", ["空表", "单节点", "多节点"], "删除节点后只修一侧指针或漏调释放回调，使len与拓扑分叉", "rg 'listAddNode|listDelNode' src/adlist.c", "simulation"),
  "rdi-04-dictionary": model("双表渐进rehash台", "负载状态", ["稀疏", "触发扩缩", "正在迁移"], "访问动作", ["查找", "插入", "删除"], "rehash期间只查询ht[0]，或一次迁移整表造成长停顿", "rg 'dictRehash|_dictKeyIndex|dictFind' src/dict.c", "simulation"),
  "rdi-05-skiplist": model("跳跃表路径与跨度台", "目标位置", ["表头附近", "中位区间", "表尾附近"], "操作", ["插入", "范围查询", "按排名删除"], "只维护forward指针而漏改span或backward，范围结果正确但排名错误", "rg 'zslInsert|zslDelete|zslGetRank' src/t_zset.c", "simulation"),
  "rdi-06-integer-set": model("整数集合编码升级台", "新值范围", ["int16", "int32", "int64"], "插入位置", ["最小端", "中间", "最大端"], "升级后按旧宽度解释contents，或假设删除会自动降级", "rg 'intsetUpgradeAndAdd|intsetSearch' src/intset.c", "calculation"),
  "rdi-07-ziplist": model("压缩列表字节解析台", "前节点长度", ["小于254", "跨254边界", "连续跨界"], "变更", ["头插", "中间替换", "删除"], "忽略previous_entry_length扩展引发的连锁更新，导致尾偏移或反向遍历失真", "rg '__ziplistCascadeUpdate|ziplistInsert|ziplistDelete' src/ziplist.c", "simulation"),
  "rdi-08-object": model("对象类型—编码切换台", "对象类型", ["字符串", "聚合对象", "有序集合"], "数据形态", ["紧凑", "越过阈值", "共享或回收"], "把TYPE当底层编码，或编码转换后改变了用户可见值与引用计数", "rg 'create.*Object|tryObjectEncoding|decrRefCount' src/object.c", "simulation"),
  "rdi-09-database": model("键空间与TTL时钟台", "过期时点", ["未到期", "刚到期", "长期过期"], "触发路径", ["访问惰性删除", "周期采样", "持久化或复制"], "只从主键字典删除过期键，或让从节点自行产生与主节点不同的过期决议", "rg 'expireIfNeeded|activeExpireCycle|propagateExpire' src/db.c src/server.c", "simulation"),
  "rdi-10-rdb-persistence": model("RDB快照恢复台", "保存方式", ["SAVE", "BGSAVE", "自动保存"], "故障时点", ["fork前", "子进程写入中", "原子替换后"], "看到dump.rdb存在就宣称可恢复，忽略校验、快照时点和写时复制成本", "rg 'rdbSave|rdbLoad|rdbSaveBackground' src/rdb.c", "diagnosis"),
  "rdi-11-aof-persistence": model("AOF追加与重写双缓冲台", "fsync策略", ["always", "everysec", "no"], "重写阶段", ["开始前", "子进程中", "差量合并"], "重写期间漏掉父进程新命令，或把everysec误称为零数据损失", "rg 'feedAppendOnlyFile|flushAppendOnlyFile|rewriteAppendOnlyFile' src/aof.c", "diagnosis"),
  "rdi-12-event": model("文件与时间事件调度台", "文件就绪量", ["空闲", "稳定", "突发"], "回调耗时", ["短", "接近预算", "阻塞"], "在单个事件回调中执行长任务，使其他客户端与时间事件共同饥饿", "rg 'aeProcessEvents|aeCreateFileEvent|aeCreateTimeEvent' src/ae.c", "simulation"),
  "rdi-13-client": model("客户端缓冲与生命周期台", "输入输出量", ["小请求", "流水请求", "慢消费者"], "客户端状态", ["普通", "事务或订阅", "关闭"], "关闭套接字却遗留WATCH、订阅或输出缓冲关系，造成资源与状态泄漏", "rg 'createClient|freeClient|sendReplyToClient' src/networking.c", "diagnosis"),
  "rdi-14-server": model("命令执行与serverCron时序台", "请求阶段", ["解析", "预检查", "命令调用"], "服务器状态", ["正常", "载入或只读", "后台任务"], "绕过预执行检查直接调用命令，或初始化失败后继续接受请求", "rg 'processCommand|call|serverCron|initServer' src/server.c", "simulation"),
  "rdi-15-replication": model("PSYNC偏移与积压缓冲台", "断线跨度", ["未断线", "仍在backlog", "超出backlog"], "身份条件", ["runid相同", "runid变化", "未知偏移"], "在runid或偏移不连续时仍做部分重同步，使副本静默分叉", "rg 'syncCommand|masterTryPartialResynchronization|replicationFeedSlaves' src/replication.c", "diagnosis"),
  "rdi-16-sentinel": model("Sentinel投票与故障转移台", "故障认定", ["可达", "主观下线", "客观下线"], "选举状态", ["无领头", "请求投票", "获得法定票数"], "把单个Sentinel的主观下线当成客观下线，或未获多数就执行切换", "rg 'sentinelCheckSubjectivelyDown|sentinelAskMasterStateToOtherSentinels|sentinelFailoverStateMachine' src/sentinel.c", "simulation"),
  "rdi-17-cluster": model("16384槽迁移路由台", "槽状态", ["稳定", "migrating/importing", "已转移"], "请求位置", ["源节点", "目标节点", "其他节点"], "迁槽时混淆ASK与MOVED，或让同一槽同时拥有两个可写主", "rg 'getNodeByQuery|clusterRedirectClient|clusterCron' src/cluster.c", "simulation"),
  "rdi-18-pubsub": model("频道与模式扇出台", "订阅类型", ["精确频道", "模式", "两者重叠"], "连接状态", ["在线", "退订", "断线"], "把Pub/Sub误当持久队列，向断线订阅者承诺补发历史消息", "rg 'pubsubSubscribe|pubsubUnsubscribe|pubsubPublishMessage' src/pubsub.c", "simulation"),
  "rdi-19-transaction": model("MULTI/WATCH状态机台", "WATCH版本", ["未变化", "排队后变化", "执行后变化"], "命令错误", ["入队前", "入队时", "执行时"], "把Redis事务描述成遇错自动回滚，忽略EXEC返回逐命令错误的语义", "rg 'multiCommand|execCommand|watchForKey|touchWatchedKey' src/multi.c", "simulation"),
  "rdi-20-lua": model("Lua脚本缓存与传播台", "调用方式", ["EVAL", "EVALSHA命中", "EVALSHA未命中"], "脚本状态", ["短脚本", "长运行", "复制传播"], "让脚本执行阻塞事件循环却误判为并发，或缓存摘要与传播脚本不一致", "rg 'evalGenericCommand|scriptCommand|scriptingInit' src/scripting.c", "simulation"),
  "rdi-21-sort": model("SORT选项执行管线台", "比较方式", ["数值", "ALPHA", "BY外部键"], "输出阶段", ["全量", "LIMIT/GET", "STORE"], "按参数书写顺序执行所有选项，导致比较、分页、投影和保存的语义错位", "rg 'sortCommand|lookupKeyByPattern' src/sort.c", "simulation"),
  "rdi-22-bit-array": model("位偏移与BITCOUNT算法台", "位偏移", ["字节首位", "跨字节", "扩展尾部"], "运算", ["GET/SET", "BITCOUNT", "BITOP"], "按本机位序而非Redis定义映射偏移，造成SETBIT与BITCOUNT结果不一致", "rg 'getbitCommand|setbitCommand|bitcountCommand|bitopCommand' src/bitops.c", "calculation"),
  "rdi-23-slow-log": model("慢查询阈值与环形记录台", "执行耗时", ["低于阈值", "等于阈值", "高于阈值"], "日志容量", ["未满", "达到上限", "清空"], "把网络等待计入命令执行耗时，或无限保留参数导致内存与敏感信息风险", "rg 'slowlogPushEntryIfNeeded|slowlogCommand' src/slowlog.c", "diagnosis"),
  "rdi-24-monitor": model("MONITOR传播与开销台", "监视客户端", ["无", "单个", "多个慢客户端"], "命令敏感度", ["普通", "大流量", "含秘密"], "把MONITOR当成低成本审计日志，忽略扇出、慢消费者与敏感参数暴露", "rg 'monitorCommand|replicationFeedMonitors' src/server.c src/replication.c", "diagnosis"),
  "rdi-official-final-review": model("一条命令的全栈答辩台", "故障位置", ["结构或对象", "持久化或复制", "集群或独立功能"], "证据闭环", ["源码", "运行", "故障恢复对账"], "只解释命令返回，不检查文件、偏移、槽位和用户数据的最终状态", "redis-cli --latency-history", "diagnosis"),
};

const FACT_RULES = [
  [/版本说明/, "正式基线是Redis 3.0源码语境；后续编码、命令和线程模型只能放入差异栏，不能反向改写本章结论"],
  [/章节编排/, "四部分先解释数据结构与对象，再进入单机、多机和独立功能，使字段依赖早于跨节点状态机"],
  [/阅读方法/, "每个结论都应沿结构定义、写入函数、读取函数、失败分支和最小运行样本往返核对"],
  [/行文规则/, "结构名、字段名和函数名保留源码拼写；推断、测量值与源码事实分开陈述"],
  [/配套网站/, "作者页面用于核对目录和注释源码入口，不被误报为出版正文的开放许可证"],
  [/SDS的定义/, "sdshdr在buf前保存len与free，buf仍以零字节结尾，因此可兼容部分C API又能常数时间取长"],
  [/SDS与C字符串/, "SDS按len处理二进制数据并在写入前检查容量，避免strlen线性扫描、缓冲区溢出与嵌入零截断"],
  [/SDS API/, "sdsMakeRoomFor先保证空间，拼接更新len/free，sdsRemoveFreeSpace可主动收缩预留区"],
  [/链表和链表节点的实现/, "listNode保存prev、next和值；list保存head、tail、len以及复制、释放和比较回调，使容器不拥有固定值类型"],
  [/链表和链表节点的API/, "头尾插入、索引、删除与旋转必须同步维护head、tail、相邻指针和len，删除时按free回调处理值"],
  [/字典的实现/, "dict持有ht[0]、ht[1]与rehashidx；dictht保存桶数组、大小、掩码和已用节点数，dictEntry以链表解决冲突"],
  [/哈希算法/, "哈希值与sizemask按位与得到桶索引；扩容后的掩码改变，所以迁移必须重新计算目标桶"],
  [/解决键冲突/, "同桶键以链地址法连接，查找还要用类型回调比较键，不能只比较哈希值"],
  [/^rehash$/i, "rehash建立ht[1]并迁移ht[0]桶；完成后释放旧表、把ht[1]提升为ht[0]并把rehashidx复位为-1"],
  [/渐进式rehash/, "普通字典操作顺带迁移有限桶；迁移期新增只写ht[1]，查找和删除需要覆盖两表"],
  [/字典API/, "dictAdd、dictFind、dictDelete和迭代器共同受rehash状态约束，安全迭代器会阻止不兼容的迁移动作"],
  [/跳跃表的实现/, "zskiplistNode按随机层保存forward与span，另有backward；头节点不保存成员，tail支持反向访问"],
  [/跳跃表API/, "插入先记录每层update与rank，再同时修正前进指针和跨度；排名由沿途span累加得到"],
  [/整数集合的实现/, "intset以连续有序数组保存整数，encoding决定每个元素宽度，length记录元素个数而不是字节数"],
  [/^升级$/, "新值超出当前编码时创建更宽解释并从尾向头搬迁旧元素，避免原地覆盖未读取数据"],
  [/升级的好处/, "统一最小宽度让查找保持有序二分，并在小整数集合上减少对象与指针开销"],
  [/^降级$/, "Redis 3.0整数集合只升级不降级，删除大值不会自动收窄编码，因此不能假设内存立即回落"],
  [/整数集合API/, "intsetAdd、intsetRemove与intsetFind通过编码感知的读写函数访问元素，并返回是否发生实际变更"],
  [/压缩列表的构成/, "ziplist头保存总字节数、尾节点偏移和节点数量估计，末尾以ZIP_END标识，使连续块可整体移动"],
  [/压缩列表节点的构成/, "节点由前一节点长度、当前编码和内容组成；整数与字符串使用不同编码宽度"],
  [/连锁更新/, "当前驱长度从1字节跨到5字节时，后继节点可能继续扩张，形成连续重分配与移动"],
  [/压缩列表API/, "按索引查找可从头或尾选择较近方向，插删后要同步头字段、尾偏移和每个前驱长度"],
  [/对象的类型与编码/, "redisObject的type声明用户语义，encoding说明ptr指向的底层表示；同一类型可因数据形态切换编码"],
  [/字符串对象/, "字符串可用整数或SDS表示，数值命令与字符串命令会按语义选择转换，但用户值保持一致"],
  [/列表对象/, "Redis 3.0列表对象在满足元素数与长度阈值时使用ziplist，否则使用linkedlist"],
  [/哈希对象/, "小而短的字段值可压缩在ziplist中，越过阈值后转换为hashtable以获得更稳定的查改成本"],
  [/集合对象/, "全为可表示整数的小集合可用intset，否则用hashtable；插入不兼容成员会触发转换"],
  [/有序集合对象/, "ziplist编码把成员和分值相邻保存；skiplist编码同时用字典查分值、用跳跃表维护顺序"],
  [/类型检查与命令多态/, "命令先检查对象type，再根据encoding选择实现；错误类型不能落入不匹配的底层读取路径"],
  [/内存回收/, "refcount降到零才按类型释放ptr；容器、共享对象与客户端引用都必须计入所有权"],
  [/对象共享/, "共享对象通过增加引用计数复用常见值，但比较共享收益时也要考虑查找与引用维护成本"],
  [/空转时长/, "lru字段记录近似访问时间，OBJECT IDLETIME由当前时钟与该字段计算，适合近似淘汰信息而非精确审计"],
  [/服务器中的数据库/, "redisServer保存数据库数组，redisDb至少连接键空间dict与expires字典；客户端db指针选择当前逻辑库"],
  [/切换数据库/, "SELECT改变客户端指向的redisDb而不是搬迁键；新客户端默认使用编号0"],
  [/数据库键空间/, "键空间操作除dict变更外还要维护过期、阻塞键、WATCH与通知等旁路状态"],
  [/设置键的生存时间|过期时间/, "expires字典保存绝对毫秒时刻并与键空间共享键指针；TTL/PTTL把绝对时刻换算为剩余时间"],
  [/过期键删除策略/, "定时删除耗CPU、惰性删除占内存，实际实现组合访问时检查与周期性抽样"],
  [/Redis的过期键删除策略/, "expireIfNeeded处理访问到的过期键，activeExpireCycle在时间预算内抽样过期字典并动态决定是否继续"],
  [/AOF、RDB和复制功能对过期键/, "RDB载入按当前时间处理过期，AOF可传播DEL；副本服从主节点传播，避免各节点独立时钟造成分叉"],
  [/数据库通知/, "键空间通知把事件类型与键名发布到约定频道，是否启用和事件类别由配置控制，消息不承担持久队列语义"],
  [/RDB文件的创建与载入/, "SAVE在主进程同步写快照，BGSAVE由子进程写临时文件并成功后替换；启动载入要校验类型和尾部"],
  [/自动间隔性保存/, "save条件按时间与dirty变更数触发，serverCron检查条件并避免与已有RDB/AOF子进程冲突"],
  [/RDB文件结构/, "RDB包含版本头、数据库选择、键值与可选过期时间编码，尾部结束标志与校验共同界定完整文件"],
  [/分析RDB文件/, "字节分析必须使用匹配版本的长度和对象编码，并把解析出的键、值、TTL与真实载入结果对账"],
  [/AOF持久化的实现/, "写命令先按协议追加到aof_buf，再由事件循环写文件并按appendfsync策略决定同步时点"],
  [/AOF文件的载入/, "载入创建伪客户端顺序重放AOF命令；截断恢复只能在明确配置与协议边界下进行"],
  [/AOF重写/, "后台重写从当前数据库状态生成最短等价命令；父进程把期间增量保存到重写缓冲，结束时追加后原子替换"],
  [/文件事件/, "ae事件循环为可读、可写条件登记处理器，由平台多路复用层返回就绪描述符后调用对应回调"],
  [/时间事件/, "时间事件保存ID、到期时刻、处理器和终结器；处理器返回下次间隔或AE_NOMORE结束"],
  [/事件的调度与执行/, "aeProcessEvents先计算最近定时器决定阻塞上限，再处理就绪文件事件和到期时间事件"],
  [/客户端属性/, "redisClient聚合fd、选择库、参数、命令、查询与回复缓冲、flags以及事务/订阅/复制等状态"],
  [/客户端的创建与关闭/, "创建要注册读事件并初始化缓冲；关闭要注销事件、释放回复与参数并解除订阅、WATCH和阻塞状态"],
  [/命令请求的执行过程/, "协议解析得到argv后查找命令，processCommand完成参数和服务器状态检查，call围绕命令函数更新统计与传播"],
  [/serverCron函数/, "serverCron按hz周期推进时间、客户端、数据库、持久化、复制与集群维护，单次工作受时间预算约束"],
  [/初始化服务器/, "初始化先建立配置、共享对象、数据库和事件循环，再绑定监听与载入数据；关键失败必须阻止进入可服务状态"],
  [/旧版复制功能的实现/, "SYNC要求主节点BGSAVE并传输完整RDB，随后传播缓冲期写命令；断线后通常再次全量同步"],
  [/旧版复制功能的缺陷/, "短暂断线也全量复制会重复fork、磁盘与网络成本，并放大主从重新可用时间"],
  [/新版复制功能的实现/, "PSYNC以runid和offset判断能否继续，无法匹配时才退回完整同步"],
  [/部分重同步的实现/, "主节点在固定大小backlog保留最近复制字节；请求偏移仍在窗口内且runid匹配时发送缺口"],
  [/PSYNC命令的实现/, "副本发送已知runid与下一偏移，主节点返回CONTINUE或FULLRESYNC并给出新的身份与偏移"],
  [/^复制的实现$/, "完整同步后主节点持续把写命令传播给副本，双方用复制偏移记录字节流进度"],
  [/心跳检测/, "副本周期发送REPLCONF ACK偏移，主节点据此观察连接存活、复制滞后并支持min-slaves约束"],
  [/启动并初始化Sentinel/, "Sentinel以特殊服务器模式启动，载入监控主节点配置并建立命令连接、订阅连接和周期任务"],
  [/获取主服务器信息/, "Sentinel周期向主节点发送INFO，刷新运行ID、角色、从节点地址与复制状态"],
  [/获取从服务器信息/, "从主节点INFO发现副本后为其创建实例，并继续用INFO核对角色、主节点地址和偏移"],
  [/向主服务器和从服务器发送信息/, "命令连接承担PING、INFO和故障转移配置；每条命令结果与最后可用时间共同更新状态"],
  [/接收来自主服务器和从服务器的频道信息/, "Sentinel通过__sentinel__:hello交换自身纪元、监控主节点和候选领头信息，以发现其他Sentinel"],
  [/检测主观下线/, "单个Sentinel在down-after时间内收不到有效回复就标记S_DOWN，这只是本地判断"],
  [/检查客观下线/, "对主节点还要询问其他Sentinel；达到quorum才标记O_DOWN并进入故障转移候选流程"],
  [/选举领头Sentinel/, "每个纪元一个Sentinel只投一票，候选者既要满足多数票也要达到配置法定人数"],
  [/故障转移/, "领头者选择合格副本晋升，重配其余副本并最终让旧主恢复后成为新主副本"],
  [/^节点$/, "clusterNode记录名字、纪元、地址、标志、槽位与连接；握手消息把新节点加入已知拓扑"],
  [/槽指派/, "集群固定16384槽，节点位图与全局slots映射必须一致；槽归属通过配置纪元解决新旧声明"],
  [/在集群中执行命令/, "节点先计算所有键的槽并检查归属；稳定槽返回MOVED，迁移中的局部键可能引导ASK"],
  [/重新分片/, "迁槽依次设置importing/migrating状态并搬迁键，完成后广播新所有者，过程不能丢失路由边界"],
  [/ASK错误/, "ASK只授权客户端对下一条命令先发ASKING访问目标节点，不应像MOVED那样永久更新槽缓存"],
  [/复制与故障转移/, "主节点下线后从节点按数据新鲜度和投票晋升，新的配置纪元让槽所有权声明覆盖旧拓扑"],
  [/^消息$/, "cluster bus的PING、PONG、MEET与FAIL等消息传播节点状态、槽位和故障意见，Gossip是最终收敛信号而非瞬时真相"],
  [/频道的订阅与退订/, "服务器频道字典把频道映射到客户端链表，客户端也保存订阅集合；订阅与退订要更新双向关系"],
  [/模式的订阅与退订/, "模式订阅保存在独立链表，发布时按glob规则匹配；同一客户端可能因频道和模式各收到一次"],
  [/发送消息/, "PUBLISH遍历精确频道订阅者并扫描匹配模式，返回收到消息的客户端数量，但不保存消息"],
  [/查看订阅信息/, "PUBSUB子命令读取当前频道、模式和订阅者统计，它是瞬时状态而非历史投递记录"],
  [/事务的实现/, "MULTI后普通命令按顺序进入队列，EXEC才依次执行；事务期间连接状态阻止命令被其他客户端插入"],
  [/WATCH命令/, "WATCH把客户端登记到键的监视集合；键被修改时客户端标记dirty CAS，EXEC返回空结果并放弃队列"],
  [/事务的ACID性质/, "Redis事务保证命令顺序和执行期间不被穿插，但执行期错误不会自动撤销此前命令；持久性取决于持久化配置"],
  [/创建并修改Lua环境/, "服务器创建单一Lua环境，载入Redis库、沙箱限制与辅助函数，并登记脚本缓存"],
  [/Lua环境协作组件/, "伪客户端把redis.call转为普通命令执行，超时钩子、排序辅助与类型转换共同约束脚本行为"],
  [/EVAL命令/, "EVAL编译并执行脚本，KEYS与ARGV分离输入；脚本执行期间保持原子性但长运行会阻塞事件循环"],
  [/EVALSHA命令/, "EVALSHA用脚本SHA1从缓存取已编译函数，未命中返回NOSCRIPT而不是自动获取正文"],
  [/脚本管理命令/, "SCRIPT LOAD、EXISTS、FLUSH与KILL管理缓存和运行状态；KILL受脚本是否已写数据限制"],
  [/脚本复制/, "主节点必须让副本获得与实际执行等价的脚本或命令传播，摘要身份不能指向不同脚本文本"],
  [/SORT <key>|SORT &lt;key&gt;/, "SORT先把输入元素包装为待排序对象，再计算比较键；后续分页、GET投影和STORE基于排序结果"],
  [/ALPHA选项/, "ALPHA把比较从数值转换为字符串字典序，不能与默认数值解析结果混用"],
  [/ASC选项和DESC/, "ASC或DESC只反转比较方向，不改变BY键解析、LIMIT窗口或GET投影规则"],
  [/^BY选项/, "BY按模式为每个元素查外部比较键；BY nosort可跳过排序但仍执行后续LIMIT和GET"],
  [/带有ALPHA选项的BY/, "外部BY值在ALPHA模式按字符串比较，缺失键使用定义的空值语义而不是随机顺序"],
  [/LIMIT选项/, "LIMIT在完成排序后按offset与count截取窗口，负数和越界必须按命令语义处理"],
  [/GET选项/, "GET为窗口内每个元素按模式投影一个或多个值，#表示元素本身"],
  [/STORE选项/, "STORE把最终投影保存为列表并返回元素数；写入目标键属于命令副作用和传播范围"],
  [/多个选项的执行顺序/, "语义顺序是构造元素、计算比较键、排序、LIMIT、GET投影、STORE，而不是按命令文本中选项出现顺序"],
  [/位数组的表示/, "Redis把字符串SDS作为字节数组，位偏移先定位字节再按高位优先映射位，越界读取返回0"],
  [/GETBIT命令/, "GETBIT计算byte=offset/8与bit=7-offset%8，字符串之外的偏移读取为0且不扩展值"],
  [/SETBIT命令/, "SETBIT必要时扩展字符串并补零，按掩码修改目标位并返回旧位值"],
  [/BITCOUNT命令/, "BITCOUNT对短输入可查表，对长输入可用SWAR并处理头尾未对齐字节，结果应与逐位计数一致"],
  [/BITOP命令/, "BITOP按字节执行AND、OR、XOR或NOT；不同长度输入的缺失尾部按零处理并写入目标键"],
  [/慢查询记录的保存/, "slowlogEntry保存唯一ID、执行时间、时间戳与截断后的参数；记录发生在命令执行完成后"],
  [/慢查询日志的阅览和删除/, "SLOWLOG GET按新到旧返回有界日志，LEN读长度，RESET清空并释放记录"],
  [/添加新日志/, "只有命令执行微秒数达到slowlog-log-slower-than才入队，超过slowlog-max-len时删除最旧项"],
  [/成为监视器/, "MONITOR设置客户端监视标志并加入monitors集合，此后它接收服务器传播的命令信息"],
  [/向监视器发送命令信息/, "命令传播包含时间、数据库和客户端身份及参数；向多个监视器格式化和排队会增加CPU与输出缓冲压力"],
];

function listPages() {
  return fs.readdirSync(CONTENT_ROOT)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((sectionSlug) => {
      const dir = path.join(CONTENT_ROOT, sectionSlug);
      const file = fs.readdirSync(dir).find((name) => name.endsWith(".mdx"));
      if (!file) throw new Error(`缺少MDX：${sectionSlug}`);
      return { sectionSlug, chapterSlug: file.replace(/\.mdx$/, ""), filePath: path.join(dir, file) };
    });
}

function pascal(value) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

function readLegacyConfig(chapterSlug, existingProfiles) {
  const saved = existingProfiles?.find((profile) => profile.chapterSlug === chapterSlug);
  if (saved) return { focus: saved.focus, invariant: saved.invariant, artifact: saved.artifact };
  const source = fs.readFileSync(path.join(COMPONENT_ROOT, `${chapterSlug}.tsx`), "utf8");
  const pick = (name) => source.match(new RegExp(`${name}:\\s*(?:\\n\\s*)?"([^"]+)"`))?.[1];
  const config = { focus: pick("focus"), invariant: pick("invariant"), artifact: pick("artifact") };
  if (!config.focus || !config.invariant || !config.artifact) throw new Error(`无法读取章专属配置：${chapterSlug}`);
  return config;
}

function explanation(concept, profile, index) {
  if (/重点回顾/.test(concept)) return `${profile.title}的回顾要重新证明“${profile.invariant}”，并用同一输入比较结构前态、变更轨迹、故障首错与恢复后态`;
  if (/参考资料/.test(concept)) return `本章目录范围由作者页面确认，字段和控制流回到Redis 3.0的${profile.sourceFile}与黄健宏注释源码核验；新版资料只承担差异说明`;
  const rule = FACT_RULES.find(([pattern]) => pattern.test(concept));
  const fact = rule?.[1] ?? `${concept}必须在Redis 3.0的${profile.sourceFile}中定位结构或函数入口，并说明它怎样参与“${profile.focus}”`;
  return `${fact}。本节点用“${profile.focuses[index % profile.focuses.length]}”作观察点，执行\`${profile.model.command}\`或等价源码探针，保存版本、输入、前后状态和能推翻解释的反例。`;
}

function profilesFor(pages, manifest, existingProfiles) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const formalTitles = manifest.units.map((unit) => unit.title);
  const reviewConcepts = ["客户端与事件入口", "对象与底层结构", "数据库与过期", "RDB与AOF恢复", "复制、Sentinel与集群", "事务、脚本与可观测性"];
  return pages.map((page, order) => {
    const parsed = matter(fs.readFileSync(page.filePath, "utf8"));
    const unit = units.get(page.chapterSlug);
    const concepts = unit ? unit.concepts.map((alternatives) => alternatives[0]) : page.chapterSlug.includes("learning-map") ? formalTitles : reviewConcepts;
    const legacyRaw = readLegacyConfig(page.chapterSlug, existingProfiles);
    const legacy = Object.fromEntries(
      Object.entries(legacyRaw).map(([key, value]) => [
        key,
        value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      ]),
    );
    const core = MODELS[page.chapterSlug];
    if (!core) throw new Error(`缺少章专属模型：${page.chapterSlug}`);
    const stages = ["冻结3.0基线", "定位结构入口", "执行单变量变更", "注入边界故障", "恢复并对账"];
    const focuses = concepts
      .filter((concept) => !/重点回顾|参考资料/.test(concept))
      .slice(0, 6)
      .map((concept) => concept.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
    while (focuses.length < 6) focuses.push(["结构字段", "控制流", "运行反例", "恢复不变量"][focuses.length % 4]);
    const sourceFile = FILES[page.chapterSlug] ?? "server.c";
    const modelValue = {
      ...core,
      outcomes: { signal: `${core.studio}一致率`, risk: `${core.axisB.label}分叉风险`, evidence: "四级证据闭环度" },
      invariant: legacy.invariant,
      task: `交付${legacy.artifact}，并让未参与者用同一输入独立复现。`,
      riskEffects: [1, -1],
    };
    const profile = {
      ...page,
      order,
      title: String(parsed.data.title),
      type: String(parsed.data.type ?? "C"),
      concepts,
      componentBase: pascal(page.chapterSlug),
      sourceBasis: "outline-only",
      sourceFile,
      stages,
      focuses,
      model: modelValue,
      ...legacy,
    };
    return { ...profile, notes: Object.fromEntries(concepts.map((concept, index) => [concept, explanation(concept, profile, index)])) };
  });
}

function wrapper(profile) {
  const props = {
    unitId: profile.chapterSlug,
    unitTitle: profile.title,
    concepts: profile.concepts,
    stages: profile.stages,
    focuses: profile.focuses,
    model: profile.model,
  };
  return `import { OfficialRedisDesignLab } from "./official-redis-design-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}StructureLab() {\n  return <OfficialRedisDesignLab {...props} mode="structure" />;\n}\n\nexport function ${profile.componentBase}TraceLab() {\n  return <OfficialRedisDesignLab {...props} mode="trace" />;\n}\n\nexport function ${profile.componentBase}EvidenceLab() {\n  return <OfficialRedisDesignLab {...props} mode="evidence" />;\n}\n`;
}

const safeText = (value) => value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function render(profile) {
  const terms = profile.focuses.slice(0, 6).map((term, index) => ({
    term,
    definition: `${term}是${profile.title}中连接${profile.stages[index % profile.stages.length]}与“${profile.invariant}”的源码坐标；必须以Redis 3.0字段、函数或运行输出定义。`,
  }));
  const deep = profile.concepts.map((concept, index) => `### ${safeText(concept)}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${profile.notes[concept]}\n\n验证${safeText(concept)}时，先预测${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”会改变哪个字段、偏移、文件或消息；再固定${profile.model.axisB.label}做一次对照。若故障注入没有破坏“${profile.invariant}”，就撤回当前解释而不是补写故事。`).join("\n\n");
  const practices = profile.concepts.map((concept, index) => `${index + 1}. ${safeText(concept)}：在${profile.sourceFile}定位${profile.focuses[index % profile.focuses.length]}，保存出现、解释、实验和结果断言四项证据。`).join("\n");
  const glossary = terms.map(({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`).join("\n");
  const sourceCodeUrl = `https://github.com/redis/redis/blob/3.0/src/${profile.sourceFile}`;
  return `import {\n  ${profile.componentBase}StructureLab,\n  ${profile.componentBase}TraceLab,\n  ${profile.componentBase}EvidenceLab,\n} from "@/components/mdx/redis-design-implementation/diagrams/${profile.chapterSlug}";\nimport { Objectives, Callout, Glossary, GlossaryItem, Term, Exercises, Answer, Stepper, Step, Attribution } from "@/components/mdx/mdx-components";\n\n<Objectives>\n\n- 能在Redis 3.0源码中解释${profile.focus}\n- 能沿${profile.stages.join("、")}重建${profile.title}的字段与控制流\n- 能操作${profile.model.studio}，一次只改变${profile.model.axisA.label}或${profile.model.axisB.label}\n- 能注入“${profile.model.fault}”，用“${profile.invariant}”判断恢复是否通过\n\n</Objectives>\n\n{/* RDI_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}的核心任务是${profile.focus}。命令返回值只暴露外层合同；实现解释还必须连接内存结构、写入与读取路径、事件顺序以及失败后的旧状态回收。${profile.model.studio}把这些关系放进同一条可复位轨迹。\n\n先写预测：当${profile.model.axisA.label}由“${profile.model.axisA.levels[1]}”进入“${profile.model.axisA.levels[2]}”时，哪个可观察状态最先变化？再规定什么结果会推翻当前解释。交互中的分数只表达透明因果方向，不冒充真实Redis测量。\n\n## 来源、版次与独立重写边界\n\n黄健宏[作者读者服务页](${SOURCES.book})确认正式出版新版以Redis 3.0为源码基线，列出4部分、24章及完整小节，并链接[Redis 3.0中文注释源码](${SOURCES.annotated})。本课程据此映射24个正式单元、145个目录节点，另设学习地图和总复习；未取得出版正文授权，目录只界定范围，不宣称复现原书正文。\n\n本章字段与控制流由[Redis官方3.0源码：${profile.sourceFile}](${sourceCodeUrl})和作者注释源码交叉核对；[Redis当前持久化文档](${SOURCES.persistence})只用于辨认版本差异。中文解释、图示、交互、实验与答案均为独立教学重写，不把目录页或代码仓库许可证误报为原书许可证。\n\n## 本章术语与源码合同\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${safeText(term)}</Term>`).join("、")}。\n\n${profile.title}必须守住“${profile.invariant}”。观察同时记录${profile.model.outcomes.signal}与${profile.model.outcomes.risk}；只有结构快照、函数入口、运行结果和故障反例互相一致，才接受实现结论。\n\n## 先预测，再操作三层章专属实验\n\n<Stepper>\n  <Step title="1. 目录节点与结构地图">\n    选择正式节点，指出它在${profile.sourceFile}中的结构或函数入口、上游输入和下游状态。\n\n    <${profile.componentBase}StructureLab />\n  </Step>\n  <Step title="2. 单变量状态轨迹">\n    固定Redis 3.0版本与输入，只切换${profile.model.axisA.label}或${profile.model.axisB.label}，比较变更前后状态。\n\n    <${profile.componentBase}TraceLab />\n  </Step>\n  <Step title="3. 故障、恢复与复位">\n    注入“${profile.model.fault}”，保存首个不变量破坏点；修复后用同一输入重放并点击重置。\n\n    <${profile.componentBase}EvidenceLab />\n  </Step>\n</Stepper>\n\n## 作者目录逐项深读\n\n${deep}\n\n## 最小源码与运行切片\n\n\u0060\u0060\u0060bash\n+git clone --branch 3.0 --depth 1 https://github.com/redis/redis.git redis-3.0\n+cd redis-3.0\n+${profile.model.command}\n\u0060\u0060\u0060\n\n该切片固定Redis 3.0分支、编译器、配置、数据集和命令序列；先保存结构或函数位置，再运行隔离实例。任何持久化损坏、断线、故障转移、大键或高流量实验都必须使用临时数据并规定CPU、内存、磁盘、延迟和停止上限。\n\n\u0060\u0060\u0060yaml\nunit: ${profile.chapterSlug}\nsource_file: ${profile.sourceFile}\naxis_a: ${JSON.stringify(profile.model.axisA.label)}\naxis_b: ${JSON.stringify(profile.model.axisB.label)}\nfault: ${JSON.stringify(profile.model.fault)}\ninvariant: ${JSON.stringify(profile.invariant)}\nreplay: same_version_same_input\n\u0060\u0060\u0060\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="命令表象不等于实现">\n  ${profile.title}不能从一次redis-cli结果反推全部控制流；必须在${profile.sourceFile}定位结构、写入路径和读取路径，并保存能推翻解释的边界输入。\n</Callout>\n\n<Callout type="trap" title="版本倒灌">\n  Redis 4.0以后新增或替换的结构与功能不能倒灌到3.0。新版资料只作差异说明，正式验收仍以本章源码文件与作者目录为准。\n</Callout>\n\n<Callout type="trap" title="恢复不等于进程在线">\n  注入${profile.model.fault}后，要用同一命令序列核对结构、回复、文件或偏移以及最终键值；只有“${profile.invariant}”恢复才算通过。\n</Callout>\n\n## 练习、答案与节点验证\n\n<Exercises>\n\n**问题 1：单变量因果。** 怎样验证${profile.model.axisA.label}而不让${profile.model.axisB.label}混入结论？\n\n<Answer>固定Redis 3.0提交、配置、数据与${profile.model.axisB.label}，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；比较前后字段、函数轨迹、命令结果与${profile.model.outcomes.risk}。</Answer>\n\n**问题 2：逐节点四级证据。** 怎样证明${profile.concepts.length}个正式节点不是只在目录中出现？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题 3：故障恢复。** 如何证明“${profile.model.fault}”已经被修复？\n\n<Answer>沿${profile.stages.join("、")}找到第一个破坏点，只改变最小因果前提；随后以同版本同输入重放稳定、故障、恢复和复位四条轨迹，并让未参与者依据${profile.artifact}独立确认“${profile.invariant}”。</Answer>\n\n</Exercises>\n\n## 术语复核与本章回顾\n\n<Glossary>\n${glossary}\n</Glossary>\n\n完成${profile.title}意味着能从${profile.sourceFile}解释${profile.focus}，能运行章专属状态实验，能制造反例并在复位后证明旧状态没有残留。\n\n<Attribution\n  mode="independent-rewrite"\n  sourceBasis="outline-only"\n  workTitle="黄健宏《Redis设计与实现》（正式出版新版，Redis 3.0源码基线）"\n  adaptedUrl="${SOURCES.book}"\n/>\n`;
}

function updateManifest(manifest, profiles) {
  manifest.sourceKind = "author-official-complete-outline-plus-author-annotated-and-upstream-redis-3.0-source";
  manifest.status = "verified-outline-independent-rewrite";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "outline-only";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 24, outlineNodes: 145, pages: 26 };
  manifest.disclosureNote = "作者官网核定正式出版新版、Redis 3.0源码基线、4部分、24章和145个章/节节点；课程未取得出版正文授权，目录仅限定范围。所有解释、图示、交互、练习与答案独立重写，技术事实由作者Redis 3.0中文注释源码与Redis上游3.0源码交叉核对，后续版本只作差异说明。";
  manifest.factSourcePolicy = "每个目录节点必须具有出现、Redis 3.0独立解释、章专属结构/状态实验和练习断言四级证据；命令成功不能代替字段、文件、偏移、拓扑或最终键值对账。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    authorOutline: { kind: "author-official-complete-outline", label: "黄健宏Redis设计与实现读者服务页", url: SOURCES.book },
    authorAnnotatedSource: { kind: "author-official-annotated-source", label: "Redis 3.0中文注释源码", url: SOURCES.annotated },
    upstreamRedis30: { kind: "upstream-versioned-source", label: "Redis上游3.0源码", url: SOURCES.redis30 },
    currentPersistenceContrast: { kind: "vendor-current-docs-version-contrast-only", label: "Redis当前持久化文档（仅版本差异）", url: SOURCES.persistence },
  };
  const bySlug = new Map(profiles.map((profile) => [profile.chapterSlug, profile]));
  for (const unit of manifest.units) {
    const profile = bySlug.get(unit.id);
    if (!profile) throw new Error(`manifest单元缺少页面：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = "outline-only";
    unit.factSourceIds = ["authorOutline", "authorAnnotatedSource", "upstreamRedis30"];
    unit.sourceFile = profile.sourceFile;
  }
}

const root = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = root.books[BOOK];
if (!manifest) throw new Error(`缺少fidelity manifest：${BOOK}`);
const existingProfiles = fs.existsSync(PROFILE_PATH) ? JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8")).profiles : null;
const profiles = profilesFor(listPages(), manifest, existingProfiles);
if (profiles.length !== 26) throw new Error(`应有26页，实际${profiles.length}`);

fs.writeFileSync(PROFILE_PATH, `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: profiles.map((profile) => ({ ...profile, filePath: path.relative(ROOT, profile.filePath) })) }, null, 2)}\n`);
for (const profile of profiles) {
  const parsed = matter(fs.readFileSync(profile.filePath, "utf8"));
  const data = {
    ...parsed.data,
    description: `${profile.focus} 覆盖${profile.concepts.length}个正式节点，并以Redis 3.0源码、故障和恢复对账验收。`,
    qualityVersion: 2,
    practiceMode: profile.model.practiceMode,
    sourceMode: "independent-rewrite",
    sourceUrl: SOURCES.book,
  };
  fs.writeFileSync(profile.filePath, matter.stringify(render(profile), data));
  fs.writeFileSync(path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`), wrapper(profile));
}
updateManifest(manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(root, null, 2)}\n`);
console.log(`已重构${profiles.length}页、${manifest.units.length}个正式单元、145个目录节点。`);
