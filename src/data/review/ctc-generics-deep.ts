import type { ReviewQuestion } from "./types";

export const ctcGenericsDeepQuestions: ReviewQuestion[] = [
  {
    id: "ctc-generics-deep-1",
    chapter: "ctc-generics-deep",
    level: 1,
    question: `C# 泛型和 Java 泛型有什么本质区别？这对运行时行为有什么影响？`,
    answer: `Java泛型是类型擦除——编译后List<String>变成List<Object>，运行时无法知道T是什么。C#泛型在运行时保留类型参数（reified generics）——typeof(List<int>)和typeof(List<string>)是不同的Type对象。影响：C#值类型泛型不装箱（Java会装箱为Object），C#运行时反射可获取类型参数，C#方法内可用typeof(T)，C#可按泛型参数的运行时类型重载。`,
    tags: ["泛型", "类型擦除", "reified", "Java对比"],
  },
  {
    id: "ctc-generics-deep-2",
    chapter: "ctc-generics-deep",
    level: 2,
    question: `列出 C# 泛型约束的六种类型，并解释 where T : new() 和 where T : struct 为什么不能同时使用。`,
    answer: `六种约束：class（引用类型）、struct（值类型）、new()有无参构造、接口（IComparable<T>等）、基类（BaseClass）、notnull（不可空）。struct和new()不能同时使用因为struct始终有隐式公共无参构造函数（初始化为零值），new T()总是可用，加new()约束是冗余的。同理class和struct互斥——T不可能既是引用类型又是值类型。`,
    tags: ["泛型约束", "where", "struct", "new()"],
  },
  {
    id: "ctc-generics-deep-3",
    chapter: "ctc-generics-deep",
    level: 3,
    question: `为什么 IEnumerable<out T> 可以协变而 IList<T> 不能？请从类型安全角度分析。`,
    answer: `IEnumerable<out T>只暴露读取方法（GetEnumerator），T只出现在返回值位置。协变安全：IEnumerable<Dog>赋给IEnumerable<Animal>后，读出的每个元素都是Dog，一定是Animal。IList<T>同时暴露读（getter）和写（Add(T)、setter）。如果允许IList<Dog>赋给IList<Animal>，就能调用animals.Add(new Cat())，但实际存储是List<Dog>，存入Cat破坏类型安全。既读又写的泛型接口必须不变。`,
    tags: ["协变", "逆变", "out", "类型安全", "IEnumerable"],
  },
  {
    id: "ctc-generics-deep-4",
    chapter: "ctc-generics-deep",
    level: 4,
    question: `设计一个泛型缓存类 Cache<TKey, TValue>，要求 TKey 不可空、TValue 有无参构造、TKey 可比较。写出约束声明并解释每个约束的作用。`,
    answer: `class Cache<TKey, TValue> where TKey : notnull, IComparable<TKey> where TValue : new()。notnull约束确保TKey不可为null（可空上下文下），避免null key导致字典查找异常。IComparable<TKey>约束允许调用TKey.CompareTo(TKey)做比较排序，也可用Dictionary的键比较。new()约束允许new TValue()创建默认值——当缓存未命中时可以创建TValue的默认实例。注意TValue不能同时加struct约束（与new()互斥），但如果TValue是引用类型需要加class约束确保不与值类型混淆。`,
    tags: ["泛型设计", "约束", "notnull", "IComparable", "new()"],
  },
];
