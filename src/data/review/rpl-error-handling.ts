import type { ReviewQuestion } from "./types";

/** 错误处理 复习题 */
export const rplErrorHandlingQuestions: ReviewQuestion[] = [
  {
    id: "rpl-error-handling-1",
    chapter: "rpl-error-handling",
    level: 1,
    question: "Result<T,E> 和 Option<T> 分别表示什么？",
    answer: "Result<T,E> 表示可能成功(Ok(T))或失败(Err(E))的操作。Option<T> 表示可能有值(Some(T))或无值(None)。两者都是枚举。Result 用于错误处理（文件 IO、网络），Option 用于可能缺失的值（查找 HashMap）。Rust 没有 null 用 Option 替代，没有异常用 Result 替代。",
    tags: ["Result","Option","错误处理","枚举"],
  },
  {
    id: "rpl-error-handling-2",
    chapter: "rpl-error-handling",
    level: 2,
    question: "? 运算符的工作原理？如何传播错误？",
    answer: "let x = expr?; 等价于 match expr { Ok(v)=>v, Err(e)=>return Err(e.into()) }。如果 Err 立即从当前函数返回错误（自动 via From 转换类型）。如果 None（Option）立即返回 None。要求函数返回类型是 Result/Option 或实现 Try。让错误传播像异常一样简洁但显式（每次用 ? 标记）。",
    tags: ["?运算符","错误传播","Result","From"],
  },
  {
    id: "rpl-error-handling-3",
    chapter: "rpl-error-handling",
    level: 3,
    question: "如何自定义错误类型？thiserror 和 anyhow 区别？",
    answer: "自定义：定义 enum 实现 Error trait（含 Display+Debug）。thiserror：derive 宏自动生成 Display 和 From，适合库的公开 API。#[derive(Error)] enum MyError{#[error(\"io\")]Io(#[from]io::Error)}。anyhow：提供 anyhow::Result 自动装箱任何错误，适合应用 main 和内部代码。选择：库用 thiserror（消费者需 match），应用用 anyhow。",
    tags: ["自定义错误","thiserror","anyhow","Error trait"],
  },
  {
    id: "rpl-error-handling-4",
    chapter: "rpl-error-handling",
    level: 4,
    question: "设计文件解析器的错误处理方案，区分可恢复和不可恢复错误。",
    answer: "1.用 thiserror 定义 ParseError：Io(#[from]io::Error)、Syntax{line,msg}、Invalid(String)。2.可恢复错误用 Result：parse_line 返回 Result<Line,ParseError>，调用方 match 具体错误做不同处理。3.不可恢复用 panic!：内部不变量被违反（数据结构损坏）。4.顶层 main 返回 anyhow::Result 用 ? 传播。5.批量解析收集错误不中断：let results:Vec<Result<Line,ParseError>>=lines.map(parse_line).collect()。",
    tags: ["错误处理","thiserror","anyhow","panic","Result"],
  }
];
