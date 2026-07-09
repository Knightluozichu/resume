import type { ReviewQuestion } from "./types";

export const rmqMessagingPatternsQuestions: ReviewQuestion[] = [
  {
    id: "rmq-mp-1",
    chapter: "rmq-messaging-patterns",
    level: 1,
    question: "RabbitMQ的四种Exchange类型分别是什么？各自的路由规则和适用场景是什么？",
    answer: "四种Exchange类型：①direct——Routing Key与Binding Key精确匹配，消息进入匹配的Queue。适用：点对点精确路由、日志按级别分发（RK=error→错误队列）。②fanout——忽略Routing Key，消息广播到所有绑定的Queue。适用：广播通知、配置推送、多消费者全量消费。③topic——Routing Key与Binding Key做通配符匹配，*匹配一个单词，#匹配零或多个单词。适用：订阅过滤、日志按主题路由（如kern.*匹配所有内核日志）。④headers——匹配消息头属性而非Routing Key，x-match:all要求所有头匹配，x-match:any要求任一头匹配。适用：多条件路由、非Routing Key场景。选择决策：需要精确路由用direct，需要广播用fanout（效率最高），需要模式订阅用topic（最灵活），需要多属性匹配用headers（性能最差，尽量用topic替代）。",
    tags: ["Exchange类型", "direct", "fanout", "topic", "headers"],
  },
  {
    id: "rmq-mp-2",
    chapter: "rmq-messaging-patterns",
    level: 2,
    question: "死信队列的触发条件有哪些？如何配置？在什么场景下使用？",
    answer: "死信触发三个条件：①消息被basic.reject或basic.nack且requeue=false——消费者拒绝消息且不重新入队；②消息TTL过期——队列设置了x-message-ttl或消息设置了expiration，超时后成为死信；③队列达到最大长度——设置了x-max-length，超限时队头的消息成为死信。配置方式：在声明Queue时设置参数x-dead-letter-exchange指定死信Exchange，x-dead-letter-routing-key指定死信路由键（可选，不设置则用原消息的Routing Key）。使用场景：①消费失败隔离——处理失败的消息进入死信队列，由专门的消费者进行人工处理或告警；②配合TTL实现延迟队列——消息先进入有TTL的队列，过期后通过DLX转发到目标队列实现延迟消费；③防止有毒消息无限重试——限制重试次数后进入死信队列，避免阻塞正常消费。",
    tags: ["死信队列", "DLX", "TTL", "消息拒绝"],
  },
  {
    id: "rmq-mp-3",
    chapter: "rmq-messaging-patterns",
    level: 2,
    question: "延迟队列有哪两种实现方式？各自的优缺点是什么？",
    answer: "两种实现方式：①TTL+DLX方案（原生支持，无需插件）：给消息设置TTL（x-message-ttl或expiration），消息过期后成为死信，通过x-dead-letter-exchange转发到目标Queue被消费。优点：无需安装插件，原生支持。缺点：队列级TTL有头部阻塞问题——如果队列设置统一TTL，前面消息未过期时后面消息即使先过期也不能出队，因为Queue是FIFO的。②rabbitmq_delayed_message_exchange插件方案：安装插件后声明x-delayed-message类型Exchange，发送消息时设置x-delay头为延迟毫秒数，Exchange延迟指定时间后路由到绑定Queue。优点：每条消息独立延迟，无头部阻塞问题。缺点：需要安装插件，插件将消息存储在Mnesia表中，大量延迟消息可能影响性能。典型应用：订单超时取消、延迟重试、定时通知。",
    tags: ["延迟队列", "TTL", "DLX", "delayed_message插件"],
  },
  {
    id: "rmq-mp-4",
    chapter: "rmq-messaging-patterns",
    level: 3,
    question: "topic Exchange的通配符规则是什么？如何设计Routing Key和Binding Key来实现灵活的订阅过滤？",
    answer: "topic Exchange通配符规则：Routing Key和Binding Key都是以点号（.）分隔的单词字符串，如kern.critical.disk。*匹配恰好一个单词，#匹配零或多个单词。匹配示例：Binding Key kern.*匹配kern.critical和kern.info但不匹配kern.critical.disk；Binding Key kern.#匹配kern、kern.critical和kern.critical.disk；Binding Key #.critical匹配所有以.critical结尾的Routing Key；Binding Key #匹配所有消息（等同于fanout）。设计建议：①Routing Key用层次结构——如facility.severity（设施.严重级别），便于按维度过滤；②Binding Key按订阅需求设计——运维只订阅*.critical和*.error，开发只订阅app.#，DBA只订阅db.*；③特殊键：#作为Binding Key等同于fanout广播。topic Exchange是最灵活的路由方式，推荐用于需要动态订阅过滤的场景。",
    tags: ["topic", "通配符", "Routing Key", "Binding Key", "模式匹配"],
  },
];
