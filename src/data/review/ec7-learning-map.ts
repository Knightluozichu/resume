import type { ReviewQuestion } from "./types";

export const ec7LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ec7-learning-map-1",
    chapter: "ec7-learning-map",
    level: 1,
    question: `全书分为哪四大板块？各包含哪些章节？`,
    answer:
      `四大板块：(1) C# 基础（第 1-3 章：学习地图、类型与变量、运算符与控制流）；(2) 面向对象（第 4-5 章：类与对象、继承与接口）；(3) 泛型与委托（第 6-7 章：泛型、委托与事件）；(4) 高级特性（第 8-10 章：LINQ、异步编程、总复习）。`,
    tags: ["全书结构", "四段递进"],
  },
  {
    id: "ec7-learning-map-2",
    chapter: "ec7-learning-map",
    level: 2,
    question: `为什么不能跳过面向对象和泛型委托段，直接学 async/await？`,
    answer:
      `async/await 依赖三个前置知识：(1) Task 是泛型类（需要泛型基础）；(2) await 后的代码是回调 continuation（需要委托基础）；(3) 编译器生成的状态机是一个类（需要面向对象基础）。跳过这些基础，await 只是魔法关键字，出了死锁或异常无法排查。正确路径：基础 → 面向对象 → 泛型委托 → 高级特性。`,
    tags: ["学习路径", "依赖关系", "async-await"],
  },
  {
    id: "ec7-learning-map-3",
    chapter: "ec7-learning-map",
    level: 3,
    question: `C# 的单继承 + 接口多实现模型相比 C++ 多继承有什么设计优势？`,
    answer:
      `C# 单继承避免了多继承的菱形问题（两个基类有同名方法时二义性），更安全。接口多实现提供 can-do 能力组合，比 C++ 多继承更灵活。设计哲学：用接口定义能力契约（can-do），用继承表达类型关系（is-a），用组合替代深层继承。这使得代码耦合度更低、扩展性更强。C# 的委托和事件也是这个设计哲学的体现——用委托解耦调用者和被调用者。`,
    tags: ["继承", "接口", "设计哲学", "C++对比"],
  },
  {
    id: "ec7-learning-map-4",
    chapter: "ec7-learning-map",
    level: 4,
    question: `用「类型安全主线」串联全书四个板块的核心知识点，说明每层如何在前层基础上增强表达力。`,
    answer:
      `类型安全主线贯穿四层：\n(1) C# 基础：值类型/引用类型区分（栈 vs 堆、拷贝 vs 共享），var 编译期推断，模式匹配 switch 做类型安全分支。\n(2) 面向对象：用 class 封装数据与行为（字段 private + 属性 public），用 virtual/override 实现运行时多态，用 interface 定义能力契约。\n(3) 泛型与委托：泛型 where T : struct/class 约束直接引用值/引用类型区分，泛型消除装箱保持类型安全，委托 Func/Action 把方法类型安全化。\n(4) 高级特性：LINQ 基于 IEnumerable<T> 泛型枚举做类型安全查询，async/await 用 Task<T> 表示类型安全的\"未来结果\"。\n每一层都在前一层基础上提供更强的类型安全表达力，从基本类型到自定义类型，到参数化类型，到异步类型安全。`,
    tags: ["类型安全", "综合", "全书主线"],
  },
];
