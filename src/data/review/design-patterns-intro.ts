import type { ReviewQuestion } from "./types";

/** 设计模式入门章复习题 */
export const designPatternsIntroQuestions: ReviewQuestion[] = [
  {
    id: "dp-intro-01",
    chapter: "dp-intro",
    level: 1,
    question: "设计模式的「三要素」是什么？",
    answer: "模式名称（Pattern Name）、问题（Problem）、解决方案（Solution）。有时还包含效果（Consequences），描述应用模式后的权衡与结果。",
    tags: ["基础概念"],
  },
  {
    id: "dp-intro-02",
    chapter: "dp-intro",
    level: 2,
    question: "GoF 23 种设计模式分为哪三大类？各自关注什么？",
    answer: "创建型（Creational）关注对象创建过程，5 个；结构型（Structural）关注类与对象的组合，7 个；行为型（Behavioral）关注对象间的职责分配和通信，11 个。",
    tags: ["分类"],
  },
  {
    id: "dp-intro-03",
    chapter: "dp-intro",
    level: 2,
    question: "SOLID 原则中的「开闭原则」是什么意思？举一个违反它的例子。",
    answer: "开闭原则（Open-Closed Principle）：对扩展开放，对修改关闭。意思是添加新功能时应通过新增代码实现，而不是修改已有代码。\n\n违反示例：一个支付系统里 `processPayment()` 方法里用 if-else 判断支付类型（支付宝/微信/银行卡），每加一种支付方式就要改这个方法——这违反了 OCP。正确做法是用策略模式，每种支付方式是一个独立的策略类，新增支付方式只需加新类。",
    tags: ["SOLID", "开闭原则"],
  },
  {
    id: "dp-intro-04",
    chapter: "dp-intro",
    level: 3,
    question: "「没有设计模式」和「过度设计」分别会带来什么问题？如何平衡？",
    answer: "没有模式：代码耦合度高、重复多、难扩展、难维护，新增需求时到处改代码（违反 OCP）。\n\n过度设计：为不需要的灵活性引入大量抽象层，代码变得难以理解，开发效率下降。\n\n平衡原则：① 只在需求确实需要变化时引入模式；② 优先用最简单的方案；③ 遵循 YAGNI（You Aren't Gonna Need It）——不要为假想的未来需求设计。",
    tags: ["工程实践"],
  },
  {
    id: "dp-intro-05",
    chapter: "dp-intro",
    level: 4,
    question: "设计模式是「解决方案」还是「思维方式」？请结合一个你熟悉的模式说明。",
    answer: "设计模式既是解决方案，更是思维方式。\n\n作为解决方案：每个模式提供了特定上下文下经过验证的结构化方案，比如观察者模式解决「一个对象状态变化时需要通知多个依赖对象」的问题。\n\n作为思维方式：模式背后的原则（封装变化、针对接口编程、优先组合而非继承）比模式本身更重要。理解了原则，即使不知道某个模式的名字，也能自然地写出符合模式的代码。模式是原则的具体化，原则是模式的抽象。",
    tags: ["设计哲学"],
  },
];
