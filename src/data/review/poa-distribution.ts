import type { ReviewQuestion } from "./types";

export const poaDistributionQuestions: ReviewQuestion[] = [
  {
    id: "poa-distribution-01",
    chapter: "poa-distribution",
    level: 1,
    question: "为什么 Fowler 说「分布式对象的第一法则：不要分布式」？",
    answer: "因为分布式会带来显著代价：① 网络延迟——远程调用比本地方法调用慢几个数量级；② 序列化开销——对象需要编解码才能在网络传输；③ 可靠性降低——网络不可靠，需要处理超时、重试、部分失败；④ 部署复杂——多节点部署和运维成本高。Fowler 的建议是：优先使用单体架构，只有在确有必要（团队协作隔离、性能瓶颈独立扩展、技术异构）时才拆分分布式系统，且拆分后要用远程外观和 DTO 最小化远程调用次数。",
    tags: ["分布式法则", "分布式代价", "架构原则"],
  },
  {
    id: "poa-distribution-02",
    chapter: "poa-distribution",
    level: 2,
    question: "远程外观模式解决什么问题？它的工作原理是什么？",
    answer: "远程外观（Remote Facade）解决的问题：领域对象的方法通常是细粒度的（每个方法只做一小件事），如果直接远程调用会产生大量网络往返，性能极差。工作原理：远程外观是一个粗粒度的接口，将多个细粒度的领域对象操作合并为一次远程调用。例如获取订单信息需要查订单、查商品、查客户三次调用，远程外观的 getOrderInfo(orderId) 一次调用即在服务端完成三次查询并返回组装好的结果。远程外观本身不包含业务逻辑，只是将领域模型的细粒度操作适配为远程友好的粗粒度调用。",
    tags: ["远程外观", "粗粒度接口", "远程调用"],
  },
  {
    id: "poa-distribution-03",
    chapter: "poa-distribution",
    level: 2,
    question: "数据传输对象（DTO）的特征和作用是什么？",
    answer: "DTO（Data Transfer Object）的特征：① 纯数据容器——无行为，只有字段和 getter/setter；② 序列化友好——可轻松序列化为 JSON/Protobuf 等格式在网络上传输；③ 扁平化对象图——减少嵌套层级，便于序列化和反序列化；④ 可组装——可从多个领域对象中提取数据组装为一个 DTO。作用：在远程调用间传递数据，避免直接序列化领域对象（领域对象可能包含不该暴露的内部状态或行为）。DTO 需要组装/反组装逻辑——服务端将领域对象组装为 DTO 传输，客户端将 DTO 反组装为本地对象使用。远程外观 + DTO = 分布式通信的最小单元。",
    tags: ["DTO", "数据传输", "序列化"],
  },
  {
    id: "poa-distribution-04",
    chapter: "poa-distribution",
    level: 3,
    question: "一个电商系统从单体演进为微服务，应该如何应用远程外观和 DTO？",
    answer: "电商系统微服务化应用：① 拆分服务——将订单、商品、用户、支付拆分为独立服务，每个服务有自己的领域模型和数据库；② 远程外观设计——OrderServiceFacade 提供 getOrderDetail(orderId) 粗粒度 API，内部编排订单查询、商品信息获取、用户信息获取，客户端一次调用获取完整订单视图；③ DTO 设计——OrderDetailDTO 包含订单基本信息 + 商品列表 + 收货地址 + 支付状态，扁平化组装自多个领域对象；④ 组装逻辑——服务端收到请求后，从本地数据库查订单，通过远程调用（或消息队列）从商品服务获取商品信息，组装为 OrderDetailDTO 返回；⑤ 性能优化——高频调用的 DTO 可缓存，商品信息可用只读副本减少远程调用；⑥ 降级策略——商品服务不可用时返回缓存数据或默认值，避免级联失败。关键原则：远程调用次数最小化，每次调用数据量最大化。",
    tags: ["微服务", "远程外观", "DTO 实践"],
  },
];
