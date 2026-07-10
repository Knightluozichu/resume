import type { ReviewQuestion } from "./types";

/** 错误处理 复习题 */
export const rswErrorHandlingQuestions: ReviewQuestion[] = [
  {
    id: "rsw-error-handling-1",
    chapter: "rsw-error-handling",
    level: 1,
    question: `Result<T,E> 和 Option<T> 分别表示什么？`,
    answer: `Result<T,E> 表示运算可能成功(Ok(T))或失败(Err(E))，用于可恢复错误。Option<T> 表示值可能存在(Some(T))或不存在(None)，替代 null。二者都是枚举，强制调用方处理两种情况——错误是类型系统的一部分而非控制流。`,
    tags: ["Result", "Option", "枚举"],
  },
  {
    id: "rsw-error-handling-2",
    chapter: "rsw-error-handling",
    level: 2,
    question: `? 操作符的工作原理是什么？它依赖什么 trait？`,
    answer: `? 对 Result：Ok(v) 解包继续，Err(e) 执行 return Err(From::from(e)) 提前返回。对 Option：Some(v) 解包，None 则 return None。它依赖 From trait 做错误类型转换——当函数返回 Result<T, AppError> 而 ? 作用于 Result<_, io::Error> 时，编译器调用 From::from 自动转换，无需手动 map_err。`,
    tags: ["?操作符", "From trait", "错误传播"],
  },
  {
    id: "rsw-error-handling-3",
    chapter: "rsw-error-handling",
    level: 3,
    question: `什么时候用 panic 而不是 Result？判断标准是什么？`,
    answer: `用 panic：程序进入不可修复的不一致状态，继续运行会导致更严重问题——如数组越界、除零、不变式破坏、unwrap 逻辑上保证有值的 Option。用 Result：可恢复的、调用方应知道并决定如何处理的失败——如文件不存在、网络超时、用户输入错误。判断标准：这个错误是「调用方的责任」（外部输入/环境）还是「程序员的 bug」（内部逻辑）？前者用 Result，后者可 panic。不要用 panic 处理外部输入错误。`,
    tags: ["panic", "Result", "判断标准"],
  },
  {
    id: "rsw-error-handling-4",
    chapter: "rsw-error-handling",
    level: 4,
    question: `设计一个自定义错误类型，能统一 io::Error 和 ParseIntError，并用 ? 无缝传播。需要实现什么？`,
    answer: `定义枚举 enum AppError { Io(io::Error), Parse(ParseIntError) }，derive Debug。为它实现 std::error::Error + Display。关键：impl From<io::Error> for AppError 和 impl From<ParseIntError> for AppError，分别包装成对应变体。这样函数 fn load() -> Result<i32, AppError> 中 fs::read_to_string(..)? 和 s.parse()? 会通过 ? 自动调用 From 转换底层错误到 AppError，无需手动 map_err。这就是 thiserror crate 自动生成的模式。`,
    tags: ["自定义错误", "From", "thiserror", "综合"],
  },
];
