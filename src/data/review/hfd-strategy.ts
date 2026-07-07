import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 策略模式复习题 */
export const hfdStrategyQuestions: ReviewQuestion[] = [
  {
    id: "hfd-strategy-1",
    chapter: "hfd-strategy",
    level: 1,
    question: "策略模式的定义是什么？它的三个核心角色分别是什么？",
    answer:
      "策略模式定义：定义一系列算法，把每一个封装起来，使它们可以互相替换。策略模式让算法的变化独立于使用算法的客户端。\n\n三个核心角色：\n1. Strategy 接口：声明所有具体策略共有的方法（如 `fly()`），是客户端面向的抽象。\n2. ConcreteStrategy（具体策略）：实现 Strategy 接口的具体算法，每个类封装一种变体。\n3. Context（上下文）：持有 Strategy 引用，把算法调用委托给当前策略对象。Context 只和接口对话，不关心具体实现。\n\n关键：Context 负责「用谁」，ConcreteStrategy 负责「怎么做」，通过接口解耦。",
    tags: ["定义", "三要素"],
  },
  {
    id: "hfd-strategy-2",
    chapter: "hfd-strategy",
    level: 2,
    question: "为什么策略模式比继承方案更好？请用「多用组合少用继承」原则解释。",
    answer:
      "继承方案的问题：把行为写死在父类，所有子类共享同一行为。\n- 橡皮鸭不会飞却继承飞行代码——必须覆盖成空方法（废话代码）。\n- 新增行为变体要改父类或创建新子类——修改波及面大。\n- 运行时无法切换行为——编译期就确定了。\n- 行为只能单一继承，无法组合多种行为。\n\n策略模式用组合代替继承：Duck 持有 FlyBehavior 和 QuackBehavior 两个接口引用，行为是独立对象。\n- 每个鸭子可以独立配置飞行和叫声行为——组合灵活。\n- 新增行为只需加实现类，不改 Duck——开闭原则。\n- 运行时调 setter 替换行为——动态切换。\n- 行为可以复用——多个鸭子共享同一策略对象。\n\n这就是「多用组合少用继承」的体现：行为用组合注入，不用继承硬编码。",
    tags: ["组合优于继承", "原理"],
  },
  {
    id: "hfd-strategy-3",
    chapter: "hfd-strategy",
    level: 3,
    question: "一个支付系统 `pay()` 方法用 if-else 判断支付宝/微信/银行卡，如何用策略模式重构？写出关键 Java 代码。",
    answer:
      "重构前：`if (type.equals('alipay')) {...} else if (type.equals('wechat')) {...}`，每加一种支付方式要改 pay() 方法。\n\n重构步骤：\n```java\n// 1. 策略接口\npublic interface PaymentStrategy {\n    void pay(double amount);\n}\n// 2. 具体策略\npublic class AlipayStrategy implements PaymentStrategy {\n    public void pay(double amount) { /* 支付宝支付 */ }\n}\npublic class WechatPayStrategy implements PaymentStrategy {\n    public void pay(double amount) { /* 微信支付 */ }\n}\n// 3. Context\npublic class PaymentContext {\n    private PaymentStrategy strategy;\n    public void setStrategy(PaymentStrategy s) { this.strategy = s; }\n    public void pay(double amount) { strategy.pay(amount); }\n}\n```\n新增支付方式只需加实现类并注册，PaymentContext 一行不改。符合开闭原则。",
    tags: ["重构", "应用", "Java"],
  },
  {
    id: "hfd-strategy-4",
    chapter: "hfd-strategy",
    level: 4,
    question: "策略模式和状态模式结构几乎一样（都是 Context 持有接口引用），它们的本质区别是什么？",
    answer:
      "结构相同，但意图和用法本质不同：\n\n1. 意图不同：\n- 策略模式：客户端主动选择用哪个算法，策略之间是「平行替代」关系。\n- 状态模式：对象状态自动流转，状态之间有「转换」关系，客户端通常不感知当前状态。\n\n2. 谁控制切换：\n- 策略：由客户端（Context 外部）决定用哪个策略，调 setStrategy() 主动切换。\n- 状态：由状态对象自身决定下一个状态，Context 内部自动流转。\n\n3. 策略/状态对象是否知道彼此：\n- 策略：具体策略互不感知，彼此独立。\n- 状态：具体状态通常知道如何转换到其他状态（持有 Context 引用）。\n\n4. 生命周期：\n- 策略：Context 可以在任意时刻切换策略，也可以不切换。\n- 状态：Context 的状态由内部逻辑驱动自动变化，外部不直接控制。\n\n举例：支付方式选择是策略（用户选），交通灯红→绿→黄是状态（自动流转）。判断依据：切换是外部主动还是内部自动。",
    tags: ["综合", "策略 vs 状态", "对比"],
  },
];
