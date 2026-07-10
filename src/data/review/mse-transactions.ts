import type { ReviewQuestion } from "./types";

export const mseTransactionsQuestions: ReviewQuestion[] = [
  {
    id: "mse-tx-1",
    chapter: "mse-transactions",
    level: 2,
    question: `事务的ACID特性分别是什么？InnoDB如何保证每个特性？`,
    answer: `A原子性（Atomicity）：事务要么全部成功要么全部回滚，不存在中间状态。InnoDB通过undo log实现——事务执行过程中记录旧值到undo log，回滚时根据undo log恢复。C一致性（Consistency）：事务执行前后数据满足完整性约束（如外键、唯一约束、 CHECK约束）。由A/I/D共同保证，是最终目标而非独立机制。I隔离性（Isolation）：并发事务互不干扰。InnoDB通过锁机制（写写互斥）+ MVCC多版本并发控制（读写不互斥）实现。D持久性（Durability）：事务提交后数据永久保存，即使崩溃也不丢失。InnoDB通过redo log实现——WAL（Write-Ahead Logging）先写redo log再写数据页，崩溃后用redo log恢复已提交事务。两阶段提交（redo log prepare + binlog write + redo log commit）保证redo与binlog一致性。`,
    tags: ["ACID", "原子性", "一致性", "隔离性", "持久性", "undo log", "redo log"],
  },
  {
    id: "mse-tx-2",
    chapter: "mse-transactions",
    level: 2,
    question: `四个事务隔离级别分别会出现什么并发问题？InnoDB默认用哪个级别？如何解决幻读？`,
    answer: `四个隔离级别及并发问题：①读未提交（READ UNCOMMITTED）——脏读+不可重复读+幻读，能读到其他事务未提交的数据；②读已提交（READ COMMITTED, RC）——解决脏读，仍有不可重复读+幻读，每次SELECT生成新Read View；③可重复读（REPEATABLE READ, RR）——解决脏读+不可重复读，InnoDB在此基础上解决幻读，第一次SELECT生成Read View后复用；④串行化（SERIALIZABLE）——全部解决但性能最差，所有读加共享锁。InnoDB默认RR。幻读解决：RR级别下，InnoDB通过MVCC（快照读）+ Next-Key Lock（当前读）解决幻读。快照读（普通SELECT）通过Read View看到事务开始时的快照，不受其他事务INSERT影响；当前读（SELECT...FOR UPDATE/UPDATE/DELETE）通过Next-Key Lock（Record Lock+Gap Lock）锁住间隙，阻止其他事务在该范围INSERT。`,
    tags: ["隔离级别", "脏读", "不可重复读", "幻读", "RR", "MVCC", "Next-Key Lock"],
  },
  {
    id: "mse-tx-3",
    chapter: "mse-transactions",
    level: 3,
    question: `MVCC的工作原理是什么？RC和RR在MVCC上的核心区别是什么？`,
    answer: `MVCC（多版本并发控制）原理：①每行数据有隐藏列——trx_id（最后修改该行的事务ID）、roll_pointer（指向undo log中该行旧版本的指针）；②undo log版本链——每次UPDATE/DELETE都在undo log中记录旧版本，通过roll_pointer串联成链表；③Read View——事务执行SELECT时生成的一致性视图快照，包含当前活跃事务ID列表；④可见性判断——遍历版本链，找到第一个trx_id对当前Read View可见的版本（trx_id < 最小活跃事务ID 或 trx_id不在活跃列表中）。RC vs RR核心区别：RC——每次SELECT都生成新的Read View，所以能看到其他已提交事务的最新数据（不可重复读）；RR——事务中第一次SELECT生成Read View后，后续所有SELECT复用同一个Read View，所以整个事务期间看到的数据一致（可重复读）。代价：RR可能看到过期数据（长事务持有旧Read View导致undo log无法清理）。`,
    tags: ["MVCC", "Read View", "undo log", "版本链", "RC", "RR"],
  },
  {
    id: "mse-tx-4",
    chapter: "mse-transactions",
    level: 3,
    question: `InnoDB的行锁有哪些类型？什么是死锁？InnoDB如何检测和处理死锁？`,
    answer: `InnoDB锁类型：①按粒度——行锁（锁单行）、间隙锁Gap Lock（锁两行之间的间隙，阻止INSERT）、Next-Key Lock（Record Lock+Gap Lock，锁行+锁间隙，RR级别默认）；②按模式——共享锁S（读锁，SELECT...LOCK IN SHARE MODE）、排他锁X（写锁，SELECT...FOR UPDATE/UPDATE/DELETE）；③意向锁IS/IX（表级标记，表示事务打算加行级S/X锁，用于快速判断表锁冲突）。死锁：两个或多个事务互相持有对方需要的锁，导致永久等待。例：事务A锁了行1等行2，事务B锁了行2等行1。InnoDB处理：①检测——wait-for graph算法，构建锁等待图，检测到环则存在死锁；②处理——回滚 undo量最小（修改最少）的事务，让另一个事务继续执行（SHOW ENGINE INNODB STATUS可看死锁详情）。预防：①按固定顺序访问表和行；②事务尽量短小；③大事务拆小；④必要时用FOR UPDATE提前加锁避免隐式转换。`,
    tags: ["行锁", "间隙锁", "Next-Key Lock", "死锁", "锁检测", "实践"],
  },
];
