import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · 异步模式复习题 */
export const cqcAsyncPatternQuestions: ReviewQuestion[] = [
  {
    id: "cqc-async-pattern-1",
    chapter: "cqc-async-pattern",
    level: 1,
    question: `async/await 的状态机原理是什么？await 时发生了什么？`,
    answer:
      `编译器把 async 方法转换成一个状态机结构体：\n\n1. 状态机有一个 \`state\` 字段记录当前执行到哪个 await 点。\n\n2. 遇到 await 时，如果异步操作未完成，状态机保存当前状态（局部变量、执行位置），然后返回——释放当前线程去做别的事。\n\n3. 异步操作完成后，运行时调用状态机的 \`MoveNext\` 方法，恢复到之前保存的位置继续执行。\n\n4. 如果异步操作已同步完成（如缓存命中），则不释放线程，直接继续执行。\n\n关键点：await 不是阻塞等待，而是「挂起方法、释放线程、完成后恢复」。线程在等待期间可以处理其他请求，这就是异步高效的原因。`,
    tags: ["状态机", "await", "线程释放"],
  },
  {
    id: "cqc-async-pattern-2",
    chapter: "cqc-async-pattern",
    level: 2,
    question: `CPU 密集任务和 IO 密集任务在异步编程中的处理方式有什么不同？为什么？`,
    answer:
      `IO 密集任务（网络请求、磁盘读写、数据库查询）：直接 await 异步方法，不需要 Task.Run。因为 IO 操作由硬件处理，线程在等待期间不占 CPU，await 自动释放线程去服务其他请求。\n\nCPU 密集任务（排序、压缩、加密）：用 Task.Run 丢到线程池执行。因为计算会持续占满 CPU，如果不丢到线程池会阻塞调用线程。\n\n本质区别：IO 密集是「等」——等的时候可以释放线程；CPU 密集是「算」——算的时候必须有线程在执行。\n\n错误示例：\`await Task.Run(() => httpClient.GetStringAsync(url))\`——把 IO 密集任务包在 Task.Run 里没有意义，反而浪费一个线程池线程。`,
    tags: ["CPU密集", "IO密集", "Task.Run", "await"],
  },
  {
    id: "cqc-async-pattern-3",
    chapter: "cqc-async-pattern",
    level: 3,
    question: `为什么在 WinForms/WPF 中 \`httpClient.GetStringAsync(url).Result\` 会死锁，而在 ASP.NET Core 中不会？`,
    answer:
      `WinForms/WPF 有同步上下文（SynchronizationContext），await 完成后默认想回到捕获时的线程（UI 线程）恢复。但 UI 线程被 \`.Result\` 阻塞了在等 Task 完成，Task 完成后想回到 UI 线程恢复却回不去——形成死锁。\n\nASP.NET Core 没有同步上下文（SynchronizationContext.Current 为 null），await 完成后直接在线程池线程上恢复，不需要回到特定线程，所以不会死锁。\n\n但即使在 ASP.NET Core 中，\`.Result\` 也会阻塞线程池线程降低吞吐量——线程在等 IO 完成时本可以去服务其他请求，被 \`.Result\` 阻塞后白白浪费。\n\n正确做法：一路 async 到顶，不阻塞。库代码加 \`ConfigureAwait(false)\` 避免上下文捕获。`,
    tags: ["死锁", ".Result", "同步上下文", "ConfigureAwait"],
  },
  {
    id: "cqc-async-pattern-4",
    chapter: "cqc-async-pattern",
    level: 4,
    question: `综合分析：async/await 有哪三大陷阱？各自的原因、危害和修复方法是什么？`,
    answer:
      `三大陷阱：\n\n1. async void：\n- 原因：async void 的异常无法被调用方 catch，因为 void 不返回 Task。\n- 危害：异常直接到 SynchronizationContext 未处理异常处理器，进程崩溃。\n- 修复：一律用 async Task。仅事件处理器（如 button_Click）用 async void。\n\n2. .Result / .Wait() 阻塞：\n- 原因：在异步上下文中阻塞等 Task 完成。有同步上下文时（WinForms/WPF）死锁；无同步上下文时（ASP.NET Core）浪费线程。\n- 危害：死锁或吞吐量下降。\n- 修复：一路 async 到顶。必须同步调用时用 \`Task.Run(() => methodAsync()).GetAwaiter().GetResult()\`。\n\n3. 忘记 ConfigureAwait(false)：\n- 原因：库代码不加 ConfigureAwait(false)，每次 await 后尝试回到调用方同步上下文。\n- 危害：上下文切换开销、潜在死锁。\n- 修复：库代码每个 await 都加 ConfigureAwait(false)。应用代码（ASP.NET Core）无同步上下文不需要。`,
    tags: ["综合", "async void", ".Result", "ConfigureAwait", "陷阱"],
  },
];
