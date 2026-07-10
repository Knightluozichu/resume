import type { ReviewQuestion } from "./types";

export const hpmMysqlArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "hpm-arch-1",
    chapter: "hpm-mysql-architecture",
    level: 1,
    question: `MySQL的三层架构是什么？每层各负什么职责？`,
    answer: `三层架构：①连接层——负责客户端连接管理、认证授权、线程分配，每个连接对应一个线程，连接池复用线程避免频繁创建销毁；②SQL层——负责SQL的解析、优化、执行，包含查询缓存（8.0移除）、解析器、预处理器、优化器、执行器；③存储引擎层——以插件方式提供数据的物理存储与访问，如InnoDB/MyISAM/Memory，可按表选择。分层使一套SQL层支持多种存储引擎特性。`,
    tags: ["三层架构", "存储引擎", "连接层"],
  },
  {
    id: "hpm-arch-2",
    chapter: "hpm-mysql-architecture",
    level: 2,
    question: `一条SELECT语句在MySQL中是如何执行的？`,
    answer: `执行流程：①客户端发送SQL，连接层认证授权并分配线程；②查询缓存查找（8.0已移除，命中率低且易失效）；③解析器做词法/语法分析生成解析树；④预处理器做语义检查（表/列是否存在）和权限校验；⑤优化器基于统计信息估算成本，在等价执行计划中选最优方案（访问路径、连接顺序、算法）；⑥执行器调用存储引擎API完成数据读写；⑦结果集返回客户端。其中优化器是核心，决定查询性能，可用EXPLAIN审视其决策。`,
    tags: ["SQL执行", "优化器", "执行计划"],
  },
  {
    id: "hpm-arch-3",
    chapter: "hpm-mysql-architecture",
    level: 3,
    question: `InnoDB的四大核心特性是什么？为什么它是OLTP首选？`,
    answer: `四大特性：①事务ACID——Redo Log保证持久性（崩溃后已提交事务不丢），Undo Log保证原子性（回滚未提交事务）；②行级锁——锁粒度细到索引项，并发度高，但WHERE未命中索引会退化为表锁；③MVCC——多版本并发控制，读操作看快照不加锁不阻塞写，解决读写互斥问题；④聚簇索引——数据按主键物理组织存储，主键查询直接拿整行。OLTP首选原因：需要事务保证一致性、高并发下行锁和MVCC吞吐高、崩溃恢复可靠、主键点查询快——这些正是OLTP的核心需求。`,
    tags: ["InnoDB", "事务", "MVCC", "行锁", "聚簇索引"],
  },
  {
    id: "hpm-arch-4",
    chapter: "hpm-mysql-architecture",
    level: 3,
    question: `为什么说\"InnoDB是行锁，但WHERE条件没用索引时会退化成表锁\"？`,
    answer: `InnoDB的行锁是锁在索引项上，而非数据行本身。当UPDATE/DELETE的WHERE条件命中索引时，InnoDB通过索引定位行，只锁对应索引项，并发度高。但当WHERE条件未命中任何索引时，InnoDB不得不全表扫描，对扫描到的每一行都加锁，效果等同于锁住全表——此时并发更新会被严重阻塞。因此为更新条件的列建索引，不仅是为了查询快，更是为了锁不升级、保持行锁并发能力。这是InnoDB最经典的陷阱之一。`,
    tags: ["行锁", "索引", "锁升级", "陷阱"],
  },
];
