import type { ReviewQuestion } from "./types";

export const kfkConsumersQuestions: ReviewQuestion[] = [
  {
    id: "kfk-cs-1",
    chapter: "kfk-consumers",
    level: 1,
    question: `Kafka消费者组（Consumer Group）的核心机制是什么？它如何同时实现负载均衡和广播？`,
    answer: `消费者组机制：①一个消费者组包含多个消费者实例，共同消费一组Topic；②分区分配规则——同一消费者组内，每个Partition只能被一个消费者消费（负载均衡），不同消费者组各自独立消费全量数据（广播）。③再均衡（Rebalance）——消费者加入/离开/崩溃时，分区重新分配给存活消费者。负载均衡：组内N个消费者分M个分区，每个消费者消费M/N个分区（向下取整+余数），消费者数超过分区数时多余消费者空闲。广播：不同消费者组各自维护自己的Offset，互不干扰，每个组都能消费到全量消息。关键点：①消费者组通过group.id标识；②消费者数≤分区数才能充分利用；③消费者组是Kafka实现「一条消息被多个下游系统独立消费」的核心机制——每个下游系统用一个独立的group.id。再均衡时消费者短暂不可用（stop-the-world），需通过Cooperative协议减少影响。`,
    tags: ["消费者组", "负载均衡", "广播", "再均衡"],
  },
  {
    id: "kfk-cs-2",
    chapter: "kfk-consumers",
    level: 2,
    question: `Kafka消费者Offset管理的两种提交方式是什么？各自的优缺点和适用场景？`,
    answer: `两种Offset提交方式：①自动提交（enable.auto.commit=true）——消费者后台线程定期（auto.commit.interval.ms，默认5秒）自动提交poll()返回的最新Offset。优点：简单无需编码。缺点：可能重复消费（处理完消息但还没提交就崩溃，重启后从上次提交位置重新消费）和消息丢失（poll()返回消息后自动提交了Offset，但消息还没处理完就崩溃）。无法控制精确提交时机。②手动提交——enable.auto.commit=false，代码中显式调用commitSync()（同步阻塞提交，失败重试）或commitAsync()（异步非阻塞，失败不重试）。优点：精确控制提交时机，可在消息处理完成后提交，实现至少一次语义。缺点：增加编码复杂度，commitSync()阻塞影响吞吐，commitAsync()失败可能导致重复消费。最佳实践：处理完消息后commitAsync()（高吞吐），关闭消费者前commitSync()（保证最后一次提交成功）。适用场景：自动提交适合容忍少量重复/丢失的日志场景；手动提交适合需要精确一次处理语义的业务场景（配合幂等消费）。`,
    tags: ["Offset提交", "自动提交", "手动提交", "至少一次"],
  },
  {
    id: "kfk-cs-3",
    chapter: "kfk-consumers",
    level: 2,
    question: `Kafka消费者再均衡（Rebalance）的触发条件和流程是什么？如何减少再均衡的影响？`,
    answer: `触发条件：①消费者加入组——新消费者实例启动或已有消费者组新增消费者；②消费者离开组——消费者主动close()或崩溃（心跳超时session.timeout.ms未收到心跳）；③订阅的Topic分区数变化——Topic分区增加；④消费者组协调器（Group Coordinator）切换。流程：①消费者通过心跳线程向Group Coordinator发送Heartbeat；②Coordinator检测到需要再均衡，在Heartbeat响应中返回REBALANCE_IN_PROGRESS；③消费者调用JoinGroup请求加入（携带订阅信息），Coordinator选出一个Consumer Leader；④Leader根据分区分配策略（Range/RoundRobin/StickyAssignor）计算分配方案；⑤Coordinator将方案通过SyncGroup下发给所有消费者；⑥消费者按新分配方案消费。影响：再均衡期间所有消费者停止消费（stop-the-world），造成短暂延迟。减少影响：①CooperativeRebalance协议——增量再均衡，只交换变化的分区，不影响不变分区；②合理设置session.timeout.ms和heartbeat.interval.ms——避免误判崩溃；③max.poll.interval.ms——两次poll()最大间隔，超时触发再均衡，处理慢的消费者需调大；④StickyAssignor——尽量保持已有分配不变，减少分区迁移。`,
    tags: ["再均衡", "Rebalance", "心跳", "Cooperative"],
  },
  {
    id: "kfk-cs-4",
    chapter: "kfk-consumers",
    level: 3,
    question: `Kafka消费者如何实现精确一次（Exactly-Once）语义？需要哪些条件配合？`,
    answer: `消费者Exactly-Once语义：核心思想是将消费处理与Offset提交原子化。方案：①消费-处理-提交原子化——将消息处理结果与Offset提交放在同一个事务中。例如消费Kafka消息→写入数据库→在同一事务中提交Offset到Kafka的__consumer_offsets。但Kafka Offset存储在内部Topic，无法与外部DB做分布式事务。②实际方案：将处理结果和Offset都写入Kafka——使用Kafka事务，消费者消费输入Topic→处理→写入输出Topic+提交Offset到Kafka，全部在一个Kafka事务中提交（consume-transform-produce模式）。需配置isolation.level=read_committed只读取已提交事务的消息。③外部存储Offset——将Offset存储在外部系统（如ZooKeeper/Redis/DB），消费处理和Offset更新在同一本地事务中原子完成。④幂等消费——即使重复消费也通过业务层幂等（如唯一键约束、去重表）保证不重复处理。完整Exactly-Once需要：生产者端enable.idempotence=true+transactional.id+acks=all；消费者端isolation.level=read_committed；处理端幂等或事务。注意Kafka的Exactly-Once仅覆盖Kafka内部（生产→Kafka→消费→写回Kafka），涉及外部系统需额外保证。`,
    tags: ["Exactly-Once", "精确一次", "事务", "幂等消费"],
  },
];
