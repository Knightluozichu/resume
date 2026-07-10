import type { ReviewQuestion } from "./types";

export const mspInterServiceCommQuestions: ReviewQuestion[] = [
  {
    id: "msp-comm-1",
    chapter: "msp-inter-service-comm",
    level: 1,
    question: `同步通信和异步通信的区别是什么？如何选型？`,
    answer:
      `同步通信（请求-响应）：调用方发起请求并阻塞等待响应（REST/gRPC），需知被调方地址，被调方宕机则调用方失败，但能即时返回结果。异步通信（消息驱动）：调用方发布消息到Broker后立即返回，被调方从Broker消费消息（Kafka/RabbitMQ），通过Broker解耦，被调方宕机时消息缓存恢复后消费，但结果有延迟。选型原则：需要即时结果用同步（查询库存、扣减余额），可异步处理用异步消息（发通知、记日志）。核心经验：能异步就异步，必须同步才同步——减少同步调用链长导致的级联故障风险。`,
    tags: ["同步通信", "异步通信", "REST", "gRPC", "选型"],
  },
  {
    id: "msp-comm-2",
    chapter: "msp-inter-service-comm",
    level: 2,
    question: `熔断器的三个状态是什么？它是如何防止级联故障的？`,
    answer:
      `熔断器三态：①Closed（正常）——正常调用下游服务，同时统计失败率，失败率超阈值时切换到Open。②Open（熔断）——快速失败，不再实际调用下游，直接返回错误或降级结果，防止故障级联扩散。等待冷却时间后切换到Half-Open。③Half-Open（半开）——限量放行探测请求试探下游是否恢复，成功则切回Closed，失败则切回Open。防级联原理：下游故障时调用方持续重试等待会耗尽线程池导致调用方也不可用，进而向上扩散形成雪崩。熔断器在检测到故障后快速失败，让调用方保留资源处理其他请求，将故障隔离在局部范围内。`,
    tags: ["熔断器", "Circuit Breaker", "级联故障", "容错"],
  },
  {
    id: "msp-comm-3",
    chapter: "msp-inter-service-comm",
    level: 1,
    question: `什么是幂等性？为什么微服务通信中必须保证幂等？如何实现？`,
    answer:
      `幂等性指对同一操作执行一次和执行多次效果完全相同。微服务中必须保证幂等因为：网络超时导致的重试、消息系统的重复投递，使重复执行不可避免。实现方式：①唯一ID去重表——记录已处理的requestId，重复请求直接返回。②Token机制——先获取Token，提交时校验并失效。③乐观锁——用version号校验，版本不匹配则拒绝。④状态机——只允许合法状态转换，重复请求发现状态已变更则拒绝。核心：所有写操作必须幂等，读操作天然幂等。`,
    tags: ["幂等性", "重试", "唯一ID", "Token", "乐观锁"],
  },
  {
    id: "msp-comm-4",
    chapter: "msp-inter-service-comm",
    level: 2,
    question: `REST和gRPC各自的优劣是什么？分别适合什么场景？`,
    answer:
      `REST优势：通用性强（HTTP标准）、浏览器友好、易调试（curl/Postman）。劣势：文本序列化性能不如二进制、强类型需额外约束（OpenAPI）、无双向流。gRPC优势：Protobuf二进制性能高、强类型契约（.proto）、支持双向流。劣势：浏览器不直接支持（需gRPC-Web）、调试不如HTTP直观、需要IDL工具链。选型：外部API和浏览器交互用REST，内部服务间高频通信用gRPC。需双向流（实时推送）用gRPC。简单CRUD用REST，复杂接口契约用gRPC。`,
    tags: ["REST", "gRPC", "Protobuf", "通信选型"],
  },
];
