import type { ReviewQuestion } from "./types";

/** 深入理解 C# · 总复习复习题 */
export const dcsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dcs-final-review-1",
    chapter: "dcs-final-review",
    level: 1,
    question: "请简述 C# 从 1.0 到 9.0 的演进脉络中，委托、Lambda、迭代器、async/await、模式匹配、record 这六个特性的引入顺序和因果关系。",
    answer:
      "六个特性的引入顺序和因果关系：\n\n1. 委托（C# 1.0）：类型安全的函数指针，是整个回调体系的基石。\n2. 迭代器 yield（C# 2.0）：编译器生成状态机，首次引入「方法体拆分」技术。\n3. Lambda + 闭包（C# 3.0）：简化委托创建，引入闭包（变量捕获）和表达式树。Lambda 是 LINQ 的基石。\n4. async/await（C# 5.0）：复用迭代器的状态机技术，用 Lambda/委托注册 continuation，把异步回调写成同步样式。\n5. 模式匹配（C# 7.0-9.0）：类型检查从 if-else 变成声明式 switch 表达式。\n6. record（C# 9.0）：值语义的不可变数据类型，with 表达式 + 模式匹配 = 函数式数据建模。\n\n因果链：\n- 委托 → Lambda：Lambda 是委托的语法糖，简化回调创建。\n- 委托 → async/await：await 的 continuation 本质是委托回调。\n- 迭代器 → async/await：两者都是编译器把方法体拆成状态机，技术同源。\n- Lambda → LINQ → 模式匹配：Lambda 引入的函数式思维催生了声明式模式匹配。\n- record + 模式匹配：record 提供不可变数据，模式匹配提供声明式分支，组合出函数式编程范式。\n\n核心洞察：C# 的演进是一条「从命令式到函数式」的渐变线。委托是起点（回调），record + 模式匹配是当前终点（函数式数据建模）。每一步都在前一步基础上叠加，底层机制从未被推翻。",
    tags: ["总复习", "演进脉络", "因果关系", "特性链"],
  },
  {
    id: "dcs-final-review-2",
    chapter: "dcs-final-review",
    level: 2,
    question: "C# 编译器的「方法体转状态机」技术在迭代器和 async/await 中都有应用。请比较两种状态机的相同点和不同点。",
    answer:
      "迭代器状态机与 async/await 状态机的比较：\n\n相同点：\n1. 方法体拆分：编译器把含 yield/await 的方法体拆成 switch-case 状态机，每个 yield/await 是一个状态切换点。\n2. 局部变量提升：方法的局部变量和参数提升为状态机字段，保证暂停后恢复时值不丢失。\n3. 状态字段：都有 _state 字段记录执行位置，MoveNext 方法根据 _state 跳转到对应位置。\n4. 嵌套类/结构体：编译器生成一个实现接口的状态机类型（迭代器实现 IEnumerable/IEnumerator，async 实现 IAsyncStateMachine）。\n5. 编译器生成代码模式几乎相同，C# 编译器团队复用了同一套基础设施。\n\n不同点：\n\n| 维度 | 迭代器状态机 | async/await 状态机 |\n|---|---|---|\n| 暂停触发 | yield return | await 未完成的 Task |\n| 恢复触发 | 调用方 MoveNext | Task 完成 + SynchronizationContext |\n| 暂停时控制权 | 返回给调用方（同步） | 返回 Task 给调用方（异步，线程不阻塞） |\n| 线程模型 | 同一线程 | 可能切换线程（continuation 可能在不同线程） |\n| 返回类型 | IEnumerable<T>/IEnumerator<T> | Task/Task<T>/ValueTask |\n| 产出值 | yield return 的值 | await 表达式的结果 |\n| 结束信号 | MoveNext 返回 false | Task 完成（SetResult） |\n| SynchronizationContext | 不涉及 | await 默认捕获 SynchronizationContext |\n| 异常传播 | MoveNext 抛异常 | Task.Exception 或 await 抛异常 |\n\n关键差异的本质：\n迭代器是「同步暂停-恢复」——暂停时控制权回到调用方，调用方主动 MoveNext 恢复。整个过程在调用方线程，无线程切换。\nasync/await 是「异步暂停-恢复」——暂停时方法返回 Task，调用方可以不等待（继续做别的）。异步操作完成后，continuation 通过 SynchronizationContext 或线程池调度恢复，可能在不同线程。\n\n理解这个同源关系有助于掌握 async/await：它不是新机制，而是迭代器状态机技术 + 线程池/SynchronizationContext 的组合。",
    tags: ["状态机比较", "迭代器", "async/await", "编译器技术"],
  },
  {
    id: "dcs-final-review-3",
    chapter: "dcs-final-review",
    level: 3,
    question: "在 C# 中实现一个「异步生产者-消费者」管道，需要综合用到哪些本书讲过的特性？请描述设计思路并指出每一步用到的特性。",
    answer:
      "异步生产者-消费者管道的综合设计：\n\n场景：生产者异步产生数据，消费者异步处理，中间用 Channel 缓冲。\n\n```csharp\n// 1. 用 record 定义不可变数据项（第 9 章）\nrecord DataItem(int Id, string Content);\n\n// 2. 用 async IAsyncEnumerable 异步生产数据（迭代器 + async，第 4、7 章）\nasync IAsyncEnumerable<DataItem> ProduceAsync(\n    [EnumeratorCancellation] CancellationToken ct)\n{\n    for (int i = 0; !ct.IsCancellationRequested; i++)\n    {\n        var content = await FetchFromApiAsync(i, ct);  // async/await 状态机\n        yield return new DataItem(i, content);  // yield return 状态机\n        await Task.Delay(1000, ct);  // 异步等待\n    }\n}\n\n// 3. 用 Channel 做异步缓冲\nvar channel = Channel.CreateBounded<DataItem>(100);\n\n// 4. 生产者：用 await foreach 消费 IAsyncEnumerable（第 4、7 章）\nasync Task ProduceToChannelAsync(CancellationToken ct)\n{\n    await foreach (var item in ProduceAsync(ct))  // await foreach（异步迭代）\n    {\n        await channel.Writer.WriteAsync(item, ct);  // async/await\n    }\n    channel.Writer.Complete();\n}\n\n// 5. 消费者：用模式匹配处理不同数据（第 8 章）\nasync Task ConsumeFromChannelAsync(CancellationToken ct)\n{\n    await foreach (var item in channel.Reader.ReadAllAsync(ct))\n    {\n        var result = item switch  // switch 表达式 + 模式匹配\n        {\n            { Id: 0 }             => \"first item\",\n            { Content.Length: > 100 } => \"long content\",\n            DataItem { Id: var id } when id % 10 == 0 => \"milestone\",\n            _                     => \"normal\"\n        };\n        Console.WriteLine($\"{item.Id}: {result}\");\n    }\n}\n\n// 6. 用 Task.WhenAll 并行运行生产和消费\nvar cts = new CancellationTokenSource();\nawait Task.WhenAll(\n    ProduceToChannelAsync(cts.Token),\n    ConsumeFromChannelAsync(cts.Token)\n);\n```\n\n每一步用到的特性：\n1. record（第 9 章）：定义不可变数据项 DataItem，自动值相等性和 ToString。\n2. yield return（第 4 章）：ProduceAsync 用 yield return 逐个产出数据，延迟执行。\n3. async/await（第 7 章）：异步 IO 操作不阻塞线程，状态机自动管理暂停-恢复。\n4. IAsyncEnumerable（第 7 章）：异步迭代器，await foreach 逐个异步消费。\n5. 模式匹配（第 8 章）：switch 表达式 + 属性模式 + 关系模式 + when 子句，声明式数据处理。\n6. Channel + Task.WhenAll：异步管道协调，全栈异步无阻塞。\n7. 委托/Lambda（第 3、5 章）：await foreach 的内部 continuation、Channel 的回调都是委托。\n\n这个例子展示了 C# 现代特性的协同：record（数据）→ yield + async（异步流）→ 模式匹配（处理）→ 委托/Task（协调）。每个特性都在前一特性的基础上构建，形成完整的异步数据处理管道。",
    tags: ["异步管道", "综合应用", "Channel", "IAsyncEnumerable", "全栈异步"],
  },
  {
    id: "dcs-final-review-4",
    chapter: "dcs-final-review",
    level: 4,
    question: "C# 的演进如何体现了「命令式→函数式」的范式迁移？请从数据建模、控制流、异步处理三个维度分析这一迁移，并评估函数式特性在 C# 中的边界。",
    answer:
      "C# 从命令式到函数式的范式迁移，三个维度分析：\n\n1. 数据建模的迁移：\n   - 命令式时代（C# 1.0-8.0）：class + 可变属性 + 手写 Equals/GetHashCode。数据是「有状态的对象」，修改对象属性是常态。\n   - 函数式时代（C# 9.0+）：record + init-only + with 表达式。数据是「不可变的值」，修改 = 创建副本。值相等性自动生成。\n   - 迁移本质：从「对象 = 状态 + 行为」到「数据 = 值 + 变换」。record 使数据建模从 OOP 走向函数式的值类型。\n   - 元组补充：临时数据组合用 ValueTuple，不需要定义类型，更函数式。\n\n2. 控制流的迁移：\n   - 命令式时代：if-else 链 + 类型转换 + 命令式 switch 语句（需要 break，会 fall-through）。\n   - 函数式时代（C# 7.0-9.0）：switch 表达式 + 模式匹配（类型/属性/关系/逻辑模式）。控制流变成「表达式」，可以赋值/返回。穷尽性检查保证分支完整。\n   - 迁移本质：从「命令式分支（修改状态）」到「声明式匹配（返回值）」。模式匹配使分支逻辑从命令式 goto-like 变成函数式的 algebraic data type matching。\n   - LINQ 是早期信号：C# 3.0 的 LINQ 已经是函数式的声明式数据处理（Select/Where/Aggregate 对应 map/filter/reduce）。\n\n3. 异步处理的迁移：\n   - 命令式时代：回调嵌套（callback hell）、APM（BeginInvoke/EndInvoke）、EAP（Event-based Async Pattern）。\n   - 函数式时代：async/await（monadic 风格的异步组合）+ IAsyncEnumerable（异步流）+ LINQ 风格的 Channel。\n   - 迁移本质：从「手动管理回调」到「编译器生成状态机」。async/await 本质是 Task monad 的 syntactic sugar——await 类似 monadic bind，async 类似 monadic return。\n\n函数式特性在 C# 中的边界：\n\n1. 不可变性的边界：\n   - C# 不是纯函数式语言，可变性仍是默认（class 可变，局部变量可变）。\n   - record 是引用类型（虽然是值语义），不像 F# 的 struct record 那样在栈上。\n   - with 表达式创建副本，大对象的 with 有性能开销（不如 F# 的 structural sharing）。\n\n2. 模式匹配的边界：\n   - C# 的模式匹配不如 F# 的完整匹配（complete matching）强制——C# 仍可用 `_` 兜底。\n   - 没有 F# 的 active patterns（自定义模式）。\n   - record 不能像 F# discriminated union 那样表达「封闭的和类型」——record 继承是开放的。\n\n3. 惰性求值的边界：\n   - C# 的 yield/ LINQ 是惰性的，但不是默认——需要显式使用。\n   - F# 默认惰性（lazy），C# 默认严格求值。\n\n4. 副作用管理的边界：\n   - C# 没有纯函数标注（不像 F# 的 [<Pure>] 或 Haskell 的纯函数默认）。\n   - 没有 IO monad 隔离副作用。\n   - static lambda（C# 9.0）只是禁止捕获，不保证纯函数。\n\n评估：C# 的函数式迁移是「实用主义」的——它引入了函数式的数据建模（record）、控制流（模式匹配）、异步组合（async/await）能力，但保留了命令式的可变性、OOP 的类系统、命令式的控制流作为默认。C# 的定位是「多范式」而非「纯函数式」，函数式特性是「工具箱中的工具」而非「强制范式」。这种实用主义使 C# 既能写传统的 OOP 代码，也能写函数式风格的代码，开发者可以按场景选择。",
    tags: ["范式迁移", "命令式到函数式", "边界评估", "多范式", "总复习"],
  },
];
