import type { ReviewQuestion } from "./types";

export const rmqLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rmq-lm-1",
    chapter: "rmq-learning-map",
    level: 1,
    question: `全书分为哪四个部分？各自的核心内容和递进逻辑是什么？`,
    answer: `全书分四个部分：第一部分「基础概念」——AMQP与RabbitMQ基础（AMQP 0-9-1协议模型、Exchange/Queue/Binding核心抽象）、消息模式（direct/fanout/topic/headers四种Exchange类型、死信队列DLX、延迟队列TTL+DLX、优先级队列）；第二部分「生产消费」——生产者与确认（消息发送流程basic.publish、Publisher Confirm异步确认、事务模式txSelect、消息持久化delivery_mode=2）、消费者与QoS（消费流程basic.consume、QoS预取prefetch_count、手动Ack确认、nack/reject拒绝）；第三部分「集群与高可用」——集群与镜像队列（集群节点类型Disk/RAM、镜像队列Master-Slave、Quorum Queue基于Raft）、高可用与federation（故障切换、Federation跨集群联邦、Shovel点对点搬运、脑裂防护pause-minority）；第四部分「性能与运维」——性能调优（Erlang VM参数、内存水位vm_memory_high_watermark、磁盘告警disk_free_limit、连接池复用、Lazy Queue）、监控与运维（Management Plugin HTTP API、核心监控指标、告警策略、TLS安全、定义导出备份）。递进逻辑：从消息怎么路由到消息怎么进出到怎么扩展不丢到怎么快怎么管。`,
    tags: ["学习地图", "知识体系", "四部分递进"],
  },
  {
    id: "rmq-lm-2",
    chapter: "rmq-learning-map",
    level: 2,
    question: `贯穿全书的三条核心主线是什么？它们在哪些交汇点形成闭环？`,
    answer: `主线一「消息模型」：Exchange → Binding → Queue → Routing Key，回答「消息怎么路由」。主线二「生产消费」：Publisher → Confirm → Consumer → QoS → Ack，回答「消息怎么流转」。主线三「集群与高可用」：集群 → 镜像队列 → Quorum → Federation → 故障切换，回答「怎么不丢数据、怎么高可用」。三个交汇点：①Exchange-Binding-Queue是消息模型与生产消费的交汇——路由模式决定消息到达哪些队列，是消息流转的起点；②镜像队列是消息模型与高可用的交汇——队列有多副本，Master宕机Slave升主保证数据不丢；③Confirm-Ack是生产消费与可靠性的交汇——Publisher Confirm保证生产端不丢，Consumer手动Ack保证消费端不丢，形成全链路不丢消息的可靠性闭环。`,
    tags: ["三条主线", "交汇点", "核心认知"],
  },
  {
    id: "rmq-lm-3",
    chapter: "rmq-learning-map",
    level: 2,
    question: `为什么学习RabbitMQ要遵循'基础概念→生产消费→集群与高可用→性能运维'的顺序？`,
    answer: `顺序依据：每一步是下一步的前提。基础概念（Exchange/Queue/Binding）是理解一切RabbitMQ行为的抽象基础；生产消费（Publisher/Consumer/Confirm/Ack）建立在消息模型之上，需先理解Exchange路由才能理解消息发送和消费；集群与高可用（集群/镜像/Quorum）建立在生产消费之上，需先理解单机消息流转才能理解集群中的消息复制和故障切换；性能运维（VM调优/监控/安全）建立在完整理解之上。跳过基础的风险：①不懂Exchange类型无法选择合适的消息路由模式；②不懂Confirm和Ack无法配置全链路不丢消息；③不懂镜像队列和Quorum无法选择合适的高可用方案；④不懂Erlang VM参数无法进行生产环境的性能调优。`,
    tags: ["学习路径", "递进逻辑", "依赖关系"],
  },
  {
    id: "rmq-lm-4",
    chapter: "rmq-learning-map",
    level: 3,
    question: `RabbitMQ的核心设计哲学是什么？它与Kafka等流式消息系统有什么本质区别？`,
    answer: `核心设计哲学：以Exchange路由为核心，通过Binding解耦，通过镜像队列实现容错，实现灵活路由、可靠投递、高可用的消息中间件。四大技术特点：①Exchange路由模型——Producer不直接发到Queue，而是发到Exchange，由Binding和Routing Key决定路由到哪些Queue，实现生产者与消费者的彻底解耦；②消息确认机制——Publisher Confirm保证生产端不丢，Consumer手动Ack保证消费端不丢，全链路可靠性；③灵活的消息模式——direct/fanout/topic/headers四种Exchange类型覆盖点对点、广播、模式匹配等全部场景；④集群与镜像容错——集群横向扩展，镜像队列数据冗余，Quorum基于Raft强一致性。与Kafka的区别：RabbitMQ是智能路由+消息确认的传统消息中间件，消息消费后删除，推送模型，擅长灵活路由和低延迟，单机数万消息/秒；Kafka是追加日志+分区并行的流处理平台，消息持久化可重放，拉取模型，擅长高吞吐和流处理，单机百万消息/秒。`,
    tags: ["设计哲学", "RabbitMQ vs Kafka", "Exchange路由"],
  },
];
