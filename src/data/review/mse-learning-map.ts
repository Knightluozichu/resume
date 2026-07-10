import type { ReviewQuestion } from "./types";

export const mseLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mse-lm-1",
    chapter: "mse-learning-map",
    level: 1,
    question: `《MySQL数据库应用从入门到精通》全书分为哪几个篇章？各自的核心内容是什么？`,
    answer: `全书分三个篇章：基础篇——MySQL入门基础（安装配置/数据类型/建库建表）、SQL基础（DDL/DML/DQL）、数据库设计（三大范式/ER建模）；进阶篇——高级查询（JOIN/子查询/窗口函数）、索引与优化（B+Tree/EXPLAIN/执行计划）、事务与锁（ACID/MVCC/隔离级别）；高级篇——安全与备份（权限/审计/备份恢复）、数据库管理（主从复制/高可用/监控）、全书复习。递进逻辑：从会用SQL到会设计库，再到会优化和运维。`,
    tags: ["知识体系", "三篇递进", "学习路径"],
  },
  {
    id: "mse-lm-2",
    chapter: "mse-learning-map",
    level: 2,
    question: `贯穿全书的两条核心主线是什么？它们在哪些章节交汇？`,
    answer: `主线一SQL语言能力：SQL基础（DDL/DML/DQL）→ 高级查询（JOIN/子查询/窗口函数）→ 索引与优化（EXPLAIN/执行计划），解决"如何写对且写得快"。主线二数据可靠与运维：事务ACID → 索引优化 → 安全备份 → 数据库管理（复制/高可用），解决"如何保证数据安全与系统可用"。两条主线在"索引+执行计划"（性能优化章）与"事务+备份恢复"（安全与运维章）交汇——索引影响事务的锁范围和执行效率，备份恢复依赖事务日志（redo/undo/binlog）。`,
    tags: ["两条主线", "跨章节关联", "SQL能力", "数据可靠"],
  },
  {
    id: "mse-lm-3",
    chapter: "mse-learning-map",
    level: 2,
    question: `为什么学习MySQL要遵循"先用→会设计→会优化→会运维"的顺序？跳过设计直接学优化有什么风险？`,
    answer: `顺序依据：先用——建立SQL手感，理解数据如何存取；会设计——用范式和ER建模确保数据结构合理，减少后期返工；会优化——在正确设计基础上提升性能；会运维——保障上线后的安全与可用。跳过设计的风险：①表结构不合理（冗余/更新异常）导致后期优化事倍功半，索引再好也救不了烂设计；②缺乏范式约束会产生大量数据冗余，占用空间且引发一致性问题；③反范式应是在满足范式前提下的有意为之，而不是不懂范式的随意设计。设计决定了优化的天花板。`,
    tags: ["学习路径", "数据库设计", "优化前提"],
  },
  {
    id: "mse-lm-4",
    chapter: "mse-learning-map",
    level: 1,
    question: `InnoDB为什么是MySQL的默认存储引擎？它相比MyISAM有哪些核心优势？`,
    answer: `InnoDB从MySQL 5.5起成为默认引擎，核心优势：①支持事务（ACID），MyISAM不支持——OLTP场景必须用InnoDB；②行级锁，MyISAM只有表锁，高并发写入InnoDB性能远优；③支持外键约束，保证参照完整性；④MVCC多版本并发控制，读不阻塞写、写不阻塞读；⑤崩溃恢复能力强（redo log保证持久性）；⑥聚簇索引组织数据，主键查询高效。MyISAM仅适合以读为主、无事务需求的场景（如日志统计表），现代MySQL应统一用InnoDB。`,
    tags: ["InnoDB", "存储引擎", "事务", "行锁"],
  },
];
