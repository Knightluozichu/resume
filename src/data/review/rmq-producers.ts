import type { ReviewQuestion } from "./types";

export const rmqProducersQuestions: ReviewQuestion[] = [
  {
    id: "rmq-pd-1",
    chapter: "rmq-producers",
    level: 1,
    question: "生产者发送消息的完整流程是什么？每一步的作用是什么？",
    answer: "完整流程五步：①创建Connection——通过ConnectionFactory建立与RabbitMQ Broker的TCP长连接，配置host/port/username/password/vhost等参数；②创建Channel——在Connection上创建虚拟通道，后续所有AMQP操作（声明Exchange/Queue、发送消息）都在Channel上进行；③声明Exchange——调用exchangeDeclare声明交换器，指定名称、类型（direct/fanout/topic/headers）、durable（是否持久化）等参数，幂等操作，已存在则不报错；④构建消息——创建AMQP.BasicProperties设置消息属性（delivery_mode=2持久化、content_type、priority、correlation_id等）和消息体（byte数组）；⑤调用basicPublish——指定Exchange名称、Routing Key、消息属性和消息体，将消息发送到Broker。消息到达Exchange后，由Exchange根据Binding规则路由到Queue。",
    tags: ["生产者", "发送流程", "basic.publish", "Connection", "Channel"],
  },
  {
    id: "rmq-pd-2",
    chapter: "rmq-producers",
    level: 2,
    question: "Publisher Confirm和事务模式有什么区别？为什么推荐使用Confirm而非事务？",
    answer: "两种模式都用于保证消息可靠到达Broker，但机制和性能差异巨大：①工作方式——事务模式通过txSelect/txCommit/txRollback实现，每条消息需要Broker同步确认后才返回；Confirm模式通过confirmSelect开启，Broker异步批量发送ack/nack，生产者不需要等待每条消息确认。②性能——事务模式吞吐量约几百到几千消息/秒，Confirm模式可达数万到数十万消息/秒，事务模式比Confirm模式慢约250倍。③原子性——事务模式支持跨多条消息的原子性（全部成功或全部回滚），Confirm模式只能确认单条消息是否到达，不支持跨消息原子性。④推荐——绝大多数场景用Confirm即可满足可靠性需求（单条消息不丢），且性能远优于事务。仅在需要多条消息原子性发送的罕见场景才考虑事务模式。生产环境推荐异步Confirm + 本地重发表策略。",
    tags: ["Publisher Confirm", "事务模式", "txSelect", "性能对比", "可靠性"],
  },
  {
    id: "rmq-pd-3",
    chapter: "rmq-producers",
    level: 2,
    question: "如何实现生产端消息不丢失？请描述完整的可靠性发送策略。",
    answer: "生产端消息不丢失的完整策略：①Publisher Confirm + 异步回调——开启confirmSelect，注册addConfirmListener，收到ack表示消息已到达Broker，收到nack表示未到达需重发。②消息持久化——Exchange声明durable=true，消息属性delivery_mode=2，确保Broker收到后写入磁盘，即使Broker重启也不丢。③本地重发表——发送消息前先写入本地数据库表（消息体+Exchange+Routing Key+状态=待确认），发送并收到ack后删除或标记成功；nack或超时则从本地表重发。④重发幂等——消费者端需做幂等处理（唯一message_id+去重表），因为重发可能导致重复消费。⑤连接重试——网络断开时自动重连，重连后继续发送未确认的消息。这套策略即使应用崩溃、网络断开、Broker重启，也能保证消息不丢。权衡：本地重发表增加了数据库写入开销和延迟，对于非关键业务可省略，仅用Confirm + 持久化即可。",
    tags: ["消息不丢", "Publisher Confirm", "持久化", "本地重发表", "可靠性"],
  },
  {
    id: "rmq-pd-4",
    chapter: "rmq-producers",
    level: 3,
    question: "消息属性（Basic.Properties）有哪些关键字段？如何根据业务需求配置？",
    answer: "关键字段及配置策略：①delivery_mode——2=持久化（写入磁盘），1=非持久化（仅内存）。生产环境推荐2，Broker重启不丢。②content_type——如application/json，标准化消息格式便于消费端解析。③message_id——消息唯一标识（UUID），用于消费端幂等去重。④correlation_id——RPC模式中关联请求与响应，消费者处理完将结果发到reply_to队列并带上相同correlation_id。⑤priority——0-255优先级值，配合优先级队列使用，高优先级先消费。⑥timestamp——消息创建时间，用于延迟检测和监控。⑦expiration——消息级TTL（毫秒），过期后成为死信。⑧reply_to——RPC模式回复队列名。配置策略：核心业务消息——delivery_mode=2 + message_id + content_type + timestamp（全属性）。日志类消息——delivery_mode=1或2 + content_type（精简属性）。RPC请求——correlation_id + reply_to。延迟消息——expiration或x-delay头。",
    tags: ["消息属性", "Basic.Properties", "delivery_mode", "correlation_id", "RPC"],
  },
];
