import type { ReviewQuestion } from "./types";

export const ppDefensiveProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "pp-defensive-programming-01",
    chapter: "pp-defensive-programming",
    level: 1,
    question: "什么是契约式设计（DBC）？它包含哪些要素？",
    answer: "契约式设计（Design by Contract）是指通过「契约」明确模块间的责任边界。三个要素：① 前置条件——调用方必须满足的条件（如参数非空、范围合法），被调方可以假定它成立；② 后置条件——被调方必须保证的结果（如返回值范围、状态变更），调用方可以假定它成立；③ 不变式——在调用前后始终成立的条件（如余额不为负）。违反契约 = bug，应立即暴露。",
    tags: ["契约式设计", "DBC", "前置条件", "后置条件"],
  },
  {
    id: "pp-defensive-programming-02",
    chapter: "pp-defensive-programming",
    level: 1,
    question: "「死程序说真话」是什么意思？",
    answer: "「死程序说真话」是指当程序检测到不可能或不应该发生的状态时，应立即崩溃（死掉）而非带病运行。原因：① 早崩溃 = 早发现——程序崩溃会立即暴露问题，带病运行会隐藏问题导致更难追踪的后续错误；② 比带病运行好——一个崩溃的程序好于一个产生错误结果的程序，因为崩溃是诚实的；③ 避免连锁损害——及时停止可防止错误传播到其他系统。实现：检测到不可能状态时调用 assert 或直接终止。",
    tags: ["死程序", "早崩溃", "健壮性"],
  },
  {
    id: "pp-defensive-programming-03",
    chapter: "pp-defensive-programming",
    level: 2,
    question: "断言（assert）应该检查什么？不应该检查什么？",
    answer: "断言应该检查「永远不该发生的事」——即编程错误和逻辑不可能：参数类型错误、不变式被违反、不可能的分支到达等。断言不应该检查：① 预期的错误条件——如用户输入错误、文件不存在、网络超时，这些应用错误码或异常处理；② 副作用——断言不应有副作用，因为生产环境可能被禁用；③ 性能关键路径——断言不应成为性能瓶颈。核心原则：断言查 bug（编程错误），不处理错误（运行时异常）。生产环境通常应保留断言。",
    tags: ["断言", "assert", "错误处理"],
  },
  {
    id: "pp-defensive-programming-04",
    chapter: "pp-defensive-programming",
    level: 2,
    question: "异常和错误码分别适合什么场景？如何选择？",
    answer: "异常适合意外、不可预期的错误（如内存不足、网络中断、文件损坏）；错误码适合预期、可恢复的错误（如用户输入校验失败、业务规则不满足）。选择原则：① 语义——「这个错误是预期的吗？」预期用错误码，意外用异常；② 传播——异常自动沿调用栈传播，错误码需手动检查和传递；③ 性能——异常有运行时开销，高频路径用错误码；④ 清晰度——异常将正常路径与错误路径分离，错误码可能产生大量 if-else。边界处理：在系统边界（如 API 入口）集中处理异常，不要让异常散落在各处。",
    tags: ["异常", "错误码", "错误处理策略"],
  },
];
