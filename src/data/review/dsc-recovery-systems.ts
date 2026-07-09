import type { ReviewQuestion } from "./types";

export const dscRecoverySystemsQuestions: ReviewQuestion[] = [
  {
    id: "dsc-rc-1",
    chapter: "dsc-recovery-systems",
    level: 2,
    question: "数据库有哪三类故障？各自的影响范围和恢复方式是什么？",
    answer: "①事务故障：由逻辑错误/死锁/用户中止引起，影响单个事务，恢复方式是 UNDO 回滚该事务。②系统故障：由掉电/OS 崩溃引起，内存数据丢失但磁盘数据完好，恢复方式是重启后 REDO 已提交事务（保证持久性）+ UNDO 未提交事务（保证原子性）。③介质故障：由磁盘损坏引起，磁盘数据丢失，恢复方式是用备份恢复磁盘数据再用日志 REDO 重做自备份后的已提交事务。故障由轻到重，恢复复杂度递增。",
    tags: ["故障分类", "事务故障", "系统故障", "介质故障"],
  },
  {
    id: "dsc-rc-2",
    chapter: "dsc-recovery-systems",
    level: 3,
    question: "什么是先写日志（WAL）原则？为什么它对恢复至关重要？",
    answer: "先写日志（Write-Ahead Logging）：修改数据页落盘前，对应的日志记录必须先持久化到磁盘。对恢复至关重要的原因：恢复依赖日志重建状态——若数据页已修改落盘但日志未落盘，崩溃后磁盘上是修改后的数据，但日志没有记录这次修改，恢复时既不知道改了什么（无法 UNDO 撤销未提交的修改）也不知道旧值是什么。WAL 保证日志总比数据先落盘，崩溃后日志完整可用，能正确地 UNDO 未提交修改和 REDO 已提交修改。没有 WAL，原子性和持久性都无法保证。",
    tags: ["WAL", "先写日志", "恢复", "原子性", "持久性"],
  },
  {
    id: "dsc-rc-3",
    chapter: "dsc-recovery-systems",
    level: 3,
    question: "UNDO 和 REDO 分别保证 ACID 的哪个特性？为什么需要两者？",
    answer: "UNDO 保证原子性（A）：对未提交/失败的事务，按日志倒序恢复旧值，撤销其修改，保证失败事务不留痕迹（全不做）。REDO 保证持久性（D）：对已提交事务，按日志正序重放新值，保证提交的修改即使崩溃也不丢失（全做了就永久）。需要两者因为系统故障时磁盘上可能既有未提交事务的修改（缓冲区脏页已落盘但事务未提交，需 UNDO 撤销），也可能已提交事务的修改未落盘（提交了但缓冲区未刷盘，需 REDO 重做）。只 UNDO 无法保证持久性，只 REDO 无法保证原子性，两者结合才能同时保证 A 和 D。",
    tags: ["UNDO", "REDO", "原子性", "持久性", "恢复"],
  },
  {
    id: "dsc-rc-4",
    chapter: "dsc-recovery-systems",
    level: 4,
    question: "描述 ARIES 算法的三个阶段，并解释 CLRs 的作用。",
    answer: "ARIES 三阶段：①分析阶段——从最近检查点正向扫描日志，重建活跃事务表和脏页表，确定需 REDO 和 UNDO 的事务。②REDO 阶段——从脏页表中最早的修改点开始，正向重放所有已记录的更新，恢复数据库到崩溃前的状态。③UNDO 阶段——按日志倒序回滚所有未提交事务。CLRs（补偿日志记录）的作用：UNDO 撤销某操作时写一条 CLR 记录这次撤销，若恢复过程中再次崩溃，重启恢复时看到 CLR 就知道该操作已撤销，跳过即可——防止重复撤销，保证恢复是幂等的（多次崩溃恢复结果一致）。",
    tags: ["ARIES", "分析", "REDO", "UNDO", "CLRs", "检查点"],
  },
];
