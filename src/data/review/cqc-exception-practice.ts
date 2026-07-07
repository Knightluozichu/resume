import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · 异常实践复习题 */
export const cqcExceptionPracticeQuestions: ReviewQuestion[] = [
  {
    id: "cqc-exception-practice-1",
    chapter: "cqc-exception-practice",
    level: 1,
    question: "异常处理的四层模型是什么？每一层各做什么？",
    answer:
      "异常处理四层模型：\n\n1. 预防（参数校验）：用 `if` 判断在入口拦住非法输入，避免后续逻辑产生异常。如 `if (b == 0) throw new ArgumentException(...)`。\n\n2. 捕获（try-catch）：在能处理的层级用 try-catch 捕获特定异常。只 catch 能处理的类型。\n\n3. 恢复（降级重试）：捕获后尝试恢复——返回默认值、重试、降级处理。不能恢复就重抛。\n\n4. 记录（日志）：至少记录日志供排查，绝不空 catch 吞异常。\n\n记忆线索：预防优先于捕获，能预防的不用异常；捕获后能恢复就恢复，不能就记录后重抛。",
    tags: ["四层模型", "预防", "捕获", "恢复", "记录"],
  },
  {
    id: "cqc-exception-practice-2",
    chapter: "cqc-exception-practice",
    level: 2,
    question: "为什么不建议 `catch (Exception)` 吞掉所有异常？",
    answer:
      "三个原因：\n\n1. 掩盖问题：空 catch 或只记录不重抛，让本该冒泡到全局处理器的异常被静默吞掉，线上问题无从排查。\n\n2. 捕获过宽：`Exception` 包含 `OutOfMemoryException`、`StackOverflowException` 等不应被捕获的严重异常，catch 后继续运行可能造成数据损坏。\n\n3. 违反分层：底层代码捕获了本该由上层决策的异常。如数据层 catch 了业务异常返回 null，让业务层以为「没找到」而无法区分「不存在」和「查询失败」。\n\n正确做法：catch 特定类型（如 `catch (SqlException ex) when (ex.Number == -2)`），不能处理的让它冒泡到全局处理器。",
    tags: ["catch Exception", "吞异常", "异常捕获"],
  },
  {
    id: "cqc-exception-practice-3",
    chapter: "cqc-exception-practice",
    level: 3,
    question: "什么情况下应该自定义业务异常？什么情况下用框架异常类型？请举例说明。",
    answer:
      "自定义业务异常的场景：业务规则违反，且调用方需要区分不同业务失败做不同处理。如 `OrderNotFoundException`、`InsufficientBalanceException`——携带错误码与业务上下文，让上层能精确 catch 并返回对应的 HTTP 状态码。\n\n示例：\n```\nthrow new OrderNotFoundException(orderId);  // 404\nthrow new InsufficientBalanceException(...);  // 400 + 错误码\n```\n\n用框架异常类型的场景：技术层面的参数错误或状态错误。如参数为 null 用 `ArgumentNullException`，参数值非法用 `ArgumentException`，对象状态不允许操作用 `InvalidOperationException`。\n\n不要为技术错误造新异常类型——框架已有的语义更清晰，调用方更熟悉。判断标准：如果是「业务规则」违反就自定义，如果是「技术约束」违反就用框架类型。",
    tags: ["业务异常", "系统异常", "自定义异常", "应用"],
  },
  {
    id: "cqc-exception-practice-4",
    chapter: "cqc-exception-practice",
    level: 4,
    question: "综合分析：`throw;` 和 `throw ex;` 有什么区别？为什么这个区别很重要？在异常处理策略中如何正确使用？",
    answer:
      "区别：\n\n`throw;`（不带异常变量）重抛当前异常，保留原始调用栈。排查时能看到异常从最初发生点到全局处理器的完整路径。\n\n`throw ex;`（带异常变量）会重置调用栈，使异常看起来是从当前 catch 块抛出的。原始堆栈信息丢失，看不到异常真正发生的位置。\n\n重要性：生产环境排查异常时，堆栈是定位问题的关键线索。`throw ex` 重置堆栈会让排查变得极其困难——你只知道异常在 catch 块被重抛，不知道它最初从哪里来。\n\n正确使用策略：\n1. catch 后不能处理就 `throw;` 重抛，保留完整堆栈。\n2. 需要包装异常时用 `throw new CustomException(\"msg\", ex);`，通过 InnerException 保留原始异常。\n3. 绝不用 `throw ex;`——它只会丢失信息，没有任何好处。\n4. 记录日志时用 `logger.LogError(ex, \"...\")` 记录完整异常，再 `throw;` 重抛。",
    tags: ["综合", "throw", "throw ex", "堆栈", "重抛"],
  },
];
