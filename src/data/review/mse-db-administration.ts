import type { ReviewQuestion } from "./types";

export const mseDbAdministrationQuestions: ReviewQuestion[] = [
  {
    id: "mse-admin-1",
    chapter: "mse-db-administration",
    level: 2,
    question: `MySQL主从复制的原理是什么？涉及哪些线程和日志？异步复制和半同步复制有什么区别？`,
    answer: `主从复制原理：①Master执行写操作后写入binlog；②Master的Dump Thread将binlog事件发送给Slave；③Slave的IO Thread接收binlog事件写入relay log（中继日志）；④Slave的SQL Thread读取relay log回放SQL，使数据与Master一致。涉及日志：Master binlog → Slave relay log。涉及线程：Master Dump Thread + Slave IO Thread + Slave SQL Thread（MySQL 5.7+支持多线程回放）。异步复制：Master写完binlog立即返回客户端，不等Slave确认——性能好但Master崩溃可能丢未同步数据。半同步复制：Master等至少一个Slave的IO Thread确认收到binlog后才返回——兼顾性能与安全，但Slave全部宕机时Master会阻塞（可设置超时降级为异步）。组复制MGR：基于Paxos多数派共识，3节点集群自动选主、强一致、自动故障转移。选型：一般业务用异步+读写分离，金融强一致用MGR。`,
    tags: ["主从复制", "binlog", "relay log", "异步复制", "半同步复制", "MGR"],
  },
  {
    id: "mse-admin-2",
    chapter: "mse-db-administration",
    level: 3,
    question: `如何排查MySQL慢查询？请描述完整的慢查询排查流程。`,
    answer: `慢查询排查流程：①开启慢查询日志——SET GLOBAL slow_query_log = ON; SET GLOBAL long_query_time = 1;（记录执行超过1秒的查询）；②分析慢日志——mysqldumpslow -s t -t 10 slow.log（按时间排序取前10条）或 pt-query-digest（更详细分析）；③EXPLAIN分析执行计划——EXPLAIN SELECT ...，重点看type（是否ALL全表扫描）、key（是否用了索引）、rows（扫描行数）、Extra（是否有Using filesort/temporary）；④优化索引——为WHERE/JOIN/ORDER BY列建索引，确保type达到ref/range以上；⑤优化SQL——避免SELECT *、大表LIMIT分页用游标、拆分复杂查询、避免子查询改JOIN；⑥检查表结构——是否有过多字段、大TEXT/BLOB、缺失索引的外键；⑦检查服务器参数——innodb_buffer_pool_size是否足够（建议物理内存70-80%）、连接数是否打满。工具链：slow log + EXPLAIN + pt-query-digest + SHOW PROCESSLIST + SHOW STATUS。`,
    tags: ["慢查询", "EXPLAIN", "执行计划", "排查流程", "优化"],
  },
  {
    id: "mse-admin-3",
    chapter: "mse-db-administration",
    level: 2,
    question: `InnoDB缓冲池（Buffer Pool）的作用是什么？如何计算缓冲池命中率？如何调优？`,
    answer: `Buffer Pool作用：InnoDB在内存中缓存数据页和索引页的区域，所有读写都先经过Buffer Pool（读时命中则不碰磁盘，写时先改Buffer Pool再异步刷盘），是InnoDB性能的核心。命中率计算：\nSHOW STATUS LIKE 'Innodb_buffer_pool_read%';\n命中率 = 1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests)\n其中read_requests是总读取请求次数，reads是未命中需从磁盘读的次数。命中率应>99%，低于95%需调优。调优：①增大innodb_buffer_pool_size——建议物理内存的70-80%（专用MySQL服务器），如32G内存设24G；②多实例——innodb_buffer_pool_instances（>1G时设多个实例减少锁竞争）；③预热——重启后Buffer Pool为空，MySQL 5.6+支持 innodb_buffer_pool_dump_at_shutdown=ON 和 innodb_buffer_pool_load_at_startup=ON 保存/加载Buffer Pool状态；④监控——SHOW ENGINE INNODB STATUS查看Buffer Pool命中率、free list、LRU列表。`,
    tags: ["Buffer Pool", "缓冲池", "命中率", "调优", "内存"],
  },
  {
    id: "mse-admin-4",
    chapter: "mse-db-administration",
    level: 3,
    question: `MySQL高可用方案有哪些？各自的特点和适用场景是什么？`,
    answer: `主要高可用方案：①主从+MHA——Master故障时MHA从Slave中选新Master，自动提升，需10-30秒切换。优点成熟稳定，缺点需额外MHA Manager节点、只支持异步复制。适合传统企业级应用。②Orchestrator——类似MHA但更灵活，支持复杂拓扑（多级复制），自动故障检测+手动/自动切换，GitHub开源。适合中大型团队。③MGR（MySQL Group Replication）——官方组复制，基于Paxos多数派共识，3-5节点集群，自动选主、强一致、自动故障转移（秒级）。单主模式（推荐）读写分离。适合金融级强一致场景。④MySQL InnoDB Cluster——官方完整高可用方案 = MGR + MySQL Router（读写分离路由）+ MySQL Shell（管理），开箱即用。适合新项目首选。⑤MySQL Router + MGR的 ReplicaSet——8.0+简化版。选型原则：新项目用InnoDB Cluster（官方全家桶），存量系统用MHA/Orchestrator过渡，金融强一致用MGR。共同要素：VIP/DNS切换 + 应用层连接池重连 + 数据一致性校验。`,
    tags: ["高可用", "MHA", "MGR", "InnoDB Cluster", "故障转移", "选型"],
  },
];
