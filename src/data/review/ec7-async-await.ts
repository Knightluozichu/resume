import type { ReviewQuestion } from "./types";

export const ec7AsyncAwaitQuestions: ReviewQuestion[] = [
  {
    id: "ec7-async-await-1",
    chapter: "ec7-async-await",
    level: 1,
    question: `async/await 的核心机制是什么？await 是\"等待\"吗？Task 代表什么？`,
    answer:
      `async/await 的核心是状态机 + 线程释放。await 不是\"等待\"而是\"挂起并释放线程\"——当前线程不阻塞，可以去处理其他工作。编译器把 async 方法编译成状态机，每个 await 是一个挂起点。\nTask 代表\"未来的结果\"——异步操作的句柄。Task<T> 表示将来会产生 T 类型结果。Task 的状态：RanToCompletion（成功）、Faulted（异常）、Canceled（取消）。\n\`\`\`csharp\nasync Task<string> GetDataAsync()\n{\n    // await 挂起，释放线程\n    var data = await httpClient.GetStringAsync(url);\n    // Task 完成后恢复执行\n    return data.ToUpper();\n}\n\`\`\``,
    tags: ["async", "await", "Task", "状态机"],
  },
  {
    id: "ec7-async-await-2",
    chapter: "ec7-async-await",
    level: 2,
    question: `为什么在 async 方法中用 \`.Result\` 或 \`.Wait()\` 可能导致死锁？如何避免？`,
    answer:
      `死锁场景（UI/ASP.NET 有 SynchronizationContext）：\n1. 调用线程（UI线程）执行到 \`var result = task.Result;\`\n2. .Result 阻塞 UI 线程等待 Task 完成\n3. Task 完成后，其 continuation（await 后的代码）需要回到 UI 线程执行（SynchronizationContext 捕获）\n4. 但 UI 线程正被 .Result 阻塞，无法执行 continuation\n5. Task 永远无法完成 → .Result 永远等待 → 死锁\n\n避免方法：一律用 await，不用 .Result/.Wait()。整个调用链从底到顶都是 async(\"async all the way\")：\n\`\`\`csharp\n// 错误：死锁风险\npublic string GetData()\n{\n    var result = GetDataAsync().Result;  // 阻塞！\n    return result;\n}\n\n// 正确：async all the way\npublic async Task<string> GetDataAsync()\n{\n    var result = await FetchAsync();  // 不阻塞\n    return result;\n}\n\`\`\`\n控制台程序无 SynchronizationContext，不会死锁，但仍应避免 .Result（丧失异步优势）。`,
    tags: ["死锁", "Result", "SynchronizationContext", "async-all-the-way"],
  },
  {
    id: "ec7-async-await-3",
    chapter: "ec7-async-await",
    level: 3,
    question: `async void 和 async Task 有什么区别？什么时候用 async void？为什么 async void 的异常会崩溃？`,
    answer:
      `async Task：异常存入返回的 Task，await 时重新抛出，可被调用方 try-catch 捕获。返回值表示异步操作的状态。\nasync void：异常无法被调用方捕获——没有 Task 来存储异常，异常直接抛到 SynchronizationContext，通常导致进程崩溃。也没有返回值表示操作状态，调用方无法 await 或检查完成。\nasync void 仅用于事件处理器（EventHandler 签名要求 void）：\n\`\`\`csharp\n// 合法：事件处理器签名要求 void\nbutton.Click += async void (sender, e) =>\n{\n    try\n    {\n        await DoSomethingAsync();\n    }\n    catch (Exception ex)\n    {\n        // async void 必须内部 try-catch，否则崩溃\n        ShowError(ex);\n    }\n};\n\n// 错误：非事件处理器用 async void\nasync void ProcessData() { ... }  // 异常会崩溃\n// 正确：\nasync Task ProcessDataAsync() { ... }\n\`\`\`\n最佳实践：除事件处理器外，永远返回 Task 或 Task<T>。`,
    tags: ["async-void", "异常", "事件处理器"],
  },
  {
    id: "ec7-async-await-4",
    chapter: "ec7-async-await",
    level: 4,
    question: `实现一个异步方法：并行请求 3 个 URL，等全部完成返回所有结果。要求支持超时取消（5秒），任一请求失败不影响其他结果。写出完整代码。`,
    answer:
      `\`\`\`csharp\npublic async Task<List<string>> FetchAllAsync(\n    string[] urls, CancellationToken ct)\n{\n    var tasks = urls.Select(async url =>\n    {\n        try\n        {\n            // 每个请求独立 try-catch，失败返回 null\n            var response = await httpClient.GetAsync(url, ct);\n            response.EnsureSuccessStatusCode();\n            return await response.Content.ReadAsStringAsync();\n        }\n        catch (Exception ex)\n        {\n            Console.WriteLine($\"{url} 失败: {ex.Message}\");\n            return (string?)null;\n        }\n    }).ToArray();\n\n    // Task.WhenAll 并行等待全部完成\n    // 即使某些返回 null，WhenAll 也不会抛异常（异常已在内部 catch）\n    var results = await Task.WhenAll(tasks);\n\n    // 过滤掉失败的（null）\n    return results.Where(r => r != null).ToList()!;\n}\n\n// 使用：5秒超时\nusing var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));\nvar urls = new[] { \"https://api1.com\", \"https://api2.com\", \"https://api3.com\" };\nvar contents = await FetchAllAsync(urls, cts.Token);\nConsole.WriteLine($\"成功获取 {contents.Count} 个响应\");\n\`\`\`\n要点：(1) Select + async Lambda 创建并行 Task 数组；(2) 每个 Task 内部 try-catch 隔离失败，返回 null 而非抛异常；(3) Task.WhenAll 并行等待所有完成（不阻塞线程）；(4) CancellationTokenSource(TimeSpan) 实现超时取消；(5) Where 过滤失败的 null 结果。\n对比串行 await：如果逐个 await，3个请求总时间 = t1+t2+t3。Task.WhenAll 并行后总时间 = max(t1,t2,t3)，快很多。`,
    tags: ["Task.WhenAll", "并行", "CancellationToken", "错误隔离", "综合设计"],
  },
];
