import type { ReviewQuestion } from "./types";

/** CLR via C# · 异步与CLR复习题 */
export const cvcAsyncClrQuestions: ReviewQuestion[] = [
  {
    id: "cvc-async-clr-1",
    chapter: "cvc-async-clr",
    level: 1,
    question: `async/await 中，await 到底做了什么？它和 Thread.Sleep 有什么区别？`,
    answer:
      `await 做了什么：\n\n1. 检查 await 的 Task 是否已完成——如果已同步完成，直接获取结果继续执行，不暂停。\n2. 如果未完成，保存当前方法的状态（局部变量、执行位置）到状态机。\n3. 注册回调（TaskAwaiter.OnCompleted），当 Task 完成时调用状态机的 MoveNext。\n4. 将控制权还给调用者——返回一个未完成的 Task。\n5. Task 完成后，MoveNext 被调用，从保存的状态恢复执行——从 await 点继续。\n\n与 Thread.Sleep 的区别：\n- \`Thread.Sleep(1000)\` 阻塞当前线程 1 秒——线程在等待时空转，什么也不做，浪费资源。\n- \`await Task.Delay(1000)\` 不阻塞线程——线程被释放回线程池，可以做其他工作。1 秒后回调被调度，从 await 点恢复。\n\n核心区别：阻塞（blocking）浪费线程，异步（async）释放线程。在服务器场景下，阻塞线程意味着能处理的并发请求数减少——异步可以在相同线程数下处理更多请求。`,
    tags: ["await", "Thread.Sleep", "阻塞", "异步"],
  },
  {
    id: "cvc-async-clr-2",
    chapter: "cvc-async-clr",
    level: 2,
    question: `为什么在 UI 线程中调用 \`var result = asyncMethod().Result\` 会死锁？如何修复？`,
    answer:
      `死锁原因：\n\n1. UI 线程调用 \`asyncMethod().Result\`，阻塞 UI 线程等待 Task 完成。\n2. asyncMethod 内部的 \`await someAsyncOp()\` 开始异步操作。\n3. 异步操作完成后，状态机试图通过 SynchronizationContext.Post 将回调发到 UI 线程——因为 await 后的代码需要回到原线程（UI 线程）。\n4. 但 UI 线程被 \`.Result\` 阻塞了，无法处理 Post 的回调。\n5. 死锁——\`.Result\` 等 Task 完成，Task 等 UI 线程处理回调，UI 线程等 \`.Result\` 释放。\n\n修复方法：\n\n1. **一路 async 到底（推荐）**：将调用方法也改为 async，用 await 替代 .Result\n\`\`\`csharp\nprivate async void Button_Click(object sender, EventArgs e)\n{\n    string result = await asyncMethod();\n    label.Text = result;\n}\n\`\`\`\n\n2. **ConfigureAwait(false)**：在库代码中加 ConfigureAwait(false)，await 后不回到原 SynchronizationContext\n\`\`\`csharp\npublic async Task<string> GetDataAsync()\n{\n    string data = await httpClient.GetStringAsync(url).ConfigureAwait(false);\n    return data.ToUpper();  // 在线程池线程执行，不回 UI\n}\n\`\`\`\n\n注意：ConfigureAwait(false) 只影响当前方法内部的 await。如果 Button_Click 仍然用 .Result，仍然死锁——因为 GetDataAsync 返回的 Task 的 continuation 仍然需要 UI 线程。方法 1 才是根本修复。\n\n最佳实践：永远不要在 UI 线程或旧版 ASP.NET 中使用 .Result 或 .Wait()。一路 async 到底。`,
    tags: ["死锁", "Result", "SynchronizationContext", "ConfigureAwait"],
  },
  {
    id: "cvc-async-clr-3",
    chapter: "cvc-async-clr",
    level: 3,
    question: `描述编译器如何将 async 方法转换为状态机。以 \`async Task<string> Fetch() { var json = await GetAsync(); return json.ToUpper(); }\` 为例。`,
    answer:
      `编译器转换过程：\n\n1. **生成状态机结构体**：\n\`\`\`\nstruct FetchStateMachine : IAsyncStateMachine\n{\n    public int state;                    // -1:初始, 0:await后\n    public string json;                  // 局部变量→字段\n    public TaskAwaiter<string> awaiter;  // 当前 await 的 awaiter\n    public AsyncTaskMethodBuilder<string> builder;\n}\n\`\`\`\n\n2. **MoveNext() 方法**：\n\`\`\`\nvoid MoveNext()\n{\n    string result;\n    try\n    {\n        switch (state)\n        {\n            case -1:  // 首次调用\n                awaiter = GetAsync().GetAwaiter();\n                if (!awaiter.IsCompleted)\n                {\n                    state = 0;\n                    awaiter.OnCompleted(MoveNext);  // 注册回调\n                    return;  // 交还控制权，返回未完成 Task\n                }\n                // 同步完成，fall through\n            case 0:  // 从 await 恢复\n                json = awaiter.GetResult();  // 获取 await 结果\n                result = json.ToUpper();     // 继续执行\n                builder.SetResult(result);   // 完成 Task\n                return;\n        }\n    }\n    catch (Exception ex)\n    {\n        builder.SetException(ex);  // 异常存入 Task\n    }\n}\n\`\`\`\n\n3. **原始方法变为启动器**：\n\`\`\`\n[AsyncStateMachine(typeof(FetchStateMachine))]\nTask<string> Fetch()\n{\n    var stateMachine = new FetchStateMachine();\n    stateMachine.builder = AsyncTaskMethodBuilder<string>.Create();\n    stateMachine.state = -1;\n    stateMachine.builder.Start(ref stateMachine);  // 调用 MoveNext\n    return stateMachine.builder.Task;\n}\n\`\`\`\n\n关键点：\n1. 局部变量（json）变成结构体字段——跨 await 存活\n2. state 字段记录执行到哪——每个 await 是一个状态值\n3. await 未完成时注册 OnCompleted 回调并 return——交还控制权\n4. 异步完成后 MoveNext 被重新调用——从 state 恢复\n5. 异常通过 builder.SetException 存入 Task——调用者 await 时重新抛出`,
    tags: ["状态机", "编译器转换", "MoveNext", "IAsyncStateMachine"],
  },
  {
    id: "cvc-async-clr-4",
    chapter: "cvc-async-clr",
    level: 4,
    question: `你在设计一个高性能 RPC 框架，每秒处理数万次请求。应该用 Task<T> 还是 ValueTask<T>？为什么？有什么注意事项？`,
    answer:
      `应该用 ValueTask<T>，但需注意使用约束。\n\n用 ValueTask<T> 的原因：\n\n1. **减少堆分配**：每次 async Task<T> 调用在 GC 堆上分配两个对象——状态机结构体（会被装箱）和 Task 对象。每秒数万次调用 = 数万次堆分配，增加 Gen0 GC 频率。\n\n2. **ValueTask 是值类型**：ValueTask<T> 内部包装了 T（同步完成时）或 Task<T>（异步完成时）。如果操作通常同步完成（如缓存命中），ValueTask 不分配任何堆对象——零 GC 压力。\n\n3. **高频场景的 GC 优化**：RPC 框架中，很多请求可能从缓存直接返回（同步完成），少数需要网络 I/O（异步完成）。ValueTask 在常见路径零分配，在少数路径退化为 Task。\n\n注意事项：\n\n1. **不能多次 await**：ValueTask 不是幂等的——\`var vt = GetValueAsync(); await vt; await vt;\` 是未定义行为。Task 可以多次 await。如果调用者需要多次 await，应转换为 Task：\`var task = vt.AsTask();\`\n\n2. **不能直接组合**：\`Task.WhenAll(task1, task2)\` 接受 Task，不直接接受 ValueTask。需要先 \`.AsTask()\` 转换。\n\n3. **同步完成时不要返回 ValueTask**：如果方法总是同步完成，直接返回 \`ValueTask<T>\` 会比 \`Task<T>\` 快。但如果总是异步完成，ValueTask 反而比 Task 慢（多了包装层）。ValueTask 的优势在于\"通常同步偶尔异步\"的场景。\n\n4. **API 稳定性**：一旦公开 API 返回 ValueTask<T>，就不能改为 Task<T>（破坏性变更）。内部 API 可以灵活切换。\n\n5. **正确实现**：\n\`\`\`csharp\npublic ValueTask<string> GetAsync(string key)\n{\n    if (_cache.TryGetValue(key, out var value))\n        return new ValueTask<string>(value);  // 同步完成，零分配\n    return new ValueTask<string>(GetFromNetworkAsync(key));  // 异步完成\n}\n\`\`\`\n\n总结：高频 RPC 框架用 ValueTask<T>，利用同步路径的零分配优势。但要注意多次 await 限制和组合限制——在文档中明确标注。`,
    tags: ["ValueTask", "Task", "高性能", "GC", "RPC"],
  },
];
