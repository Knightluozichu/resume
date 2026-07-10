import type { ReviewQuestion } from "./types";

/** DDD 核心概念复习题 */
export const addDddFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "add-ddd-fundamentals-01",
    chapter: "add-ddd-fundamentals",
    level: 1,
    question: `什么是领域驱动设计（DDD）？什么是「领域模型」和「统一语言」？`,
    answer:
      `领域驱动设计（Domain-Driven Design, DDD）是由 Eric Evans 提出的一套软件开发方法论，核心理念是「把软件模型与业务领域对齐」——让代码结构、命名、逻辑直接反映业务领域的概念和规则，而不是以数据库表或技术框架为中心来组织代码。\n\n领域模型（Domain Model）：\n领域模型是对业务领域的软件化抽象——用代码对象来表达业务概念和业务规则。如电商领域中的「订单」「商品」「购物车」就是领域模型。领域模型不是数据库表的映射（那叫数据模型），而是业务知识的编码。好的领域模型让读代码就像读业务文档——看到 \`Order.confirm()\` 就知道「订单确认」这个业务动作。\n\n统一语言（Ubiquitous Language）：\n统一语言是 DDD 最核心的实践之一——业务专家和开发团队使用同一套词汇表来描述领域，这套词汇同时出现在对话中、文档中、代码中。\n\n统一语言的要求：\n- 业务专家说的「订单确认」，代码里就叫 \`Order.confirm()\`，而不是 \`Order.updateStatus(2)\`。\n- 业务文档里的「信用额度」，代码里就叫 \`CreditLimit\`，而不是 \`field_007\`。\n- 对话中、需求文档中、代码中、测试用例中，用词完全一致。\n\n为什么统一语言重要：\n1. 消除翻译损耗：没有统一语言时，业务说一套、产品翻译一套、开发再翻译一套，每次翻译都丢失信息或引入歧义。统一语言让业务和开发直接对齐。\n2. 代码即文档：代码命名直接反映业务概念，读代码就能理解业务，不需要额外的「翻译层」。\n3. 早期发现概念歧义：当业务和开发对某个词的理解不一致时，统一语言的讨论会立即暴露分歧，而不是等到代码写完才发现理解错了。\n\n一句话：DDD 的核心是「让代码说业务语言」——领域模型是业务知识的代码化，统一语言是业务与代码之间的翻译协议。`,
    tags: ["DDD", "领域模型", "统一语言", "Ubiquitous Language", "定义"],
  },
  {
    id: "add-ddd-fundamentals-02",
    chapter: "add-ddd-fundamentals",
    level: 2,
    question: `DDD 的「战略设计」和「战术设计」分别关注什么？两者的关系是什么？`,
    answer:
      `DDD 分为战略设计和战术设计两个层面，从不同粒度解决「如何让软件对齐业务」的问题：\n\n战略设计（Strategic Design）——系统级别的宏观设计：\n\n关注「如何划分系统的边界」。核心工具：\n- 限界上下文（Bounded Context）：把大领域拆分成多个有明确边界的子领域，每个上下文有自己独立的模型和统一语言。\n- 上下文映射（Context Mapping）：描述不同限界上下文之间的关系和集成方式（如防腐层、共享内核等）。\n- 子域分类：把子域分为核心域（核心竞争力）、支撑域（必要但不差异化）、通用域（通用功能如认证）。\n\n战略设计回答的问题：「这个大系统应该拆成几个部分？各部分的边界在哪？它们怎么协作？」\n\n战术设计（Tactical Design）——模块内部的微观设计：\n\n关注「在一个限界上下文内部，如何用代码对象来表达领域模型」。核心工具：\n- 实体（Entity）：有唯一标识、有生命周期的领域对象（如 Order）。\n- 值对象（Value Object）：无唯一标识、由属性值定义的不可变对象（如 Money、Address）。\n- 聚合（Aggregate）：一组相关对象的集合，通过聚合根统一管理，保证一致性。\n- 领域服务（Domain Service）：不属于任何实体的业务逻辑。\n- 仓储（Repository）：提供聚合的持久化和检索接口。\n- 领域事件（Domain Event）：表示领域中发生的重要事件。\n\n战术设计回答的问题：「这个业务概念用什么对象来表达？对象之间怎么协作？一致性怎么保证？」\n\n两者的关系：\n\n1. 战略设计是前提，战术设计是落地：\n先通过战略设计识别出限界上下文，确定边界。然后在每个上下文内部，用战术设计构建领域模型。没有战略设计就直接上战术设计，会在错误的边界内建模——可能把不同上下文的概念混在一起，导致模型混乱。\n\n2. 战略设计决定边界，战术设计决定深度：\n战略设计划出了「这个上下文管什么」，战术设计回答「在这个上下文里，模型长什么样」。前者是地图，后者是建筑。\n\n3. 两者都服务于统一语言：\n战略设计确定每个上下文有自己的统一语言（同名异义可以在不同上下文中有不同含义），战术设计确保代码对象用统一语言命名。\n\n4. 优先级：战略 > 战术：\n如果战略边界划错了（限界上下文拆错了），战术设计再精妙也救不回来——模型会在错误的边界内纠缠。反之，如果战略边界划对了，即使战术设计不够精细（如用了贫血模型），后续也有改善的余地。\n\n一句话：战略设计画地图（划边界），战术设计盖房子（建模型）。先画对地图，再在正确的位置盖房子。`,
    tags: ["DDD", "战略设计", "战术设计", "限界上下文", "关系"],
  },
  {
    id: "add-ddd-fundamentals-03",
    chapter: "add-ddd-fundamentals",
    level: 3,
    question: `什么是「贫血模型」？它和 DDD 的「充血模型」有什么区别？用代码对比说明。`,
    answer:
      `贫血模型（Anemic Domain Model）：\n领域对象只有数据（属性 + getter/setter），没有行为（业务方法）。业务逻辑全部写在 Service 层，领域对象沦为数据容器。这是传统三层架构最常见的反模式。\n\n充血模型（Rich Domain Model / DDD 模式）：\n领域对象既有数据也有行为——业务规则封装在领域对象内部。Service 层只负责编排（调用领域对象的方法），不承载业务规则。\n\n代码对比——以「订单确认」为例：\n\n贫血模型（业务逻辑在 Service，领域对象是数据壳）：\n\`\`\`typescript\n// 领域对象只有数据，没有行为\nclass Order {\n  id: string;\n  status: string;  // 'pending' | 'confirmed' | 'shipped'\n  totalAmount: number;\n  // 只有 getter/setter，没有业务方法\n}\n\n// 业务逻辑全在 Service\nclass OrderService {\n  confirmOrder(order: Order): void {\n    // 业务规则散落在 Service 里\n    if (order.status !== 'pending') {\n      throw new Error('只有待处理订单才能确认');\n    }\n    if (order.totalAmount <= 0) {\n      throw new Error('订单金额必须大于零');\n    }\n    order.status = 'confirmed';  // 直接改属性\n    order.confirmedAt = new Date();\n  }\n}\n\`\`\`\n问题：\n- 业务规则散落在各 Service 中，同一个实体的规则可能分散在 OrderService、PaymentService、ShippingService 多处。\n- Order 对象不知道自己的规则——任何代码都可以 \`order.status = 'confirmed'\` 跳过校验。\n- 业务规则变化时要找 Service 里的逻辑，而不是找实体本身。\n\n充血模型（业务规则在领域对象内，Service 只编排）：\n\`\`\`typescript\n// 领域对象有数据也有行为\nclass Order {\n  private _id: string;\n  private _status: OrderStatus;  // 用枚举/值对象，不用 string\n  private _totalAmount: Money;   // 用值对象，不用 number\n  private _confirmedAt: Date | null;\n\n  // 业务规则封装在实体内\n  confirm(): void {\n    // 前置条件检查\n    if (this._status !== OrderStatus.Pending) {\n      throw new Error('只有待处理订单才能确认');\n    }\n    if (this._totalAmount.isZeroOrNegative()) {\n      throw new Error('订单金额必须大于零');\n    }\n    // 状态变更——只有实体自己能改自己的状态\n    this._status = OrderStatus.Confirmed;\n    this._confirmedAt = new Date();\n    // 发布领域事件\n    this._events.push(new OrderConfirmedEvent(this._id));\n  }\n\n  // 只暴露读操作，不暴露 setter\n  get status(): OrderStatus { return this._status; }\n}\n\n// Service 只负责编排，不写业务规则\nclass OrderApplicationService {\n  constructor(private orderRepo: OrderRepository) {}\n\n  async confirmOrder(orderId: string): Promise<void> {\n    const order = await this.orderRepo.findById(orderId);\n    order.confirm();  // 业务规则在 Order 内部执行\n    await this.orderRepo.save(order);\n  }\n}\n\`\`\`\n\n充血模型的优势：\n1. 业务规则内聚：所有订单相关的规则都在 Order 类内，改订单规则只看一个类。\n2. 封装性好：外部不能直接改 status，必须通过 \`confirm()\` 方法，规则不会被绕过。\n3. 可测试性：单元测试直接测 \`order.confirm()\`，不需要 Mock Service 和 Repository。\n4. 表达力强：\`order.confirm()\` 读起来就是「确认订单」，代码即业务语言。\n5. 防腐：类型安全——OrderStatus 枚举比 string 更安全，Money 值对象比 number 更安全。\n\n贫血模型的问题本质：违反了面向对象的「封装」原则——数据和行为分离，数据暴露在外任人修改。DDD 的充血模型是把行为还给数据，让对象自己管理自己的规则。`,
    tags: ["贫血模型", "充血模型", "DDD", "代码对比", "封装", "领域模型"],
  },
  {
    id: "add-ddd-fundamentals-04",
    chapter: "add-ddd-fundamentals",
    level: 4,
    question: `为什么很多团队「学了 DDD 但落不了地」？DDD 实施的常见误区有哪些？如何务实地引入 DDD？`,
    answer:
      `DDD 落地难是一个普遍现象，原因在于 DDD 不仅是技术方法论，更要求业务理解和组织协作方式的改变。常见误区和务实引入策略如下：\n\n常见误区：\n\n1. 只学战术，跳过战略：\n很多团队学了实体、值对象、聚合等战术模式就直接写代码，但跳过了限界上下文的识别。结果是在错误的边界内堆砌领域名词——不同业务概念混在一个上下文里，模型越做越乱。战略设计（划边界）是战术设计的前提，跳过它等于在沙子上盖楼。\n\n2. 为了 DDD 而 DDD（过度设计）：\n简单 CRUD 模块硬套聚合、领域事件、CQRS。如一个日志查询模块，没有复杂业务规则，却建了 LogEntity、LogAggregate、LogRepository、LogDomainEvent 一堆类。DDD 的战术模式是为复杂业务逻辑设计的，简单场景用贫血模型反而更清晰。\n\n3. 统一语言停留在口头：\n讨论时用了业务词汇，但代码里还是 \`updateStatus(2)\`、\`flag = true\`。统一语言必须落到代码命名、测试用例名、API 路径中，否则只是开会的谈资。\n\n4. 领域模型与数据库表混淆：\n先设计数据库表，再「映射」出领域对象。这本质还是数据库驱动设计，领域模型只是表的影子。DDD 要求反过来——先建领域模型，数据库是实现细节，Repository 负责翻译。\n\n5. 没有业务专家参与：\nDDD 的核心是业务与技术的协作。如果开发团队闭门造车，没有业务专家参与统一语言的讨论和领域建模，模型必然偏离真实业务。这是组织问题，不是技术问题。\n\n6. 一步到位，不演化：\n试图在项目初期就把所有限界上下文、所有聚合都设计完美。DDD 是迭代过程——先识别核心域，建核心模型，随着理解深入逐步完善。一步到位的设计通常是错的，因为初期对业务理解不够深。\n\n务实引入 DDD 的策略：\n\n1. 从核心域开始，不要全面铺开：\n不要试图给整个系统都上 DDD。先识别系统的核心域（最有业务价值、最复杂的部分），只在核心域用 DDD。支撑域和通用域用简单的方式（甚至 CRUD）即可。DDD 的投入应该集中在最值得保护的地方。\n\n2. 先战略后战术，先划边界再建模型：\n第一步不是写实体和聚合，而是与业务方一起画限界上下文图。搞清楚「这个系统有哪些子域？它们的边界在哪？」边界划对了，后续的战术设计才有意义。\n\n3. 从统一语言开始，而非从代码开始：\n引入 DDD 的第一个行动不是建类，而是建词汇表——与业务方一起梳理业务概念，确定每个概念的中英文命名和定义，把词汇表贴在团队可见的地方。后续所有代码命名、文档、对话都用这套词汇。这是成本最低、收益最快的 DDD 实践。\n\n4. 先充血后聚合：\n如果团队对 DDD 不熟，不要一上来就用聚合（聚合是最复杂的战术模式）。先从「充血模型」开始——把业务规则从 Service 搬到领域对象里。等团队习惯了「对象自己管自己的规则」后，再引入聚合来管理一致性边界。\n\n5. 用事件风暴（Event Storming）做领域探索：\n事件风暴是一种协作式建模工作坊——业务方和开发一起用便利贴梳理领域事件（「订单已创建」「支付已完成」），从中发现业务流程、领域概念和边界。比枯燥的 UML 建模更高效，也更容易让业务方参与。\n\n6. 接受不完美，逐步迭代：\n第一版领域模型一定不完美。先建一个「够用」的模型，随着业务理解的深入持续重构。DDD 不是一次性的设计活动，而是贯穿项目生命周期的持续建模过程。\n\n7. 结合架构原则落地：\nDDD 的领域模型需要架构骨架来安放——聚合根放在整洁架构的 Entities 层，Repository 接口定义在领域层、实现在基础设施层。没有架构原则支撑的 DDD 容易落不了地。\n\n8. 度量投入产出：\nDDD 有学习成本和开发成本。如果某个模块的业务复杂度不足以支撑这个成本（如简单的配置管理），就不要用 DDD。把 DDD 当作「治重病的药」，而非「强身健体的维生素」。\n\n总结：DDD 落地难的根本原因是它要求的不只是技术能力，还有业务理解能力和组织协作能力。务实引入的关键是「从核心域开始、从统一语言开始、从战略设计开始、逐步演化」——不要试图一步到位，不要全面铺开，把 DDD 的投入集中在最值得的地方。`,
    tags: ["综合", "DDD落地", "常见误区", "务实引入", "事件风暴", "核心域"],
  },
];
