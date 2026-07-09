import type { ReviewQuestion } from "./types";

export const hpmMonitoringQuestions: ReviewQuestion[] = [
  {
    id: "hpm-mon-1",
    chapter: "hpm-monitoring",
    level: 1,
    question: "MySQL监控有哪些主要信息源？分别适合什么场景？",
    answer: "五类信息源：①SHOW STATUS/VARIABLES——会话与全局计数器，宏观粗粒度，适合看缓冲池命中率、语句计数等整体状态；②Performance Schema——细粒度事件计时（等待/锁/IO/语句），适合深入定位锁等待、IO等待等具体事件；③sys Schema——PS的易读视图，适合快速查询锁等待、未使用索引等；④慢查询日志——超阈值查询记录，是定位慢查询的第一入口，适合发现耗时查询；⑤EXPLAIN/PROCESSLIST——执行计划和实时连接状态，适合分析单条查询和当前会话。按诊断层次选择：宏观看SHOW STATUS，定位慢查询用慢日志，分析执行计划用EXPLAIN，深入根因用Performance Schema。",
    tags: ["信息源", "Performance Schema", "慢日志", "EXPLAIN", "SHOW STATUS"],
  },
  {
    id: "hpm-mon-2",
    chapter: "hpm-monitoring",
    level: 2,
    question: "如何用Performance Schema/sys Schema定位锁等待问题？",
    answer: "用sys Schema的视图可直接定位锁等待：SELECT * FROM sys.innodb_lock_waits会显示谁在等（等待事务）、等谁（阻塞事务）、等什么锁、等了多久，一目了然。也可直接查Performance Schema的data_locks和data_lock_waits表。定位后处理：①终止阻塞事务（KILL阻塞会话）；②优化SQL减少锁持有时间（为更新条件建索引避免表锁）；③调整隔离级别（降低锁竞争）；④避免长事务（长事务持有锁久）。锁等待是高并发下常见问题，PS能直达根因\"谁阻塞了谁\"。",
    tags: ["锁等待", "sys Schema", "Performance Schema", "诊断"],
  },
  {
    id: "hpm-mon-3",
    chapter: "hpm-monitoring",
    level: 3,
    question: "简述自顶向下的诊断方法论。",
    answer: "自顶向下分析从宏观到微观逐层下钻：①应用层——先确认是不是真的数据库问题（可能是应用自身慢、网络慢）；②实例层——SHOW PROCESSLIST找异常会话（长事务、锁等待、睡眠连接）；③语句层——慢查询日志找耗时查询，按耗时和扫描行数排序；④执行计划——对慢查询EXPLAIN看访问类型（是否ALL全表扫）、rows（扫描行数）、Extra（是否有filesort/temporary）；⑤资源层——CPU/IO/内存谁满（top/iostat）。每层定位到问题再下钻一层，避免一上来就钻细节，提高诊断效率。",
    tags: ["自顶向下", "诊断方法", "PROCESSLIST", "慢日志", "EXPLAIN"],
  },
  {
    id: "hpm-mon-4",
    chapter: "hpm-monitoring",
    level: 4,
    question: "什么是\"症状与根因\"的区别？举例说明为什么不能只治症状。",
    answer: "症状是表象（如\"查询慢\"），根因是底层原因（如缺索引、锁等待、IO饱和、缓冲池不足）。诊断目标是找根因而非缓解症状。举例：①若慢查询根因是缺索引，加索引可根治；但若只治症状（如加超时跳过），问题会反复。②若慢查询根因是IO饱和（磁盘打满），加索引无效（磁盘仍打满），需换SSD或分摊负载（读写分离/分片）——治错了方向。③若根因是锁等待（事务互相阻塞），优化单条查询无效，需解决锁竞争（缩短事务、降隔离级别）。故必须用等待事件分析等方法直达根因，对症下药。",
    tags: ["症状与根因", "诊断", "等待事件分析", "对症下药"],
  },
];
