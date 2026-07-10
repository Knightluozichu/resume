import type { ReviewQuestion } from "./types";

/** Effective C# 泛型约束复习题 */
export const ecsGenericConstraintsQuestions: ReviewQuestion[] = [
  {
    id: "ecs-generic-constraints-1",
    chapter: "ecs-generic-constraints",
    level: 1,
    question: `不加约束时，泛型类型参数 T 能做什么？为什么？`,
    answer:
      `不加约束时，编译器只把 T 当 object——只能调用 object 的方法（Equals、ToString、GetHashCode），不能用 new T()，不能赋 null（除非是引用类型），不能调用任何类型特定方法如 CompareTo。\n\n原因：编译器在编译泛型时不知道 T 的具体类型，只能假设它最弱的能力即 object 的能力。要调用类型特定的成员，必须用 where 约束告诉编译器 T 至少有什么能力。\n\n这正是需要约束的原因：约束让编译器知道 T 的能力，从而解锁对应成员的调用，把「什么都能放但什么都干不了」变成「有特定能力的才能放且能干活」。`,
    tags: ["泛型", "无约束", "object", "编译器"],
  },
  {
    id: "ecs-generic-constraints-2",
    chapter: "ecs-generic-constraints",
    level: 2,
    question:
      `列出五种泛型约束及各自解锁的能力。最小约束原则是什么？`,
    answer:
      `五种约束：\n1. where T : class——引用类型，解锁赋 null 和 as/is。\n2. where T : struct——值类型（非 Nullable），解锁无装箱存储。\n3. where T : new()——有无参公共构造函数，解锁 new T()。\n4. where T : IComparable<T>——实现接口，解锁接口方法调用。\n5. where T : Base——继承基类，解锁基类成员访问。\n\n最小约束原则：只约束泛型方法真正用到的能力。方法体只调用 CompareTo 就只加 IComparable<T>，不顺手加 new() 或 class。每多一个约束都在缩小适用范围（排除不满足的类型），必须有充分理由。约束越少，能传入的类型越多，泛型复用性越强。`,
    tags: ["五种约束", "最小约束", "复用性", "where"],
  },
  {
    id: "ecs-generic-constraints-3",
    chapter: "ecs-generic-constraints",
    level: 3,
    question:
      `为什么应该用泛型约束替代运行时强制转换？两者在类型安全上有什么区别？`,
    answer:
      `运行时强转（如 ((IComparable)a).CompareTo(b)）绕过编译期检查：类型不匹配时运行时才抛 InvalidCastException，错误延迟到运行时。且强转代码冗长、可读性差。\n\n泛型约束（where T : IComparable<T>）让编译器在编译期保证 T 有 CompareTo：类型不匹配在编译时就报错，错误前置到编译期。泛型方法体内直接 a.CompareTo(b)，无强转、类型安全、可读性好。\n\n类型安全区别：强转是「运行时赌类型对不对」，错了抛异常；约束是「编译期保证类型对」，错了编译不过。Effective C# 的原则是用约束把类型检查交给编译器，让错误编译不通过，而非运行时爆炸。这正是「让类型系统兜底」的体现。`,
    tags: ["约束vs强转", "类型安全", "编译期", "运行时"],
  },
  {
    id: "ecs-generic-constraints-4",
    chapter: "ecs-generic-constraints",
    level: 4,
    question:
      `性能敏感场景下 new() 约束的 new T() 有什么开销？如何用工厂函数替代？`,
    answer:
      `new() 约束的 new T() 通过反射调用构造器——运行时要查找 T 的无参构造方法并反射调用，有额外开销（反射查找 + 装箱可能的委托调用），比直接 new 慢。在性能敏感的热路径上（如频繁创建大量泛型实例），这个开销不可忽略。\n\n用工厂函数替代：把构造逻辑外部传入，而非靠 new() 约束。方法签名改为接收 Func<T> factory，调用方传入具体构造逻辑：\n\npublic T Create<T>(Func<T> factory) => factory();\n\n调用方传 () => new T() 或任何自定义构造。这样构造调用是直接委托调用，无反射开销，且支持需要参数的构造（new() 约束只能无参）。\n\n权衡：new() 约束 API 更简洁（调用方不用传工厂），适合非热路径；Func<T> 工厂性能更好且更灵活（支持有参构造、对象池复用），适合热路径。按场景取舍。`,
    tags: ["new()约束", "反射开销", "工厂函数", "性能", "Func<T>"],
  },
];
