import type { ReviewQuestion } from "./types";

export const mseFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "mse-fr-1",
    chapter: "mse-final-review",
    level: 4,
    question: `从全书四大领域（SQL语言、性能优化、事务并发、安全运维）总结MySQL数据库应用的核心能力链条。一个合格的MySQL工程师应具备哪些能力？`,
    answer: `核心能力链条：SQL语言能力（写对）→ 数据库设计能力（设计好）→ 性能优化能力（跑得快）→ 事务并发能力（不出错）→ 安全运维能力（不宕机）。具体能力：①SQL语言——熟练DDL/DML/DQL，掌握JOIN/子查询/窗口函数，理解SELECT执行顺序；②数据库设计——掌握三大范式和ER建模，能做合理的反范式设计，正确选择数据类型和主键策略；③性能优化——理解B+Tree索引原理，能用EXPLAIN分析执行计划，掌握最左前缀/覆盖索引/索引下推，能排查慢查询；④事务并发——理解ACID和隔离级别，掌握MVCC原理和锁机制（行锁/间隙锁/Next-Key），能处理死锁；⑤安全运维——掌握权限管理和SQL注入防护，能制定备份策略（全量+增量+binlog/PITR），能搭建主从复制和高可用，能监控关键指标（Buffer Pool命中率/慢查询/连接数/复制延迟）。从入门到精通：会用SQL → 会设计库 → 会优化 → 会运维。`,
    tags: ["全书总结", "能力链条", "四大领域", "综合"],
  },
  {
    id: "mse-fr-2",
    chapter: "mse-final-review",
    level: 4,
    question: `一条SQL语句从客户端发出到返回结果，经历了哪些完整的处理流程？涉及哪些组件和日志？`,
    answer: `完整流程：①客户端通过TCP/Socket发送SQL到MySQL Server；②连接管理层——连接池分配线程、认证鉴权（用户名/密码/主机）、检查连接数限制；③查询缓存（MySQL 8.0已移除，5.7及以前有）——命中则直接返回；④解析器——词法分析（拆分关键字/表名/列名）+ 语法分析（生成解析树/AST），检查语法错误；⑤预处理器——语义检查（表/列是否存在、权限是否足够、列歧义解析）；⑥优化器——生成执行计划（选择索引、JOIN顺序、访问类型），基于成本估算（统计信息）选择最优方案；⑦执行器——按执行计划调用存储引擎API，逐行获取数据；⑧存储引擎层（InnoDB）——通过Buffer Pool读写数据页，如需修改则：写undo log → 修改Buffer Pool数据页 → 写redo log（prepare）→ 返回执行器；⑨Server层写binlog → 存储引擎写redo log（commit）（两阶段提交）；⑩执行器将结果集通过连接层返回客户端。涉及日志：undo log（回滚/MVCC）、redo log（崩溃恢复）、binlog（复制/恢复）。`,
    tags: ["SQL执行流程", "解析器", "优化器", "执行器", "两阶段提交", "综合"],
  },
  {
    id: "mse-fr-3",
    chapter: "mse-final-review",
    level: 4,
    question: `一个电商系统数据库出现慢查询，从用户反馈"商品列表打开很慢"到解决问题，请描述完整的排查和优化流程。`,
    answer: `完整排查流程：①确认现象——收集慢查询SQL（开slow_query_log或应用层APM）、复现条件（数据量/并发量）、预期vs实际响应时间；②EXPLAIN分析——看type（是否ALL全表扫描）、key（是否用索引）、rows（扫描行数）、Extra（filesort/temporary）；③定位根因——常见：a)无索引或索引失效（函数运算/类型转换/左通配LIKE），b)JOIN过多/大表JOIN无索引，c)SELECT *返回过多列，d)深分页LIMIT 1000000,20，e)ORDER BY未命中索引导致filesort；④针对性优化——a)建合适索引（高频查询列+覆盖索引），b)大表JOIN加索引或反范式冗余，c)只SELECT需要的列，d)深分页改游标分页（WHERE id > last_id LIMIT 20），e)ORDER BY列纳入联合索引；⑤验证——EXPLAIN确认type升级、rows减少、Extra无filesort，实际执行时间达标；⑥持续监控——慢日志+pt-query-digest定期巡检，设置告警阈值。例：商品列表 SELECT * FROM products WHERE category_id=5 ORDER BY created_at DESC LIMIT 20 全表扫描 → 建联合索引 (category_id, created_at) → 覆盖索引扫描+索引有序免排序 → 响应从3s降到10ms。`,
    tags: ["慢查询排查", "EXPLAIN", "索引优化", "实战", "综合"],
  },
  {
    id: "mse-fr-4",
    chapter: "mse-final-review",
    level: 4,
    question: `在MySQL中如何保证高并发下的数据一致性？从锁、事务隔离、MVCC三个层面综合分析。`,
    answer: `三个层面保证数据一致性：①锁机制——写写互斥：UPDATE/DELETE加排他锁X，同一行同时只能一个事务修改，保证写串行化。读写不互斥：通过MVCC实现快照读不加锁，当前读（FOR UPDATE）加共享/排他锁。间隙锁：RR级别下Next-Key Lock锁住行+间隙，阻止幻读（其他事务无法在范围内INSERT）。意向锁IS/IX：表级标记行锁意向，避免行锁与表锁冲突的全表检查。②事务隔离级别——RR（默认）：快照读通过Read View保证可重复读+无幻读；当前读通过Next-Key Lock保证无幻读。RC：每次SELECT新Read View，看到最新已提交数据（不可重复读），但并发性更好。选择：一般业务用RR（安全优先），极高并发读多写少可考虑RC（性能优先）+应用层乐观锁。③MVCC——每行隐藏trx_id+roll_pointer→undo版本链，事务通过Read View判断版本可见性，实现读不阻塞写、写不阻塞读。综合策略：乐观并发（CAS/版本号）适合读多写少冲突少；悲观并发（SELECT...FOR UPDATE）适合写多冲突频繁；分布式场景用分布式锁+本地事务。长事务危害：持有锁/Read View/undo log，应拆短。`,
    tags: ["数据一致性", "锁", "隔离级别", "MVCC", "高并发", "综合"],
  },
];
