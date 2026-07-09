import type { ReviewQuestion } from "./types";

export const kfkReliabilityQuestions: ReviewQuestion[] = [
  {
    id: "kfk-rl-1",
    chapter: "kfk-reliability",
    level: 1,
    question: "Kafka中副本（Replica）、Leader、Follower和ISR的概念是什么？它们如何协作保证可靠性？",
    answer: "核心概念：①Replica（副本）——每个Partition有多个副本分布在不同Broker上，包括1个Leader和若干Follower，副本数=复制因子（replication.factor）；②Leader——分区的唯一读写入口，所有生产者写入和消费者读取都经过Leader，Leader处理请求后负责同步给Follower；③Follower——被动地从Leader拉取（Fetch）数据复制到自己的日志，Follower不直接处理客户端请求（除配置preferred.read.replica后某些版本支持Follower读）；④ISR（In-Sync Replicas）——与Leader保持同步的副本集合（包含Leader自身）。Follower通过持续Fetch Leader日志保持同步，如果Follower滞后超过replica.lag.time.max.ms（默认30秒），则被踢出ISR。协作保证可靠性：当Leader宕机时，Controller从ISR中选举一个Follower成为新Leader，因为ISR中的副本数据是最新的，选举后数据不丢。acks=all时Leader等ISR全部确认写入才返回成功，保证消息至少写入ISR中所有副本。",
    tags: ["副本", "Leader", "Follower", "ISR"],
  },
  {
    id: "kfk-rl-2",
    chapter: "kfk-reliability",
    level: 2,
    question: "Kafka的HW（High Watermark）和LEO（Log End Offset）是什么？它们如何保证消费者看到的一致性？",
    answer: "LEO（Log End Offset）——每个副本日志的下一条写入位置（即当前日志末尾Offset+1），每个副本有自己的LEO，Leader的LEO随写入增长。HW（High Watermark）——所有ISR副本中最小的LEO，即「所有ISR都已确认写入」的位置。HW是消费者可见性的分界线：消费者只能读取HW以下的消息，HW以上的消息对消费者不可见。HW的作用：保证当Leader切换时，消费者不会看到「可能丢失」的消息。如果消费者读了HW以上的消息（仅Leader有，Follower还没同步），此时Leader宕机新Leader（原Follower）没有这条消息，消费者就会看到「消失」的消息。HW更新流程：①Follower每次Fetch请求携带自己的LEO；②Leader收到Fetch后更新自己记录的该Follower的LEO；③Leader重新计算HW=min(所有ISR副本的LEO)；④Leader在Fetch响应中返回新的HW给Follower；⑤Follower更新自己的HW=min(自己的LEO, Leader返回的HW)。HW更新有一轮延迟（Epoch机制解决），可能导致Leader切换后HW回退。",
    tags: ["HW", "LEO", "High Watermark", "消费者一致性"],
  },
  {
    id: "kfk-rl-3",
    chapter: "kfk-reliability",
    level: 2,
    question: "Kafka保证的可靠性承诺有哪些？在不同配置组合下实际能达到什么可靠性级别？",
    answer: "Kafka可靠性承诺：①分区内有序——同一Partition内消息按写入顺序排列；②按分区至少一次——在正常配置下消息至少被持久化一次（不丢），但可能重复；③最佳努力按分区至少一次——即使Broker崩溃，已确认写入的消息不丢。可靠性配置三要素：①acks——0（不等确认可能丢）/1（Leader确认，Leader切换可能丢）/all（ISR全确认，最可靠）；②replication.factor——副本数，≥3保证容错1~2个Broker故障；③min.insync.replicas——ISR最少副本数，配合acks=all使用。配置组合的可靠性：①低可靠（可能丢）：acks=1+replication.factor=1，单副本无容错；②中可靠：acks=1+replication.factor=3，Leader写入即确认，Leader切换可能丢少量；③高可靠：acks=all+replication.factor=3+min.insync.replicas=2，ISR≥2才写，容忍1个副本故障不丢；④最高可靠：acks=all+replication.factor=5+min.insync.replicas=3+enable.idempotence=true+retries=MAX，容忍2个副本故障+不重不乱。注意min.insync.replicas过高会降低可用性（ISR不足时拒绝写入）。",
    tags: ["可靠性承诺", "acks", "配置组合", "不丢数据"],
  },
  {
    id: "kfk-rl-4",
    chapter: "kfk-reliability",
    level: 3,
    question: "Kafka的Leader选举过程是怎样的？Unclean Leader Election是什么？它有什么风险和适用场景？",
    answer: "Leader选举流程：①Controller监听ZK的/brokers/topics/[topic]/partitions/[partition]/state变化；②当Leader所在Broker宕机，Controller感知到ISR变化；③Controller从ISR中按顺序选第一个存活的副本作为新Leader（Preferred Replica Election优先选Preferred Leader即AR列表第一个）；④Controller更新ZK中的分区状态（Leader和ISR），通知所有Broker更新元数据。Unclean Leader Election（不洁选举）：当ISR为空（所有同步副本都宕机）时，是否允许从非ISR副本（滞后副本）中选举Leader，由unclean.leader.election.enable控制。①禁用（false，默认）——ISR为空时分区不可用（无Leader），等ISR中副本恢复，保证数据不丢但牺牲可用性；②启用（true）——从非ISR副本选Leader，分区恢复可用，但滞后副本没有最新数据，已确认写入但未同步到该副本的消息丢失，且HW回退。风险：数据丢失+消费回退（消费者已读的消息在新Leader上不存在）。适用场景：对可用性要求高于数据一致性的场景（如实时监控指标，丢几秒数据可接受但不可长时间不可用）。生产环境通常禁用unclean election，优先保证数据不丢。",
    tags: ["Leader选举", "Unclean Election", "可用性", "数据丢失"],
  },
];
