import type { ReviewQuestion } from "./types";

/** 深入理解 C# · Lambda 与闭包复习题 */
export const dcsLambdaClosureQuestions: ReviewQuestion[] = [
  {
    id: "dcs-lambda-closure-1",
    chapter: "dcs-lambda-closure",
    level: 1,
    question: "什么是闭包（closure）？C# 的 Lambda 如何捕获外部变量？",
    answer:
      "闭包是「携带了外部变量引用的函数」。当一个 Lambda 引用了它定义作用域中的局部变量时，编译器生成一个闭包——把 Lambda 和它引用的变量打包成一个对象，使变量超出原作用域后仍可被 Lambda 访问。\n\nC# 的捕获机制：\n```csharp\nint factor = 10;\nFunc<int, int> multiply = x => x * factor;  // 捕获 factor\nfactor = 20;\nConsole.WriteLine(multiply(5));  // 输出 100，不是 50\n```\n\n关键点：C# 的变量捕获是「按引用」的——Lambda 捕获的是变量本身（variable），不是变量在捕获时的值（value）。所以 factor 后续被改为 20，Lambda 用的是最新的 20。\n\n底层实现：编译器把被捕获的局部变量提升到一个编译器生成的闭包类的字段中，Lambda 变成该类的方法。原作用域中的变量操作变成对闭包类字段的操作。\n```csharp\n// 编译器生成的等价代码\nclass Closure {\n    public int factor;\n    public int Multiply(int x) => x * this.factor;\n}\nvar c = new Closure { factor = 10 };\nvar multiply = c.Multiply;\nc.factor = 20;  // 修改的是同一个字段\nmultiply(5);     // 100\n```\n\n闭包使得局部变量的生命周期被延长——只要闭包对象活着，被捕获的变量就不会被 GC 回收。",
    tags: ["闭包", "变量捕获", "按引用", "闭包类"],
  },
  {
    id: "dcs-lambda-closure-2",
    chapter: "dcs-lambda-closure",
    level: 2,
    question: "什么是「修改的闭包」陷阱（modified closure trap）？在 for 循环中捕获循环变量会导致什么问题？",
    answer:
      "修改的闭包陷阱：在循环中捕获循环变量时，Lambda 捕获的是循环变量本身（同一个变量），而非每次迭代的值。所有 Lambda 共享同一个变量，循环结束后变量的值是最后一次迭代的值。\n\n```csharp\nvar actions = new List<Action>();\nfor (int i = 0; i < 3; i++)\n{\n    actions.Add(() => Console.WriteLine(i));\n}\nforeach (var a in actions) a();\n// C# 5.0+ 输出：0 1 2（foreach 的循环变量每次迭代是新变量）\n// 但 for 循环的 i 是同一个变量：\n\nfor (int i = 0; i < 3; i++)\n{\n    actions.Add(() => Console.WriteLine(i));\n}\nforeach (var a in actions) a();\n// 输出：3 3 3  —— 所有 Lambda 看到的 i 都是 3\n```\n\n原因：for 循环的 `i` 是同一个变量，每次迭代修改它的值。三个 Lambda 捕获的是同一个 `i`，循环结束后 i=3，所以都输出 3。\n\n注意 C# 5.0 的变化：C# 5.0 起，foreach 的循环变量被改为每次迭代创建新变量（breaking change），所以 foreach 捕获安全。但 for 循环的变量仍是同一个，仍有陷阱。\n\n修复方法：在循环内创建局部副本，捕获副本而非循环变量：\n```csharp\nfor (int i = 0; i < 3; i++)\n{\n    int local = i;  // 每次迭代创建新变量\n    actions.Add(() => Console.WriteLine(local));\n}\n// 输出：0 1 2\n```\n\n`int local = i` 在每次迭代中创建新的局部变量，Lambda 捕获的是不同的 local，各持各的值。",
    tags: ["修改的闭包", "循环变量捕获", "陷阱", "for循环"],
  },
  {
    id: "dcs-lambda-closure-3",
    chapter: "dcs-lambda-closure",
    level: 3,
    question: "C# 的 Lambda 表达式和表达式树（Expression Tree）有什么区别？`Func<int,int>` 和 `Expression<Func<int,int>>` 在编译后有何不同？",
    answer:
      "Lambda 表达式和表达式树是 C# 3.0 引入的两个相关但不同的概念：\n\n1. Lambda 编译为委托（Func<Action>）：\n```csharp\nFunc<int, int> f = x => x * 2;\n```\n编译后生成一个委托实例，指向编译器生成的方法。它是可执行的代码——调用 f(5) 直接执行 x*2，返回 10。无法检查 Lambda 的内部结构。\n\n2. Lambda 编译为表达式树（Expression<Func>）：\n```csharp\nExpression<Func<int, int>> expr = x => x * 2;\n```\n编译后生成一棵表达式树——一个数据结构，描述了「参数 x 乘以 2」这个操作。它不是可执行代码，而是「代码的数据表示」。可以遍历树结构、分析或翻译成其他语言（如 SQL）。\n\n编译后的区别：\n- `Func<int, int> f = x => x * 2` 编译成 IL 方法 + 委托实例。`f(5)` 直接调用 IL 方法。\n- `Expression<Func<int, int>> expr = x => x * 2` 编译成构建表达式树的代码：`ParameterExpression x = ...; BinaryExpression body = Multiply(x, Constant(2)); Lambda(body, x)`。需要 `expr.Compile()` 才能得到可执行的委托。\n\n用途区别：\n- 委托（Func）：用于执行。LINQ to Objects（IEnumerable<T>）的 Where/Select 接收 Func，直接在内存中执行。\n- 表达式树（Expression）：用于分析和翻译。LINQ to SQL / EF Core（IQueryable<T>）的 Where/Select 接收 Expression，把表达式树翻译成 SQL 发给数据库。\n\n关键洞察：同一个 Lambda 语法 `x => x * 2`，赋值目标类型决定它是编译成可执行委托还是数据结构。这是 C# 编译器的「类型驱动的双关」设计。",
    tags: ["表达式树", "Expression", "委托", "LINQ", "双关"],
  },
  {
    id: "dcs-lambda-closure-4",
    chapter: "dcs-lambda-closure",
    level: 4,
    question: "闭包捕获变量会带来什么内存和 GC 影响？多个 Lambda 捕获同一作用域的不同变量时，编译器的闭包类生成策略是什么？请分析以下代码的内存行为。",
    answer:
      "分析内存行为和闭包类生成策略：\n\n```csharp\n// 示例代码\npublic Func<int> CreateCounter() {\n    int count = 0;\n    return () => ++count;  // 捕获 count\n}\n\npublic (Action, Action) CreateTwoClosures() {\n    int a = 0;\n    int b = 0;\n    Action incA = () => a++;\n    Action incB = () => b++;\n    return (incA, incB);\n}\n```\n\n内存与 GC 影响：\n\n1. 局部变量提升到堆：\n   - 正常局部变量（int count）在栈上，方法返回后回收。\n   - 被捕获后，编译器生成闭包类，count 变成闭包类字段（在堆上）。只要闭包委托活着，闭包对象和 count 就不会被 GC。\n   - 这延长了局部变量的生命周期——从栈上短期存活变成堆上长期存活，增加 GC 压力。\n\n2. 闭包类生成策略——共享闭包：\n   - 编译器为「同一个作用域中所有被捕获的变量」生成一个闭包类，而不是每个 Lambda 一个。\n   - 在 CreateTwoClosures 中，a 和 b 都在同一个作用域，编译器生成一个闭包类，同时包含 a 和 b 两个字段。incA 和 incB 指向同一个闭包实例。\n   - 后果：即使你只持有 incA，incB 引用的 b 也不会被 GC——因为它们共享同一个闭包对象。这是闭包的「意外延长生命周期」问题。\n\n3. 不捕获变量的 Lambda 不生成闭包类：\n   - `Func<int, int> f = x => x * 2` 没有捕获外部变量，编译器生成一个静态方法，委托指向它。无堆分配（不生成闭包对象）。\n\n4. 性能优化建议：\n   - 避免在高频路径（循环、热路径）中创建捕获闭包的 Lambda——每次创建都会 new 闭包对象。\n   - 如果 Lambda 不捕获变量，可以声明为 static lambda（C# 9.0）：`static Func<int, int> f = x => x * 2`，编译器保证不捕获，不生成闭包对象。\n   - 如果两个闭包不需要共享状态，考虑分到不同作用域，避免共享闭包类导致的意外生命周期延长。\n\n核心洞察：闭包不是免费的——它把栈上的局部变量搬到堆上，延长生命周期，增加 GC 压力。在高性能场景需要意识到这个隐藏成本。",
    tags: ["闭包内存", "GC影响", "共享闭包", "性能", "生命周期"],
  },
];
