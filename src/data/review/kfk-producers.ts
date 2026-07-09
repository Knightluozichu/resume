import type { ReviewQuestion } from "./types";

export const kfkProducersQuestions: ReviewQuestion[] = [
  {
    id: "kfk-pr-1",
    chapter: "kfk-producers",
    level: 1,
    question: "Kafka生产者发送消息的完整流程是什么？从send()到消息写入分区经过哪些步骤？",
    answer: "生产者发送流程：①Producer创建KafkaProducer实例，配置bootstrap.servers/serializer/partitioner等；②调用send(record)——将消息放入RecordAccumulator（消息累加器）的对应分区batch中，send()立即返回Future（异步）；③后台Sender线程轮询RecordAccumulator——当batch满了（batch.size）或等待超时（linger.ms）时，Sender线程将batch组装成ProduceRequest发送给对应分区的Leader Broker；④Broker收到请求——Leader将消息追加写入Partition的活跃Segment日志，根据acks配置等待Follower同步；⑤Broker返回响应——Leader返回写入成功/失败响应给Producer，包含offset或异常；⑥回调执行——如果send()时传了Callback，在收到响应后触发回调（成功含offset，失败含异常）。关键配置：acks控制可靠性，linger.ms+batch.size控制吞吐与延迟的平衡，retries+retry.backoff.ms控制重试。",
    tags: ["生产者", "发送流程", "RecordAccumulator", "Sender"],
  },
  {
    id: "kfk-pr-2",
    chapter: "kfk-producers",
    level: 2,
    question: "Kafka生产者的三种acks模式各有什么语义？它们如何在可靠性和性能之间取舍？",
    answer: "三种acks模式：①acks=0——生产者发送后不等任何确认，Fire and Forget。最高吞吐、最低延迟，但可能丢数据（网络故障/Broker宕机/Leader切换均丢）。适用于日志采集等容忍丢失的场景。②acks=1——Leader写入成功后即返回确认，不等Follower同步。如果Leader在Follower同步前宕机，消息可能丢失。吞吐和延迟较好，可靠性中等。是旧版默认值。③acks=all（或-1）——Leader等待ISR中所有副本都同步后才返回确认。最可靠（只要ISR有一个存活就不丢），但延迟最高（等待最慢的Follower）。是2.x+生产环境推荐值。配合min.insync.replicas使用：min.insync.replicas=N表示ISR至少有N个副本才接受写入，否则拒绝（抛NotEnoughReplicasException）。可靠性取舍：acks=0最不安全但最快，acks=1中等，acks=all最安全但最慢。生产环境通常用acks=all+min.insync.replicas=2+retries=Integer.MAX_VALUE+delivery.timeout.ms控制总重试时间。",
    tags: ["acks", "可靠性", "ISR", "min.insync.replicas"],
  },
  {
    id: "kfk-pr-3",
    chapter: "kfk-producers",
    level: 2,
    question: "Kafka生产者的分区器（Partitioner）有哪些策略？自定义分区器需要实现什么？",
    answer: "分区策略：①指定Partition——如果ProducerRecord指定了partition字段，直接使用该分区号，不走分区器；②Key哈希分区（默认）——如果指定了key（非null），对key做 murmur2 hash 后取模分区数（Utils.toPositive(murmur2(keyBytes)) % numPartitions），保证同一key的消息总是进同一分区，实现消息有序性；③无Key轮询/Sticky分区——如果没有key，2.4+使用Sticky分区器：先随机选一个分区并尽量复用（Sticky），当当前batch满了后切换到另一个分区，相比纯轮询减少了请求次数，提高吞吐。自定义分区器：实现org.apache.kafka.clients.producer.Partitioner接口，重写partition(topic, key, keyBytes, value, valueBytes, cluster)方法返回分区号，在producer config中通过partitioner.class指定。自定义场景：按业务规则分区（如VIP用户优先分区）、按地域亲和性分区等。注意分区数变化时key哈希的映射会改变。",
    tags: ["分区器", "Key哈希", "Sticky", "自定义分区"],
  },
  {
    id: "kfk-pr-4",
    chapter: "kfk-producers",
    level: 3,
    question: "Kafka生产者如何实现消息有序性？在不同acks和retries配置下如何保证不丢不重？",
    answer: "消息有序性保证：①分区内有序——Kafka保证同一Partition内消息按写入顺序排列，这是Kafka的基本保证。②全局有序——只能用单分区Topic实现（吞吐受限），或多分区+按key路由保证同一key有序。③生产者有序性陷阱——默认enable.idempotence=false时，retries可能导致消息重排序：如果batch1写入失败重试，batch2先成功，则batch2排在batch1前面。④幂等生产者——enable.idempotence=true时，Broker通过PID（Producer ID）+SequenceNumber去重，保证同一分区内消息不重不乱，retries不会导致重排序。⑤事务生产者——transactional.id配合initTransactions()+beginTransaction()+commitTransaction()，实现跨分区跨会话的Exactly-Once。不丢不重配置：acks=all+min.insync.replicas≥2+enable.idempotence=true+retries=Integer.MAX_VALUE+max.in.flight.requests.per.connection≤5（幂等模式下≤5保证有序，非幂等模式下≤1保证有序）。注意：幂等性要求max.in.flight.requests.per.connection≤5，否则可能有序性问题。",
    tags: ["有序性", "幂等", "事务", "不丢不重"],
  },
];
