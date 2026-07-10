import type { ReviewQuestion } from "./types";

export const ec7FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ec7-final-review-1",
    chapter: "ec7-final-review",
    level: 1,
    question: `用一句话概括全书四大板块各自的核心知识点。`,
    answer:
      `(1) C# 基础：值类型（栈分配、赋值拷贝）vs 引用类型（堆分配、赋值共享），var 类型推断，运算符优先级与短路求值，?. 和 ?? null 处理，模式匹配 switch。\n(2) 面向对象：字段 private + 属性 public = 封装，构造函数初始化，static 属于类，virtual/override 运行时多态，接口 can-do 多实现 vs 抽象类 is-a 单继承，组合优于继承。\n(3) 泛型与委托：泛型类型参数化消除装箱，where 约束限制 T 能力，协变 out/逆变 in，委托类型安全函数指针，多播委托一对多，event 封装委托，Func/Action + Lambda。\n(4) 高级特性：LINQ 链式查询管道 + 延迟执行，async/await 状态机不阻塞线程，Task 未来结果，CancellationToken 协作取消。`,
    tags: ["全书总结", "四段递进"],
  },
  {
    id: "ec7-final-review-2",
    chapter: "ec7-final-review",
    level: 2,
    question: `委托、Func/Action、Lambda、LINQ 之间是什么关系？从委托到 LINQ 是怎样一条能力递进线？`,
    answer:
      `能力递进线：\n(1) 委托：类型安全的函数指针，定义方法签名（参数类型+返回类型），委托实例持有匹配的方法。\n(2) Func/Action：C# 内置泛型委托。Func<T,TResult> 有返回值，Action<T> 无返回值。省去自定义委托类型的麻烦。\n(3) Lambda：创建委托实例的简洁语法。\`x => x * 2\` 等价于写一个方法再赋给委托。让函数式编程在 C# 中变得自然。\n(4) LINQ：完全构建在泛型委托上。Where 接受 Func<T,bool>、Select 接受 Func<T,TResult>、OrderBy 接受 Func<T,TKey>。传入的 Lambda 就是委托实例。\n\`\`\`csharp\n// 委托定义\ndelegate bool Predicate<T>(T obj);\n// Func 等价内置\nFunc<int, bool> isEven = x => x % 2 == 0;  // Lambda 创建委托\n// LINQ 使用\nvar evens = numbers.Where(isEven);  // Where 接受 Func<int,bool>\nvar evens2 = numbers.Where(x => x % 2 == 0);  // Lambda 直接传入\n\`\`\`\n从委托到 LINQ：委托提供了\"方法当参数传\"的能力，Func/Action 让它标准化，Lambda 让它简洁，LINQ 在此基础上构建了完整的集合查询 DSL。`,
    tags: ["委托", "Func", "Lambda", "LINQ", "递进关系"],
  },
  {
    id: "ec7-final-review-3",
    chapter: "ec7-final-review",
    level: 3,
    question: `以下代码综合了全书哪些知识点？逐行分析涉及的章节和概念。\n\`\`\`csharp\npublic async Task<List<string>> GetActiveNamesAsync(IEnumerable<User> users)\n{\n    return await Task.Run(() => users\n        .Where(u => u.IsActive)\n        .OrderByDescending(u => u.Score)\n        .Select(u => u.Name)\n        .ToList());\n}\n\`\`\``,
    answer:
      `逐行分析：\n\`public async Task<List<string>>\` — 第 9 章 async/await：async 标记异步方法，Task<List<string>> 是泛型 Task（第 6 章泛型 + 第 9 章异步）。\n\`IEnumerable<User>\` — 第 6 章泛型接口：IEnumerable<T> 是 LINQ 的数据源接口（第 5 章接口 + 第 6 章泛型）。\n\`await Task.Run(() => ...)\` — 第 9 章：Task.Run 把 CPU 密集工作放到线程池，await 挂起不阻塞。\`() => ...\` 是第 7 章 Lambda（Action 委托）。\n\`.Where(u => u.IsActive)\` — 第 8 章 LINQ：Where 过滤，接受 Func<User,bool>（第 7 章泛型委托 + Lambda）。\`u.IsActive\` 是第 4 章属性。\n\`.OrderByDescending(u => u.Score)\` — 第 8 章 LINQ 排序，接受 Func<User,int>。\n\`.Select(u => u.Name)\` — 第 8 章 LINQ 投影，接受 Func<User,string>。\n\`.ToList()\` — 第 8 章：立即执行，触发延迟查询。返回 List<string>（第 6 章泛型容器）。\n涉及章节：第 4 章（属性）、第 5 章（接口 IEnumerable）、第 6 章（泛型 IEnumerable<T>/List<string>/Task<T>）、第 7 章（Func 委托/Lambda）、第 8 章（LINQ Where/OrderBy/Select/ToList）、第 9 章（async/await/Task.Run）。六个章节的知识在一个方法中综合运用。`,
    tags: ["综合分析", "LINQ", "async", "泛型", "委托"],
  },
  {
    id: "ec7-final-review-4",
    chapter: "ec7-final-review",
    level: 4,
    question: `设计一个简单的事件日志系统：Logger 类记录日志，支持多订阅者（控制台、文件）。要求综合运用全书知识：封装、接口、泛型委托、事件、LINQ。写出完整代码。`,
    answer:
      `\`\`\`csharp\nusing System;\nusing System.Collections.Generic;\nusing System.Linq;\n\n// 第 5 章：接口——定义日志写入能力\npublic interface ILogSink\n{\n    void Write(LogLevel level, string message);\n}\n\n// 第 4 章：枚举 + 封装\npublic enum LogLevel { Debug, Info, Warning, Error }\n\n// 第 7 章：自定义事件参数（第 4 章属性封装）\npublic class LogEventArgs : EventArgs\n{\n    public LogLevel Level { get; }\n    public string Message { get; }\n    public DateTime Timestamp { get; } = DateTime.Now;\n\n    public LogEventArgs(LogLevel level, string message)\n    {\n        Level = level;\n        Message = message;\n    }\n}\n\n// 第 4-7 章：发布者——封装 + 事件 + 泛型委托\npublic class Logger\n{\n    // 第 7 章：event 封装委托，外部只能 +=/-=\n    public event EventHandler<LogEventArgs>? OnLogged;\n\n    // 第 6 章：泛型 List 存储历史\n    private readonly List<LogEventArgs> _history = new();\n\n    public void Log(LogLevel level, string message)\n    {\n        var args = new LogEventArgs(level, message);\n        _history.Add(args);\n        OnLogged?.Invoke(this, args);  // 触发事件\n    }\n\n    // 第 8 章：LINQ 查询历史\n    public IEnumerable<LogEventArgs> GetByLevel(LogLevel level) =>\n        _history.Where(e => e.Level == level)\n                .OrderByDescending(e => e.Timestamp);\n\n    public IEnumerable<IGrouping<LogLevel, LogEventArgs>> GroupByLevel() =>\n        _history.GroupBy(e => e.Level);\n}\n\n// 第 5 章：接口实现——控制台 Sink\npublic class ConsoleSink : ILogSink\n{\n    public void Write(LogLevel level, string msg) =>\n        Console.WriteLine($\"[{level}] {msg}\");\n}\n\n// 使用：综合全书知识\nvar logger = new Logger();\n// 第 7 章：Lambda 订阅事件\nlogger.OnLogged += (sender, e) =>\n    Console.WriteLine($\"{e.Timestamp:HH:mm:ss} [{e.Level}] {e.Message}\");\n\nlogger.Log(LogLevel.Info, \"系统启动\");\nlogger.Log(LogLevel.Error, \"数据库连接失败\");\nlogger.Log(LogLevel.Info, \"重连成功\");\n\n// 第 8 章：LINQ 查询日志\nvar errors = logger.GetByLevel(LogLevel.Error);\nConsole.WriteLine($\"错误数: {errors.Count()}\");\n\nforeach (var g in logger.GroupByLevel())\n    Console.WriteLine($\"{g.Key}: {g.Count()} 条\");\n\`\`\`\n涉及知识：第 4 章（类封装、属性、枚举）、第 5 章（接口 ILogSink）、第 6 章（泛型 List<LogEventArgs>、IEnumerable<T>、IGrouping<T>）、第 7 章（event 事件、EventHandler<T>、EventArgs、Lambda 订阅）、第 8 章（LINQ Where/OrderByDescending/GroupBy/Count 延迟执行）。`,
    tags: ["综合设计", "封装", "接口", "事件", "LINQ", "全书"],
  },
];
