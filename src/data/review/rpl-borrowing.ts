import type { ReviewQuestion } from "./types";

/** 借用与引用 复习题 */
export const rplBorrowingQuestions: ReviewQuestion[] = [
  {
    id: "rpl-borrowing-1",
    chapter: "rpl-borrowing",
    level: 1,
    question: "Rust 的借用规则是什么？为什么有这些限制？",
    answer: "1.任意时刻可以有任意多个不可变引用(&T)，或只有一个可变引用(&mut T)，不能共存。2.引用生命周期不能超过被引用数据。限制原因：多个 &mut 导致数据竞争，&T 和 &mut 共存导致 &T 看到的数据被修改违反不可变承诺。编译期由借用检查器强制。",
    tags: ["借用","引用","借用检查器","数据竞争"],
  },
  {
    id: "rpl-borrowing-2",
    chapter: "rpl-borrowing",
    level: 2,
    question: "&T 和 &mut T 有什么区别？",
    answer: "&T 只读引用可同时多个不能修改数据。&mut T 可变引用同一时间只能一个可修改数据。创建 &T 不影响所有权。创建 &mut T 要求原变量是 mut 的。&T 是 Copy 的可随意复制，&mut T 不是 Copy 只能 move。",
    tags: ["不可变引用","可变引用","借用"],
  },
  {
    id: "rpl-borrowing-3",
    chapter: "rpl-borrowing",
    level: 3,
    question: "什么是 NLL（Non-Lexical Lifetimes）？解决什么问题？",
    answer: "NLL 是 Rust 2018 借用检查器改进。之前引用生命周期按词法作用域算——从创建到作用域结束都算活跃，导致安全代码编译失败。NLL 通过数据流分析，引用活跃范围只到最后一次使用处而非作用域结束。如 let r=&data; println!(\"{}\",r); data.push(1); 在 NLL 下编译通过因 r 在 push 前已不再使用。",
    tags: ["NLL","借用检查器","生命周期","数据流"],
  },
  {
    id: "rpl-borrowing-4",
    chapter: "rpl-borrowing",
    level: 4,
    question: "let mut s=String::from(\"hi\"); let r=&s; let r2=&mut s; println!(\"{}\",r); 为什么编译失败？如何修改？",
    answer: "失败原因：r 是不可变引用 r2 是可变引用共存违反借用规则。println 仍使用 r 所以 r 生命周期覆盖到 println，此时 r2 也存在冲突。修改：调整顺序让 r 在 r2 前结束使用——let r=&s; println!(\"{}\",r); let r2=&mut s;（NLL 下 r 在 println 后失效 r2 可创建）。或用 RefCell 运行时检查。",
    tags: ["借用规则","NLL","编译错误","RefCell"],
  }
];
