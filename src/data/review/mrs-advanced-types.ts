import type { ReviewQuestion } from "./types";

/** Rust 高级类型 复习题 */
export const mrsAdvancedTypesQuestions: ReviewQuestion[] = [
  {
    id: "mrs-advanced-types-1",
    chapter: "mrs-advanced-types",
    level: 1,
    question: "Rust 中 Newtype 模式是什么？它解决了什么问题？",
    answer: "Newtype 模式是用 struct 包装一个现有类型，如 `struct Meters(u32);`。它解决了类型安全问题：u32 可以表示米、英尺、秒等任何量纲，直接用 u32 会导致不同量纲混用（米加英尺）而不报错。用 Newtype 包装后，Meters 和 Feet 是不同类型，编译器会在类型不匹配时报错。Newtype 是零成本抽象——编译后与原始类型内存布局完全相同，无运行时开销。",
    tags: ["Newtype", "类型安全", "基础"],
  },
  {
    id: "mrs-advanced-types-2",
    chapter: "mrs-advanced-types",
    level: 2,
    question: "类型别名（type）和 Newtype 的区别是什么？什么时候用哪个？",
    answer: "类型别名 `type Id = u64;` 只创建一个别名，Id 和 u64 完全等价，编译器不会区分——传 u32 给期望 Id 的函数不会报错（因为 Id 就是 u64）。Newtype `struct Id(u64);` 创建一个全新的类型，Id 和 u64 不兼容，必须显式转换。用类型别名的场景：简化复杂类型签名（如 `type Handler = Box<dyn Fn(Event) -> Result<()>>;`），不需要类型隔离。用 Newtype 的场景：需要类型安全隔离（如不同 ID 不能混用），需要为新类型实现 trait。核心区别：别名是方便，Newtype 是安全。",
    tags: ["类型别名", "Newtype", "对比", "理解"],
  },
  {
    id: "mrs-advanced-types-3",
    chapter: "mrs-advanced-types",
    level: 3,
    question: "Rust 的 DST（动态大小类型）是什么？胖指针的结构是怎样的？请举例说明。",
    answer: "DST 是编译期大小未知的类型，如 [T]（切片）、str（字符串切片）、dyn Trait（trait 对象）。它们不能直接存放在栈上，必须通过胖指针引用。胖指针是双字宽度的指针，包含数据指针和元数据：1) &[T] = (ptr, len)——数据指针 + 元素个数；2) &str = (ptr, len)——数据指针 + 字节长度；3) &dyn Trait = (ptr, vtable_ptr)——数据指针 + 虚表指针（vtable 包含方法地址）。例如 `let s: &str = "hello"` 中 s 是胖指针，ptr 指向字符串数据，len=5。DST 让 Rust 支持运行时确定大小的类型，同时保持类型安全。",
    tags: ["DST", "胖指针", "代码编写", "应用"],
  },
  {
    id: "mrs-advanced-types-4",
    chapter: "mrs-advanced-types",
    level: 4,
    question: "Never 类型（!）在 Rust 类型系统中的角色是什么？它如何影响控制流分析和类型推导？",
    answer: "Never 类型 ! 表示「永不返回」——值为 ! 的表达式不会产生任何值，因为执行不会继续到表达式之后。它在类型系统中的角色是「底类型」（bottom type），可以强制转换为任何类型，因为永远不会产生值所以类型无所谓。影响：1) 控制流分析——编译器知道 `panic!()`、`process::exit()`、无限循环返回 !，不会要求后续代码处理它们的返回值；2) 类型推导——`let x = match opt { Some(v) => v, None => panic!() }` 中 panic! 返回 !，可转为 T，所以 x 推导为 T；3) try 运算符——`?` 运算符依赖 FromResidual trait，错误路径返回 ! 转为目标类型。Never 类型让 Rust 的控制流分析更精确，避免不必要的类型冲突，是类型系统的优雅设计。",
    tags: ["Never类型", "底类型", "控制流", "综合"],
  },
];
