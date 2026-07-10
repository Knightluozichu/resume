import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const rplFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rpl-final-review-1",
    chapter: "rpl-final-review",
    level: 1,
    question: `Rust 保证内存安全的三大机制是什么？`,
    answer: `1.所有权系统：每个值有唯一所有者离开作用域自动 drop，move 语义防 double-free。2.借用检查器：编译期验证引用规则（不可变和可变引用不共存，引用不悬空）防数据竞争和 use-after-free。3.生命周期标注：编译期验证引用有效范围确保引用不比数据活得久。三者配合编译期保证内存安全运行时零开销。`,
    tags: ["所有权","借用检查","生命周期","内存安全"],
  },
  {
    id: "rpl-final-review-2",
    chapter: "rpl-final-review",
    level: 2,
    question: `Rust 的错误处理哲学？与异常机制相比优劣？`,
    answer: `用 Result<T,E> 和 Option<T> 显式处理，用 ? 传播。没有异常。优势：1.错误是类型系统一部分调用者必须处理。2.传播路径显式（每处 ? 标记）。3.无运行时开销。4.可恢复（Result）和不可恢复（panic!）明确区分。劣势：1.代码更冗长。2.错误类型转换需手动实现 From。3.库 API 需设计良好错误类型层次。`,
    tags: ["错误处理","Result","panic","异常"],
  },
  {
    id: "rpl-final-review-3",
    chapter: "rpl-final-review",
    level: 3,
    question: `如何选择 &T、String、Cow<str> 处理字符串？`,
    answer: `&str（借用）：函数参数只读零分配适合参数和临时引用。String（拥有）：需持有修改存储适合结构体字段和返回值。Cow<'a,str>（写时克隆）：可能借用也可能拥有按需克隆。适合有时返回引用（不修改零分配）有时返回新 String（修改时分配）。选择原则：只读用 &str，需要拥有用 String，不确定用 Cow。`,
    tags: ["&str","String","Cow","借用"],
  },
  {
    id: "rpl-final-review-4",
    chapter: "rpl-final-review",
    level: 4,
    question: `综合全书设计线程安全的 KV 存储服务器，说明每个 Rust 特性的应用。`,
    answer: `1.所有权：每连接 handler 独立拥有请求数据连接结束自动释放。2.借用：解析请求 &str 借用缓冲区零拷贝。3.生命周期：响应构建器持有请求引用确保安全。4.trait：定义 Storage trait（get/put/delete）内存和磁盘两种实现。5.泛型：fn handle<S:Storage> 单态化不同后端。6.错误处理：enum KvError+? 传播+thiserror。7.并发：Arc<RwLock<HashMap>> 共享存储多读单写。8.async：tokio::spawn 每连接一个 task 非阻塞 IO。9.Send+Sync：自动满足可跨 task 共享。10.Drop：连接 drop 自动清理无 GC 无泄漏。`,
    tags: ["综合","所有权","trait","泛型","Arc","async","错误处理"],
  }
];
