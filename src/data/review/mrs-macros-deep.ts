import type { ReviewQuestion } from "./types";

/** Rust 宏深入 复习题 */
export const mrsMacrosDeepQuestions: ReviewQuestion[] = [
  {
    id: "mrs-macros-deep-1",
    chapter: "mrs-macros-deep",
    level: 1,
    question: "Rust 中声明宏和过程宏的区别是什么？各自适合什么场景？",
    answer: "声明宏（macro_rules!）用模式匹配驱动代码展开，语法类似 match，只能做文本替换级的生成，无法操作 AST。适合简单的重复代码生成（如 vec![]、println!）。过程宏（proc-macro）直接接收和操作 TokenStream，可以在 AST 级读取、修改、生成任意代码，分为 derive（自动实现 trait）、attribute（修饰代码项）、function-like（自定义语法）三种。适合复杂的代码生成（如 serde 的 Serialize、wasm-bindgen 的导出）。声明宏够用就别上过程宏——过程宏威力大但编译慢、调试难、需独立 crate。",
    tags: ["声明宏", "过程宏", "基础"],
  },
  {
    id: "mrs-macros-deep-2",
    chapter: "mrs-macros-deep",
    level: 2,
    question: "宏和函数的核心区别是什么？为什么说宏是「零运行时开销」？",
    answer: "函数在运行时被调用，参数类型固定，有调用开销（栈帧、跳转）。宏在编译期展开——编译器把宏调用替换为宏展开后的代码，运行时不存在「宏调用」这个概念，因此零运行时开销。宏可以接受可变参数和可变语法（如 vec![1, 2, 3] 和 vec![] 都合法），函数不行。但宏不检查类型（展开后才检查），调试困难（错误信息指向展开后的代码），且宏展开增加编译时间。原则：能用函数就用函数，函数做不到的（可变参数、编译期代码生成）才用宏。",
    tags: ["宏vs函数", "零成本", "理解"],
  },
  {
    id: "mrs-macros-deep-3",
    chapter: "mrs-macros-deep",
    level: 3,
    question: "请编写一个声明宏 hashmap!，用于便捷创建 HashMap，如 hashmap!{\"a\" => 1, \"b\" => 2}。",
    answer: "```rust\nmacro_rules! hashmap {\n    ( $( $key:expr => $val:expr ),* $(,)? ) => {{\n        let mut map = std::collections::HashMap::new();\n        $(\n            map.insert($key, $val);\n        )*\n        map\n    }};\n}\n\n// 使用\nlet m = hashmap!{\"a\" => 1, \"b\" => 2, \"c\" => 3};\n```\n\n要点：$( ... ),* 匹配零个或多个「key => val」对，$(,)? 允许可选尾逗号。$( ... )* 在展开时重复 insert 调用。{{ }} 双花括号创建块作用域，返回 map。这个宏在编译期展开为多次 insert 调用，零运行时开销。",
    tags: ["macro_rules", "hashmap", "代码编写"],
  },
  {
    id: "mrs-macros-deep-4",
    chapter: "mrs-macros-deep",
    level: 4,
    question: "过程宏的 derive 模式是如何工作的？以 serde 的 #[derive(Serialize)] 为例说明。",
    answer: "derive 过程宏工作流程：1) 编译器解析 #[derive(Serialize)] 标注的结构体/枚举，把其 TokenStream 传给 serde_derive crate 注册的 derive 宏函数；2) 宏函数用 syn 库解析 TokenStream 为 AST，提取字段名、类型、属性（如 #[serde(rename)]）；3) 用 quote 库生成实现 Serialize trait 的 TokenStream——为每个字段生成 serialize 调用代码；4) 编译器把生成的代码与原代码合并编译。以 struct Point { x: f64, y: f64 } 为例，#[derive(Serialize)] 生成类似 impl Serialize for Point { fn serialize(&self) { serialize_struct { field(\"x\", self.x); field(\"y\", self.y) } } } 的代码。整个过程在编译期完成，运行时无反射开销，这就是 Rust 序列化比 Java 快的原因——零成本抽象。",
    tags: ["derive", "serde", "过程宏", "综合"],
  },
];
