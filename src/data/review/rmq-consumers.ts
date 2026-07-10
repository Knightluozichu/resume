import type { ReviewQuestion } from "./types";

export const rmqConsumersQuestions: ReviewQuestion[] = [
  {
    id: "rmq-cs-1",
    chapter: "rmq-consumers",
    level: 1,
    question: `RabbitMQ的推送模型（push）与Kafka的拉取模型（pull）有什么区别？各有什么优缺点？`,
    answer: `RabbitMQ推送模型（push）：消费者通过basic.consume订阅Queue后，Broker主动将消息推送给消费者。优点：①低延迟——消息到达Queue后立即推送，消费者无需轮询；②简单——消费者只需注册回调。缺点：①消费者无法控制消费速率——需要QoS（prefetch_count）来限流；②无法回溯——消息推送后即消费，不能重新消费历史消息。Kafka拉取模型（pull）：消费者主动从Broker拉取消息，通过Offset控制消费位置。优点：①消费者自主控制速率——按需拉取不会被压垮；②可回溯——通过修改Offset重新消费历史消息；③批处理友好——可一次拉取多条批量处理。缺点：①延迟可能较高——需要轮询间隔；②需消费者管理Offset。总结：RabbitMQ push适合低延迟实时消费场景，Kafka pull适合高吞吐可回溯场景。RabbitMQ的QoS机制弥补了push模型的速率控制问题。`,
    tags: ["push模型", "pull模型", "QoS", "消费模型", "RabbitMQ vs Kafka"],
  },
  {
    id: "rmq-cs-2",
    chapter: "rmq-consumers",
    level: 2,
    question: `prefetch_count的作用是什么？如何根据业务场景调优？`,
    answer: `prefetch_count通过basic.qos设置，限制Broker向消费者推送的未Ack消息数量。作用：防止Broker推送过多消息导致消费者内存溢出或积压，实现消费限流和公平分发。调优策略：①prefetch_count=1——严格公平分发，处理完一条才收下一条，慢消费者不会被压垮，但每条消息需一个RTT往返，吞吐量低。适合消息处理耗时长、需要严格顺序的场景。②prefetch_count=10~100——平衡吞吐量和公平性，推荐生产环境起始值。Broker预推送多条消息，消费者可并行处理（多线程），减少等待。适合大多数业务场景。③prefetch_count=0（默认）——无限制，Broker尽快推送所有消息。吞吐量最高但慢消费者有积压风险，不推荐。调优原则：消息处理快（<1ms）→增大prefetch（50-100）；消息处理慢（>100ms）→减小prefetch（1-10）；消息体大（>10KB）→减小prefetch避免内存溢出。global=true时限制整个Connection，global=false时每个Channel独立限制（默认）。`,
    tags: ["prefetch_count", "QoS", "消费限流", "公平分发", "调优"],
  },
  {
    id: "rmq-cs-3",
    chapter: "rmq-consumers",
    level: 2,
    question: `autoAck=true和autoAck=false有什么区别？为什么生产环境必须使用手动Ack？`,
    answer: `autoAck=true（自动确认）：Broker将消息推送给消费者后立即从Queue中删除，不等消费者处理完成。如果消费者在处理过程中崩溃，消息已经从Queue删除，导致消息丢失。autoAck=false（手动确认）：消费者收到消息后，Broker不立即删除，等消费者调用basic.ack后才删除。如果消费者崩溃（连接断开），未Ack的消息会被Broker重新入队，分发给其他消费者，不会丢失。生产环境必须使用autoAck=false的原因：①防止消息丢失——消费者处理过程中崩溃时，未Ack的消息不会丢失，Broker会重新投递；②控制消费确认时机——处理完成才确认，确保业务逻辑执行成功；③配合QoS使用——prefetch_count只在autoAck=false时有效，autoAck=true时QoS无意义。autoAck=true仅适合对可靠性无要求的场景（如日志收集可容忍少量丢失），或消息处理极快（<1ms）的场景。`,
    tags: ["autoAck", "手动Ack", "消息确认", "可靠性", "消费端不丢"],
  },
  {
    id: "rmq-cs-4",
    chapter: "rmq-consumers",
    level: 3,
    question: `如何设计消费幂等性？请描述三种幂等方案及其适用场景。`,
    answer: `三种消费幂等方案：①唯一message_id + 去重表——生产者发送时设置message_id（UUID），消费者处理前先查去重表（数据库或Redis），如果已存在则直接Ack跳过；处理完后将message_id写入去重表。适用：通用方案，所有场景都适用。缺点：需要额外的存储和查询开销。②业务状态检查——消费者处理前检查业务状态，如果已经处于目标状态则跳过。例如订单消息检查订单状态是否已支付，已支付则跳过。适用：业务实体有明确状态机的场景（如订单状态机）。优点：不需要额外存储，利用已有业务数据。缺点：需要业务逻辑支持状态判断。③乐观锁/版本号——通过UPDATE WHERE version=?实现，更新0行表示已被处理过。例如UPDATE order SET status=paid, version=version+1 WHERE order_id=? AND version=?。适用：数据库更新操作，天然有乐观锁支持的场景。优点：原子操作，无需额外查询。生产环境建议：优先用方案二（业务状态检查），成本最低；关键业务叠加方案一（message_id去重）双重保障；数据库更新场景用方案三（乐观锁）。同时配合nack requeue=false + 死信队列处理真正无法消费的消息。`,
    tags: ["消费幂等", "去重表", "业务状态检查", "乐观锁", "重复消费"],
  },
];
