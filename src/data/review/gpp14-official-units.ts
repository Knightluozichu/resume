import type { ReviewQuestion } from "../review-questions";

export const gpp14OfficialQuestions: ReviewQuestion[] = [
  {
    id: "gpp-official-learning-map-1",
    chapter: "gpp-official-learning-map",
    level: 1,
    question:
      "怎样为《游戏编程模式》权威学习地图建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“描述变化与性能问题 → 选择最小模式 → 声明依赖和时序 → 实现可替换原型 → 用反例决定保留或移除”复核问题证据、最小模式、依赖时序、可替换原型、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["问题证据", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-official-learning-map-2",
    chapter: "gpp-official-learning-map",
    level: 1,
    question: "怎样逐项核对《游戏编程模式》权威学习地图的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“描述变化与性能问题 → 选择最小模式 → 声明依赖和时序 → 实现可替换原型 → 用反例决定保留或移除”复核问题证据、最小模式、依赖时序、可替换原型、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["最小模式", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-official-learning-map-3",
    chapter: "gpp-official-learning-map",
    level: 2,
    question: "怎样计算《游戏编程模式》权威学习地图前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“描述变化与性能问题 → 选择最小模式 → 声明依赖和时序 → 实现可替换原型 → 用反例决定保留或移除”复核问题证据、最小模式、依赖时序、可替换原型、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["依赖时序", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-official-learning-map-4",
    chapter: "gpp-official-learning-map",
    level: 2,
    question: "怎样验证《游戏编程模式》权威学习地图没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“描述变化与性能问题 → 选择最小模式 → 声明依赖和时序 → 实现可替换原型 → 用反例决定保留或移除”复核问题证据、最小模式、依赖时序、可替换原型、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["可替换原型", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-official-learning-map-5",
    chapter: "gpp-official-learning-map",
    level: 3,
    question: "怎样向《游戏编程模式》权威学习地图注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“描述变化与性能问题 → 选择最小模式 → 声明依赖和时序 → 实现可替换原型 → 用反例决定保留或移除”复核问题证据、最小模式、依赖时序、可替换原型、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["移除条件", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-official-learning-map-6",
    chapter: "gpp-official-learning-map",
    level: 4,
    question: "怎样证明《游戏编程模式》权威学习地图能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“描述变化与性能问题 → 选择最小模式 → 声明依赖和时序 → 实现可替换原型 → 用反例决定保留或移除”复核问题证据、最小模式、依赖时序、可替换原型、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["问题证据", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-acknowledgements-1",
    chapter: "gpp-acknowledgements",
    level: 1,
    question: "怎样为Acknowledgements建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“识别贡献角色 → 追踪反馈来源 → 固定出版时间 → 区分正文与社区修订 → 登记引用边界”复核贡献角色、反馈来源、出版时间、社区修订、引用边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["贡献角色", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-acknowledgements-2",
    chapter: "gpp-acknowledgements",
    level: 1,
    question: "怎样逐项核对Acknowledgements的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“识别贡献角色 → 追踪反馈来源 → 固定出版时间 → 区分正文与社区修订 → 登记引用边界”复核贡献角色、反馈来源、出版时间、社区修订、引用边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["反馈来源", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-acknowledgements-3",
    chapter: "gpp-acknowledgements",
    level: 2,
    question: "怎样计算Acknowledgements前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“识别贡献角色 → 追踪反馈来源 → 固定出版时间 → 区分正文与社区修订 → 登记引用边界”复核贡献角色、反馈来源、出版时间、社区修订、引用边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["出版时间", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-acknowledgements-4",
    chapter: "gpp-acknowledgements",
    level: 2,
    question: "怎样验证Acknowledgements没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“识别贡献角色 → 追踪反馈来源 → 固定出版时间 → 区分正文与社区修订 → 登记引用边界”复核贡献角色、反馈来源、出版时间、社区修订、引用边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["社区修订", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-acknowledgements-5",
    chapter: "gpp-acknowledgements",
    level: 3,
    question: "怎样向Acknowledgements注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“识别贡献角色 → 追踪反馈来源 → 固定出版时间 → 区分正文与社区修订 → 登记引用边界”复核贡献角色、反馈来源、出版时间、社区修订、引用边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["引用边界", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-acknowledgements-6",
    chapter: "gpp-acknowledgements",
    level: 4,
    question: "怎样证明Acknowledgements能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“识别贡献角色 → 追踪反馈来源 → 固定出版时间 → 区分正文与社区修订 → 登记引用边界”复核贡献角色、反馈来源、出版时间、社区修订、引用边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["贡献角色", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-introduction-1",
    chapter: "gpp-introduction",
    level: 1,
    question: "怎样为I. Introduction建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“明确问题范围 → 连接GoF语境 → 选择阅读路径 → 校准示例代码 → 建立迁移实验”复核问题范围、GoF语境、阅读路径、示例语境、迁移实验，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["问题范围", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-introduction-2",
    chapter: "gpp-introduction",
    level: 1,
    question: "怎样逐项核对I. Introduction的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“明确问题范围 → 连接GoF语境 → 选择阅读路径 → 校准示例代码 → 建立迁移实验”复核问题范围、GoF语境、阅读路径、示例语境、迁移实验，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["GoF语境", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-introduction-3",
    chapter: "gpp-introduction",
    level: 2,
    question: "怎样计算I. Introduction前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“明确问题范围 → 连接GoF语境 → 选择阅读路径 → 校准示例代码 → 建立迁移实验”复核问题范围、GoF语境、阅读路径、示例语境、迁移实验，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["阅读路径", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-introduction-4",
    chapter: "gpp-introduction",
    level: 2,
    question: "怎样验证I. Introduction没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“明确问题范围 → 连接GoF语境 → 选择阅读路径 → 校准示例代码 → 建立迁移实验”复核问题范围、GoF语境、阅读路径、示例语境、迁移实验，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["示例语境", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-introduction-5",
    chapter: "gpp-introduction",
    level: 3,
    question: "怎样向I. Introduction注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“明确问题范围 → 连接GoF语境 → 选择阅读路径 → 校准示例代码 → 建立迁移实验”复核问题范围、GoF语境、阅读路径、示例语境、迁移实验，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["迁移实验", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-introduction-6",
    chapter: "gpp-introduction",
    level: 4,
    question: "怎样证明I. Introduction能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“明确问题范围 → 连接GoF语境 → 选择阅读路径 → 校准示例代码 → 建立迁移实验”复核问题范围、GoF语境、阅读路径、示例语境、迁移实验，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["问题范围", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-01-architecture-performance-games-1",
    chapter: "gpp-chapter-01-architecture-performance-games",
    level: 1,
    question:
      "怎样为1. Architecture, Performance, and Games建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“描述预期变化 → 压缩理解范围 → 切断变化传播 → 测量抽象成本 → 选择最简单可行设计”复核变化范围、认知负载、耦合传播、抽象成本、简单设计，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化范围", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-01-architecture-performance-games-2",
    chapter: "gpp-chapter-01-architecture-performance-games",
    level: 1,
    question:
      "怎样逐项核对1. Architecture, Performance, and Games的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“描述预期变化 → 压缩理解范围 → 切断变化传播 → 测量抽象成本 → 选择最简单可行设计”复核变化范围、认知负载、耦合传播、抽象成本、简单设计，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["认知负载", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-01-architecture-performance-games-3",
    chapter: "gpp-chapter-01-architecture-performance-games",
    level: 2,
    question:
      "怎样计算1. Architecture, Performance, and Games前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“描述预期变化 → 压缩理解范围 → 切断变化传播 → 测量抽象成本 → 选择最简单可行设计”复核变化范围、认知负载、耦合传播、抽象成本、简单设计，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["耦合传播", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-01-architecture-performance-games-4",
    chapter: "gpp-chapter-01-architecture-performance-games",
    level: 2,
    question:
      "怎样验证1. Architecture, Performance, and Games没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“描述预期变化 → 压缩理解范围 → 切断变化传播 → 测量抽象成本 → 选择最简单可行设计”复核变化范围、认知负载、耦合传播、抽象成本、简单设计，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["抽象成本", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-01-architecture-performance-games-5",
    chapter: "gpp-chapter-01-architecture-performance-games",
    level: 3,
    question:
      "怎样向1. Architecture, Performance, and Games注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“描述预期变化 → 压缩理解范围 → 切断变化传播 → 测量抽象成本 → 选择最简单可行设计”复核变化范围、认知负载、耦合传播、抽象成本、简单设计，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["简单设计", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-01-architecture-performance-games-6",
    chapter: "gpp-chapter-01-architecture-performance-games",
    level: 4,
    question:
      "怎样证明1. Architecture, Performance, and Games能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“描述预期变化 → 压缩理解范围 → 切断变化传播 → 测量抽象成本 → 选择最简单可行设计”复核变化范围、认知负载、耦合传播、抽象成本、简单设计，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化范围", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-design-patterns-revisited-1",
    chapter: "gpp-design-patterns-revisited",
    level: 1,
    question:
      "怎样为II. Design Patterns Revisited建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“识别真实问题 → 回溯GoF意图 → 映射游戏约束 → 比较模式代价 → 验证替代方案”复核问题识别、GoF意图、游戏约束、模式代价、替代方案，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["问题识别", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-design-patterns-revisited-2",
    chapter: "gpp-design-patterns-revisited",
    level: 1,
    question: "怎样逐项核对II. Design Patterns Revisited的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“识别真实问题 → 回溯GoF意图 → 映射游戏约束 → 比较模式代价 → 验证替代方案”复核问题识别、GoF意图、游戏约束、模式代价、替代方案，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["GoF意图", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-design-patterns-revisited-3",
    chapter: "gpp-design-patterns-revisited",
    level: 2,
    question: "怎样计算II. Design Patterns Revisited前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“识别真实问题 → 回溯GoF意图 → 映射游戏约束 → 比较模式代价 → 验证替代方案”复核问题识别、GoF意图、游戏约束、模式代价、替代方案，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["游戏约束", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-design-patterns-revisited-4",
    chapter: "gpp-design-patterns-revisited",
    level: 2,
    question: "怎样验证II. Design Patterns Revisited没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“识别真实问题 → 回溯GoF意图 → 映射游戏约束 → 比较模式代价 → 验证替代方案”复核问题识别、GoF意图、游戏约束、模式代价、替代方案，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["模式代价", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-design-patterns-revisited-5",
    chapter: "gpp-design-patterns-revisited",
    level: 3,
    question: "怎样向II. Design Patterns Revisited注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“识别真实问题 → 回溯GoF意图 → 映射游戏约束 → 比较模式代价 → 验证替代方案”复核问题识别、GoF意图、游戏约束、模式代价、替代方案，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["替代方案", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-design-patterns-revisited-6",
    chapter: "gpp-design-patterns-revisited",
    level: 4,
    question: "怎样证明II. Design Patterns Revisited能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“识别真实问题 → 回溯GoF意图 → 映射游戏约束 → 比较模式代价 → 验证替代方案”复核问题识别、GoF意图、游戏约束、模式代价、替代方案，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["问题识别", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-02-command-1",
    chapter: "gpp-chapter-02-command",
    level: 1,
    question: "怎样为2. Command建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“捕获动作意图 → 绑定目标参数 → 排队或立即执行 → 记录逆操作 → 重放并核对结果”复核动作对象、目标参数、执行时序、撤销日志、确定重放，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["动作对象", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-02-command-2",
    chapter: "gpp-chapter-02-command",
    level: 1,
    question: "怎样逐项核对2. Command的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“捕获动作意图 → 绑定目标参数 → 排队或立即执行 → 记录逆操作 → 重放并核对结果”复核动作对象、目标参数、执行时序、撤销日志、确定重放，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["目标参数", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-02-command-3",
    chapter: "gpp-chapter-02-command",
    level: 2,
    question: "怎样计算2. Command前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“捕获动作意图 → 绑定目标参数 → 排队或立即执行 → 记录逆操作 → 重放并核对结果”复核动作对象、目标参数、执行时序、撤销日志、确定重放，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["执行时序", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-02-command-4",
    chapter: "gpp-chapter-02-command",
    level: 2,
    question: "怎样验证2. Command没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“捕获动作意图 → 绑定目标参数 → 排队或立即执行 → 记录逆操作 → 重放并核对结果”复核动作对象、目标参数、执行时序、撤销日志、确定重放，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["撤销日志", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-02-command-5",
    chapter: "gpp-chapter-02-command",
    level: 3,
    question: "怎样向2. Command注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“捕获动作意图 → 绑定目标参数 → 排队或立即执行 → 记录逆操作 → 重放并核对结果”复核动作对象、目标参数、执行时序、撤销日志、确定重放，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["确定重放", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-02-command-6",
    chapter: "gpp-chapter-02-command",
    level: 4,
    question: "怎样证明2. Command能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“捕获动作意图 → 绑定目标参数 → 排队或立即执行 → 记录逆操作 → 重放并核对结果”复核动作对象、目标参数、执行时序、撤销日志、确定重放，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["动作对象", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-03-flyweight-1",
    chapter: "gpp-chapter-03-flyweight",
    level: 1,
    question: "怎样为3. Flyweight建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“识别重复状态 → 冻结共享对象 → 保存外在状态 → 批量访问实例 → 测量内存与局部性”复核固有状态、外在状态、共享对象、实例批次、内存局部，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["固有状态", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-03-flyweight-2",
    chapter: "gpp-chapter-03-flyweight",
    level: 1,
    question: "怎样逐项核对3. Flyweight的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“识别重复状态 → 冻结共享对象 → 保存外在状态 → 批量访问实例 → 测量内存与局部性”复核固有状态、外在状态、共享对象、实例批次、内存局部，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["外在状态", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-03-flyweight-3",
    chapter: "gpp-chapter-03-flyweight",
    level: 2,
    question: "怎样计算3. Flyweight前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“识别重复状态 → 冻结共享对象 → 保存外在状态 → 批量访问实例 → 测量内存与局部性”复核固有状态、外在状态、共享对象、实例批次、内存局部，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["共享对象", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-03-flyweight-4",
    chapter: "gpp-chapter-03-flyweight",
    level: 2,
    question: "怎样验证3. Flyweight没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“识别重复状态 → 冻结共享对象 → 保存外在状态 → 批量访问实例 → 测量内存与局部性”复核固有状态、外在状态、共享对象、实例批次、内存局部，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["实例批次", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-03-flyweight-5",
    chapter: "gpp-chapter-03-flyweight",
    level: 3,
    question: "怎样向3. Flyweight注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“识别重复状态 → 冻结共享对象 → 保存外在状态 → 批量访问实例 → 测量内存与局部性”复核固有状态、外在状态、共享对象、实例批次、内存局部，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["内存局部", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-03-flyweight-6",
    chapter: "gpp-chapter-03-flyweight",
    level: 4,
    question: "怎样证明3. Flyweight能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“识别重复状态 → 冻结共享对象 → 保存外在状态 → 批量访问实例 → 测量内存与局部性”复核固有状态、外在状态、共享对象、实例批次、内存局部，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["固有状态", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-04-observer-1",
    chapter: "gpp-chapter-04-observer",
    level: 1,
    question: "怎样为4. Observer建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“声明事件语义 → 注册观察关系 → 发布稳定快照 → 执行同步通知 → 安全解除订阅”复核事件语义、观察关系、通知时机、生命周期、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["事件语义", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-04-observer-2",
    chapter: "gpp-chapter-04-observer",
    level: 1,
    question: "怎样逐项核对4. Observer的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“声明事件语义 → 注册观察关系 → 发布稳定快照 → 执行同步通知 → 安全解除订阅”复核事件语义、观察关系、通知时机、生命周期、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["观察关系", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-04-observer-3",
    chapter: "gpp-chapter-04-observer",
    level: 2,
    question: "怎样计算4. Observer前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“声明事件语义 → 注册观察关系 → 发布稳定快照 → 执行同步通知 → 安全解除订阅”复核事件语义、观察关系、通知时机、生命周期、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["通知时机", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-04-observer-4",
    chapter: "gpp-chapter-04-observer",
    level: 2,
    question: "怎样验证4. Observer没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“声明事件语义 → 注册观察关系 → 发布稳定快照 → 执行同步通知 → 安全解除订阅”复核事件语义、观察关系、通知时机、生命周期、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["生命周期", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-04-observer-5",
    chapter: "gpp-chapter-04-observer",
    level: 3,
    question: "怎样向4. Observer注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“声明事件语义 → 注册观察关系 → 发布稳定快照 → 执行同步通知 → 安全解除订阅”复核事件语义、观察关系、通知时机、生命周期、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["反馈回路", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-04-observer-6",
    chapter: "gpp-chapter-04-observer",
    level: 4,
    question: "怎样证明4. Observer能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“声明事件语义 → 注册观察关系 → 发布稳定快照 → 执行同步通知 → 安全解除订阅”复核事件语义、观察关系、通知时机、生命周期、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["事件语义", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-05-prototype-1",
    chapter: "gpp-chapter-05-prototype",
    level: 1,
    question: "怎样为5. Prototype建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“选择原型来源 → 克隆结构状态 → 覆盖实例差异 → 修复身份引用 → 验证数据继承”复核克隆语义、生成函数、第一类类型、原型继承、数据模板，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["克隆语义", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-05-prototype-2",
    chapter: "gpp-chapter-05-prototype",
    level: 1,
    question: "怎样逐项核对5. Prototype的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“选择原型来源 → 克隆结构状态 → 覆盖实例差异 → 修复身份引用 → 验证数据继承”复核克隆语义、生成函数、第一类类型、原型继承、数据模板，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["生成函数", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-05-prototype-3",
    chapter: "gpp-chapter-05-prototype",
    level: 2,
    question: "怎样计算5. Prototype前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“选择原型来源 → 克隆结构状态 → 覆盖实例差异 → 修复身份引用 → 验证数据继承”复核克隆语义、生成函数、第一类类型、原型继承、数据模板，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["第一类类型", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-05-prototype-4",
    chapter: "gpp-chapter-05-prototype",
    level: 2,
    question: "怎样验证5. Prototype没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“选择原型来源 → 克隆结构状态 → 覆盖实例差异 → 修复身份引用 → 验证数据继承”复核克隆语义、生成函数、第一类类型、原型继承、数据模板，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["原型继承", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-05-prototype-5",
    chapter: "gpp-chapter-05-prototype",
    level: 3,
    question: "怎样向5. Prototype注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“选择原型来源 → 克隆结构状态 → 覆盖实例差异 → 修复身份引用 → 验证数据继承”复核克隆语义、生成函数、第一类类型、原型继承、数据模板，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["数据模板", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-05-prototype-6",
    chapter: "gpp-chapter-05-prototype",
    level: 4,
    question: "怎样证明5. Prototype能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“选择原型来源 → 克隆结构状态 → 覆盖实例差异 → 修复身份引用 → 验证数据继承”复核克隆语义、生成函数、第一类类型、原型继承、数据模板，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["克隆语义", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-06-singleton-1",
    chapter: "gpp-chapter-06-singleton",
    level: 1,
    question: "怎样为6. Singleton建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“拆分唯一性需求 → 识别全局访问 → 声明初始化顺序 → 注入显式依赖 → 验证替换与测试”复核唯一实例、全局访问、初始化顺序、显式依赖、测试隔离，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["唯一实例", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-06-singleton-2",
    chapter: "gpp-chapter-06-singleton",
    level: 1,
    question: "怎样逐项核对6. Singleton的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“拆分唯一性需求 → 识别全局访问 → 声明初始化顺序 → 注入显式依赖 → 验证替换与测试”复核唯一实例、全局访问、初始化顺序、显式依赖、测试隔离，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["全局访问", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-06-singleton-3",
    chapter: "gpp-chapter-06-singleton",
    level: 2,
    question: "怎样计算6. Singleton前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“拆分唯一性需求 → 识别全局访问 → 声明初始化顺序 → 注入显式依赖 → 验证替换与测试”复核唯一实例、全局访问、初始化顺序、显式依赖、测试隔离，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["初始化顺序", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-06-singleton-4",
    chapter: "gpp-chapter-06-singleton",
    level: 2,
    question: "怎样验证6. Singleton没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“拆分唯一性需求 → 识别全局访问 → 声明初始化顺序 → 注入显式依赖 → 验证替换与测试”复核唯一实例、全局访问、初始化顺序、显式依赖、测试隔离，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["显式依赖", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-06-singleton-5",
    chapter: "gpp-chapter-06-singleton",
    level: 3,
    question: "怎样向6. Singleton注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“拆分唯一性需求 → 识别全局访问 → 声明初始化顺序 → 注入显式依赖 → 验证替换与测试”复核唯一实例、全局访问、初始化顺序、显式依赖、测试隔离，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["测试隔离", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-06-singleton-6",
    chapter: "gpp-chapter-06-singleton",
    level: 4,
    question: "怎样证明6. Singleton能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“拆分唯一性需求 → 识别全局访问 → 声明初始化顺序 → 注入显式依赖 → 验证替换与测试”复核唯一实例、全局访问、初始化顺序、显式依赖、测试隔离，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["唯一实例", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-07-state-1",
    chapter: "gpp-chapter-07-state",
    level: 1,
    question: "怎样为7. State建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“枚举有效状态 → 定义转换守卫 → 执行退出进入 → 委托状态行为 → 验证并发与层次”复核状态集合、转换守卫、进入退出、行为委托、层次并发，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["状态集合", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-07-state-2",
    chapter: "gpp-chapter-07-state",
    level: 1,
    question: "怎样逐项核对7. State的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“枚举有效状态 → 定义转换守卫 → 执行退出进入 → 委托状态行为 → 验证并发与层次”复核状态集合、转换守卫、进入退出、行为委托、层次并发，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["转换守卫", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-07-state-3",
    chapter: "gpp-chapter-07-state",
    level: 2,
    question: "怎样计算7. State前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“枚举有效状态 → 定义转换守卫 → 执行退出进入 → 委托状态行为 → 验证并发与层次”复核状态集合、转换守卫、进入退出、行为委托、层次并发，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["进入退出", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-07-state-4",
    chapter: "gpp-chapter-07-state",
    level: 2,
    question: "怎样验证7. State没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“枚举有效状态 → 定义转换守卫 → 执行退出进入 → 委托状态行为 → 验证并发与层次”复核状态集合、转换守卫、进入退出、行为委托、层次并发，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["行为委托", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-07-state-5",
    chapter: "gpp-chapter-07-state",
    level: 3,
    question: "怎样向7. State注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“枚举有效状态 → 定义转换守卫 → 执行退出进入 → 委托状态行为 → 验证并发与层次”复核状态集合、转换守卫、进入退出、行为委托、层次并发，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["层次并发", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-07-state-6",
    chapter: "gpp-chapter-07-state",
    level: 4,
    question: "怎样证明7. State能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“枚举有效状态 → 定义转换守卫 → 执行退出进入 → 委托状态行为 → 验证并发与层次”复核状态集合、转换守卫、进入退出、行为委托、层次并发，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["状态集合", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-sequencing-patterns-1",
    chapter: "gpp-sequencing-patterns",
    level: 1,
    question: "怎样为III. Sequencing Patterns建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“冻结帧边界 → 安排读取阶段 → 执行状态更新 → 发布可见结果 → 检查时序一致”复核帧边界、读取阶段、更新阶段、结果发布、时序一致，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["帧边界", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-sequencing-patterns-2",
    chapter: "gpp-sequencing-patterns",
    level: 1,
    question: "怎样逐项核对III. Sequencing Patterns的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“冻结帧边界 → 安排读取阶段 → 执行状态更新 → 发布可见结果 → 检查时序一致”复核帧边界、读取阶段、更新阶段、结果发布、时序一致，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["读取阶段", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-sequencing-patterns-3",
    chapter: "gpp-sequencing-patterns",
    level: 2,
    question: "怎样计算III. Sequencing Patterns前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“冻结帧边界 → 安排读取阶段 → 执行状态更新 → 发布可见结果 → 检查时序一致”复核帧边界、读取阶段、更新阶段、结果发布、时序一致，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["更新阶段", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-sequencing-patterns-4",
    chapter: "gpp-sequencing-patterns",
    level: 2,
    question: "怎样验证III. Sequencing Patterns没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“冻结帧边界 → 安排读取阶段 → 执行状态更新 → 发布可见结果 → 检查时序一致”复核帧边界、读取阶段、更新阶段、结果发布、时序一致，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["结果发布", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-sequencing-patterns-5",
    chapter: "gpp-sequencing-patterns",
    level: 3,
    question: "怎样向III. Sequencing Patterns注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“冻结帧边界 → 安排读取阶段 → 执行状态更新 → 发布可见结果 → 检查时序一致”复核帧边界、读取阶段、更新阶段、结果发布、时序一致，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["时序一致", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-sequencing-patterns-6",
    chapter: "gpp-sequencing-patterns",
    level: 4,
    question: "怎样证明III. Sequencing Patterns能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“冻结帧边界 → 安排读取阶段 → 执行状态更新 → 发布可见结果 → 检查时序一致”复核帧边界、读取阶段、更新阶段、结果发布、时序一致，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["帧边界", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-08-double-buffer-1",
    chapter: "gpp-chapter-08-double-buffer",
    level: 1,
    question: "怎样为8. Double Buffer建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“读取当前缓冲 → 写入下一缓冲 → 完成整批更新 → 原子交换角色 → 回收旧前台”复核前台快照、后台写入、交换时刻、内存翻倍、批次粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["前台快照", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-08-double-buffer-2",
    chapter: "gpp-chapter-08-double-buffer",
    level: 1,
    question: "怎样逐项核对8. Double Buffer的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“读取当前缓冲 → 写入下一缓冲 → 完成整批更新 → 原子交换角色 → 回收旧前台”复核前台快照、后台写入、交换时刻、内存翻倍、批次粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["后台写入", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-08-double-buffer-3",
    chapter: "gpp-chapter-08-double-buffer",
    level: 2,
    question: "怎样计算8. Double Buffer前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“读取当前缓冲 → 写入下一缓冲 → 完成整批更新 → 原子交换角色 → 回收旧前台”复核前台快照、后台写入、交换时刻、内存翻倍、批次粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["交换时刻", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-08-double-buffer-4",
    chapter: "gpp-chapter-08-double-buffer",
    level: 2,
    question: "怎样验证8. Double Buffer没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“读取当前缓冲 → 写入下一缓冲 → 完成整批更新 → 原子交换角色 → 回收旧前台”复核前台快照、后台写入、交换时刻、内存翻倍、批次粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["内存翻倍", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-08-double-buffer-5",
    chapter: "gpp-chapter-08-double-buffer",
    level: 3,
    question: "怎样向8. Double Buffer注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“读取当前缓冲 → 写入下一缓冲 → 完成整批更新 → 原子交换角色 → 回收旧前台”复核前台快照、后台写入、交换时刻、内存翻倍、批次粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["批次粒度", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-08-double-buffer-6",
    chapter: "gpp-chapter-08-double-buffer",
    level: 4,
    question: "怎样证明8. Double Buffer能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“读取当前缓冲 → 写入下一缓冲 → 完成整批更新 → 原子交换角色 → 回收旧前台”复核前台快照、后台写入、交换时刻、内存翻倍、批次粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["前台快照", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-09-game-loop-1",
    chapter: "gpp-chapter-09-game-loop",
    level: 1,
    question: "怎样为9. Game Loop建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“采集平台事件 → 累积真实时间 → 执行固定模拟步 → 插值并渲染 → 节流与记录长尾”复核平台事件、固定步长、时间累积、渲染插值、功耗节流，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["平台事件", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-09-game-loop-2",
    chapter: "gpp-chapter-09-game-loop",
    level: 1,
    question: "怎样逐项核对9. Game Loop的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“采集平台事件 → 累积真实时间 → 执行固定模拟步 → 插值并渲染 → 节流与记录长尾”复核平台事件、固定步长、时间累积、渲染插值、功耗节流，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["固定步长", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-09-game-loop-3",
    chapter: "gpp-chapter-09-game-loop",
    level: 2,
    question: "怎样计算9. Game Loop前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“采集平台事件 → 累积真实时间 → 执行固定模拟步 → 插值并渲染 → 节流与记录长尾”复核平台事件、固定步长、时间累积、渲染插值、功耗节流，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["时间累积", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-09-game-loop-4",
    chapter: "gpp-chapter-09-game-loop",
    level: 2,
    question: "怎样验证9. Game Loop没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“采集平台事件 → 累积真实时间 → 执行固定模拟步 → 插值并渲染 → 节流与记录长尾”复核平台事件、固定步长、时间累积、渲染插值、功耗节流，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["渲染插值", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-09-game-loop-5",
    chapter: "gpp-chapter-09-game-loop",
    level: 3,
    question: "怎样向9. Game Loop注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“采集平台事件 → 累积真实时间 → 执行固定模拟步 → 插值并渲染 → 节流与记录长尾”复核平台事件、固定步长、时间累积、渲染插值、功耗节流，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["功耗节流", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-09-game-loop-6",
    chapter: "gpp-chapter-09-game-loop",
    level: 4,
    question: "怎样证明9. Game Loop能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“采集平台事件 → 累积真实时间 → 执行固定模拟步 → 插值并渲染 → 节流与记录长尾”复核平台事件、固定步长、时间累积、渲染插值、功耗节流，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["平台事件", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-10-update-method-1",
    chapter: "gpp-chapter-10-update-method",
    level: 1,
    question: "怎样为10. Update Method建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“选择活跃对象 → 读取帧输入 → 推进局部状态 → 提交增删请求 → 应用结构变更”复核活跃集合、帧切片、续运行状态、伪并发、延迟增删，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["活跃集合", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-10-update-method-2",
    chapter: "gpp-chapter-10-update-method",
    level: 1,
    question: "怎样逐项核对10. Update Method的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“选择活跃对象 → 读取帧输入 → 推进局部状态 → 提交增删请求 → 应用结构变更”复核活跃集合、帧切片、续运行状态、伪并发、延迟增删，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["帧切片", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-10-update-method-3",
    chapter: "gpp-chapter-10-update-method",
    level: 2,
    question: "怎样计算10. Update Method前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“选择活跃对象 → 读取帧输入 → 推进局部状态 → 提交增删请求 → 应用结构变更”复核活跃集合、帧切片、续运行状态、伪并发、延迟增删，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["续运行状态", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-10-update-method-4",
    chapter: "gpp-chapter-10-update-method",
    level: 2,
    question: "怎样验证10. Update Method没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“选择活跃对象 → 读取帧输入 → 推进局部状态 → 提交增删请求 → 应用结构变更”复核活跃集合、帧切片、续运行状态、伪并发、延迟增删，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["伪并发", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-10-update-method-5",
    chapter: "gpp-chapter-10-update-method",
    level: 3,
    question: "怎样向10. Update Method注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“选择活跃对象 → 读取帧输入 → 推进局部状态 → 提交增删请求 → 应用结构变更”复核活跃集合、帧切片、续运行状态、伪并发、延迟增删，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["延迟增删", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-10-update-method-6",
    chapter: "gpp-chapter-10-update-method",
    level: 4,
    question: "怎样证明10. Update Method能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“选择活跃对象 → 读取帧输入 → 推进局部状态 → 提交增删请求 → 应用结构变更”复核活跃集合、帧切片、续运行状态、伪并发、延迟增删，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["活跃集合", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-behavioral-patterns-1",
    chapter: "gpp-behavioral-patterns",
    level: 1,
    question: "怎样为IV. Behavioral Patterns建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“分离行为描述 → 限制安全原语 → 组合运行逻辑 → 驱动实例差异 → 验证扩展边界”复核行为描述、安全原语、运行组合、实例差异、扩展边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["行为描述", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-behavioral-patterns-2",
    chapter: "gpp-behavioral-patterns",
    level: 1,
    question: "怎样逐项核对IV. Behavioral Patterns的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“分离行为描述 → 限制安全原语 → 组合运行逻辑 → 驱动实例差异 → 验证扩展边界”复核行为描述、安全原语、运行组合、实例差异、扩展边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["安全原语", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-behavioral-patterns-3",
    chapter: "gpp-behavioral-patterns",
    level: 2,
    question: "怎样计算IV. Behavioral Patterns前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“分离行为描述 → 限制安全原语 → 组合运行逻辑 → 驱动实例差异 → 验证扩展边界”复核行为描述、安全原语、运行组合、实例差异、扩展边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["运行组合", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-behavioral-patterns-4",
    chapter: "gpp-behavioral-patterns",
    level: 2,
    question: "怎样验证IV. Behavioral Patterns没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“分离行为描述 → 限制安全原语 → 组合运行逻辑 → 驱动实例差异 → 验证扩展边界”复核行为描述、安全原语、运行组合、实例差异、扩展边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["实例差异", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-behavioral-patterns-5",
    chapter: "gpp-behavioral-patterns",
    level: 3,
    question: "怎样向IV. Behavioral Patterns注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“分离行为描述 → 限制安全原语 → 组合运行逻辑 → 驱动实例差异 → 验证扩展边界”复核行为描述、安全原语、运行组合、实例差异、扩展边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["扩展边界", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-behavioral-patterns-6",
    chapter: "gpp-behavioral-patterns",
    level: 4,
    question: "怎样证明IV. Behavioral Patterns能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“分离行为描述 → 限制安全原语 → 组合运行逻辑 → 驱动实例差异 → 验证扩展边界”复核行为描述、安全原语、运行组合、实例差异、扩展边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["行为描述", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-11-bytecode-1",
    chapter: "gpp-chapter-11-bytecode",
    level: 1,
    question: "怎样为11. Bytecode建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“定义行为语言 → 编译指令流 → 验证字节码 → 在虚拟机执行 → 记录预算与错误”复核行为语言、指令集、栈机器、虚拟机、工具链，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["行为语言", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-11-bytecode-2",
    chapter: "gpp-chapter-11-bytecode",
    level: 1,
    question: "怎样逐项核对11. Bytecode的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“定义行为语言 → 编译指令流 → 验证字节码 → 在虚拟机执行 → 记录预算与错误”复核行为语言、指令集、栈机器、虚拟机、工具链，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["指令集", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-11-bytecode-3",
    chapter: "gpp-chapter-11-bytecode",
    level: 2,
    question: "怎样计算11. Bytecode前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“定义行为语言 → 编译指令流 → 验证字节码 → 在虚拟机执行 → 记录预算与错误”复核行为语言、指令集、栈机器、虚拟机、工具链，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["栈机器", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-11-bytecode-4",
    chapter: "gpp-chapter-11-bytecode",
    level: 2,
    question: "怎样验证11. Bytecode没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“定义行为语言 → 编译指令流 → 验证字节码 → 在虚拟机执行 → 记录预算与错误”复核行为语言、指令集、栈机器、虚拟机、工具链，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["虚拟机", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-11-bytecode-5",
    chapter: "gpp-chapter-11-bytecode",
    level: 3,
    question: "怎样向11. Bytecode注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“定义行为语言 → 编译指令流 → 验证字节码 → 在虚拟机执行 → 记录预算与错误”复核行为语言、指令集、栈机器、虚拟机、工具链，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["工具链", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-11-bytecode-6",
    chapter: "gpp-chapter-11-bytecode",
    level: 4,
    question: "怎样证明11. Bytecode能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“定义行为语言 → 编译指令流 → 验证字节码 → 在虚拟机执行 → 记录预算与错误”复核行为语言、指令集、栈机器、虚拟机、工具链，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["行为语言", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-12-subclass-sandbox-1",
    chapter: "gpp-chapter-12-subclass-sandbox",
    level: 1,
    question: "怎样为12. Subclass Sandbox建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“限定子类入口 → 提供安全原语 → 隐藏共享状态 → 组合特化行为 → 审计能力边界”复核沙箱入口、安全原语、共享状态、特化组合、能力边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["沙箱入口", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-12-subclass-sandbox-2",
    chapter: "gpp-chapter-12-subclass-sandbox",
    level: 1,
    question: "怎样逐项核对12. Subclass Sandbox的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“限定子类入口 → 提供安全原语 → 隐藏共享状态 → 组合特化行为 → 审计能力边界”复核沙箱入口、安全原语、共享状态、特化组合、能力边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["安全原语", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-12-subclass-sandbox-3",
    chapter: "gpp-chapter-12-subclass-sandbox",
    level: 2,
    question: "怎样计算12. Subclass Sandbox前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“限定子类入口 → 提供安全原语 → 隐藏共享状态 → 组合特化行为 → 审计能力边界”复核沙箱入口、安全原语、共享状态、特化组合、能力边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["共享状态", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-12-subclass-sandbox-4",
    chapter: "gpp-chapter-12-subclass-sandbox",
    level: 2,
    question: "怎样验证12. Subclass Sandbox没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“限定子类入口 → 提供安全原语 → 隐藏共享状态 → 组合特化行为 → 审计能力边界”复核沙箱入口、安全原语、共享状态、特化组合、能力边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["特化组合", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-12-subclass-sandbox-5",
    chapter: "gpp-chapter-12-subclass-sandbox",
    level: 3,
    question: "怎样向12. Subclass Sandbox注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“限定子类入口 → 提供安全原语 → 隐藏共享状态 → 组合特化行为 → 审计能力边界”复核沙箱入口、安全原语、共享状态、特化组合、能力边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["能力边界", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-12-subclass-sandbox-6",
    chapter: "gpp-chapter-12-subclass-sandbox",
    level: 4,
    question: "怎样证明12. Subclass Sandbox能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“限定子类入口 → 提供安全原语 → 隐藏共享状态 → 组合特化行为 → 审计能力边界”复核沙箱入口、安全原语、共享状态、特化组合、能力边界，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["沙箱入口", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-13-type-object-1",
    chapter: "gpp-chapter-13-type-object",
    level: 1,
    question: "怎样为13. Type Object建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“定义运行时类型 → 加载类型数据 → 创建带类型实例 → 解析类型继承 → 验证热变更”复核运行时类型、类型数据、实例构造、数据继承、类型变更，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["运行时类型", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-13-type-object-2",
    chapter: "gpp-chapter-13-type-object",
    level: 1,
    question: "怎样逐项核对13. Type Object的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“定义运行时类型 → 加载类型数据 → 创建带类型实例 → 解析类型继承 → 验证热变更”复核运行时类型、类型数据、实例构造、数据继承、类型变更，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["类型数据", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-13-type-object-3",
    chapter: "gpp-chapter-13-type-object",
    level: 2,
    question: "怎样计算13. Type Object前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“定义运行时类型 → 加载类型数据 → 创建带类型实例 → 解析类型继承 → 验证热变更”复核运行时类型、类型数据、实例构造、数据继承、类型变更，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["实例构造", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-13-type-object-4",
    chapter: "gpp-chapter-13-type-object",
    level: 2,
    question: "怎样验证13. Type Object没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“定义运行时类型 → 加载类型数据 → 创建带类型实例 → 解析类型继承 → 验证热变更”复核运行时类型、类型数据、实例构造、数据继承、类型变更，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["数据继承", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-13-type-object-5",
    chapter: "gpp-chapter-13-type-object",
    level: 3,
    question: "怎样向13. Type Object注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“定义运行时类型 → 加载类型数据 → 创建带类型实例 → 解析类型继承 → 验证热变更”复核运行时类型、类型数据、实例构造、数据继承、类型变更，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["类型变更", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-13-type-object-6",
    chapter: "gpp-chapter-13-type-object",
    level: 4,
    question: "怎样证明13. Type Object能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“定义运行时类型 → 加载类型数据 → 创建带类型实例 → 解析类型继承 → 验证热变更”复核运行时类型、类型数据、实例构造、数据继承、类型变更，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["运行时类型", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-decoupling-patterns-1",
    chapter: "gpp-decoupling-patterns",
    level: 1,
    question: "怎样为V. Decoupling Patterns建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“识别变化轴 → 建立模块边界 → 定义通信合同 → 隔离生命周期 → 测量变化传播”复核变化轴、模块边界、通信合同、生命周期、变化传播，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化轴", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-decoupling-patterns-2",
    chapter: "gpp-decoupling-patterns",
    level: 1,
    question: "怎样逐项核对V. Decoupling Patterns的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“识别变化轴 → 建立模块边界 → 定义通信合同 → 隔离生命周期 → 测量变化传播”复核变化轴、模块边界、通信合同、生命周期、变化传播，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["模块边界", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-decoupling-patterns-3",
    chapter: "gpp-decoupling-patterns",
    level: 2,
    question: "怎样计算V. Decoupling Patterns前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“识别变化轴 → 建立模块边界 → 定义通信合同 → 隔离生命周期 → 测量变化传播”复核变化轴、模块边界、通信合同、生命周期、变化传播，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["通信合同", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-decoupling-patterns-4",
    chapter: "gpp-decoupling-patterns",
    level: 2,
    question: "怎样验证V. Decoupling Patterns没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“识别变化轴 → 建立模块边界 → 定义通信合同 → 隔离生命周期 → 测量变化传播”复核变化轴、模块边界、通信合同、生命周期、变化传播，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["生命周期", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-decoupling-patterns-5",
    chapter: "gpp-decoupling-patterns",
    level: 3,
    question: "怎样向V. Decoupling Patterns注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“识别变化轴 → 建立模块边界 → 定义通信合同 → 隔离生命周期 → 测量变化传播”复核变化轴、模块边界、通信合同、生命周期、变化传播，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化传播", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-decoupling-patterns-6",
    chapter: "gpp-decoupling-patterns",
    level: 4,
    question: "怎样证明V. Decoupling Patterns能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“识别变化轴 → 建立模块边界 → 定义通信合同 → 隔离生命周期 → 测量变化传播”复核变化轴、模块边界、通信合同、生命周期、变化传播，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化轴", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-14-component-1",
    chapter: "gpp-chapter-14-component",
    level: 1,
    question: "怎样为14. Component建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“识别领域职责 → 拆分组件接口 → 装配实体能力 → 路由组件消息 → 管理共同生命周期”复核领域职责、组件接口、实体装配、组件通信、共同生命周期，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["领域职责", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-14-component-2",
    chapter: "gpp-chapter-14-component",
    level: 1,
    question: "怎样逐项核对14. Component的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“识别领域职责 → 拆分组件接口 → 装配实体能力 → 路由组件消息 → 管理共同生命周期”复核领域职责、组件接口、实体装配、组件通信、共同生命周期，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["组件接口", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-14-component-3",
    chapter: "gpp-chapter-14-component",
    level: 2,
    question: "怎样计算14. Component前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“识别领域职责 → 拆分组件接口 → 装配实体能力 → 路由组件消息 → 管理共同生命周期”复核领域职责、组件接口、实体装配、组件通信、共同生命周期，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["实体装配", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-14-component-4",
    chapter: "gpp-chapter-14-component",
    level: 2,
    question: "怎样验证14. Component没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“识别领域职责 → 拆分组件接口 → 装配实体能力 → 路由组件消息 → 管理共同生命周期”复核领域职责、组件接口、实体装配、组件通信、共同生命周期，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["组件通信", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-14-component-5",
    chapter: "gpp-chapter-14-component",
    level: 3,
    question: "怎样向14. Component注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“识别领域职责 → 拆分组件接口 → 装配实体能力 → 路由组件消息 → 管理共同生命周期”复核领域职责、组件接口、实体装配、组件通信、共同生命周期，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["共同生命周期", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-14-component-6",
    chapter: "gpp-chapter-14-component",
    level: 4,
    question: "怎样证明14. Component能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“识别领域职责 → 拆分组件接口 → 装配实体能力 → 路由组件消息 → 管理共同生命周期”复核领域职责、组件接口、实体装配、组件通信、共同生命周期，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["领域职责", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-15-event-queue-1",
    chapter: "gpp-chapter-15-event-queue",
    level: 1,
    question: "怎样为15. Event Queue建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“封装事件载荷 → 入队并限流 → 冻结处理批次 → 按序消费 → 检测溢出反馈”复核事件载荷、队列容量、处理顺序、载荷寿命、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["事件载荷", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-15-event-queue-2",
    chapter: "gpp-chapter-15-event-queue",
    level: 1,
    question: "怎样逐项核对15. Event Queue的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“封装事件载荷 → 入队并限流 → 冻结处理批次 → 按序消费 → 检测溢出反馈”复核事件载荷、队列容量、处理顺序、载荷寿命、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["队列容量", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-15-event-queue-3",
    chapter: "gpp-chapter-15-event-queue",
    level: 2,
    question: "怎样计算15. Event Queue前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“封装事件载荷 → 入队并限流 → 冻结处理批次 → 按序消费 → 检测溢出反馈”复核事件载荷、队列容量、处理顺序、载荷寿命、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["处理顺序", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-15-event-queue-4",
    chapter: "gpp-chapter-15-event-queue",
    level: 2,
    question: "怎样验证15. Event Queue没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“封装事件载荷 → 入队并限流 → 冻结处理批次 → 按序消费 → 检测溢出反馈”复核事件载荷、队列容量、处理顺序、载荷寿命、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["载荷寿命", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-15-event-queue-5",
    chapter: "gpp-chapter-15-event-queue",
    level: 3,
    question: "怎样向15. Event Queue注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“封装事件载荷 → 入队并限流 → 冻结处理批次 → 按序消费 → 检测溢出反馈”复核事件载荷、队列容量、处理顺序、载荷寿命、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["反馈回路", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-15-event-queue-6",
    chapter: "gpp-chapter-15-event-queue",
    level: 4,
    question: "怎样证明15. Event Queue能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“封装事件载荷 → 入队并限流 → 冻结处理批次 → 按序消费 → 检测溢出反馈”复核事件载荷、队列容量、处理顺序、载荷寿命、反馈回路，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["事件载荷", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-16-service-locator-1",
    chapter: "gpp-chapter-16-service-locator",
    level: 1,
    question: "怎样为16. Service Locator建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“声明服务接口 → 注册作用域实例 → 解析服务请求 → 提供空对象回退 → 追踪隐藏依赖”复核服务接口、实例作用域、服务发现、空对象、隐藏依赖，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["服务接口", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-16-service-locator-2",
    chapter: "gpp-chapter-16-service-locator",
    level: 1,
    question: "怎样逐项核对16. Service Locator的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“声明服务接口 → 注册作用域实例 → 解析服务请求 → 提供空对象回退 → 追踪隐藏依赖”复核服务接口、实例作用域、服务发现、空对象、隐藏依赖，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["实例作用域", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-16-service-locator-3",
    chapter: "gpp-chapter-16-service-locator",
    level: 2,
    question: "怎样计算16. Service Locator前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“声明服务接口 → 注册作用域实例 → 解析服务请求 → 提供空对象回退 → 追踪隐藏依赖”复核服务接口、实例作用域、服务发现、空对象、隐藏依赖，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["服务发现", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-16-service-locator-4",
    chapter: "gpp-chapter-16-service-locator",
    level: 2,
    question: "怎样验证16. Service Locator没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“声明服务接口 → 注册作用域实例 → 解析服务请求 → 提供空对象回退 → 追踪隐藏依赖”复核服务接口、实例作用域、服务发现、空对象、隐藏依赖，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["空对象", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-16-service-locator-5",
    chapter: "gpp-chapter-16-service-locator",
    level: 3,
    question: "怎样向16. Service Locator注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“声明服务接口 → 注册作用域实例 → 解析服务请求 → 提供空对象回退 → 追踪隐藏依赖”复核服务接口、实例作用域、服务发现、空对象、隐藏依赖，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["隐藏依赖", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-16-service-locator-6",
    chapter: "gpp-chapter-16-service-locator",
    level: 4,
    question: "怎样证明16. Service Locator能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“声明服务接口 → 注册作用域实例 → 解析服务请求 → 提供空对象回退 → 追踪隐藏依赖”复核服务接口、实例作用域、服务发现、空对象、隐藏依赖，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["服务接口", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-optimization-patterns-1",
    chapter: "gpp-optimization-patterns",
    level: 1,
    question: "怎样为VI. Optimization Patterns建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“建立性能基线 → 定位真实热点 → 选择结构变换 → 验证正确与资源代价 → 比较长尾收益”复核性能基线、真实热点、结构变换、资源代价、长尾收益，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["性能基线", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-optimization-patterns-2",
    chapter: "gpp-optimization-patterns",
    level: 1,
    question: "怎样逐项核对VI. Optimization Patterns的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“建立性能基线 → 定位真实热点 → 选择结构变换 → 验证正确与资源代价 → 比较长尾收益”复核性能基线、真实热点、结构变换、资源代价、长尾收益，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["真实热点", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-optimization-patterns-3",
    chapter: "gpp-optimization-patterns",
    level: 2,
    question: "怎样计算VI. Optimization Patterns前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“建立性能基线 → 定位真实热点 → 选择结构变换 → 验证正确与资源代价 → 比较长尾收益”复核性能基线、真实热点、结构变换、资源代价、长尾收益，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["结构变换", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-optimization-patterns-4",
    chapter: "gpp-optimization-patterns",
    level: 2,
    question: "怎样验证VI. Optimization Patterns没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“建立性能基线 → 定位真实热点 → 选择结构变换 → 验证正确与资源代价 → 比较长尾收益”复核性能基线、真实热点、结构变换、资源代价、长尾收益，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["资源代价", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-optimization-patterns-5",
    chapter: "gpp-optimization-patterns",
    level: 3,
    question: "怎样向VI. Optimization Patterns注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“建立性能基线 → 定位真实热点 → 选择结构变换 → 验证正确与资源代价 → 比较长尾收益”复核性能基线、真实热点、结构变换、资源代价、长尾收益，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["长尾收益", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-optimization-patterns-6",
    chapter: "gpp-optimization-patterns",
    level: 4,
    question: "怎样证明VI. Optimization Patterns能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“建立性能基线 → 定位真实热点 → 选择结构变换 → 验证正确与资源代价 → 比较长尾收益”复核性能基线、真实热点、结构变换、资源代价、长尾收益，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["性能基线", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-17-data-locality-1",
    chapter: "gpp-chapter-17-data-locality",
    level: 1,
    question: "怎样为17. Data Locality建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“采样访问轨迹 → 识别热字段 → 连续重排数据 → 批量执行更新 → 测量缓存事件”复核访问轨迹、热字段、连续数组、批量更新、缓存事件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["访问轨迹", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-17-data-locality-2",
    chapter: "gpp-chapter-17-data-locality",
    level: 1,
    question: "怎样逐项核对17. Data Locality的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“采样访问轨迹 → 识别热字段 → 连续重排数据 → 批量执行更新 → 测量缓存事件”复核访问轨迹、热字段、连续数组、批量更新、缓存事件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["热字段", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-17-data-locality-3",
    chapter: "gpp-chapter-17-data-locality",
    level: 2,
    question: "怎样计算17. Data Locality前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“采样访问轨迹 → 识别热字段 → 连续重排数据 → 批量执行更新 → 测量缓存事件”复核访问轨迹、热字段、连续数组、批量更新、缓存事件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["连续数组", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-17-data-locality-4",
    chapter: "gpp-chapter-17-data-locality",
    level: 2,
    question: "怎样验证17. Data Locality没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“采样访问轨迹 → 识别热字段 → 连续重排数据 → 批量执行更新 → 测量缓存事件”复核访问轨迹、热字段、连续数组、批量更新、缓存事件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["批量更新", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-17-data-locality-5",
    chapter: "gpp-chapter-17-data-locality",
    level: 3,
    question: "怎样向17. Data Locality注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“采样访问轨迹 → 识别热字段 → 连续重排数据 → 批量执行更新 → 测量缓存事件”复核访问轨迹、热字段、连续数组、批量更新、缓存事件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["缓存事件", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-17-data-locality-6",
    chapter: "gpp-chapter-17-data-locality",
    level: 4,
    question: "怎样证明17. Data Locality能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“采样访问轨迹 → 识别热字段 → 连续重排数据 → 批量执行更新 → 测量缓存事件”复核访问轨迹、热字段、连续数组、批量更新、缓存事件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["访问轨迹", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-18-dirty-flag-1",
    chapter: "gpp-chapter-18-dirty-flag",
    level: 1,
    question: "怎样为18. Dirty Flag建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“修改主数据 → 传播脏状态 → 延迟派生计算 → 首次读取时清理 → 验证遗漏与延迟”复核主数据、脏状态、延迟计算、清理时机、跟踪粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["主数据", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-18-dirty-flag-2",
    chapter: "gpp-chapter-18-dirty-flag",
    level: 1,
    question: "怎样逐项核对18. Dirty Flag的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“修改主数据 → 传播脏状态 → 延迟派生计算 → 首次读取时清理 → 验证遗漏与延迟”复核主数据、脏状态、延迟计算、清理时机、跟踪粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["脏状态", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-18-dirty-flag-3",
    chapter: "gpp-chapter-18-dirty-flag",
    level: 2,
    question: "怎样计算18. Dirty Flag前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“修改主数据 → 传播脏状态 → 延迟派生计算 → 首次读取时清理 → 验证遗漏与延迟”复核主数据、脏状态、延迟计算、清理时机、跟踪粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["延迟计算", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-18-dirty-flag-4",
    chapter: "gpp-chapter-18-dirty-flag",
    level: 2,
    question: "怎样验证18. Dirty Flag没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“修改主数据 → 传播脏状态 → 延迟派生计算 → 首次读取时清理 → 验证遗漏与延迟”复核主数据、脏状态、延迟计算、清理时机、跟踪粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["清理时机", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-18-dirty-flag-5",
    chapter: "gpp-chapter-18-dirty-flag",
    level: 3,
    question: "怎样向18. Dirty Flag注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“修改主数据 → 传播脏状态 → 延迟派生计算 → 首次读取时清理 → 验证遗漏与延迟”复核主数据、脏状态、延迟计算、清理时机、跟踪粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["跟踪粒度", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-18-dirty-flag-6",
    chapter: "gpp-chapter-18-dirty-flag",
    level: 4,
    question: "怎样证明18. Dirty Flag能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“修改主数据 → 传播脏状态 → 延迟派生计算 → 首次读取时清理 → 验证遗漏与延迟”复核主数据、脏状态、延迟计算、清理时机、跟踪粒度，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["主数据", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-19-object-pool-1",
    chapter: "gpp-chapter-19-object-pool",
    level: 1,
    question: "怎样为19. Object Pool建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“预算池容量 → 获取空闲槽位 → 完整初始化 → 使用并记录代际 → 重置归还池”复核容量预算、空闲槽位、对象重置、代际句柄、碎片控制，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["容量预算", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-19-object-pool-2",
    chapter: "gpp-chapter-19-object-pool",
    level: 1,
    question: "怎样逐项核对19. Object Pool的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“预算池容量 → 获取空闲槽位 → 完整初始化 → 使用并记录代际 → 重置归还池”复核容量预算、空闲槽位、对象重置、代际句柄、碎片控制，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["空闲槽位", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-19-object-pool-3",
    chapter: "gpp-chapter-19-object-pool",
    level: 2,
    question: "怎样计算19. Object Pool前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“预算池容量 → 获取空闲槽位 → 完整初始化 → 使用并记录代际 → 重置归还池”复核容量预算、空闲槽位、对象重置、代际句柄、碎片控制，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["对象重置", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-19-object-pool-4",
    chapter: "gpp-chapter-19-object-pool",
    level: 2,
    question: "怎样验证19. Object Pool没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“预算池容量 → 获取空闲槽位 → 完整初始化 → 使用并记录代际 → 重置归还池”复核容量预算、空闲槽位、对象重置、代际句柄、碎片控制，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["代际句柄", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-19-object-pool-5",
    chapter: "gpp-chapter-19-object-pool",
    level: 3,
    question: "怎样向19. Object Pool注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“预算池容量 → 获取空闲槽位 → 完整初始化 → 使用并记录代际 → 重置归还池”复核容量预算、空闲槽位、对象重置、代际句柄、碎片控制，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["碎片控制", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-19-object-pool-6",
    chapter: "gpp-chapter-19-object-pool",
    level: 4,
    question: "怎样证明19. Object Pool能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“预算池容量 → 获取空闲槽位 → 完整初始化 → 使用并记录代际 → 重置归还池”复核容量预算、空闲槽位、对象重置、代际句柄、碎片控制，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["容量预算", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-chapter-20-spatial-partition-1",
    chapter: "gpp-chapter-20-spatial-partition",
    level: 1,
    question: "怎样为20. Spatial Partition建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“选择分区尺度 → 插入对象位置 → 枚举相关单元 → 执行邻域查询 → 更新跨单元移动”复核分区尺度、对象索引、相关单元、邻域查询、移动更新，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["分区尺度", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-20-spatial-partition-2",
    chapter: "gpp-chapter-20-spatial-partition",
    level: 1,
    question: "怎样逐项核对20. Spatial Partition的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“选择分区尺度 → 插入对象位置 → 枚举相关单元 → 执行邻域查询 → 更新跨单元移动”复核分区尺度、对象索引、相关单元、邻域查询、移动更新，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["对象索引", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-chapter-20-spatial-partition-3",
    chapter: "gpp-chapter-20-spatial-partition",
    level: 2,
    question: "怎样计算20. Spatial Partition前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“选择分区尺度 → 插入对象位置 → 枚举相关单元 → 执行邻域查询 → 更新跨单元移动”复核分区尺度、对象索引、相关单元、邻域查询、移动更新，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["相关单元", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-20-spatial-partition-4",
    chapter: "gpp-chapter-20-spatial-partition",
    level: 2,
    question: "怎样验证20. Spatial Partition没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“选择分区尺度 → 插入对象位置 → 枚举相关单元 → 执行邻域查询 → 更新跨单元移动”复核分区尺度、对象索引、相关单元、邻域查询、移动更新，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["邻域查询", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-chapter-20-spatial-partition-5",
    chapter: "gpp-chapter-20-spatial-partition",
    level: 3,
    question: "怎样向20. Spatial Partition注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“选择分区尺度 → 插入对象位置 → 枚举相关单元 → 执行邻域查询 → 更新跨单元移动”复核分区尺度、对象索引、相关单元、邻域查询、移动更新，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["移动更新", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-chapter-20-spatial-partition-6",
    chapter: "gpp-chapter-20-spatial-partition",
    level: 4,
    question: "怎样证明20. Spatial Partition能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“选择分区尺度 → 插入对象位置 → 枚举相关单元 → 执行邻域查询 → 更新跨单元移动”复核分区尺度、对象索引、相关单元、邻域查询、移动更新，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["分区尺度", "作者2014人邮2016", "level-4"],
  },
  {
    id: "gpp-official-final-review-1",
    chapter: "gpp-official-final-review",
    level: 1,
    question:
      "怎样为《游戏编程模式》全书总复习建立问题、参与者与生命周期边界？",
    answer:
      "先保存无模式基线，再画调用、数据、所有权和帧时序。 沿“重放需求变化 → 检查帧级时序 → 注入行为扩展 → 审计隐藏依赖 → 签收性能与移除条件”复核变化传播、帧级时序、行为扩展、隐藏依赖、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化传播", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-official-final-review-2",
    chapter: "gpp-official-final-review",
    level: 1,
    question: "怎样逐项核对《游戏编程模式》全书总复习的作者源码标题？",
    answer:
      "按标题顺序说明意图、适用条件、代价、设计决策与反例。 沿“重放需求变化 → 检查帧级时序 → 注入行为扩展 → 审计隐藏依赖 → 签收性能与移除条件”复核变化传播、帧级时序、行为扩展、隐藏依赖、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["帧级时序", "作者2014人邮2016", "level-1"],
  },
  {
    id: "gpp-official-final-review-3",
    chapter: "gpp-official-final-review",
    level: 2,
    question: "怎样计算《游戏编程模式》全书总复习前后的变化传播与运行成本？",
    answer:
      "固定需求和场景，统计模块改动、合同变化、帧分位数、分配、队列和缓存。 沿“重放需求变化 → 检查帧级时序 → 注入行为扩展 → 审计隐藏依赖 → 签收性能与移除条件”复核变化传播、帧级时序、行为扩展、隐藏依赖、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["行为扩展", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-official-final-review-4",
    chapter: "gpp-official-final-review",
    level: 2,
    question: "怎样验证《游戏编程模式》全书总复习没有隐藏依赖或破坏帧时序？",
    answer:
      "用依赖图、组合根、阶段快照和生命周期故障交叉核对。 沿“重放需求变化 → 检查帧级时序 → 注入行为扩展 → 审计隐藏依赖 → 签收性能与移除条件”复核变化传播、帧级时序、行为扩展、隐藏依赖、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["隐藏依赖", "作者2014人邮2016", "level-2"],
  },
  {
    id: "gpp-official-final-review-5",
    chapter: "gpp-official-final-review",
    level: 3,
    question: "怎样向《游戏编程模式》全书总复习注入规模压力和不适用反例？",
    answer:
      "一次只改变对象、事件、状态或线程规模，先预测并保存模式失效点。 沿“重放需求变化 → 检查帧级时序 → 注入行为扩展 → 审计隐藏依赖 → 签收性能与移除条件”复核变化传播、帧级时序、行为扩展、隐藏依赖、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["移除条件", "作者2014人邮2016", "level-3"],
  },
  {
    id: "gpp-official-final-review-6",
    chapter: "gpp-official-final-review",
    level: 4,
    question: "怎样证明《游戏编程模式》全书总复习能迁移且可安全删除？",
    answer:
      "更换语言或引擎但保持问题与证据合同，并定义触发简化或移除的条件。 沿“重放需求变化 → 检查帧级时序 → 注入行为扩展 → 审计隐藏依赖 → 签收性能与移除条件”复核变化传播、帧级时序、行为扩展、隐藏依赖、移除条件，保存构建、需求、场景、依赖、帧轨迹、性能分位数和最终决策。",
    tags: ["变化传播", "作者2014人邮2016", "level-4"],
  },
];
