import type { ReviewQuestion } from "./types";

/** Rust Trait 进阶 复习题 */
export const mrsTraitsAdvancedQuestions: ReviewQuestion[] = [
  {
    id: "mrs-traits-advanced-1",
    chapter: "mrs-traits-advanced",
    level: 1,
    question: `Rust 中关联类型（associated type）和泛型 trait 的区别是什么？`,
    answer: `关联类型 \`trait Iterator { type Item; }\` 在一个 impl 中只能确定一种 Item 类型——impl Iterator for Vec<T> 的 Item 就是 T，不能有第二个 impl。泛型 trait \`trait From<T> { fn from(t: T) -> Self; }\` 可以多次 impl——impl From<u32> for i64 和 impl From<String> for i64 可以共存。关联类型适合「一个类型实现一个 trait 时只有一种合理的关联类型」（如 Iterator 的 Item），更清晰不需要在类型签名中重复标注。泛型 trait 适合「一个类型可以用不同参数多次实现」（如 From 的多种转换）。`,
    tags: ["关联类型", "泛型trait", "基础"],
  },
  {
    id: "mrs-traits-advanced-2",
    chapter: "mrs-traits-advanced",
    level: 2,
    question: `静态分发和动态分发的区别是什么？各自适合什么场景？`,
    answer: `静态分发（单态化）：\`fn func<T: Trait>(x: T)\` 编译期为每种具体类型生成一份代码，调用时直接内联，零运行时开销但代码膨胀。适合性能敏感路径。动态分发（trait 对象）：\`fn func(x: &dyn Trait)\` 运行时通过 vtable 间接调用方法，有一次指针解引用开销无法内联，但代码不膨胀。适合异构集合（Vec<Box<dyn Trait>> 存不同类型）和插件系统。原则：优先静态分发（性能好），需要运行时多态或异构集合时才用动态分发。trait 对象是胖指针（数据指针 + vtable 指针），对象安全 trait（方法不涉及 Self/Sized）才能做 dyn。`,
    tags: ["静态分发", "动态分发", "vtable", "理解"],
  },
  {
    id: "mrs-traits-advanced-3",
    chapter: "mrs-traits-advanced",
    level: 3,
    question: `什么是 trait 约束（bounds）？如何使用多重约束和 where 子句？`,
    answer: `trait 约束限定泛型类型必须实现哪些 trait，编译期检查。基本语法 \`fn max<T: Ord + Clone>(a: T, b: T) -> T\` 要求 T 同时实现 Ord 和 Clone。多重约束用 + 连接。当约束复杂或函数签名可读性差时用 where 子句：\`\`\`rust\nfn process<T, U>(x: T, y: U) -> String\nwhere\n    T: Display + PartialOrd,\n    U: AsRef<str>,\n{\n    // ...\n}\n\`\`\`\nwhere 子句把约束移到函数签名后面，让签名更清晰。还可以用 impl Trait 语法糖简化：\`fn func(x: impl Display + Clone)\` 等价于泛型 + 约束。约束让编译器知道泛型类型有哪些能力可用，是 Rust 类型系统的核心抽象机制。`,
    tags: ["trait约束", "where子句", "代码编写"],
  },
  {
    id: "mrs-traits-advanced-4",
    chapter: "mrs-traits-advanced",
    level: 4,
    question: `什么是对象安全（object safety）？哪些 trait 可以做 trait 对象（dyn Trait），哪些不能？`,
    answer: `对象安全是 trait 能作为 trait 对象（dyn Trait）使用的条件。一个 trait 是对象安全的，当且仅当：1) 所有方法不返回 Self（因为 trait 对象不知道具体类型，无法构造 Self）；2) 所有方法不包含泛型类型参数（因为泛型方法需要编译期为每种类型生成代码，trait 对象在运行时不知道具体类型）；3) trait 不要求 Sized（trait 对象是 DST）。符合的 trait：Display（fn fmt(&self) 不返回 Self），Iterator（但 next 返回 Option<Self::Item>，而 Self::Item 是关联类型不是 Self，所以可选对象安全）。不符合的：Clone（fn clone(&self) -> Self 返回 Self），Default（fn default() -> Self 无 &self 且返回 Self）。不能做 trait 对象的 trait 只能用泛型（静态分发）。`,
    tags: ["对象安全", "trait对象", "dyn", "综合"],
  },
];
