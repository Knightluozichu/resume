import type { ReviewQuestion } from "./types";

export const kfkTopicsPartitionsQuestions: ReviewQuestion[] = [
  {
    id: "kfk-tp-1",
    chapter: "kfk-topics-partitions",
    level: 1,
    question: `Kafka中Topic、Partition、Offset和Segment之间的关系是什么？`,
    answer: `关系层级：Topic（主题）是逻辑消息分类，Partition（分区）是Topic的物理分片，Offset（偏移量）是分区内消息的唯一序号，Segment（日志段）是分区的物理存储单元。①Topic——逻辑概念，生产者向Topic发消息，消费者从Topic订阅，类似数据库的表；②Partition——Topic分为多个Partition，每个Partition是一个有序的、不可变的追加日志，分布在不同Broker上实现并行和扩展；③Offset——每个Partition内每条消息有一个单调递增的Offset，标识消息在分区内的位置，Offset在分区内唯一但不跨分区；④Segment——每个Partition在磁盘上由多个Segment文件组成（.log日志+.index索引+.timeindex时间索引），活跃Segment用于追加写入，写满后滚动到新Segment，旧Segment可被删除或压缩。分区数决定最大并行度，Segment决定存储管理粒度。`,
    tags: ["Topic", "Partition", "Offset", "Segment"],
  },
  {
    id: "kfk-tp-2",
    chapter: "kfk-topics-partitions",
    level: 2,
    question: `Kafka分区数的选择需要考虑哪些因素？分区过多或过少各有什么问题？`,
    answer: `分区选择考虑因素：①吞吐量需求——分区是并行消费的基本单位，更多分区=更高并行吞吐；②Broker数量——分区应分布在多台Broker上，单Broker分区数不宜过多（建议≤4000）；③消费者数量——消费者组内消费者数不应超过分区数（超出则空闲）；④延迟与资源——每个分区占用内存（页缓存）和文件句柄，过多分区增加开销。分区过多的问题：①内存开销增大——每个分区在Broker上需要内存维护元数据和索引；②可用性降低——分区越多，Leader选举和再均衡耗时越长，Controller压力越大；③端到端延迟增加——更多分区意味着更多并行请求，客户端需等待最慢的分区。分区过少的问题：①吞吐瓶颈——消费者并行度受限，无法充分利用集群资源；②扩展性差——后期增加分区数只能对新消息生效，已有数据无法重新分区。建议：根据峰值吞吐和消费者数计算，预留增长空间，起始分区数不宜过多。`,
    tags: ["分区数", "吞吐量", "扩展性"],
  },
  {
    id: "kfk-tp-3",
    chapter: "kfk-topics-partitions",
    level: 2,
    question: `Kafka的消息保留策略有哪些？retention和compaction各适用于什么场景？`,
    answer: `两种保留策略：①基于时间的保留（log.retention.hours/ms）——超过保留时间的Segment被整体删除，默认7天。适用于大多数场景（日志、事件流），按时间清理过期数据。也可基于大小（log.retention.bytes）按总大小删除。②日志压缩（log.cleanup.policy=compact）——保留每个key的最新value，删除旧value，类似KV存储的LSM。适用于状态变更流（如用户信息变更、配置更新），只需最新状态不需历史。compact原理：压缩时遍历Segment，对每个key只保留最后出现的value，生成新的cleaned Segment。compact+delete可组合使用。场景对比：时间保留适合事件日志（每条消息独立有价值，如点击流）；日志压缩适合变更日志（只关心最终状态，如用户资料更新、账户余额变更）。混合策略：active Segment不参与压缩/删除，只有已关闭的Segment才会被处理。`,
    tags: ["消息保留", "retention", "compaction", "日志压缩"],
  },
  {
    id: "kfk-tp-4",
    chapter: "kfk-topics-partitions",
    level: 3,
    question: `Kafka Partition的物理存储结构是怎样的？.log/.index/.timeindex文件如何协同工作？`,
    answer: `物理存储结构：每个Partition是一个目录（topic-partition），包含多个Segment文件组。每个Segment由三个文件组成：①.log——实际存储消息数据的日志文件，消息以二进制批次（RecordBatch）追加写入；②.index——稀疏偏移量索引文件，记录Offset到物理位置（position）的映射，每隔一定字节（log.index.interval.bytes，默认4KB）记录一条索引项，加速Offset定位；③.timeindex——时间戳索引文件，记录时间戳到Offset的映射，支持按时间戳查找消息。查找流程：①按Offset查找——用二分法在.index中找到小于等于目标Offset的最大索引项，得到position，从.log的position开始顺序扫描找到精确Offset；②按时间戳查找——先在.timeindex中二分找到小于等于目标时间戳的Offset，再走①的流程。Segment滚动：当.log文件达到log.segment.bytes（默认1GB）或超过log.roll.hours时，当前Segment关闭并滚动到新Segment。这种稀疏索引+顺序扫描的设计在磁盘上高效且内存友好。`,
    tags: ["物理存储", "Segment", "索引", "稀疏索引"],
  },
];
