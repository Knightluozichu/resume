import type { ReviewQuestion } from "./types";

/** 深入理解 C# · 异步内部机制复习题 */
export const dcsAsyncInternalsQuestions: ReviewQuestion[] = [
  {
    id: "dcs-async-internals-1",
    chapter: "dcs-async-internals",
    level: 1,
    question: `\`async/await\` 的本质是什么？编译器对 async 方法做了什么转换？`,
    answer:
      `async/await 的本质是「编译器生成的状态机 + 回调注册」。它不是新的线程机制，而是把异步回调代码改写成类似同步的顺序写法。\n\n编译器对 async 方法的转换：\n\n\`\`\`csharp\n// 原始代码\nasync Task<string> FetchAsync() {\n    var response = await httpClient.GetStringAsync(url);\n    return response.ToUpper();\n}\n\n// 编译器生成的等价代码（简化）\n[AsyncMethodBuilder(typeof(AsyncTaskMethodBuilder<string>))]\nTask<string> FetchAsync() {\n    var stateMachine = new FetchAsyncStateMachine {\n        _builder = AsyncTaskMethodBuilder<string>.Create(),\n        _state = -1\n    };\n    stateMachine._builder.Start(ref stateMachine);\n    return stateMachine._builder.Task;\n}\n\nstruct FetchAsyncStateMachine : IAsyncStateMachine {\n    public int _state;\n    public string _response;  // await 表达式的结果\n    public TaskAwaiter<string> _awaiter;\n    public AsyncTaskMethodBuilder<string> _builder;\n\n    public void MoveNext() {\n        switch (_state) {\n            case -1:  // 第一次进入\n                _awaiter = httpClient.GetStringAsync(url).GetAwaiter();\n                if (!_awaiter.IsCompleted) {\n                    _state = 0;\n                    _builder.AwaitUnsafeOnCompleted(ref _awaiter, ref this);\n                    return;  // 暂停，返回 Task\n                }\n                goto case 0;\n            case 0:  // await 恢复后继续\n                _response = _awaiter.GetResult();\n                _builder.SetResult(_response.ToUpper());\n                return;\n        }\n    }\n}\n\`\`\`\n\n关键转换点：\n1. 方法体被拆成状态机的 MoveNext 方法，每个 await 是一个状态切换点。\n2. await 的操作：检查异步操作是否已完成——如果已完成，同步继续；如果未完成，注册 continuation（回调）并返回 Task。\n3. 异步操作完成时，continuation 调用 MoveNext，恢复到 await 后面的代码。\n4. 局部变量（response）提升为状态机字段，保证暂停后恢复时值不丢失。\n\n这与迭代器的 yield return 状态机几乎相同——编译器复用了同样的状态机基础设施。`,
    tags: ["async/await", "状态机", "编译器转换", "回调"],
  },
  {
    id: "dcs-async-internals-2",
    chapter: "dcs-async-internals",
    level: 2,
    question: `什么是 \`SynchronizationContext\`？它如何影响 \`await\` 之后的代码在哪个线程执行？\`ConfigureAwait(false)\` 做了什么？`,
    answer:
      `SynchronizationContext（同步上下文）是一个抽象，描述「如何把一段代码投递到特定的上下文（通常是 UI 线程）执行」。它决定了 await 恢复后在哪个线程继续。\n\nawait 的恢复流程：\n1. await 异步操作完成时，Task 的 continuation 被调度执行。\n2. 默认情况下，await 捕获当前线程的 SynchronizationContext（在 await 之前）。\n3. 如果有 SynchronizationContext（如 UI 线程的 DispatcherSynchronizationContext），continuation 通过 Post 方法投递回该上下文——在 UI 线程执行。\n4. 如果没有 SynchronizationContext（如控制台程序、ASP.NET Core），continuation 在线程池线程执行。\n\n不同环境的 SynchronizationContext：\n- WPF/WinForms：有 UI 线程的 SynchronizationContext。await 后自动回到 UI 线程，可以安全操作 UI 控件。\n- ASP.NET（旧版）：有 AspNetSynchronizationContext，await 后回到请求上下文。\n- ASP.NET Core / 控制台：没有 SynchronizationContext，await 后在线程池任意线程执行。\n\nConfigureAwait(false) 的作用：\n\`\`\`csharp\n// 默认：捕获 SynchronizationContext\nawait httpClient.GetStringAsync(url);\n// 恢复时回到原 SynchronizationContext（如 UI 线程）\n\n// ConfigureAwait(false)：不捕获 SynchronizationContext\nawait httpClient.GetStringAsync(url).ConfigureAwait(false);\n// 恢复时在线程池线程执行，不回到原 SynchronizationContext\n\`\`\`\n\n为什么要用 ConfigureAwait(false)：\n1. 避免死锁：UI 线程调用 \`.Result\` 阻塞等待 Task，而 Task 的 continuation 要回到 UI 线程——死锁。ConfigureAwait(false) 让 continuation 在线程池执行，打破死锁。\n2. 性能：投递到 SynchronizationContext.Post 有开销（尤其是 UI 线程的消息队列）。库代码用 ConfigureAwait(false) 避免不必要的上下文切换。\n3. 库代码最佳实践：非 UI 代码的库应该全部加 ConfigureAwait(false)，因为调用方可能是 UI、也可能是服务端。\n\n规则：UI 层代码可以不加 ConfigureAwait(false)（需要回到 UI 线程），库代码必须加。`,
    tags: ["SynchronizationContext", "ConfigureAwait", "线程恢复", "死锁"],
  },
  {
    id: "dcs-async-internals-3",
    chapter: "dcs-async-internals",
    level: 3,
    question: `为什么在 async 方法中使用 \`.Result\` 或 \`.Wait()\` 可能导致死锁？请分析死锁的形成条件和解决方案。`,
    answer:
      `死锁的形成（以 WPF/WinForms 为例）：\n\n\`\`\`csharp\n// UI 线程上的代码\nprivate void Button_Click(object sender, EventArgs e) {\n    var result = GetDataAsync().Result;  // 阻塞 UI 线程等待结果\n}\n\nasync Task<string> GetDataAsync() {\n    var data = await httpClient.GetStringAsync(url);  // 默认捕获 UI SynchronizationContext\n    return data.ToUpper();\n}\n\`\`\`\n\n死锁形成过程：\n1. UI 线程调用 GetDataAsync()，方法开始执行。\n2. await httpClient.GetStringAsync(url) 发起异步 IO，返回未完成的 Task。\n3. GetDataAsync 注册 continuation：「等 Task 完成后，通过 UI SynchronizationContext.Post 把 \`data.ToUpper()\` 投递回 UI 线程执行」。\n4. GetDataAsync 返回 Task 给调用方。\n5. 调用方 \`.Result\` 阻塞 UI 线程，等待 Task 完成。\n6. IO 完成，continuation 要执行——但需要通过 SynchronizationContext.Post 投递到 UI 线程。\n7. UI 线程被 \`.Result\` 阻塞着，无法处理 Post 投递的消息。\n8. continuation 等待 UI 线程，UI 线程等待 Task 完成，Task 完成需要 continuation 执行——死锁。\n\n死锁的三个必要条件：\n1. 调用方阻塞等待（.Result/.Wait/Thread.Sleep）。\n2. 被等待的 async 方法内部有 await。\n3. await 默认捕获 SynchronizationContext，且 SynchronizationContext 是单线程的（如 UI 线程）。\n\n解决方案：\n1. 全栈异步（最佳）：不要阻塞，用 \`await\` 替代 \`.Result\`。事件处理器改为 \`async void\`。\n2. ConfigureAwait(false)：在库代码中加 \`ConfigureAwait(false)\`，continuation 不回 UI 线程，在线程池执行——打破条件 3。\n3. 不使用 SynchronizationContext 的环境：控制台和 ASP.NET Core 没有 SynchronizationContext，不会死锁。\n4. Task.Run 包装：\`var result = Task.Run(() => GetDataAsync()).Result;\` ——GetDataAsync 在线程池线程执行，没有 UI SynchronizationContext，不会死锁。但有线程切换开销。\n\n核心原则：async 方法传染性——一旦用了 async，调用链应该全 async。混用 async 和阻塞（.Result）是死锁的根源。`,
    tags: ["死锁", "Result", "SynchronizationContext", "全栈异步"],
  },
  {
    id: "dcs-async-internals-4",
    chapter: "dcs-async-internals",
    level: 4,
    question: `\`ValueTask\` 相比 \`Task\` 有什么优势？在什么场景下应该用 \`ValueTask\`？它有什么限制？`,
    answer:
      `ValueTask 的优势：\n\n1. 减少堆分配：\n   - Task 是引用类型（class），每次返回 Task 都有堆分配。\n   - ValueTask 是值类型（struct），如果异步操作同步完成（不需要挂起），可以零堆分配——直接在栈上返回结果。\n   - 在高频调用且经常同步完成的场景（如缓存命中），ValueTask 显著减少 GC 压力。\n\n2. 同步完成路径优化：\n   \`\`\`csharp\n   // Task 版本：即使缓存命中也要 new Task\n   async Task<int> GetValueAsync(int key) {\n       if (_cache.TryGetValue(key, out var value))\n           return value;  // 同步完成，但仍分配 Task\n       return await _db.GetValueAsync(key);  // 异步完成\n   }\n\n   // ValueTask 版本：缓存命中时零分配\n   async ValueTask<int> GetValueAsync(int key) {\n       if (_cache.TryGetValue(key, out var value))\n           return value;  // 同步完成，ValueTask 直接包装值，无堆分配\n       return await _db.GetValueAsync(key);  // 异步完成，ValueTask 内部仍用 Task\n   }\n   \`\`\`\n\n适合用 ValueTask 的场景：\n1. 高频调用且经常同步完成：缓存查询、内存数据读取、条件判断后偶尔异步的场景。\n2. 性能敏感的库 API：如 System.IO.Pipelines、Socket 操作，高频调用需要减少 GC。\n3. 微服务/RPC 框架：请求可能从缓存返回也可能走网络。\n\nValueTask 的限制和风险：\n1. 不能多次 await：\n   - Task 可以被多次 await（Task 完成后多次 await 都返回同一结果）。\n   - ValueTask 不是线程安全的，多次 await 同一个 ValueTask 实例行为未定义。因为它可能内部复用 Task 对象（pool），第二次 await 可能读到已被复用的状态。\n   \`\`\`csharp\n   var vt = GetValueAsync(key);\n   var r1 = await vt;\n   var r2 = await vt;  // 未定义行为！可能异常或返回错误结果\n   \`\`\`\n\n2. 不能直接组合：\n   - Task 有 Task.WhenAll/Task.WhenAny 等组合方法。\n   - ValueTask 需要先 \`.AsTask()\` 转成 Task 才能用 WhenAll——又引入了堆分配。\n\n3. ValueTask 本身更大：\n   - 在 64 位系统上 ValueTask 占 16-24 字节（包含可能的结果值或 Task 引用），比 Task 引用（8 字节指针）大。如果不复用，传递 ValueTask 的开销可能超过 Task。\n\n4. 不适合公开 API：\n   - 公开 API 返回 ValueTask 会限制调用方（不能多次 await）。微软建议公开 API 默认用 Task，内部高性能路径才用 ValueTask。\n\n决策原则：默认用 Task（简单、安全）。只有在性能分析确认 Task 分配是瓶颈，且操作经常同步完成时，才换 ValueTask。不要为了「看起来高性能」而盲目用 ValueTask。`,
    tags: ["ValueTask", "Task", "堆分配", "GC压力", "性能优化"],
  },
];
