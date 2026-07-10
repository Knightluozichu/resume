import type { ReviewQuestion } from "./types";

export const hpmReplicationQuestions: ReviewQuestion[] = [
  {
    id: "hpm-rep-1",
    chapter: "hpm-replication",
    level: 1,
    question: `简述MySQL复制的工作原理（三个步骤及涉及的线程）。`,
    answer: `MySQL复制基于binlog事件回放，三步：①主库事务提交时写binlog，主库的Binlog Dump线程把binlog事件发送给从库；②从库的IO线程接收事件，写入relay log（中继日志）；③从库的SQL线程读取relay log，回放事件，使从库数据与主库最终一致。涉及三个线程：主库Binlog Dump、从库IO线程、从库SQL线程。默认异步复制——主库提交不等从库，故存在主从延迟（从库尚未回放的事件量）。`,
    tags: ["复制原理", "binlog", "relay log", "线程"],
  },
  {
    id: "hpm-rep-2",
    chapter: "hpm-replication",
    level: 2,
    question: `对比三种binlog格式的特点，为什么生产环境推荐ROW？`,
    answer: `三种格式：①STATEMENT记录SQL原文，日志小，但NOW()/UUID()/自增列等不确定函数在主从不一致，有触发器/存储过程时易出问题。②ROW记录每行实际变更，准确无歧义、可幂等、对触发器友好，但日志较大。③MIXED自动选择，安全场景用ROW其余用STATEMENT。生产推荐ROW的原因：准确无歧义——不存在不确定函数的不一致问题；可幂等——重放行变更结果确定；对触发器/存储过程友好。代价是日志较大，但现代磁盘容量充裕，一致性比空间更重要。`,
    tags: ["binlog格式", "ROW", "STATEMENT", "MIXED", "一致性"],
  },
  {
    id: "hpm-rep-3",
    chapter: "hpm-replication",
    level: 3,
    question: `GTID相比传统文件位点复制有什么优势？`,
    answer: `GTID（全局事务标识，server_uuid:transaction_id）相比传统文件名+位点复制的优势：①故障切换简单——传统复制主库切换后文件位点变化，从库难以定位续传点；GTID下从库用MASTER_AUTO_POSITION=1自动从新主库拉取未执行的事务，无需手动指定位点。②一致性校验便捷——比对主从GTID集合即可判断是否完全同步，比核对文件位点可靠。③防循环复制——从库记录已执行GTID，重复事务不会再次回放，双主互备场景必备。GTID使复制管理从\"文件位点\"升级到\"事务级\"，是现代MySQL复制的推荐方式。`,
    tags: ["GTID", "文件位点", "故障切换", "一致性校验"],
  },
  {
    id: "hpm-rep-4",
    chapter: "hpm-replication",
    level: 3,
    question: `复制能解决哪些问题，不能解决哪些问题？要写扩展该怎么办？`,
    answer: `复制能解决：①读扩展——从库分担读负载，主库专注写；②数据冗余——灾备，主库故障数据不丢；③高可用——主库故障可切换从库为新主。复制不能解决：①写扩展——写仍走主库，所有从库都要回放同样的写，写能力受限于单主库性能；②强一致（异步复制下）——主从延迟导致读从库可能拿到旧数据。要写扩展需分片（Sharding）——按键将数据分布到多个独立的主库分片，每个分片独立承担部分写。要强一致需用半同步复制（主库等从库收到）或组复制（Paxos多数确认）。`,
    tags: ["复制", "读扩展", "写扩展", "分片", "强一致"],
  },
];
