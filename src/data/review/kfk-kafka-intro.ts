import type { ReviewQuestion } from "./types";

export const kfkKafkaIntroQuestions: ReviewQuestion[] = [
  {
    id: "kfk-ki-1",
    chapter: "kfk-kafka-intro",
    level: 1,
    question: `Kafka是什么？它的核心发布订阅模型与传统消息队列有什么区别？`,
    answer: `Kafka是一个分布式的流处理平台，核心是分布式提交日志（distributed commit log）。发布订阅模型区别：①传统消息队列（ActiveMQ/RabbitMQ）——消息被消费后即删除，队列是临时的，消息无持久化保证；Kafka——消息持久化在磁盘日志中，消费者通过Offset读取，消息有保留期（retention），可被多次重放。②传统队列——消息被一个消费者消费后消失；Kafka——同一Topic可被多个消费者组独立消费（广播），同组内每分区仅一个消费者消费（负载均衡）。③Kafka以追加写入日志为核心，消费者主动拉取（pull）而非推送（push），消费者控制消费速率。Kafka本质是一个可持久化、可重放、高吞吐的分布式消息日志系统。`,
    tags: ["发布订阅", "消息队列", "核心概念"],
  },
  {
    id: "kfk-ki-2",
    chapter: "kfk-kafka-intro",
    level: 2,
    question: `Kafka的四大核心API分别是什么？各自的作用和典型使用场景是什么？`,
    answer: `四大核心API：①Producer API——发布消息到Kafka Topic，用于应用向Kafka写入数据（如日志采集、事件发布）；②Consumer API——从Kafka Topic订阅消息，用于应用消费Kafka数据（如实时处理、数据落库）；③Streams API——将一个或多个Topic的输入流转换为输出流，用于流处理（如实时聚合、ETL）；④Connect API——在Kafka与其他系统间可靠地导入导出数据，用于数据集成（如MySQL→Kafka、Kafka→HDFS）。Connect API通过Source Connector（写入Kafka）和Sink Connector（从Kafka读出）实现，内置容错和偏移量管理。四大API覆盖了消息生产、消费、流处理和数据集成的完整场景。`,
    tags: ["四大API", "Producer", "Consumer", "Streams", "Connect"],
  },
  {
    id: "kfk-ki-3",
    chapter: "kfk-kafka-intro",
    level: 2,
    question: `Kafka的典型使用场景有哪些？为什么Kafka适合这些场景？`,
    answer: `五大典型场景：①消息队列——应用解耦，生产者发消息消费者异步处理，削峰填谷。Kafka适合因为高吞吐、持久化、可重放；②行为追踪——用户点击流、页面访问日志实时采集到Kafka，供下游分析。Kafka适合因为高吞吐写入和多消费者并行消费；③运营指标——服务器CPU/内存/网络指标汇聚到Kafka，供监控和告警系统消费。Kafka适合因为低延迟和高可用；④日志聚合——多机日志统一收集到Kafka再落HDFS/ES。Kafka适合因为顺序磁盘写性能优于传统日志收集；⑤流处理——Kafka Streams直接在Kafka上做实时ETL/聚合。Kafka适合因为原生集成、Exactly-Once语义。共同原因：Kafka的持久化日志+分区并行+消费者组模型天然适配高吞吐、可重放、解耦的数据管道场景。`,
    tags: ["使用场景", "消息队列", "日志聚合", "流处理"],
  },
  {
    id: "kfk-ki-4",
    chapter: "kfk-kafka-intro",
    level: 3,
    question: `Kafka最初的诞生背景是什么？LinkedIn为什么要开发Kafka而不是使用现有消息系统？`,
    answer: `诞生背景：LinkedIn需要一个系统来处理海量的用户行为追踪数据和运营指标，要求高吞吐、低延迟、可持久化、可水平扩展。现有消息系统（ActiveMQ等）的不足：①吞吐量不足——传统消息队列基于内存，不支持高吞吐持久化写入，无法处理LinkedIn每秒百万级事件；②缺乏消息重放——传统队列消息消费后即删除，无法重新消费历史数据，而行为分析常需回溯；③水平扩展困难——传统队列的集群扩展能力有限，难以应对数据量增长；④运维复杂——传统消息队列在大规模部署下可靠性不足。LinkedIn开发了Kafka，核心创新：①以追加写入磁盘日志为存储模型（顺序写速度快于随机内存写）；②消费者以Offset主动拉取（支持重放）；③分区并行实现水平扩展；④零拷贝技术降低CPU开销。2011年开源后成为Apache顶级项目。`,
    tags: ["诞生背景", "LinkedIn", "设计动机"],
  },
];
