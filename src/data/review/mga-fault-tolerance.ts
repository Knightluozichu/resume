import type { ReviewQuestion } from "./types";

export const mgaFaultToleranceQuestions: ReviewQuestion[] = [
  {
    id: "mga-fault-tolerance-1",
    chapter: "mga-fault-tolerance",
    level: 2,
    question: `最终一致性和强一致性在游戏服务端中分别适合什么场景？`,
    answer:
      `最终一致性适合对延迟敏感但对短暂不一致容忍度高的场景——如玩家位置同步、AOI 广播、排行榜更新。允许几秒的不一致，但不能等所有副本确认。强一致性适合关键数据操作——如充值扣款、道具交易、装备强化。必须原子完成（不能钱扣了道具没给），用分布式事务或 TCC 保证。选型原则：玩家体验相关的用最终一致性（快），涉及真实价值的数据用强一致性（准）。`,
    tags: ["一致性模型", "选型"],
  },
  {
    id: "mga-fault-tolerance-2",
    chapter: "mga-fault-tolerance",
    level: 2,
    question: `热备切换中的「脑裂」问题是什么？如何解决？`,
    answer:
      `脑裂是指主节点因网络隔离（而非真正宕机）无法通信，备用节点以为主节点死了并提升为新主，此时两个节点同时认为自己是一方之主——客户端可能连到任一节点，导致数据分裂。解决方案：① 仲裁节点（Quorum）——需要多数节点同意才能提升为主，网络隔离时少数派无法获多数同意；② 租约（Lease）——主节点持有时限租约，到期前备用节点不能提升；③ Fencing——旧主节点被强制隔离（如 STONITH 关电源），确保只有一个存活。`,
    tags: ["脑裂", "热备", "容错"],
  },
  {
    id: "mga-fault-tolerance-3",
    chapter: "mga-fault-tolerance",
    level: 3,
    question: `RTO 和 RPO 分别是什么？游戏服务端对这两个指标有什么要求？`,
    answer:
      `RTO（Recovery Time Objective）是恢复时间目标——从故障发生到服务恢复的时间。游戏通常要求 RTO &lt; 10 秒，否则玩家大量掉线。RPO（Recovery Point Objective）是恢复点目标——故障恢复后丢失的数据量（时间维度）。游戏通常要求 RPO &lt; 1 秒（最多丢 1 秒的状态变更）。RTO 取决于故障检测速度和切换速度；RPO 取决于数据同步延迟——同步复制 RPO=0 但延迟高，异步复制 RPO&gt;0 但延迟低。游戏通常用异步复制（RPO &lt; 1s）在延迟和可靠性间取平衡。`,
    tags: ["RTO", "RPO", "容灾指标"],
  },
  {
    id: "mga-fault-tolerance-4",
    chapter: "mga-fault-tolerance",
    level: 4,
    question: `为什么有了热备还不能保证数据不丢？如何设计一个「尽量不丢数据」的容灾方案？`,
    answer:
      `热备保证服务不中断，不等于数据不丢——如果主节点的数据还没同步到备节点就宕机了，这部分数据就丢了（RPO&gt;0）。「尽量不丢数据」的方案：① 关键操作同步复制——充值/交易等高价值操作用同步复制（主写完等备确认才返回），RPO=0；② WAL（Write-Ahead Log）——先写日志再做操作，故障后按日志回放恢复，保证已确认的操作不丢；③ 多机房容灾——数据跨机房复制，单机房整体故障也不丢；④ 定期快照——每 N 分钟做全量快照到对象存储，作为最后兜底。代价是同步复制增加延迟，需要在「不丢数据」和「低延迟」间按业务价值做取舍。`,
    tags: ["容灾设计", "数据安全", "WAL"],
  },
];
