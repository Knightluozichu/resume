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

type ChapterSpec = { title: string; subtitle: string; nodes: NodeSpec[] };

const CHAPTERS: Record<string, ChapterSpec> = {
  map: {
    title: "数据库系统概念学习路径",
    subtitle: "语义层 → 物理层 → 事务层 → 分布式的因果链",
    nodes: [
      { id: "s1", label: "语义层", title: "语义层 · 模型与 SQL", content: "关系模型、SQL、ER 设计与规范化：数据如何被准确表达。这一层的错误会被所有上层继承。" },
      { id: "s2", label: "物理层", title: "物理层 · 存储与查询", content: "存储结构、索引、查询处理与优化：数据如何被高效读写。成本模型是这一层的通用语言。" },
      { id: "s3", label: "事务层", title: "事务层 · 并发与恢复", content: "事务、并发控制与恢复：并发访问与故障下保持正确。ACID 在这里从口号变为机制。", failure: { title: "异常未防", desc: "默认隔离级别下出现脏写或幻读。修法：识别业务所需隔离级别并显式设定。" } },
      { id: "s4", label: "分布式", title: "分布式层 · 扩展与协调", content: "并行查询、分布式存储与两阶段提交：规模扩大后的一致性协调。" },
    ],
  },
  ch01: {
    title: "数据库系统概述",
    subtitle: "查询处理器、存储管理器与数据的责任链",
    nodes: [
      { id: "q", label: "查询处理器", title: "查询处理器", content: "解析、优化、执行：把声明式 SQL 翻译成物理操作序列，是用户目标与存储之间的翻译官。" },
      { id: "s", label: "存储管理器", title: "存储管理器", content: "缓冲、文件、索引与事务管理：在保证 ACID 的前提下高效读写数据页。" },
      { id: "d", label: "数据与模式", title: "数据、模式与独立性", content: "三级模式把逻辑结构与物理存储解耦，物理独立性让底层演进不破坏应用。", failure: { title: "直连物理", desc: "应用直接依赖物理布局，重构即崩。修法：经逻辑视图访问，保持物理独立性。" } },
    ],
  },
  ch02: {
    title: "关系模型",
    subtitle: "关系、码与代数运算的逻辑基础",
    nodes: [
      { id: "r", label: "关系", title: "关系即表", content: "关系是元组的集合：行无序、列有类型，数学化的表定义让查询语言有了严格语义。" },
      { id: "k", label: "码", title: "码与外键", content: "码唯一标识元组，外键建立关系间的引用约束，完整性由数据库自动守护。" },
      { id: "a", label: "代数", title: "关系代数", content: "选择、投影、连接、并差交：查询的数学基础，优化器的等价变换都建立其上。" },
    ],
  },
  ch03: {
    title: "SQL 入门",
    subtitle: "DDL、查询、聚集与修改的最小集合",
    nodes: [
      { id: "d", label: "DDL", title: "DDL 定义结构", content: "CREATE/ALTER/DROP 定义模式，类型与约束在创建时就固化进数据库。" },
      { id: "q", label: "查询", title: "SELECT 查询", content: "SELECT-FROM-WHERE 是查询骨架，连接组合多表，子查询嵌套表达条件。" },
      { id: "g", label: "聚集", title: "聚集与分组", content: "COUNT/SUM/AVG 配合 GROUP BY 回答统计问题，HAVING 过滤分组而非行。", failure: { title: "WHERE 误用", desc: "用 WHERE 过滤聚集结果报错。修法：分组后条件写进 HAVING。" } },
    ],
  },
  ch04: {
    title: "中级 SQL",
    subtitle: "连接、视图、事务、约束与授权",
    nodes: [
      { id: "j", label: "连接", title: "连接的各种形态", content: "内连接取交集，外连接保留一侧，自然连接自动匹配同名列——行数变化要心里有数。" },
      { id: "v", label: "视图", title: "视图封装接口", content: "视图是保存的查询：简化复杂逻辑、隔离底层变化、配合授权做行级安全。" },
      { id: "t", label: "事务", title: "事务与约束", content: "COMMIT/ROLLBACK 保护多语句原子性，约束让数据库拒绝非法数据。", failure: { title: "裸奔多写", desc: "多条写语句无事务包裹，中途失败留下半状态。修法：相关写入包进事务。" } },
    ],
  },
  ch05: {
    title: "高级 SQL",
    subtitle: "宿主边界、服务端程序、递归与多维聚集",
    nodes: [
      { id: "h", label: "宿主语言", title: "宿主语言边界", content: "嵌入式 SQL 与 API 各有代价：参数化防注入，ORM 要看生成的 SQL。" },
      { id: "p", label: "服务端程序", title: "服务端程序", content: "存储过程与函数把逻辑推到数据侧，减少网络往返但增加移植成本。" },
      { id: "r", label: "递归与聚集", title: "递归与多维聚集", content: "WITH RECURSIVE 处理层级关系，CUBE/ROLLUP 一次生成多维汇总。" },
    ],
  },
  ch06: {
    title: "ER 设计",
    subtitle: "从业务语义到关系模式的无损映射",
    nodes: [
      { id: "e", label: "实体联系", title: "实体与联系", content: "实体是独立存在的对象，联系刻画它们的关系，ER 图是设计与沟通的共同语言。" },
      { id: "c", label: "约束", title: "基数与参与约束", content: "一对一、一对多、多对多决定表结构形态，全参与与部分参与影响空值策略。" },
      { id: "m", label: "映射", title: "映射为关系模式", content: "强实体直接建表，弱实体带上属主码，多值属性单独成表。", failure: { title: "联系建错", desc: "多对多直接塞外键造成重复与异常。修法：多对多必须建关联表。" } },
    ],
  },
  ch07: {
    title: "关系设计",
    subtitle: "函数依赖驱动的规范化决策",
    nodes: [
      { id: "f", label: "函数依赖", title: "函数依赖", content: "X→Y 表示 X 决定 Y：依赖揭示冗余根源，是规范化的推理起点。" },
      { id: "n", label: "范式", title: "范式阶梯", content: "1NF 原子、2NF 消部分依赖、3NF 消传递依赖、BCNF 更强约束，逐级消除更新异常。" },
      { id: "d", label: "分解", title: "无损与依赖保持", content: "好分解要无损连接且保持依赖，必要时在 BCNF 与依赖保持间取舍。", failure: { title: "过度分解", desc: "为范式而范式，查询全变多表连接。修法：规范到 3NF 后评估反范式收益。" } },
    ],
  },
  ch08: {
    title: "复杂数据类型",
    subtitle: "JSON、RDF、对象、文本与空间数据",
    nodes: [
      { id: "j", label: "JSON", title: "半结构化 JSON", content: "JSON 承载模式灵活的数据，数据库内建类型与函数让关系与文档共存。" },
      { id: "t", label: "文本空间", title: "文本与空间", content: "全文检索用倒排索引，空间数据用 R 树类索引，LIKE 扛不住这两类负载。" },
      { id: "r", label: "RDF", title: "RDF 与知识图谱", content: "三元组表达实体关系，SPARQL 查询图结构，适合开放世界的知识表达。" },
    ],
  },
  ch09: {
    title: "应用开发",
    subtitle: "分层架构中的数据库访问",
    nodes: [
      { id: "l", label: "分层", title: "分层架构", content: "表现、业务、数据三层职责分明，数据库访问收口在数据层便于治理。" },
      { id: "o", label: "ORM", title: "ORM 与 SQL", content: "ORM 提升开发效率但会生成低效 SQL，关键路径要审查与手写。" },
      { id: "s", label: "安全", title: "注入与事务", content: "参数化查询防注入，事务边界跨请求要谨慎，连接泄漏是常见故障源。", failure: { title: "连接泄漏", desc: "未关闭连接耗尽连接池。修法：try-with-resources 统一管理，监控池水位。" } },
    ],
  },
  ch10: {
    title: "大数据",
    subtitle: "规模、速度与结构驱动的选型",
    nodes: [
      { id: "v", label: "三个 V", title: "Volume/Velocity/Variety", content: "数据规模、产生速度与结构多样性决定技术栈，关系库并非唯一答案。" },
      { id: "s", label: "存储", title: "分布式与键值存储", content: "HDFS 存大文件，键值与文档库服务高并发读写，按访问模式选型。" },
      { id: "p", label: "处理", title: "批处理与流处理", content: "MapReduce 批量算，流系统实时算，Lambda 与 Kappa 架构各有取舍。" },
    ],
  },
  ch11: {
    title: "数据分析",
    subtitle: "仓库、OLAP 与挖掘的可追溯链路",
    nodes: [
      { id: "w", label: "仓库", title: "数据仓库", content: "面向分析的历史数据集合，星型模式组织事实与维度，ETL 保证血缘清晰。" },
      { id: "o", label: "OLAP", title: "OLAP 立方体", content: "上卷下钻切片切块，多维视角看汇总数据，预计算换查询速度。" },
      { id: "m", label: "挖掘", title: "数据挖掘", content: "分类、聚类、关联规则从数据找模式，结果必须用留出数据评估。", failure: { title: "过拟合", desc: "模型在训练集完美上线失效。修法：交叉验证与留出测试评估泛化。" } },
    ],
  },
  ch12: {
    title: "物理存储",
    subtitle: "延迟、带宽与故障模式",
    nodes: [
      { id: "l", label: "延迟层级", title: "存储延迟层级", content: "缓存、内存、SSD、磁盘、网络逐级变慢，数据库设计的核心是把热数据留在快层。" },
      { id: "p", label: "页", title: "页与 I/O 单位", content: "页是磁盘与内存交换的最小单位，顺序 I/O 远快于随机 I/O。" },
      { id: "r", label: "RAID", title: "RAID 冗余", content: "镜像与条带组合出不同 RAID 级别，冗余度、容量与写性能三方权衡。", failure: { title: "写放大", desc: "RAID5 小写触发读改写放大。修法：写密集负载选 RAID10。" } },
    ],
  },
  ch13: {
    title: "存储结构",
    subtitle: "记录布局、文件组织与缓冲",
    nodes: [
      { id: "r", label: "记录布局", title: "记录与页布局", content: "定长与变长记录的存放方式影响空间利用与访问成本，页内槽目录管理记录位置。" },
      { id: "f", label: "文件组织", title: "堆、顺序与散列", content: "堆文件插入快查找慢，顺序文件范围友好，散列文件点查最优。" },
      { id: "b", label: "缓冲", title: "缓冲管理", content: "缓冲池缓存数据页，LRU 等替换策略决定命中率，是内存换速度的主战场。" },
    ],
  },
  ch14: {
    title: "索引",
    subtitle: "B+ 树、哈希、LSM 与位图",
    nodes: [
      { id: "b", label: "B+ 树", title: "B+ 树索引", content: "平衡多路搜索树：点查范围都高效，顺序访问叶子链表，是关系库的主力索引。" },
      { id: "h", label: "哈希与 LSM", title: "哈希与 LSM", content: "哈希索引只服务点查；LSM 把随机写变顺序写，写密集场景的新选择。" },
      { id: "m", label: "位图索引", title: "位图索引", content: "低基数列的位图压缩索引，AND/OR 位运算快速组合条件，分析型负载友好。", failure: { title: "索引滥用", desc: "每列都建索引，写入全面变慢。修法：按查询谓词建索引，定期清理无用索引。" } },
    ],
  },
  ch15: {
    title: "查询处理",
    subtitle: "算子、算法与成本核算",
    nodes: [
      { id: "s", label: "扫描与排序", title: "扫描与排序", content: "全表扫描与索引扫描各有成本，外部排序归并处理超内存数据。" },
      { id: "j", label: "连接算法", title: "连接三大算法", content: "嵌套循环、排序归并、哈希连接按输入规模与索引可用性选择。" },
      { id: "p", label: "流水线", title: "流水线执行", content: "算子边算边传避免中间落盘，物化与流水线是执行效率的分水岭。", failure: { title: "中间落盘", desc: "大中间结果写盘拖慢查询。修法：调整算子顺序，用小结果先过滤。" } },
    ],
  },
  ch16: {
    title: "查询优化",
    subtitle: "等价变换、基数估计与搜索",
    nodes: [
      { id: "e", label: "等价变换", title: "等价变换规则", content: "选择下推、连接交换等规则生成候选计划空间，优化器在其中搜索。" },
      { id: "c", label: "基数估计", title: "基数估计", content: "估算每步结果行数：统计信息质量决定计划优劣，过期统计是劣化首因。" },
      { id: "s", label: "搜索策略", title: "计划搜索", content: "动态规划枚举或启发式剪枝，在计划质量与优化耗时之间折中。", failure: { title: "统计过期", desc: "数据大变后统计未更新，优化器选错计划。修法：定期 ANALYZE，大变更后立即更新。" } },
    ],
  },
  ch17: {
    title: "事务",
    subtitle: "ACID 的实现与验证",
    nodes: [
      { id: "a", label: "ACID", title: "ACID 四性", content: "原子、一致、隔离、持久：四性由日志、锁与恢复机制协作保证，不是免费获得。" },
      { id: "s", label: "调度", title: "调度与可串行化", content: "并发事务的交错执行要等价于某个串行顺序，冲突可串行化是判定工具。" },
      { id: "i", label: "隔离级别", title: "隔离级别与异常", content: "读未提交到可串行化逐级严格，脏读、不可重复读、幻读逐级消除。", failure: { title: "级别误配", desc: "业务需要可重复读却用默认级别，出现幻读。修法：明确业务异常容忍度并显式设级。" } },
    ],
  },
  ch18: {
    title: "并发控制",
    subtitle: "锁、时间戳、验证与多版本",
    nodes: [
      { id: "l", label: "两阶段锁", title: "两阶段锁", content: "增长期加锁、收缩期只放不加，保证冲突可串行化；死锁用等待图检测。" },
      { id: "t", label: "时间戳与验证", title: "时间戳与 OCC", content: "时间戳排序免锁免死锁，乐观并发控制在提交时验证，适合冲突少的场景。" },
      { id: "m", label: "MVCC", title: "多版本并发控制", content: "写不阻塞读：每事务看到一致性快照，是现代数据库的主流方案。", failure: { title: "版本膨胀", desc: "长事务阻止旧版本回收，存储膨胀。修法：监控长事务，限制事务时长。" } },
    ],
  },
  ch19: {
    title: "恢复",
    subtitle: "日志先行、检查点与 ARIES",
    nodes: [
      { id: "w", label: "WAL", title: "日志先行 WAL", content: "先写日志再写数据：崩溃后按日志重做已提交、撤销未提交，持久性由此保证。" },
      { id: "c", label: "检查点", title: "检查点", content: "定期把脏页刷盘并记录日志位置，恢复时只需从最近检查点回放。" },
      { id: "a", label: "ARIES", title: "ARIES 恢复算法", content: "分析、重做、撤销三阶段：工业级恢复的标准流程，崩溃后回到一致状态。", failure: { title: "直接写盘", desc: "绕过 WAL 直接改页，崩溃后无法恢复。修法：一切修改走日志路径。" } },
    ],
  },
  ch20: {
    title: "数据库体系结构",
    subtitle: "集中式、共享与无共享的边界",
    nodes: [
      { id: "c", label: "集中式", title: "集中式与客户端", content: "单机数据库与客户端-服务器结构，简单可靠但扩展受限。" },
      { id: "s", label: "共享架构", title: "共享内存与磁盘", content: "多机共享内存或磁盘：扩展算力但协调成本高，适合特定高端场景。" },
      { id: "n", label: "无共享", title: "无共享架构", content: "各节点自有内存磁盘，靠网络协作：水平扩展的主流路线。", failure: { title: "架构错配", desc: "无共享架构跑强一致全局事务，性能雪崩。修法：按一致性需求选架构。" } },
    ],
  },
  ch21: {
    title: "并行与分布式存储",
    subtitle: "分区、复制与并行索引",
    nodes: [
      { id: "p", label: "数据分区", title: "数据分区", content: "范围、哈希、循环分区把数据散布到节点，倾斜是并行效率的头号敌人。" },
      { id: "r", label: "数据复制", title: "数据复制", content: "复制同时服务可用与读扩展，一致性与可用性之间的经典权衡。" },
      { id: "i", label: "并行索引", title: "并行索引", content: "索引随数据分布：全局索引查询优维护贵，本地索引反之。", failure: { title: "倾斜失察", desc: "热点分区拖垮整体并行度。修法：监控分区负载，热点键加散列盐。" } },
    ],
  },
  ch22: {
    title: "并行与分布式查询",
    subtitle: "算子拆分、重分区与网络成本",
    nodes: [
      { id: "o", label: "算子并行", title: "算子级并行", content: "扫描、连接、聚集拆到多节点并行执行，理想加速比受倾斜限制。" },
      { id: "r", label: "重分区", title: "重分区洗牌", content: "连接按键重分区是网络成本大头，广播小表可避免大洗牌。" },
      { id: "n", label: "网络代价", title: "网络代价核算", content: "分布式计划要算网络账：数据量、倾斜与延迟决定并行是否值得。", failure: { title: "盲目并行", desc: "小表 join 也走分布式，网络开销超过计算。修法：小查询本地化执行。" } },
    ],
  },
  ch23: {
    title: "分布式事务",
    subtitle: "2PC、复制与共识",
    nodes: [
      { id: "t", label: "两阶段提交", title: "两阶段提交 2PC", content: "准备与提交两阶段协调跨节点原子性，协调者崩溃会造成阻塞。" },
      { id: "c", label: "共识协议", title: "共识与 Paxos", content: "多数派共识保证分区下决定唯一，Paxos 与 Raft 是工程实现基础。" },
      { id: "r", label: "复制状态机", title: "复制状态机", content: "日志复制加状态机执行，是构建高可用分布式系统的通用范式。", failure: { title: "2PC 阻塞", desc: "协调者崩溃参与者持锁等待。修法：超时与恢复协议，或选共识方案。" } },
    ],
  },
  ch24: {
    title: "高级索引",
    subtitle: "布隆过滤、LSM、压缩与空间索引",
    nodes: [
      { id: "b", label: "布隆过滤器", title: "布隆过滤器", content: "概率型存在性判断：可能有假阳性绝无假阴性，用极小内存挡掉无效查找。" },
      { id: "l", label: "LSM 树", title: "LSM 树层次", content: "内存表加多层磁盘表，合并压实保持有序，写优化的索引结构。" },
      { id: "s", label: "空间索引", title: "空间与压缩索引", content: "R 树服务空间邻近查询，压缩位图服务分析负载，各有专用场景。" },
    ],
  },
  ch25: {
    title: "高级应用开发",
    subtitle: "基准、剖析与标准接口",
    nodes: [
      { id: "b", label: "可重复基准", title: "可重复基准", content: "性能结论必须可复现：固定数据、负载与环境，报告分布而非单点。" },
      { id: "p", label: "端到端剖析", title: "端到端剖析", content: "从应用到数据库逐层测量，先找最大头再优化，避免凭感觉调参。" },
      { id: "s", label: "标准接口", title: "标准接口选择", content: "JDBC/ODBC/ORM 在便利与可控之间权衡，关键路径用原生接口。", failure: { title: "猜测式调优", desc: "不测量直接改参数，越调越差。修法：先剖析定位瓶颈再动手。" } },
    ],
  },
  ch26: {
    title: "区块链数据库",
    subtitle: "哈希链、签名与共识",
    nodes: [
      { id: "h", label: "哈希链", title: "哈希链", content: "每块含前块哈希，篡改历史即断链，不可抵赖的历史由此建立。" },
      { id: "s", label: "数字签名", title: "数字签名", content: "私钥签名公钥验证，确认交易发起者身份与内容完整性。" },
      { id: "c", label: "共识与合约", title: "共识与智能合约", content: "共识让诚实节点达成一致，智能合约把业务逻辑放到链上执行。", failure: { title: "万能链", desc: "一切数据都上链，成本与性能失控。修法：只把需要多方互信的数据上链。" } },
    ],
  },
  ch27: {
    title: "形式化查询语言",
    subtitle: "关系演算与 Datalog",
    nodes: [
      { id: "t", label: "元组演算", title: "元组关系演算", content: "声明式描述要什么而非怎么取，与关系代数表达能力等价。" },
      { id: "d", label: "域演算", title: "域关系演算", content: "以属性域为变量的演算形式，安全性限定结果必须有限。" },
      { id: "l", label: "Datalog", title: "Datalog 递归规则", content: "逻辑规则表达递归查询，是图与知识查询的理论基础。" },
    ],
  },
  ch28: {
    title: "高级关系设计",
    subtitle: "多值依赖与更高范式",
    nodes: [
      { id: "m", label: "多值依赖", title: "多值依赖", content: "独立多值事实混在一表产生冗余，4NF 将其拆解。" },
      { id: "j", label: "连接依赖", title: "连接依赖与 5NF", content: "连接依赖推广函数依赖，5NF 消除由连接产生的异常。" },
      { id: "d", label: "设计权衡", title: "范式与可用性", content: "范式越高表越多查询越复杂，工程上在规范与可用间取平衡。", failure: { title: "唯范式论", desc: "为追 5NF 拆到无法使用。修法：以异常是否真实发生为判据。" } },
    ],
  },
  ch29: {
    title: "对象数据库",
    subtitle: "结构化类型与对象关系",
    nodes: [
      { id: "s", label: "结构化类型", title: "结构化类型", content: "组合属性、数组与多集扩展关系模型，复杂结构不必强行拆平。" },
      { id: "r", label: "引用与继承", title: "引用与继承", content: "对象引用与类型继承建模现实关系，对象关系数据库融合两种世界观。" },
      { id: "m", label: "映射", title: "对象关系映射", content: "应用对象与关系表的映射是长期痛点，理解双方模型才能用好工具。" },
    ],
  },
  ch30: {
    title: "XML",
    subtitle: "树结构数据的全链路处理",
    nodes: [
      { id: "t", label: "树模型", title: "XML 树模型", content: "元素树表达层次数据，DTD/XSD 约束文档形态。" },
      { id: "x", label: "XPath/XQuery", title: "XPath 与 XQuery", content: "路径表达式导航文档树，XQuery 对 XML 做完整查询与变换。" },
      { id: "s", label: "存储映射", title: "XML 存储", content: "拆分入关系表或原生 XML 存储，按查询模式选择。", failure: { title: "全量解析", desc: "大文档整棵解析撑爆内存。修法：流式解析或按需拆分。" } },
    ],
  },
  ch31: {
    title: "信息检索",
    subtitle: "倒排索引与相关度",
    nodes: [
      { id: "i", label: "倒排索引", title: "倒排索引", content: "词项到文档的映射是检索核心， postings 压缩决定查询速度。" },
      { id: "t", label: "TF-IDF", title: "TF-IDF 相关度", content: "词频与逆文档频率权衡词项重要性，是排序的经典公式。" },
      { id: "p", label: "PageRank", title: "PageRank", content: "链接投票估计页面权威，随机游走模型防作弊。", failure: { title: "只看召回", desc: "返回海量结果用户找不到。修法：精确率与召回率一起评估。" } },
    ],
  },
  ch32: {
    title: "PostgreSQL 实例",
    subtitle: "把全书抽象映射到真实系统",
    nodes: [
      { id: "p", label: "进程与缓冲", title: "进程模型", content: "每连接一进程加共享缓冲，WAL 写进程与后台工作者协作。" },
      { id: "m", label: "MVCC", title: "元组级 MVCC", content: "每行多版本加可见性判断，VACUUM 回收死元组是必须维护。" },
      { id: "e", label: "扩展点", title: "优化器与扩展", content: "成本优化器成熟稳定，丰富扩展点让生态持续生长。", failure: { title: "不做 VACUUM", desc: "死元组堆积表膨胀查询变慢。修法：autovacuum 参数按写入量调优。" } },
    ],
  },
  appendix: {
    title: "附录A 大学数据库",
    subtitle: "全书统一实验基线",
    nodes: [
      { id: "s", label: "模式", title: "大学模式", content: "学生、课程、教师、选课组成的经典教学 schema，覆盖主外键与多对多。" },
      { id: "d", label: "数据", title: "示例数据", content: "配套示例数据规模适中，支撑全书 SQL 示例与练习复跑。" },
      { id: "e", label: "实验", title: "实验基线", content: "统一基线让跨章实验可比较：同一数据上验证从 SQL 到优化的全链路。", failure: { title: "数据漂移", desc: "各自改数据后结果不可比。修法：实验前重置基线数据。" } },
    ],
  },
  review: {
    title: "全书总复习",
    subtitle: "从需求到分布式提交的完整因果链",
    nodes: [
      { id: "m", label: "模型", title: "模型与 SQL", content: "关系模型与 SQL 是表达层：模式设计与查询能力决定系统上限。" },
      { id: "p", label: "物理", title: "物理执行", content: "存储、索引与查询优化决定性能下限：成本模型贯穿始终。" },
      { id: "t", label: "事务", title: "事务与恢复", content: "并发控制与日志恢复守护正确性底线，隔离级别按业务选择。", failure: { title: "断链", desc: "只懂 SQL 不懂执行，慢查询无从下手。修法：从执行计划回溯到物理设计。" } },
      { id: "d", label: "分布式", title: "分布式扩展", content: "分区、复制与共识支撑规模扩展，权衡从单机延伸到集群。" },
    ],
  },
};

const VIEW_W = 780;
const NODE_H = 88;
const NODE_Y = 132;
const GAP = 16;

export function DscConceptLab({ chapter }: { chapter: string }) {
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
        <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} className="w-full" role="img" aria-label={spec.title}>
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
                  <text x={cx} y={NODE_Y + NODE_H + 22} textAnchor="middle" fontSize={11} fill={C.danger} fontWeight={500}>
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
