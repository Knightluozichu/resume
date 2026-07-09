import type { ReviewQuestion } from "./types";

export const rmqFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rmq-fr-1",
    chapter: "rmq-final-review",
    level: 1,
    question: "请描述RabbitMQ全链路不丢消息的完整配置方案。",
    answer: "全链路不丢消息分三层保障：①生产端不丢——a) Publisher Confirm异步确认：channel.confirmSelect()开启，addConfirmListener注册回调，收到ack表示消息到达Broker，收到nack重发。b) 消息持久化：Exchange声明durable=true，消息属性delivery_mode=2写入磁盘。c) 本地重发表：发送前写本地数据库表，收到ack后删除/标记成功，nack或超时从本地表重发。②Broker不丢——a) Queue持久化：Queue声明durable=true。b) 消息持久化：delivery_mode=2消息写入磁盘。c) 镜像队列/Quorum Queue：消息多副本，节点宕机不丢。推荐Quorum Queue（Raft多数派确认，强一致无脑裂）。③消费端不丢——a) 手动Ack：autoAck=false，处理完成才basic.ack，消费者崩溃未Ack消息重新入队。b) 消费幂等：防止重试重复消费，用message_id去重表/业务状态检查/乐观锁。c) 失败处理：nack requeue=false进死信队列，防止有毒消息无限重试。全链路公式：Confirm + 持久化 + 镜像 + 手动Ack + 幂等 = 不丢不重。",
    tags: ["全链路", "不丢消息", "Confirm", "持久化", "镜像", "Ack", "幂等"],
  },
  {
    id: "rmq-fr-2",
    chapter: "rmq-final-review",
    level: 2,
    question: "RabbitMQ的三条核心主线在哪些交汇点形成闭环？请详细解释每个交汇点。",
    answer: "三个交汇点：①Exchange-Binding-Queue（消息模型与生产消费的交汇）——路由模式决定消息到达哪些Queue，是消息流转的起点。生产者发送消息到Exchange（指定Routing Key），Exchange根据Binding规则路由到一个或多个Queue，消费者从Queue消费。路由逻辑通过Binding可随时修改（增删Binding关系），不影响生产者和消费者代码，实现生产者与消费者的解耦。②镜像队列/Quorum（消息模型与集群高可用的交汇）——Queue的多副本保证数据安全。消息模型中的Queue是高可用的保护对象，Queue durable=true + 消息delivery_mode=2持久化 + 镜像/Quorum多副本 = 数据不丢。镜像队列Master-Slave模式Master宕机Slave升主，Quorum Queue基于Raft Leader宕机自动选举新Leader。③Confirm-Ack（生产消费与可靠性的交汇）——Publisher Confirm保证生产端消息到达Broker，Consumer手动Ack保证消费端消息处理完成。两者配合形成全链路不丢消息的可靠性闭环。配合消费幂等设计实现不丢不重。三个交汇点串联了全书四部分知识：消息模型解决路由、生产消费解决流转、集群高可用解决容错。",
    tags: ["三条主线", "交汇点", "Exchange-Binding-Queue", "镜像队列", "Confirm-Ack"],
  },
  {
    id: "rmq-fr-3",
    chapter: "rmq-final-review",
    level: 3,
    question: "RabbitMQ和Kafka在设计哲学和适用场景上有什么本质区别？",
    answer: "设计哲学区别：①RabbitMQ——以Exchange路由为核心，通过Binding解耦生产与消费，通过镜像队列实现容错。核心是智能路由+消息确认，Exchange根据Routing Key和Binding规则灵活路由消息到多个Queue，实现生产者与消费者的彻底解耦。消息消费后从Queue删除，是传统消息队列模型。②Kafka——以追加写入的分布式提交日志为核心，通过分区实现并行，通过副本实现容错。核心是顺序日志+分区并行，消息持久化在磁盘日志中可被多次重放，是流处理平台模型。技术差异：①路由——RabbitMQ有Exchange四种类型灵活路由；Kafka只有Topic+Partition。②消费模型——RabbitMQ推送模型push；Kafka拉取模型pull。③消息保留——RabbitMQ消息消费后删除；Kafka消息有保留期可重放。④可靠性——RabbitMQ用Confirm+Ack确认；Kafka用acks+ISR副本+Offset提交。⑤吞吐——RabbitMQ单机数万消息/秒；Kafka单机百万消息/秒。适用场景：RabbitMQ适合灵活路由、低延迟、可靠投递、复杂消息模式（死信/延迟/优先级）的场景。Kafka适合高吞吐、流处理、消息回溯、日志聚合的场景。",
    tags: ["RabbitMQ vs Kafka", "设计哲学", "Exchange路由", "追加日志", "推送vs拉取"],
  },
  {
    id: "rmq-fr-4",
    chapter: "rmq-final-review",
    level: 3,
    question: "如果你要为一个电商系统设计消息中间件方案，如何综合运用RabbitMQ的各项能力？",
    answer: "电商系统消息中间件方案设计：①核心消息路由——使用topic Exchange实现按业务模块路由：Routing Key为module.event格式（如order.created、payment.success、inventory.updated）。各服务按需订阅。②订单超时取消——延迟队列实现：用户下单后消息发到延迟Exchange（rabbitmq_delayed_message_exchange插件），设置x-delay=30分钟，30分钟后消息到达目标Queue，消费者检查订单状态，未支付则取消订单释放库存。③消费失败处理——死信队列+重试机制：消息被nack requeue=false进入死信队列。配置重试队列（TTL递增），消息重试3次后进入死信队列。④全链路不丢消息——生产端：Publisher Confirm+消息持久化+本地重发表。Broker：Quorum Queue保证数据安全。消费端：autoAck=false手动Ack+消费幂等（order_id去重表）。⑤高可用部署——3节点集群+Quorum Queue，pause-minority脑裂防护。跨机房用Shovel同步核心订单消息到灾备机房。⑥性能优化——订单消息用持久化，日志消息用非持久化。prefetch_count=20平衡吞吐和公平性。连接池复用。⑦监控告警——Prometheus+Grafana监控queue_depth、node_status、消费速率。⑦安全——TLS加密通信，按业务线隔离VHost，最小权限原则。",
    tags: ["电商系统", "综合应用", "topic Exchange", "延迟队列", "死信队列", "高可用", "Quorum Queue"],
  },
];
