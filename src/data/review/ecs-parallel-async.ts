import type { ReviewQuestion } from "./types";

/** Effective C# 并行与异步复习题 */
export const ecsParallelAsyncQuestions: ReviewQuestion[] = [
  {
    id: "ecs-parallel-async-1",
    chapter: "ecs-parallel-async",
    level: 1,
    question:
      `串行 await 和 Task.WhenAll 的总耗时有什么区别？前提条件是什么？`,
    answer:
      `串行 await 让独立任务排队，总耗时是各任务之和（3 个 1 秒任务 = 3 秒）。await GetA(); await GetB(); await GetC(); 排队执行，每个跑完才启动下一个。\n\nTask.WhenAll 让任务同时执行，总耗时是最慢的任务（3 个 1 秒任务 = 1 秒）。await Task.WhenAll(GetA(), GetB(), GetC()); 三者并行跑。\n\n前提条件：任务必须独立——不互相依赖、不争抢同一资源。如果 B 依赖 A 的结果，只能串行 await A 再 await B。如果有共享资源争抢（如同一连接的并发写），并行反而出错。`,
    tags: ["串行await", "Task.WhenAll", "总耗时", "并行"],
  },
  {
    id: "ecs-parallel-async-2",
    chapter: "ecs-parallel-async",
    level: 2,
    question: `async void 为什么危险？唯一合法场景是什么？`,
    answer:
      `async void 的异常不存入 Task，直接抛到 SynchronizationContext，调用方无法 try-catch 捕获，通常导致进程崩溃。且调用方无法 await 它的完成——void 不返回 Task，调用方不知道它何时结束。\n\n对比 async Task：异常存入 Task，调用方 await 时可以 try-catch 捕获；调用方可以 await 等待完成。\n\n唯一合法场景是事件处理器——因为事件签名要求 void（如 button.Click += async void (s,e) => {...}），框架会处理 SynchronizationContext 并捕获异常。其他所有场景一律用 async Task，让异常可被捕获、完成可被等待。async void 是 C# 并发的定时炸弹。`,
    tags: ["async void", "异常捕获", "事件处理器", "Task"],
  },
  {
    id: "ecs-parallel-async-3",
    chapter: "ecs-parallel-async",
    level: 3,
    question:
      `库代码为什么应该 ConfigureAwait(false)？不加会在 UI 应用中导致什么问题？`,
    answer:
      `UI 应用有 SynchronizationContext，默认 await 完成后回到原捕获上下文（UI 线程）。库代码不依赖 UI 线程，回 UI 线程是浪费（多余的上下文切换）且危险。\n\n不加的问题：在 UI 应用中调用方用 .Result 同步阻塞等待库的结果时死锁——库的 await 完成后试图回到 UI 线程继续执行，但 UI 线程正被 .Result 阻塞着等库的结果，两者互相等待，死锁。\n\nConfigureAwait(false) 让 await 完成后跳回线程池执行，不依赖调用方的 SynchronizationContext，避免死锁并减少上下文切换开销。库代码所有 await 都应加 ConfigureAwait(false)，因为库不知道调用方是什么上下文。应用层代码（需要回 UI 线程更新界面）才用默认 ConfigureAwait(true)。`,
    tags: ["ConfigureAwait", "死锁", "SynchronizationContext", "库代码"],
  },
  {
    id: "ecs-parallel-async-4",
    chapter: "ecs-parallel-async",
    level: 4,
    question:
      `Task.WhenAll 中多个任务都抛异常时，异常如何表现？如何完整处理所有异常？`,
    answer:
      `Task.WhenAll 中任一任务抛异常时，WhenAll 抛出 AggregateException，其 InnerExceptions 包含所有抛异常任务的异常（不只是第一个）。但 await Task.WhenAll 时，await 只抛 AggregateException 的第一个内部异常（ unwrap 行为），其余异常被吞掉。\n\n完整处理所有异常的方法：\n\n1. 不直接 await，先存 Task 再处理：\nvar task = Task.WhenAll(t1, t2, t3);\ntry { await task; }\ncatch\n{\n    // task.IsFaulted 为 true，task.Exception 是完整 AggregateException\n    foreach (var inner in task.Exception.InnerExceptions)\n        Log(inner);\n    throw;\n}\n\n2. 或显式 catch AggregateException：\ntry { await Task.WhenAll(...); }\ncatch (Exception ex) when (ex is AggregateException ae)\n{\n    foreach (var inner in ae.InnerExceptions) Handle(inner);\n}\n\n3. 每个任务内部 try-catch 把异常转成结果（如 Result<T, Error> 模式），WhenAll 后逐个检查结果，避免异常传播。\n\n关键认知：await WhenAll 只抛第一个异常，要拿全部异常必须访问 task.Exception（完整 AggregateException）。日志和监控场景必须处理全部异常，否则漏报。`,
    tags: ["AggregateException", "异常聚合", "WhenAll", "综合"],
  },
];
