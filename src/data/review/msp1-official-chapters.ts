import type { ReviewQuestion } from "../review-questions";

export const mspOfficialQuestions: ReviewQuestion[] = [
  {
    chapter: "msp-official-learning-map",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版权威学习地图",
      "初版边界",
    ],
    id: "msp-official-learning-map-q1",
    level: 1,
    question: "为什么“2019中文版初版权威学习地图”必须覆盖13个主节点？",
    answer:
      "这些节点共同组成“建立13章、52个二级节、177个三级节和44个模式的依赖图，固定2019中文版初版与2018英文初版边界”的机制和证据链；连同三级目录共涉及65个本页节点，漏项会使完整目录映射、13章依赖图、44模式索引、版本边界记录无法独立复现。",
  },
  {
    chapter: "msp-official-learning-map",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版权威学习地图",
      "初版边界",
    ],
    id: "msp-official-learning-map-q2",
    level: 1,
    question: "“2019中文版初版权威学习地图”的最小业务不变量是什么？",
    answer:
      "242个编号目录节点全部可达，每个模式能回指问题、约束、解决方案、结果、相关模式和可复现实验，不混入第二版新增结构。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-official-learning-map",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版权威学习地图",
      "初版边界",
    ],
    id: "msp-official-learning-map-q3",
    level: 2,
    question: "怎样为“2019中文版初版权威学习地图”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-official-learning-map",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版权威学习地图",
      "初版边界",
    ],
    id: "msp-official-learning-map-q4",
    level: 2,
    question: "“2019中文版初版权威学习地图”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-official-learning-map",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版权威学习地图",
      "初版边界",
    ],
    id: "msp-official-learning-map-q5",
    level: 3,
    question: "如何验证“2019中文版初版权威学习地图”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-official-learning-map",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版权威学习地图",
      "初版边界",
    ],
    id: "msp-official-learning-map-q6",
    level: 3,
    question: "“2019中文版初版权威学习地图”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、完整目录映射、13章依赖图、44模式索引、版本边界记录、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-01-escaping-monolithic-hell",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第1章 逃离单体地狱",
      "单体架构",
    ],
    id: "msp-01-escaping-monolithic-hell-q1",
    level: 1,
    question: "为什么“第1章 逃离单体地狱”必须覆盖7个主节点？",
    answer:
      "这些节点共同组成“从FTGO单体的交付困境出发，推导微服务架构的结构、收益、代价、模式语言以及组织前提”的机制和证据链；连同三级目录共涉及23个本页节点，漏项会使FTGO现状图、扩展立方体、收益代价账本、组织与交付能力表无法独立复现。",
  },
  {
    chapter: "msp-01-escaping-monolithic-hell",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第1章 逃离单体地狱",
      "单体架构",
    ],
    id: "msp-01-escaping-monolithic-hell-q2",
    level: 1,
    question: "“第1章 逃离单体地狱”的最小业务不变量是什么？",
    answer:
      "采用微服务必须改善大型复杂应用的持续交付能力；服务数量增加本身不是成功，独立开发、测试、部署与数据所有权才是验收事实。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-01-escaping-monolithic-hell",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第1章 逃离单体地狱",
      "单体架构",
    ],
    id: "msp-01-escaping-monolithic-hell-q3",
    level: 2,
    question: "怎样为“第1章 逃离单体地狱”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-01-escaping-monolithic-hell",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第1章 逃离单体地狱",
      "单体架构",
    ],
    id: "msp-01-escaping-monolithic-hell-q4",
    level: 2,
    question: "“第1章 逃离单体地狱”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-01-escaping-monolithic-hell",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第1章 逃离单体地狱",
      "单体架构",
    ],
    id: "msp-01-escaping-monolithic-hell-q5",
    level: 3,
    question: "如何验证“第1章 逃离单体地狱”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-01-escaping-monolithic-hell",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第1章 逃离单体地狱",
      "单体架构",
    ],
    id: "msp-01-escaping-monolithic-hell-q6",
    level: 3,
    question: "“第1章 逃离单体地狱”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、FTGO现状图、扩展立方体、收益代价账本、组织与交付能力表、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-02-decomposition-strategies",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第2章 服务的拆分策略",
      "软件架构",
    ],
    id: "msp-02-decomposition-strategies-q1",
    level: 1,
    question: "为什么“第2章 服务的拆分策略”必须覆盖2个主节点？",
    answer:
      "这些节点共同组成“从系统操作、业务能力与DDD子域推导服务边界，并用内聚、耦合和API契约校验拆分结果”的机制和证据链；连同三级目录共涉及11个本页节点，漏项会使系统操作清单、业务能力地图、子域边界图、服务API契约无法独立复现。",
  },
  {
    chapter: "msp-02-decomposition-strategies",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第2章 服务的拆分策略",
      "软件架构",
    ],
    id: "msp-02-decomposition-strategies-q2",
    level: 1,
    question: "“第2章 服务的拆分策略”的最小业务不变量是什么？",
    answer:
      "每个系统操作都有明确入口、责任服务和数据所有者；跨服务协作不绕过API，边界变化不要求无关服务同步发布。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-02-decomposition-strategies",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第2章 服务的拆分策略",
      "软件架构",
    ],
    id: "msp-02-decomposition-strategies-q3",
    level: 2,
    question: "怎样为“第2章 服务的拆分策略”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-02-decomposition-strategies",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第2章 服务的拆分策略",
      "软件架构",
    ],
    id: "msp-02-decomposition-strategies-q4",
    level: 2,
    question: "“第2章 服务的拆分策略”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-02-decomposition-strategies",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第2章 服务的拆分策略",
      "软件架构",
    ],
    id: "msp-02-decomposition-strategies-q5",
    level: 3,
    question: "如何验证“第2章 服务的拆分策略”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-02-decomposition-strategies",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第2章 服务的拆分策略",
      "软件架构",
    ],
    id: "msp-02-decomposition-strategies-q6",
    level: 3,
    question: "“第2章 服务的拆分策略”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、系统操作清单、业务能力地图、子域边界图、服务API契约、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-03-interprocess-communication",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第3章 微服务架构中的进程间通信",
      "交互风格",
    ],
    id: "msp-03-interprocess-communication-q1",
    level: 1,
    question: "为什么“第3章 微服务架构中的进程间通信”必须覆盖4个主节点？",
    answer:
      "这些节点共同组成“比较同步远程调用与异步消息，建立可演化API、部分失败、发现、顺序、去重和事务性消息的完整通信契约”的机制和证据链；连同三级目录共涉及22个本页节点，漏项会使交互风格矩阵、API演化契约、消息时序图、发件箱对账表无法独立复现。",
  },
  {
    chapter: "msp-03-interprocess-communication",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第3章 微服务架构中的进程间通信",
      "交互风格",
    ],
    id: "msp-03-interprocess-communication-q2",
    level: 1,
    question: "“第3章 微服务架构中的进程间通信”的最小业务不变量是什么？",
    answer:
      "每次跨进程交互都明确交互风格、契约版本、超时、幂等、顺序和交付语义；数据库提交与消息发布之间不存在不可解释的丢失窗口。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-03-interprocess-communication",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第3章 微服务架构中的进程间通信",
      "交互风格",
    ],
    id: "msp-03-interprocess-communication-q3",
    level: 2,
    question: "怎样为“第3章 微服务架构中的进程间通信”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-03-interprocess-communication",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第3章 微服务架构中的进程间通信",
      "交互风格",
    ],
    id: "msp-03-interprocess-communication-q4",
    level: 2,
    question: "“第3章 微服务架构中的进程间通信”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-03-interprocess-communication",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第3章 微服务架构中的进程间通信",
      "交互风格",
    ],
    id: "msp-03-interprocess-communication-q5",
    level: 3,
    question: "如何验证“第3章 微服务架构中的进程间通信”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-03-interprocess-communication",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第3章 微服务架构中的进程间通信",
      "交互风格",
    ],
    id: "msp-03-interprocess-communication-q6",
    level: 3,
    question: "“第3章 微服务架构中的进程间通信”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、交互风格矩阵、API演化契约、消息时序图、发件箱对账表、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-04-managing-transactions-with-sagas",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第4章 使用Saga管理事务",
      "Saga",
    ],
    id: "msp-04-managing-transactions-with-sagas-q1",
    level: 1,
    question: "为什么“第4章 使用Saga管理事务”必须覆盖4个主节点？",
    answer:
      "这些节点共同组成“用一组本地事务和补偿动作维护跨服务数据一致性，比较协同与编排，并显式处理Saga缺少隔离带来的异常”的机制和证据链；连同三级目录共涉及15个本页节点，漏项会使Saga状态机、补偿矩阵、隔离异常表、Create Order时序无法独立复现。",
  },
  {
    chapter: "msp-04-managing-transactions-with-sagas",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第4章 使用Saga管理事务",
      "Saga",
    ],
    id: "msp-04-managing-transactions-with-sagas-q2",
    level: 1,
    question: "“第4章 使用Saga管理事务”的最小业务不变量是什么？",
    answer:
      "Create Order Saga在成功、拒绝、超时、重复与恢复后都收敛到可解释终态，信用、餐厅、订单和厨房状态满足业务不变量且可对账。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-04-managing-transactions-with-sagas",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第4章 使用Saga管理事务",
      "Saga",
    ],
    id: "msp-04-managing-transactions-with-sagas-q3",
    level: 2,
    question: "怎样为“第4章 使用Saga管理事务”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-04-managing-transactions-with-sagas",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第4章 使用Saga管理事务",
      "Saga",
    ],
    id: "msp-04-managing-transactions-with-sagas-q4",
    level: 2,
    question: "“第4章 使用Saga管理事务”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-04-managing-transactions-with-sagas",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第4章 使用Saga管理事务",
      "Saga",
    ],
    id: "msp-04-managing-transactions-with-sagas-q5",
    level: 3,
    question: "如何验证“第4章 使用Saga管理事务”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-04-managing-transactions-with-sagas",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第4章 使用Saga管理事务",
      "Saga",
    ],
    id: "msp-04-managing-transactions-with-sagas-q6",
    level: 3,
    question: "“第4章 使用Saga管理事务”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、Saga状态机、补偿矩阵、隔离异常表、Create Order时序、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-05-designing-business-logic",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第5章 微服务架构中的业务逻辑设计",
      "事务脚本",
    ],
    id: "msp-05-designing-business-logic-q1",
    level: 1,
    question: "为什么“第5章 微服务架构中的业务逻辑设计”必须覆盖5个主节点？",
    answer:
      "这些节点共同组成“在六边形架构内比较事务脚本与领域模型，用DDD聚合建立一致性边界，并以领域事件连接服务协作”的机制和证据链；连同三级目录共涉及22个本页节点，漏项会使六边形端口图、聚合边界图、领域事件目录、Order与Ticket模型无法独立复现。",
  },
  {
    chapter: "msp-05-designing-business-logic",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第5章 微服务架构中的业务逻辑设计",
      "事务脚本",
    ],
    id: "msp-05-designing-business-logic-q2",
    level: 1,
    question: "“第5章 微服务架构中的业务逻辑设计”的最小业务不变量是什么？",
    answer:
      "所有修改只能经聚合根维护不变量，一个本地事务只创建或更新一个聚合；跨聚合协作通过标识和可靠领域事件发生。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-05-designing-business-logic",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第5章 微服务架构中的业务逻辑设计",
      "事务脚本",
    ],
    id: "msp-05-designing-business-logic-q3",
    level: 2,
    question: "怎样为“第5章 微服务架构中的业务逻辑设计”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-05-designing-business-logic",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第5章 微服务架构中的业务逻辑设计",
      "事务脚本",
    ],
    id: "msp-05-designing-business-logic-q4",
    level: 2,
    question: "“第5章 微服务架构中的业务逻辑设计”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-05-designing-business-logic",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第5章 微服务架构中的业务逻辑设计",
      "事务脚本",
    ],
    id: "msp-05-designing-business-logic-q5",
    level: 3,
    question: "如何验证“第5章 微服务架构中的业务逻辑设计”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-05-designing-business-logic",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第5章 微服务架构中的业务逻辑设计",
      "事务脚本",
    ],
    id: "msp-05-designing-business-logic-q6",
    level: 3,
    question: "“第5章 微服务架构中的业务逻辑设计”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、六边形端口图、聚合边界图、领域事件目录、Order与Ticket模型、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-06-event-sourcing",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第6章 使用事件溯源开发业务逻辑",
      "事件溯源",
    ],
    id: "msp-06-event-sourcing-q1",
    level: 1,
    question: "为什么“第6章 使用事件溯源开发业务逻辑”必须覆盖3个主节点？",
    answer:
      "这些节点共同组成“把聚合持久化为不可变事件流，处理并发、快照、幂等和事件演化，并把事件溯源与两类Saga协调方式组合”的机制和证据链；连同三级目录共涉及18个本页节点，漏项会使事件流时间线、重放状态机、版本升级表、Saga事件关联图无法独立复现。",
  },
  {
    chapter: "msp-06-event-sourcing",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第6章 使用事件溯源开发业务逻辑",
      "事件溯源",
    ],
    id: "msp-06-event-sourcing-q2",
    level: 1,
    question: "“第6章 使用事件溯源开发业务逻辑”的最小业务不变量是什么？",
    answer:
      "任一聚合状态都能由有序事件流确定性重放；并发追加由期望版本保护，旧事件在模式演化后仍可读取，副作用消费保持幂等。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-06-event-sourcing",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第6章 使用事件溯源开发业务逻辑",
      "事件溯源",
    ],
    id: "msp-06-event-sourcing-q3",
    level: 2,
    question: "怎样为“第6章 使用事件溯源开发业务逻辑”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-06-event-sourcing",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第6章 使用事件溯源开发业务逻辑",
      "事件溯源",
    ],
    id: "msp-06-event-sourcing-q4",
    level: 2,
    question: "“第6章 使用事件溯源开发业务逻辑”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-06-event-sourcing",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第6章 使用事件溯源开发业务逻辑",
      "事件溯源",
    ],
    id: "msp-06-event-sourcing-q5",
    level: 3,
    question: "如何验证“第6章 使用事件溯源开发业务逻辑”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-06-event-sourcing",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第6章 使用事件溯源开发业务逻辑",
      "事件溯源",
    ],
    id: "msp-06-event-sourcing-q6",
    level: 3,
    question: "“第6章 使用事件溯源开发业务逻辑”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、事件流时间线、重放状态机、版本升级表、Saga事件关联图、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-07-implementing-queries",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第7章 在微服务架构中实现查询",
      "API组合",
    ],
    id: "msp-07-implementing-queries-q1",
    level: 1,
    question: "为什么“第7章 在微服务架构中实现查询”必须覆盖4个主节点？",
    answer:
      "这些节点共同组成“在服务各自拥有数据库的前提下比较API组合与CQRS，设计可重建、可追踪延迟和面向查询的数据视图”的机制和证据链；连同三级目录共涉及19个本页节点，漏项会使查询责任图、组合调用树、CQRS更新流水线、视图重建与水位表无法独立复现。",
  },
  {
    chapter: "msp-07-implementing-queries",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第7章 在微服务架构中实现查询",
      "API组合",
    ],
    id: "msp-07-implementing-queries-q2",
    level: 1,
    question: "“第7章 在微服务架构中实现查询”的最小业务不变量是什么？",
    answer:
      "查询不能绕过服务API直接联表；CQRS视图可从源事件重建并公开新鲜度，API组合在部分失败时返回明确而非伪造完整结果。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-07-implementing-queries",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第7章 在微服务架构中实现查询",
      "API组合",
    ],
    id: "msp-07-implementing-queries-q3",
    level: 2,
    question: "怎样为“第7章 在微服务架构中实现查询”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-07-implementing-queries",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第7章 在微服务架构中实现查询",
      "API组合",
    ],
    id: "msp-07-implementing-queries-q4",
    level: 2,
    question: "“第7章 在微服务架构中实现查询”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-07-implementing-queries",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第7章 在微服务架构中实现查询",
      "API组合",
    ],
    id: "msp-07-implementing-queries-q5",
    level: 3,
    question: "如何验证“第7章 在微服务架构中实现查询”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-07-implementing-queries",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第7章 在微服务架构中实现查询",
      "API组合",
    ],
    id: "msp-07-implementing-queries-q6",
    level: 3,
    question: "“第7章 在微服务架构中实现查询”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、查询责任图、组合调用树、CQRS更新流水线、视图重建与水位表、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-08-external-api-patterns",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第8章 外部API模式",
      "API Gateway",
    ],
    id: "msp-08-external-api-patterns-q1",
    level: 1,
    question: "为什么“第8章 外部API模式”必须覆盖3个主节点？",
    answer:
      "这些节点共同组成“为移动端、浏览器和合作伙伴建立稳定外部边界，比较API Gateway、BFF、响应式组合与GraphQL实现”的机制和证据链；连同三级目录共涉及12个本页节点，漏项会使外部API契约、客户端需求矩阵、网关责任表、GraphQL扇出预算无法独立复现。",
  },
  {
    chapter: "msp-08-external-api-patterns",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第8章 外部API模式",
      "API Gateway",
    ],
    id: "msp-08-external-api-patterns-q2",
    level: 1,
    question: "“第8章 外部API模式”的最小业务不变量是什么？",
    answer:
      "客户端不感知内部服务拓扑；网关只承担路由、边缘安全、协议适配和有限组合，业务不变量仍由领域服务拥有。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-08-external-api-patterns",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第8章 外部API模式",
      "API Gateway",
    ],
    id: "msp-08-external-api-patterns-q3",
    level: 2,
    question: "怎样为“第8章 外部API模式”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-08-external-api-patterns",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第8章 外部API模式",
      "API Gateway",
    ],
    id: "msp-08-external-api-patterns-q4",
    level: 2,
    question: "“第8章 外部API模式”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-08-external-api-patterns",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第8章 外部API模式",
      "API Gateway",
    ],
    id: "msp-08-external-api-patterns-q5",
    level: 3,
    question: "如何验证“第8章 外部API模式”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-08-external-api-patterns",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第8章 外部API模式",
      "API Gateway",
    ],
    id: "msp-08-external-api-patterns-q6",
    level: 3,
    question: "“第8章 外部API模式”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、外部API契约、客户端需求矩阵、网关责任表、GraphQL扇出预算、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-09-testing-part-1",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第9章 微服务架构中的测试策略（上）",
      "测试金字塔",
    ],
    id: "msp-09-testing-part-1-q1",
    level: 1,
    question: "为什么“第9章 微服务架构中的测试策略（上）”必须覆盖2个主节点？",
    answer:
      "这些节点共同组成“用测试金字塔和部署流水线确定反馈层级，并为实体、值对象、Saga、领域服务、控制器与消息处理器建立单元测试”的机制和证据链；连同三级目录共涉及11个本页节点，漏项会使测试层级矩阵、流水线门禁、领域规则用例、消息处理幂等测试无法独立复现。",
  },
  {
    chapter: "msp-09-testing-part-1",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第9章 微服务架构中的测试策略（上）",
      "测试金字塔",
    ],
    id: "msp-09-testing-part-1-q2",
    level: 1,
    question: "“第9章 微服务架构中的测试策略（上）”的最小业务不变量是什么？",
    answer:
      "大多数业务失败在快速、确定、隔离的单元测试中被发现；测试替身只替代真正边界，不把实现细节固化成脆弱断言。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-09-testing-part-1",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第9章 微服务架构中的测试策略（上）",
      "测试金字塔",
    ],
    id: "msp-09-testing-part-1-q3",
    level: 2,
    question: "怎样为“第9章 微服务架构中的测试策略（上）”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-09-testing-part-1",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第9章 微服务架构中的测试策略（上）",
      "测试金字塔",
    ],
    id: "msp-09-testing-part-1-q4",
    level: 2,
    question: "“第9章 微服务架构中的测试策略（上）”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-09-testing-part-1",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第9章 微服务架构中的测试策略（上）",
      "测试金字塔",
    ],
    id: "msp-09-testing-part-1-q5",
    level: 3,
    question: "如何验证“第9章 微服务架构中的测试策略（上）”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-09-testing-part-1",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第9章 微服务架构中的测试策略（上）",
      "测试金字塔",
    ],
    id: "msp-09-testing-part-1-q6",
    level: 3,
    question: "“第9章 微服务架构中的测试策略（上）”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、测试层级矩阵、流水线门禁、领域规则用例、消息处理幂等测试、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-10-testing-part-2",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第10章 微服务架构中的测试策略（下）",
      "集成测试",
    ],
    id: "msp-10-testing-part-2-q1",
    level: 1,
    question: "为什么“第10章 微服务架构中的测试策略（下）”必须覆盖3个主节点？",
    answer:
      "这些节点共同组成“逐层验证持久化与通信适配器、消费者驱动契约、服务组件和少量端到端旅程，形成可定位的测试证据链”的机制和证据链；连同三级目录共涉及14个本页节点，漏项会使适配器集成夹具、契约版本库、组件隔离拓扑、关键旅程清单无法独立复现。",
  },
  {
    chapter: "msp-10-testing-part-2",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第10章 微服务架构中的测试策略（下）",
      "集成测试",
    ],
    id: "msp-10-testing-part-2-q2",
    level: 1,
    question: "“第10章 微服务架构中的测试策略（下）”的最小业务不变量是什么？",
    answer:
      "服务可在隔离环境证明自身契约与业务行为，消费者和提供者对同一契约版本达成一致；端到端测试只承担无法由低层证明的关键连接。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-10-testing-part-2",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第10章 微服务架构中的测试策略（下）",
      "集成测试",
    ],
    id: "msp-10-testing-part-2-q3",
    level: 2,
    question: "怎样为“第10章 微服务架构中的测试策略（下）”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-10-testing-part-2",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第10章 微服务架构中的测试策略（下）",
      "集成测试",
    ],
    id: "msp-10-testing-part-2-q4",
    level: 2,
    question: "“第10章 微服务架构中的测试策略（下）”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-10-testing-part-2",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第10章 微服务架构中的测试策略（下）",
      "集成测试",
    ],
    id: "msp-10-testing-part-2-q5",
    level: 3,
    question: "如何验证“第10章 微服务架构中的测试策略（下）”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-10-testing-part-2",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第10章 微服务架构中的测试策略（下）",
      "集成测试",
    ],
    id: "msp-10-testing-part-2-q6",
    level: 3,
    question: "“第10章 微服务架构中的测试策略（下）”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、适配器集成夹具、契约版本库、组件隔离拓扑、关键旅程清单、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-11-production-ready-services",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第11章 开发面向生产环境的微服务应用",
      "访问令牌",
    ],
    id: "msp-11-production-ready-services-q1",
    level: 1,
    question: "为什么“第11章 开发面向生产环境的微服务应用”必须覆盖4个主节点？",
    answer:
      "这些节点共同组成“把安全、外部化配置、健康检查、日志、追踪、指标、异常与审计纳入服务契约，并用微服务基底复用横切能力”的机制和证据链；连同三级目录共涉及16个本页节点，漏项会使威胁与信任边界、配置版本表、遥测关联图、基底能力清单无法独立复现。",
  },
  {
    chapter: "msp-11-production-ready-services",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第11章 开发面向生产环境的微服务应用",
      "访问令牌",
    ],
    id: "msp-11-production-ready-services-q2",
    level: 1,
    question: "“第11章 开发面向生产环境的微服务应用”的最小业务不变量是什么？",
    answer:
      "生产服务的每个请求都可验证主体与权限、追溯配置版本并关联日志/跨度/指标；健康信号表达真实依赖边界且不泄露敏感信息。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-11-production-ready-services",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第11章 开发面向生产环境的微服务应用",
      "访问令牌",
    ],
    id: "msp-11-production-ready-services-q3",
    level: 2,
    question: "怎样为“第11章 开发面向生产环境的微服务应用”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-11-production-ready-services",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第11章 开发面向生产环境的微服务应用",
      "访问令牌",
    ],
    id: "msp-11-production-ready-services-q4",
    level: 2,
    question: "“第11章 开发面向生产环境的微服务应用”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-11-production-ready-services",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第11章 开发面向生产环境的微服务应用",
      "访问令牌",
    ],
    id: "msp-11-production-ready-services-q5",
    level: 3,
    question: "如何验证“第11章 开发面向生产环境的微服务应用”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-11-production-ready-services",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第11章 开发面向生产环境的微服务应用",
      "访问令牌",
    ],
    id: "msp-11-production-ready-services-q6",
    level: 3,
    question: "“第11章 开发面向生产环境的微服务应用”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、威胁与信任边界、配置版本表、遥测关联图、基底能力清单、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-12-deploying-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第12章 部署微服务应用",
      "语言特定发布包",
    ],
    id: "msp-12-deploying-microservices-q1",
    level: 1,
    question: "为什么“第12章 部署微服务应用”必须覆盖6个主节点？",
    answer:
      "这些节点共同组成“比较语言包、虚拟机、容器和Serverless四类部署模式，并以Kubernetes、零停机发布、服务网格和Lambda落实选择”的机制和证据链；连同三级目录共涉及26个本页节点，漏项会使部署模式决策表、Kubernetes对象图、发布状态机、Lambda资源预算无法独立复现。",
  },
  {
    chapter: "msp-12-deploying-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第12章 部署微服务应用",
      "语言特定发布包",
    ],
    id: "msp-12-deploying-microservices-q2",
    level: 1,
    question: "“第12章 部署微服务应用”的最小业务不变量是什么？",
    answer:
      "每个服务制品、运行身份、资源、配置和版本可追踪且可独立回退；部署完成与发布接流量分离，失败版本不会继续扩大影响。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-12-deploying-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第12章 部署微服务应用",
      "语言特定发布包",
    ],
    id: "msp-12-deploying-microservices-q3",
    level: 2,
    question: "怎样为“第12章 部署微服务应用”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-12-deploying-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第12章 部署微服务应用",
      "语言特定发布包",
    ],
    id: "msp-12-deploying-microservices-q4",
    level: 2,
    question: "“第12章 部署微服务应用”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-12-deploying-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第12章 部署微服务应用",
      "语言特定发布包",
    ],
    id: "msp-12-deploying-microservices-q5",
    level: 3,
    question: "如何验证“第12章 部署微服务应用”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-12-deploying-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第12章 部署微服务应用",
      "语言特定发布包",
    ],
    id: "msp-12-deploying-microservices-q6",
    level: 3,
    question: "“第12章 部署微服务应用”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、部署模式决策表、Kubernetes对象图、发布状态机、Lambda资源预算、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-13-refactoring-to-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第13章 微服务架构的重构策略",
      "绞杀单体",
    ],
    id: "msp-13-refactoring-to-microservices-q1",
    level: 1,
    question: "为什么“第13章 微服务架构的重构策略”必须覆盖5个主节点？",
    answer:
      "这些节点共同组成“用绞杀策略渐进迁移单体，比较新功能服务化、前后端分离和提取业务能力，并设计反腐层、数据一致性与身份协作”的机制和证据链；连同三级目录共涉及20个本页节点，漏项会使能力迁移路线图、新旧责任矩阵、反腐层契约、切流与回退账本无法独立复现。",
  },
  {
    chapter: "msp-13-refactoring-to-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第13章 微服务架构的重构策略",
      "绞杀单体",
    ],
    id: "msp-13-refactoring-to-microservices-q2",
    level: 1,
    question: "“第13章 微服务架构的重构策略”的最小业务不变量是什么？",
    answer:
      "每次迁移都保持业务连续、单一数据权威和可回退路径；旧单体责任随流量和数据迁移而真实缩小，不出现双写无主或永久胶水层。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-13-refactoring-to-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第13章 微服务架构的重构策略",
      "绞杀单体",
    ],
    id: "msp-13-refactoring-to-microservices-q3",
    level: 2,
    question: "怎样为“第13章 微服务架构的重构策略”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-13-refactoring-to-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第13章 微服务架构的重构策略",
      "绞杀单体",
    ],
    id: "msp-13-refactoring-to-microservices-q4",
    level: 2,
    question: "“第13章 微服务架构的重构策略”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-13-refactoring-to-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第13章 微服务架构的重构策略",
      "绞杀单体",
    ],
    id: "msp-13-refactoring-to-microservices-q5",
    level: 3,
    question: "如何验证“第13章 微服务架构的重构策略”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-13-refactoring-to-microservices",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "第13章 微服务架构的重构策略",
      "绞杀单体",
    ],
    id: "msp-13-refactoring-to-microservices-q6",
    level: 3,
    question: "“第13章 微服务架构的重构策略”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、能力迁移路线图、新旧责任矩阵、反腐层契约、切流与回退账本、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "msp-official-final-review",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版总复习与架构评审",
      "模式语言",
    ],
    id: "msp-official-final-review-q1",
    level: 1,
    question: "为什么“2019中文版初版总复习与架构评审”必须覆盖13个主节点？",
    answer:
      "这些节点共同组成“沿FTGO从单体困境、服务拆分、通信与数据到测试、生产、部署和渐进重构，完成全书架构评审”的机制和证据链；连同三级目录共涉及65个本页节点，漏项会使全书模式图、FTGO端到端时序、架构评审清单、故障与回退演练无法独立复现。",
  },
  {
    chapter: "msp-official-final-review",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版总复习与架构评审",
      "模式语言",
    ],
    id: "msp-official-final-review-q2",
    level: 1,
    question: "“2019中文版初版总复习与架构评审”的最小业务不变量是什么？",
    answer:
      "任何微服务方案都同时给出业务目标、服务边界、数据所有权、交互契约、失败恢复、测试层级、运行证据、部署回退和迁移退出条件。必须由契约版本、状态轨迹、遥测、故障反例和最终业务对账共同证明。",
  },
  {
    chapter: "msp-official-final-review",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版总复习与架构评审",
      "模式语言",
    ],
    id: "msp-official-final-review-q3",
    level: 2,
    question: "怎样为“2019中文版初版总复习与架构评审”构造单变量反例？",
    answer:
      "固定FTGO案例、数据、负载、初版语义和观测窗口，只改变一个边界、故障、重试或顺序变量，比较组件轨迹与最终业务集合。",
  },
  {
    chapter: "msp-official-final-review",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版总复习与架构评审",
      "模式语言",
    ],
    id: "msp-official-final-review-q4",
    level: 2,
    question: "“2019中文版初版总复习与架构评审”为什么必须固定初版边界？",
    answer:
      "课程对应2018英文初版与2019中文版，第二版重新编排并新增内容，只能作为迁移差异，不能改变242个初版编号节点的分母。",
  },
  {
    chapter: "msp-official-final-review",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版总复习与架构评审",
      "模式语言",
    ],
    id: "msp-official-final-review-q5",
    level: 3,
    question: "如何验证“2019中文版初版总复习与架构评审”的性能与恢复结论？",
    answer:
      "重复测量P50、P95、P99、错误、饱和度、队列滞后、重试放大、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "msp-official-final-review",
    tags: [
      "微服务架构设计模式",
      "2019中文版初版",
      "2019中文版初版总复习与架构评审",
      "模式语言",
    ],
    id: "msp-official-final-review-q6",
    level: 3,
    question: "“2019中文版初版总复习与架构评审”独立交接必须包含什么？",
    answer:
      "需要初版目录映射、版本环境、决策记录、全书模式图、FTGO端到端时序、架构评审清单、故障与回退演练、故障、测试、业务对账、停止、恢复、回退和责任人。",
  },
];
