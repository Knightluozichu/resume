import type { ReviewQuestion } from "./types";

export const rmqAmqpBasicsQuestions: ReviewQuestion[] = [
  {
    id: "rmq-ab-1",
    chapter: "rmq-amqp-basics",
    level: 1,
    question: `AMQP 0-9-1协议的核心消息模型是什么？为什么说它实现了生产者与消费者的解耦？`,
    answer: `AMQP核心模型：Producer发送消息到Exchange（指定Routing Key），Exchange根据Binding规则将消息路由到一个或多个Queue，Consumer从Queue消费消息。解耦体现在：①生产者不需要知道有哪些Queue和Consumer存在，只需指定Exchange和Routing Key；②Exchange根据Binding规则自动路由，路由逻辑可随时修改（增删Binding）而不影响生产者代码；③消费者只需订阅Queue，不需要知道消息来源；④多个消费者可以订阅同一个Queue实现负载均衡，也可以订阅不同Queue实现独立消费。这种解耦使得生产者、路由逻辑、消费者三者可以独立演化。`,
    tags: ["AMQP", "消息模型", "Exchange", "解耦"],
  },
  {
    id: "rmq-ab-2",
    chapter: "rmq-amqp-basics",
    level: 2,
    question: `Connection和Channel的关系是什么？为什么需要Channel多路复用？`,
    answer: `Connection是客户端与RabbitMQ Broker之间的TCP长连接，每个Connection需要一次TCP握手和系统资源分配。Channel是Connection上的虚拟连接（AMQP虚拟通道），一个Connection可以创建多个Channel，每个Channel可以独立收发消息。需要Channel多路复用的原因：①TCP连接建立成本高——每次TCP握手需要三次握手+TLS握手（如果启用），建立慢且消耗系统资源（端口、内存）；②Channel是轻量级的——创建和销毁Channel的开销远小于Connection；③多线程场景——每个线程使用独立Channel收发消息，避免锁竞争，但共享同一Connection减少TCP连接数。最佳实践：应用使用连接池维护少量Connection（如2-5个），每个Connection上创建多个Channel供线程使用。注意Channel不是线程安全的，同一Channel不能跨线程共享。`,
    tags: ["Connection", "Channel", "多路复用", "连接池"],
  },
  {
    id: "rmq-ab-3",
    chapter: "rmq-amqp-basics",
    level: 2,
    question: `RabbitMQ消息持久化需要满足哪些条件？为什么三个条件缺一不可？`,
    answer: `消息持久化三个条件：①Exchange声明为durable=true——Broker重启后Exchange定义不丢失，否则Exchange消失，消息无处路由；②Queue声明为durable=true——Broker重启后Queue定义不丢失，否则Queue消失，消息没有存储载体；③消息属性delivery_mode=2——消息体写入磁盘，否则消息只在内存中，重启即丢。缺一不可的原因：如果Exchange不是durable，Broker重启后Exchange不存在，新消息无法路由；如果Queue不是durable，Broker重启后Queue不存在，即使消息持久化了也没有Queue来承载；如果消息delivery_mode不是2，即使Exchange和Queue都持久化，消息只在内存中，Broker重启后消息消失。三者构成路由+存储+消息的完整持久化链路。`,
    tags: ["持久化", "durable", "delivery_mode", "可靠性"],
  },
  {
    id: "rmq-ab-4",
    chapter: "rmq-amqp-basics",
    level: 3,
    question: `VHost的作用是什么？在什么场景下需要使用多个VHost？`,
    answer: `VHost（Virtual Host）是RabbitMQ的资源隔离单元，每个VHost拥有独立的Exchange、Queue、Binding和用户权限。VHost类似数据库的schema概念，不同VHost之间的资源完全隔离，互不影响。需要多VHost的场景：①多租户隔离——SaaS平台为每个租户创建独立VHost，保证消息和资源不互相干扰；②环境隔离——开发、测试、生产环境使用不同VHost，部署在同一集群但资源隔离；③业务隔离——不同业务线（如订单、支付、通知）使用不同VHost，避免Exchange/Queue命名冲突；④权限控制——用户权限按VHost分配，运维人员只能管理自己负责的VHost。VHost通过rabbitmqctl add_vhost或Management UI创建，客户端连接时指定vhost参数。`,
    tags: ["VHost", "资源隔离", "权限管理", "多租户"],
  },
];
