import type { ReviewQuestion } from "./types";

/** 所有权与借用 复习题 */
export const rswOwnershipBorrowQuestions: ReviewQuestion[] = [
  {
    id: "rsw-ownership-borrow-1",
    chapter: "rsw-ownership-borrow",
    level: 1,
    question: "Rust 所有权的三原则是什么？",
    answer: "1. 每个值有唯一所有者；2. 所有者离开作用域时值被自动释放（调用 Drop）；3. 赋值或传参默认是移动（move）而非复制，转移所有权后原变量失效。",
    tags: ["所有权", "三原则"],
  },
  {
    id: "rsw-ownership-borrow-2",
    chapter: "rsw-ownership-borrow",
    level: 2,
    question: "借用检查器的规则是什么？为什么 & 和 &mut 不能同时存在？",
    answer: "规则：任意数量的不可变引用 &，或唯一一个可变引用 &mut，二者互斥，且引用必须始终有效。不能同时存在是因为：若允许，可变引用可能修改数据，而不可变引用还以为数据没变，导致数据不一致。借用检查器在编译期零开销地消除数据竞争。",
    tags: ["借用", "借用检查器"],
  },
  {
    id: "rsw-ownership-borrow-3",
    chapter: "rsw-ownership-borrow",
    level: 3,
    question: "为什么 i32 赋值是 Copy 而 String 是 move？设计考量是什么？",
    answer: "i32 是固定大小栈类型，复制成本极低（4 字节）且无资源管理需求，实现了 Copy，赋值后原变量仍可用。String 持有堆内存指针，复制需深拷贝（成本与长度成正比）；默认 move 避免意外的 O(n) 深拷贝，需要副本时显式 .clone()。这是「不为隐式操作付代价」的哲学——只有复制成本低且无堆资源的类型才允许 Copy。",
    tags: ["Copy", "Clone", "move", "设计"],
  },
  {
    id: "rsw-ownership-borrow-4",
    chapter: "rsw-ownership-borrow",
    level: 4,
    question: "以下代码为何编译失败？如何利用 NLL 修复？\nlet mut s = String::from(\"hi\"); let r1 = &s; let r2 = &mut s; println!(\"{}\", r1);",
    answer: "编译失败因为 r1（不可变借用）和 r2（可变借用）同时存在，违反互斥规则。利用 NLL（非词法生命周期）：借用的生命周期到「最后一次使用」而非「作用域结束」。修复：让 r1 在 r2 之前最后一次使用——let r1 = &s; println!(\"{}\", r1); let r2 = &mut s; r2.push_str(\"!\");。这样 r1 在 r2 创建时已结束，可创建可变借用。",
    tags: ["NLL", "借用冲突", "综合"],
  },
];
