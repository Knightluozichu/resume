import type { ReviewQuestion } from "./types";

/** 所有权 复习题 */
export const rplOwnershipQuestions: ReviewQuestion[] = [
  {
    id: "rpl-ownership-1",
    chapter: "rpl-ownership",
    level: 1,
    question: `Rust 中 String 的 move 语义是什么？赋值后原变量怎样？`,
    answer: `let s1 = String::from(\"hello\"); let s2 = s1; s1 所有权转移到 s2，s1 失效。String 栈上存（指针、长度、容量）三元组，move 只复制栈上三元组（指向同一堆内存），然后使 s1 失效避免 double-free。之后用 s1 编译报错 borrow of moved value。`,
    tags: ["所有权","move","String","double-free"],
  },
  {
    id: "rpl-ownership-2",
    chapter: "rpl-ownership",
    level: 2,
    question: `为什么 Copy trait 的类型赋值时不 move 而是 copy？`,
    answer: `Copy trait 表示类型可按位复制且安全。i32 等基本类型栈上存储，复制成本等于赋值，无堆指针需管理。赋值直接复制值原变量仍有效。Copy 条件：类型不能实现 Drop，所有字段都是 Copy。String 不能 Copy（有堆指针需 drop），i32/bool/f64/&T 可以。`,
    tags: ["Copy","move","基本类型","Drop"],
  },
  {
    id: "rpl-ownership-3",
    chapter: "rpl-ownership",
    level: 3,
    question: `函数参数和返回值的所有权转移规则？如何避免频繁转移？`,
    answer: `参数：传入值类型时所有权转移到函数，函数结束后 drop（除非返回）。返回值：所有权转移到调用方。避免方式：1.用引用借用不转移。2.Copy 类型直接传值无成本。3.函数返回值传回所有权。4.需共享时用 Rc/Arc。`,
    tags: ["函数","所有权","move","借用"],
  },
  {
    id: "rpl-ownership-4",
    chapter: "rpl-ownership",
    level: 4,
    question: `分析 let s = String::from(\"hello\"); takes_ownership(s); 的内存布局变化。`,
    answer: `1.String::from 在堆分配 5 字节，栈创建(ptr,len=5,cap=5)，s 是所有者。2.takes_ownership(s) 所有权 move 到参数，栈三元组复制到函数栈帧，s 失效，堆内存一份指针不变。3.函数内通过新三元组访问同一堆内存。4.函数返回参数离开作用域 drop 被调用释放堆内存。5.调用方 s 已失效堆内存已释放，需 clone 或引用才能继续用。`,
    tags: ["所有权","move","内存布局","drop"],
  }
];
