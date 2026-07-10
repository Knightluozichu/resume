import type { ReviewQuestion } from "./types";

/** 深入理解 C# · C# 演进史复习题 */
export const dcsCsharpHistoryQuestions: ReviewQuestion[] = [
  {
    id: "dcs-csharp-history-1",
    chapter: "dcs-csharp-history",
    level: 1,
    question: `C# 从 1.0 到 9.0，每个主要版本引入了哪个标志性特性？`,
    answer:
      `C# 各版本标志性特性：\n- C# 1.0（2002）：委托、事件、属性、垃圾回收。建立了类型安全的面向对象基础。\n- C# 2.0（2005）：泛型、匿名方法、迭代器（yield）、可空类型（Nullable<T>）。\n- C# 3.0（2007）：Lambda、扩展方法、LINQ、隐式类型（var）、匿名类型、表达式树。这一版是 C# 的分水岭。\n- C# 4.0（2010）：dynamic、命名参数、可选参数、协变/逆变泛型接口。\n- C# 5.0（2012）：async/await、调用方信息特性。\n- C# 6.0（2015）：字符串插值、null 条件运算符（?.）、表达式主体成员、getter-only 自动属性。\n- C# 7.0-7.3（2017-2018）：模式匹配、元组、本地函数、out 变量声明、弃元（_）。\n- C# 8.0（2019）：可空引用类型、异步流（IAsyncEnumerable）、索引/范围、switch 表达式。\n- C# 9.0（2020）：Record、顶级语句、init-only 属性、目标类型 new、模式匹配增强。\n\n记忆线索：1.0 打基础，2.0 加泛型，3.0 上 LINQ，4.0 加动态，5.0 上异步，6.0 语法糖，7.0 模式匹配，8.0 可空引用，9.0 Record。`,
    tags: ["版本特性", "演进史", "C#版本"],
  },
  {
    id: "dcs-csharp-history-2",
    chapter: "dcs-csharp-history",
    level: 2,
    question: `C# 3.0 的 LINQ 为什么被称为 C# 的「分水岭」？它依赖了哪些 C# 3.0 新特性？`,
    answer:
      `C# 3.0 被称为分水岭，因为 LINQ（Language Integrated Query）把「查询」从外部 DSL（如 SQL 字符串）变成了语言一等公民——查询表达式直接编译成 C# 代码，有类型检查和智能提示。这彻底改变了 C# 的数据处理方式。\n\nLINQ 依赖的 C# 3.0 新特性：\n1. Lambda 表达式：\`Where(x => x > 5)\` 中的 \`x => x > 5\` 就是 Lambda，它是 LINQ 的谓词载体。\n2. 扩展方法：\`IEnumerable<T>\` 本身没有 Where/Select 方法，它们是 \`Enumerable\` 类的扩展方法，让 LINQ 查询看起来像内置方法。\n3. 隐式类型（var）：\`var result = from x in list where x > 5 select x\` 中 result 的类型可能是复杂的 \`IEnumerable<int>\`，var 避免手写冗长类型。\n4. 匿名类型：\`select new { Name = x.Name, Age = x.Age }\` 创建无名类型，LINQ 投影的基石。\n5. 表达式树：\`IQueryable<T>\` 的 LINQ provider（如 EF Core）把 Lambda 编译成表达式树而非委托，用于翻译成 SQL。\n\n没有这些特性，LINQ 无法实现——它不是单一特性，而是一组特性的协同。这也解释了为什么 C# 3.0 是最重大的版本。`,
    tags: ["C# 3.0", "LINQ", "分水岭", "Lambda"],
  },
  {
    id: "dcs-csharp-history-3",
    chapter: "dcs-csharp-history",
    level: 3,
    question: `C# 8.0 的可空引用类型（NRT）解决了什么问题？它为什么是编译时警告而非运行时检查？`,
    answer:
      `C# 8.0 的可空引用类型（Nullable Reference Types）解决了「空引用异常（NullReferenceException）是 C# 最常见运行时异常」的问题。在 NRT 之前，所有引用类型都可能是 null，编译器不帮你检查——你必须手动记住哪些可能为 null、哪些不会。\n\nNRT 的机制：\n- 默认引用类型不可为 null：\`string s\` 表示 s 不会是 null。\n- 显式标记可空：\`string? s\` 表示 s 可能是 null。\n- 编译器做流分析：如果你 \`string? s = GetName();\` 然后直接用 \`s.Length\`，编译器警告「s 可能为 null」。\n- 警告消除：用 \`if (s != null)\` 或 \`s!.Length\`（null 抑制运算符）消除警告。\n\n为什么是编译时警告而非运行时检查：\n1. 性能：运行时检查 null 需要在每次方法调用前插入检查代码，有性能开销。编译时分析零运行时开销。\n2. 兼容性：C# 8.0 引入 NRT 时，现有大量代码没有 NRT 标注。如果做成运行时检查，旧代码升级后会有大量异常。编译时警告可以逐步修复。\n3. 本质：NRT 是「编译器帮你在代码中标注 null 意图」，不是「运行时强制 null 检查」。它是一种静态分析工具，类似于 TypeScript 的类型检查——类型标注帮助你在编译期发现问题，运行时不做额外检查。`,
    tags: ["C# 8.0", "可空引用类型", "NRT", "编译时分析"],
  },
  {
    id: "dcs-csharp-history-4",
    chapter: "dcs-csharp-history",
    level: 4,
    question: `从 C# 1.0 到 C# 9.0，语言在「减少样板代码」方面经历了哪些关键进化？请举例说明每一步消除了什么样板。`,
    answer:
      `C# 在减少样板代码方面经历了多条进化线：\n\n1. 委托创建的简化（C# 1.0→2.0→3.0）：\n   - C# 1.0：\`new SomeDelegate(Method)\` —— 需要显式 new 委托实例并命名方法。\n   - C# 2.0：\`delegate(int x) { return x + 1; }\` —— 匿名方法，不需要命名方法。\n   - C# 3.0：\`x => x + 1\` —— Lambda，进一步简化到一行。从 3 行降到 1 行。\n\n2. 属性的简化（C# 2.0→3.0→6.0→9.0）：\n   - C# 2.0：私有字段 + 公共属性 + get/set 方法体（约 7 行）。\n   - C# 3.0：自动属性 \`public int X { get; set; }\`（1 行，字段自动生成）。\n   - C# 6.0：只读自动属性 \`public int X { get; }\`（可在构造函数中赋值）。\n   - C# 9.0：init-only \`public int X { get; init; }\`（对象初始化器可赋值，之后只读）。\n\n3. 类型声明的简化（C# 3.0→9.0）：\n   - C# 3.0：\`var\` 隐式类型，消除局部变量声明的类型冗余。\n   - C# 9.0：目标类型 \`new()\`，\`Person p = new()\` 不需要重复类型名。\n   - C# 9.0：Record \`record Point(int X, int Y)\` 一行替代整个不可变值类（Equals/GetHashCode/ToString 全自动生成）。\n\n4. 程序入口的简化（C# 9.0）：\n   - 之前：\`class Program { static void Main() { Console.WriteLine(\"Hi\"); } }\`（4 行样板）。\n   - C# 9.0：顶级语句 \`Console.WriteLine(\"Hi\")\`（1 行）。\n\n5. 模式匹配消除 if-else 链（C# 7.0→8.0→9.0）：\n   - 之前：多层 if-else + is + 类型转换。\n   - C# 8.0 switch 表达式 + C# 9.0 模式匹配：用声明式模式替代命令式分支。\n\n总结：C# 的进化方向是「让编译器生成更多样板代码」，开发者只写业务逻辑。从委托到 Lambda、从字段+属性到自动属性、从 class 到 record，每一步都在消除重复样板。`,
    tags: ["样板代码", "语言进化", "语法简化", "Record"],
  },
];
