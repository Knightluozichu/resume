import type { ReviewQuestion } from "./types";

/** Trait 与泛型 复习题 */
export const rswTraitsGenericsQuestions: ReviewQuestion[] = [
  {
    id: "rsw-traits-generics-1",
    chapter: "rsw-traits-generics",
    level: 1,
    question: "什么是 Trait？它与 Java 接口有什么相似和不同？",
    answer: "Trait 定义一组方法签名（行为契约），类型通过 impl Trait for Type 实现。与 Java 接口相似：都定义行为契约、支持多态。不同：Rust trait 支持默认方法、关联类型、编译期单态化（零开销）、对象安全约束，且遵循孤儿规则（只能为本地类型或本地 trait 配对实现）。",
    tags: ["trait", "接口对比"],
  },
  {
    id: "rsw-traits-generics-2",
    chapter: "rsw-traits-generics",
    level: 2,
    question: "静态分发（单态化）和动态分发（trait 对象）各有什么优缺点？",
    answer: "静态分发（泛型单态化）：编译期为每个具体类型生成代码副本，调用直达函数地址可内联，零运行时开销；缺点是二进制体积随类型数增长。动态分发（&dyn Trait）：运行时通过虚表查函数地址，一次间接跳转；优点是体积小、可存异构集合；缺点是无法内联、有虚表开销、要求对象安全。性能敏感且类型有限用泛型，运行时异构用 trait 对象。",
    tags: ["静态分发", "动态分发", "单态化"],
  },
  {
    id: "rsw-traits-generics-3",
    chapter: "rsw-traits-generics",
    level: 3,
    question: "什么是孤儿规则？如何用 newtype 模式绕过它？",
    answer: "孤儿规则：只有当类型或 trait 至少有一个在当前 crate 定义时，才能为该类型实现该 trait。防止第三方类型与第三方 trait 的实现冲突。绕过方法：newtype 模式——struct MyVec(Vec<i32>); 创建新类型（在本 crate 中），为 MyVec 实现任意 trait。配合 Deref trait 可让 MyVec 自动获得 Vec 的方法。",
    tags: ["孤儿规则", "newtype", "封装"],
  },
  {
    id: "rsw-traits-generics-4",
    chapter: "rsw-traits-generics",
    level: 4,
    question: "设计一个支持多种排序算法的模块，要求既能零开销调用具体算法，又能运行时切换策略。如何综合运用泛型和 trait 对象？",
    answer: "定义 trait Sorter { fn sort<T: Ord>(&self, slice: &mut [T]); }。零开销路径：泛型函数 fn sort_with<S: Sorter>(s: &S, v: &mut [i32])，传入 QuickSort/ MergeSort 等具体类型，编译期单态化，无虚表。运行时切换路径：fn sort_dyn(s: &dyn Sorter, v: &mut [i32])，用 Box<dyn Sorter> 存异构策略集合，按配置选择。核心 API 用泛型给最大性能，灵活配置层用 trait 对象。这体现了「性能路径泛型、灵活路径 trait 对象」的综合取舍。",
    tags: ["泛型", "trait对象", "策略模式", "综合"],
  },
];
