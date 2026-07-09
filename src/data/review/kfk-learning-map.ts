import type { ReviewQuestion } from "./types";

export const kfkLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "kfk-lm-1",
    chapter: "kfk-learning-map",
    level: 1,
    question: "《Kafka权威指南》全书的知识体系分为哪几个核心部分？各部分解决什么问题？",
    answer: "全书分四个核心部分：①基础概念（Kafka入门/Topic与分区）——解决「Kafka是什么、数据怎么组织」，涵盖发布订阅模型、Topic/Partition/Offset抽象；②生产与消费（生产者/消费者与消费者组）——解决「数据怎么进怎么出」，涵盖消息发送流程、序列化、分区器、消费者组与再均衡；③内部原理与可靠性（Kafka内部原理/可靠性与ISR）——解决「Kafka怎么跑、怎么不丢数据」，涵盖集群成员管理、Controller、副本复制、ISR、acks与HW；④进阶与运维（Kafka Streams/管理与运维）——解决「流处理怎么做、生产怎么管」，涵盖流处理DSL、状态存储、主题管理、监控与安全。递进逻辑：数据怎么组织→数据怎么进出→内部怎么跑→进阶怎么用。",
    tags: ["学习地图", "知识体系", "全书概览"],
  },
  {
    id: "kfk-lm-2",
    chapter: "kfk-learning-map",
    level: 2,
    question: "贯穿全书的三条核心主线是什么？它们在哪些交汇点形成闭环？",
    answer: "三条主线：①数据模型主线（Topic→Partition→Offset→Segment日志）回答「数据怎么存」；②生产消费主线（Producer→序列化→分区器→消费者组→再均衡→Offset提交）回答「数据怎么流转」；③可靠性与分布式主线（副本→ISR→Leader选举→HW/LEO→acks→Controller）回答「怎么不丢数据、怎么高可用」。三个交汇点：①Partition是数据模型与生产消费的交汇——分区器决定消息进哪个分区，分区是并行消费的基本单位；②副本与ISR是数据模型与可靠性的交汇——分区有多副本，ISR决定哪些副本可被选为Leader；③Offset提交与消费者组是生产消费与可靠性的交汇——Offset的提交语义决定消费端的不丢不重。",
    tags: ["核心主线", "知识串联", "交汇点"],
  },
  {
    id: "kfk-lm-3",
    chapter: "kfk-learning-map",
    level: 2,
    question: "Kafka的核心设计哲学是什么？它如何通过技术选择实现高吞吐与可扩展性？",
    answer: "核心设计哲学：以追加写入的分布式提交日志为核心，通过分区实现并行，通过副本实现容错，实现高吞吐、低延迟、可水平扩展的消息系统。四大技术基石：①顺序磁盘I/O——消息以追加方式写入磁盘日志（Segment），顺序写入速度接近内存随机写，避免随机寻道；②零拷贝（sendfile）——消费者读取时数据从页缓存直接通过DMA拷贝到网卡，跳过用户空间，极大降低CPU开销；③分区并行——Topic分为多个Partition分布在不同Broker上，生产消费均可并行，吞吐随分区数线性扩展；④消费者组模型——同一消费者组内分区唯一分配，实现负载均衡，不同组间独立消费实现广播。这些设计使Kafka单机吞吐可达百万级消息/秒。",
    tags: ["设计哲学", "高吞吐", "技术基石"],
  },
  {
    id: "kfk-lm-4",
    chapter: "kfk-learning-map",
    level: 3,
    question: "为什么学习Kafka要遵循「基础概念→生产消费→内部原理与可靠性→进阶运维」的顺序？跳过基础有什么风险？",
    answer: "顺序依据：每一步是下一步的前提。基础概念（Topic/Partition/Offset）是理解一切Kafka行为的抽象基础；生产消费（Producer/Consumer/消费者组）建立在数据模型之上，需先理解分区才能理解分区器和再均衡；内部原理与可靠性（副本/ISR/acks/Controller）建立在生产消费之上，需先理解生产消费流程才能理解副本同步和ack机制；进阶运维（Streams/监控/安全）建立在完整理解之上。跳过基础的风险：①不懂Partition无法理解分区器和消费者并行；②不懂消费者组无法理解再均衡和Offset管理；③不懂副本和ISR无法理解acks语义和数据可靠性配置；④不懂内部原理无法排查生产环境的数据丢失和性能问题。",
    tags: ["学习路径", "递进依赖", "学习方法论"],
  },
];
