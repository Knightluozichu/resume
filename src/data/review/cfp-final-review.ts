import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 总复习复习题 */
export const cfpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cfp-final-review-1",
    chapter: "cfp-final-review",
    level: 1,
    question: "请说出全书四大板块的因果链，并解释为什么 Monad 放在最后？",
    answer:
      "因果链：函数是一等公民（基石）→ 高阶函数（组合引擎）→ 不可变数据（安全基石）→ Monad/错误处理（实践工具箱）。\n\nMonad 放在最后的原因：\n1. **Monad 的 Bind 是高阶函数**——`Bind(opt, f)` 中 f 是 `Func<T, Option<U>>`，接受值返回 Monad。不理解高阶函数（函数作为参数/返回值），就看不懂 Bind 的类型签名。\n2. **Monad 依赖不可变性**——Option/Result 是不可变类型，Some/Ok 创建后不修改。链式 Bind 创建新 Monad 而非修改原对象，这是不可变性原则的应用。\n3. **Monad 依赖延迟执行**——IEnumerable 是 Monad，SelectMany 是 Bind。延迟执行让管道按需计算，是 IEnumerable Monad 的核心特性。\n4. **Monad 是综合应用**——它集成了前三个板块的知识：高阶函数（Bind）、不可变性（Option/Result record）、声明式组合（链式管道）。\n\n所以 Monad 是全书的「终章」——它综合运用了前面所有概念，是函数式编程抽象能力的集大成者。",
    tags: ["因果链", "四大板块", "Monad", "知识依赖"],
  },
  {
    id: "cfp-final-review-2",
    chapter: "cfp-final-review",
    level: 2,
    question: "函数式编程的三大核心原则是什么？它们在 C# 中分别通过什么特性落地？",
    answer:
      "三大核心原则及 C# 落地：\n\n1. **函数是一等公民**（可赋值、可传参、可返回）\n   - `Func<T, TResult>` / `Action<T>` 委托类型——函数有明确类型\n   - Lambda 表达式 `x => x * 2`——内联创建函数值\n   - 方法组转换 `Func<int, int> f = MyMethod`——命名方法转委托\n   - LINQ——Select/Where 等接受函数参数，是函数式管道的直接体现\n\n2. **不可变性**（数据创建后不可修改，变更创建副本）\n   - `record` 类型——属性默认 init-only\n   - `with` 表达式——创建修改后的副本\n   - `init` 访问器——只能在初始化时赋值\n   - `ImmutableList` / `ImmutableDictionary`——不可变集合\n\n3. **声明式组合**（描述「做什么」而非「怎么做」）\n   - LINQ 管道——`nums.Where(x => x > 5).Select(x => x * 2)`\n   - `switch` 表达式——模式匹配返回值\n   - Monad 链式——`opt.Bind(f1).Bind(f2).Map(f3)`\n   - 元组模式——`(state, event) switch { ... }`\n\n三大原则的关系：一等公民是基石（没有它函数不能传参），声明式组合建立在一等公民之上（管道是函数的链式组合），不可变性是组合的安全保障（不可变数据无副作用，组合时不用担心互相干扰）。",
    tags: ["三大原则", "Func", "record", "LINQ", "switch表达式", "C#落地"],
  },
  {
    id: "cfp-final-review-3",
    chapter: "cfp-final-review",
    level: 3,
    question: "请综合运用全书知识，重构以下命令式代码为函数式风格。要求使用 record、LINQ、switch 表达式和 Result 类型。\n\n```csharp\nclass OrderProcessor {\n    public string Process(List<string> lines) {\n        var results = new List<string>();\n        foreach (var line in lines) {\n            var parts = line.Split(':');\n            if (parts.Length != 2) { results.Add(\"INVALID\"); continue; }\n            int qty;\n            if (!int.TryParse(parts[1], out qty)) { results.Add(\"PARSE_ERROR\"); continue; }\n            decimal price = qty * 9.99m;\n            if (price > 100) price *= 0.9m; // 10% off\n            results.Add($\"{parts[0]}: {price:F2}\");\n        }\n        return string.Join(\"\\n\", results);\n    }\n}\n```",
    answer:
      "```csharp\n// 不可变数据模型\npublic record OrderLine(string Product, int Quantity);\npublic record ProcessedLine(string Product, decimal Price);\n\n// 纯函数：解析行\nResult<OrderLine, string> ParseLine(string line)\n{\n    var parts = line.Split(':');\n    return parts.Length != 2\n        ? new Err<OrderLine, string>(\"INVALID\")\n        : int.TryParse(parts[1], out var qty)\n            ? new Ok<OrderLine, string>(new OrderLine(parts[0], qty))\n            : new Err<OrderLine, string>(\"PARSE_ERROR\");\n}\n\n// 纯函数：计算价格（switch 表达式 + 关系模式）\ndecimal CalcPrice(int qty)\n    => (qty * 9.99m) switch\n    {\n        > 100m => qty * 9.99m * 0.9m,  // 超过100打9折\n        var p  => p                    // 原价\n    };\n\n// 纯函数：处理单行\nstring ProcessLine(string line)\n    => ParseLine(line)\n        .Map(ol => new ProcessedLine(ol.Product, CalcPrice(ol.Quantity)))\n        .Match(\n            ok: p => $\"{p.Product}: {p.Price:F2}\",\n            err: e => e\n        );\n\n// 函数式管道\nstring ProcessFunctional(List<string> lines)\n    => lines\n        .Select(ProcessLine)           // LINQ：每行处理\n        .Aggregate(                    // LINQ：归约为字符串\n            new StringBuilder(),\n            (sb, s) => sb.AppendLine(s))\n        .ToString();\n\n// 或更简洁：\nstring ProcessFunctional2(List<string> lines)\n    => string.Join(\"\\n\", lines.Select(ProcessLine));\n```\n\n重构要点：\n1. **record**——OrderLine 和 ProcessedLine 是不可变数据模型\n2. **Result 类型**——ParseLine 返回 Result，错误是显式数据\n3. **switch 表达式**——CalcPrice 用关系模式替代 if-else\n4. **LINQ 管道**——Select + Aggregate 替代 foreach 循环\n5. **纯函数**——ParseLine、CalcPrice、ProcessLine 无副作用，可独立测试\n6. **声明式**——描述「解析→计算→格式化」，不描述循环细节\n\n对比命令式：函数式版本更模块化（每个函数独立可测试），更声明式（描述做什么），更安全（Result 强制处理错误），但需要理解 LINQ 和 Result 的工作方式。",
    tags: ["综合重构", "record", "LINQ", "switch表达式", "Result", "纯函数"],
  },
  {
    id: "cfp-final-review-4",
    chapter: "cfp-final-review",
    level: 4,
    question: "C# 是多范式语言。请综合全书内容，分析在什么场景选择命令式、什么场景选择函数式，以及「边界 try-catch，内核 Result」架构的合理性。给出你的函数式编程实践建议。",
    answer:
      "场景选择分析：\n\n**选函数式当**：\n1. **数据处理/转换**——过滤、映射、聚合用 LINQ 管道最自然。`nums.Where(...).Select(...).Sum()` 比 foreach 循环更声明式\n2. **数据建模**——DTO、值对象、领域事件用 record（不可变 + 值相等）\n3. **分支逻辑**——switch 表达式 + 模式匹配替代 if-else 链，返回值可组合\n4. **可失败操作**——解析、验证、查找用 Result/Option 替代 try-catch/null 检查\n5. **链式操作**——多步可能失败的操作用 Monad Bind 链式，替代嵌套\n6. **纯逻辑内核**——无副作用的业务规则用纯函数，可测试、可缓存、可并行\n\n**选命令式/OOP 当**：\n1. **行为建模**——服务、控制器、策略模式用 class + 接口 + 依赖注入\n2. **状态机**——有状态的交互逻辑用 class 封装状态\n3. **性能关键路径**——热路径上 foreach + 数组比 LINQ 迭代器开销小\n4. **GUI 事件处理**——事件订阅/取消订阅是 OOP 模式\n5. **框架集成**——ASP.NET MVC、EF Core 等框架用 OOP 模式\n\n**「边界 try-catch，内核 Result」架构的合理性**：\n\n1. **关注点分离**——IO 副作用在边界，纯逻辑在内核。内核函数可独立测试，不需要 mock 文件系统/网络\n2. **错误类型安全**——边界把无类型的异常转为有类型的 Result，内核用 Bind 链式传播，编译器强制处理\n3. **可推演性**——内核是纯函数 + Result，给定输入永远相同输出，可推演、可缓存\n4. **渐进式采用**——不需要一次性重写。在边界逐步引入 try-catch → Result 转换，内核逐步用 Bind/Map 替代\n5. **与框架兼容**——ASP.NET 的 Controller 用 try-catch 调用 Service，Service 用 Result 链式。Controller 做转换，Service 保持纯\n\n实践建议：\n\n1. **从 LINQ 开始**——LINQ 是 C# 函数式的入口。先用 Where/Select/Aggregate 替代循环，建立声明式思维\n2. **用 record 替代 class DTO**——数据模型用 record，享受不可变性和值相等\n3. **switch 表达式替代 if-else**——分支逻辑用模式匹配，返回值可组合\n4. **Option 替代 null**——可空引用用 Option<T>，消除 NullReferenceException\n5. **Result 替代 try-catch（业务错误）**——解析/验证/查找用 Result，签名体现可失败性\n6. **不要过度**——函数式是工具不是目标。简单 CRUD 用 OOP 足够，复杂数据处理才需要函数式管道\n7. **测试驱动**——纯函数天然可测试。写纯函数 + 单元测试，在边界做集成测试\n8. **渐进迁移**——不要一次性重写。新代码用函数式，旧代码按需重构\n\n核心心法：函数式不是替代 OOP，而是补充。数据处理用函数式（声明式、可组合），行为建模用 OOP（封装、多态），边界 IO 用 try-catch（兼容框架），内核逻辑用 Result（类型安全）。多范式的力量在于按场景选择最合适的工具。",
    tags: ["场景选择", "多范式", "边界架构", "实践建议", "渐进迁移"],
  },
];
