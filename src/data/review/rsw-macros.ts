import type { ReviewQuestion } from "./types";

/** 宏系统 复习题 */
export const rswMacrosQuestions: ReviewQuestion[] = [
  {
    id: "rsw-macros-1",
    chapter: "rsw-macros",
    level: 1,
    question: "宏和函数的本质区别是什么？",
    answer: "宏在编译期展开生成新代码，函数在运行期调用执行代码。宏接受 token 树（可变参数、可变结构），函数接受固定签名参数。宏不看类型（在类型检查前展开），函数有完整类型检查。宏能生成新代码结构、定义新语法，函数不能。",
    tags: ["宏", "函数", "对比"],
  },
  {
    id: "rsw-macros-2",
    chapter: "rsw-macros",
    level: 2,
    question: "声明宏（macro_rules!）和过程宏各自的工作原理是什么？",
    answer: "声明宏基于模式匹配：输入解析成 token 树，按 $( $x:expr ),* 这样的模式匹配，匹配分支把 token 替换到输出模板展开。标准库内置、简单但能力有限。过程宏程序化操作语法树：接收 TokenStream，用 syn 解析成 AST，用 Rust 代码处理，用 quote 生成输出 TokenStream。分 derive/attribute/function-like 三类，需独立 crate（proc-macro=true），能力强但开发复杂。",
    tags: ["声明宏", "过程宏", "工作原理"],
  },
  {
    id: "rsw-macros-3",
    chapter: "rsw-macros",
    level: 3,
    question: "什么时候必须用宏？什么时候应该避免？",
    answer: "必须用宏：1. 可变参数（vec!、println!）；2. 编译期检查（println! 验证格式串与参数匹配）；3. 生成代码结构（#[derive(Debug)] 生成 impl）；4. 消除大量重复样板。应该避免：能用函数+泛型+trait 实现的功能就别用宏——宏维护成本高（错误指向展开后代码）、调试难、IDE 支持差、二进制膨胀。原则：能不写宏就不写，宏是消除样板代码的最后手段。",
    tags: ["宏", "适用场景", "原则"],
  },
  {
    id: "rsw-macros-4",
    chapter: "rsw-macros",
    level: 4,
    question: "宏的「卫生性」是什么？它和 C 宏的变量名污染有什么区别？设计一个需要非卫生的场景并说明解决方法。",
    answer: "卫生性：Rust 宏内部 let 引入的标识符不会与调用处同名变量冲突——宏内的 x 和调用处的 x 是不同的「 hygiene context」。这避免了 C 宏的变量名污染问题（C 宏展开可能意外覆盖调用处变量）。但也意味着宏不能「注入」变量到调用处作用域。需要非卫生的场景：宏需要引入一个调用者可引用的变量名（如 early-return 宏引入一个 result 变量）。解决方法：用 paste crate 或过程宏手动构造标识符（绕过卫生性），或让宏返回值而非注入变量。理解卫生性是写出正确宏的关键——它是安全特性，限制宏的副作用。",
    tags: ["卫生性", "C宏对比", "标识符", "综合"],
  },
];
