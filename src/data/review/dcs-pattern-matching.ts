import type { ReviewQuestion } from "./types";

/** 深入理解 C# · 模式匹配复习题 */
export const dcsPatternMatchingQuestions: ReviewQuestion[] = [
  {
    id: "dcs-pattern-matching-1",
    chapter: "dcs-pattern-matching",
    level: 1,
    question: `C# 7.0-9.0 引入了哪些模式匹配类型？请各举一例。`,
    answer:
      `C# 逐步引入的模式匹配类型：\n\n1. 类型模式（C# 7.0）：\`is Type variable\` —— 检查类型并绑定变量。\n   \`\`\`csharp\n   if (o is string s) Console.WriteLine(s.Length);\n   \`\`\`\n\n2. 常量模式（C# 7.0）：\`is constant\` —— 检查是否等于常量。\n   \`\`\`csharp\n   if (shape is null) return;\n   if (count is 0) Console.WriteLine(\"empty\");\n   \`\`\`\n\n3. 声明模式（C# 7.0）：\`is Type var\` —— 类型检查并声明变量。\n   \`\`\`csharp\n   if (o is int i) Console.WriteLine(i * 2);\n   \`\`\`\n\n4. 属性模式（C# 8.0）：\`is { Property: pattern }\` —— 检查对象属性。\n   \`\`\`csharp\n   if (person is { Age: >= 18 }) Console.WriteLine(\"adult\");\n   if (point is { X: 0, Y: 0 }) Console.WriteLine(\"origin\");\n   \`\`\`\n\n5. 元组模式（C# 8.0）：\`is (pattern1, pattern2)\` —— 解构元组匹配。\n   \`\`\`csharp\n   var (x, y) = (1, 2);\n   if ((x, y) is (0, 0)) Console.WriteLine(\"origin\");\n   \`\`\`\n\n6. 位置模式（C# 8.0）：\`is Type(pattern1, pattern2)\` —— 通过 Deconstruct 解构。\n   \`\`\`csharp\n   if (point is Point(0, 0)) Console.WriteLine(\"origin\");\n   \`\`\`\n\n7. 关系模式（C# 9.0）：\`is > 5\`、\`is <= 10\` —— 大小比较。\n   \`\`\`csharp\n   if (score is >= 90) grade = \"A\";\n   \`\`\`\n\n8. 逻辑模式（C# 9.0）：\`and\`、\`or\`、\`not\` —— 组合模式。\n   \`\`\`csharp\n   if (score is >= 80 and < 90) grade = \"B\";\n   if (o is not null) Console.WriteLine(o);\n   \`\`\`\n\n9. 括号模式（C# 9.0）：用括号改变逻辑优先级。\n   \`\`\`csharp\n   if (x is (> 0 and < 10) or (> 100 and < 200)) { ... }\n   \`\`\`\n\n这些模式可以组合使用，如 \`is Person { Age: >= 18 and <= 65, Name: not null }\` ——同时匹配类型、属性、关系和逻辑。`,
    tags: ["模式匹配", "类型模式", "属性模式", "关系模式", "C#版本"],
  },
  {
    id: "dcs-pattern-matching-2",
    chapter: "dcs-pattern-matching",
    level: 2,
    question: `C# 8.0 的 switch 表达式（switch expression）与传统 switch 语句有什么区别？请用同一段逻辑展示两种写法。`,
    answer:
      `switch 表达式 vs switch 语句：\n\n\`\`\`csharp\n// 传统 switch 语句（命令式）\nstring GetLabel(Shape shape)\n{\n    string label;\n    switch (shape)\n    {\n        case Circle c:\n            label = $\"Circle r={c.Radius}\";\n            break;\n        case Rectangle r:\n            label = $\"Rect {r.W}x{r.H}\";\n            break;\n        case Triangle t:\n            label = $\"Triangle\";\n            break;\n        default:\n            label = \"Unknown\";\n            break;\n    }\n    return label;\n}\n\n// switch 表达式（声明式，C# 8.0）\nstring GetLabel(Shape shape) => shape switch\n{\n    Circle c      => $\"Circle r={c.Radius}\",\n    Rectangle r   => $\"Rect {r.W}x{r.H}\",\n    Triangle t    => $\"Triangle\",\n    _             => \"Unknown\"\n};\n\`\`\`\n\n核心区别：\n1. 表达式 vs 语句：switch 表达式返回一个值，可以直接赋值/返回；switch 语句是控制流，需要手动赋值和 break。\n2. 箭头语法：\`pattern => result\` 取代 \`case ... : ... break;\`，更简洁。\n3. 模式匹配：switch 表达式天然支持模式匹配（类型模式、属性模式等），传统 switch 只支持常量匹配（C# 7.0 后也支持但语法更冗长）。\n4. 穷尽性检查：switch 表达式要求穷尽所有可能（或加 \`_\` 默认），否则编译器警告。传统 switch 不强制穷尽。\n5. 无 fall-through：switch 表达式每个分支独立返回，不需要 break，不会 fall-through。传统 switch 需要 break 防止 fall-through。\n6. 顺序匹配：switch 表达式从上到下匹配，第一个匹配的分支返回。\`_\` 必须放最后。\n\nswitch 表达式是 C# 走向函数式编程的重要一步——把控制流变成了值表达式。`,
    tags: ["switch表达式", "switch语句", "声明式", "C# 8.0"],
  },
  {
    id: "dcs-pattern-matching-3",
    chapter: "dcs-pattern-matching",
    level: 3,
    question: `什么是位置模式（positional pattern）？如何让自定义类型支持位置模式匹配？请用 \`Deconstruct\` 方法实现。`,
    answer:
      `位置模式通过类型的 Deconstruct 方法解构对象，然后对各部分进行模式匹配。\n\n\`\`\`csharp\n// 定义类型并支持解构\npublic readonly struct Point\n{\n    public int X { get; }\n    public int Y { get; }\n    public Point(int x, int y) => (X, Y) = (x, y);\n\n    // Deconstruct 方法使类型支持位置模式\n    public void Deconstruct(out int x, out int y)\n    {\n        x = X;\n        y = Y;\n    }\n}\n\n// 使用位置模式\nstatic string Describe(Point p) => p switch\n{\n    Point(0, 0)           => \"origin\",\n    Point(0, _)            => \"on Y axis\",\n    Point(_, 0)            => \"on X axis\",\n    Point(var x, var y) when x == y => \"on diagonal\",\n    Point(var x, var y)    => $\"({x}, {y})\"\n};\n\n// 也支持嵌套位置模式\npublic readonly struct Line\n{\n    public Point Start { get; }\n    public Point End { get; }\n    public Line(Point s, Point e) => (Start, End) = (s, e);\n    public void Deconstruct(out Point start, out Point end)\n    {\n        start = Start;\n        end = End;\n    }\n}\n\nstatic bool IsFromOrigin(Line l) => l switch\n{\n    Line(Point(0, 0), _) => true,  // 嵌套位置模式\n    _ => false\n};\n\`\`\`\n\nDeconstruct 的要点：\n1. 方法签名：\`void Deconstruct(out T1 x, out T2 y, ...)\` —— 参数数量决定解构的元数。\n2. 编译器查找：位置模式 \`Point(0, 0)\` 编译器查找 Point 的 \`Deconstruct(out int, out int)\` 方法。\n3. 可以有多个 Deconstruct 重载（不同参数数量）。\n4. record 类型自动生成 Deconstruct（按构造函数参数顺序）。\n5. 也可以用扩展方法提供 Deconstruct：\`public static void Deconstruct(this Point p, out int x, out int y)\` ——为不可修改的第三方类型添加解构支持。\n\n位置模式 + 属性模式 + when 子句的组合，使得 C# 的模式匹配能力接近函数式语言的代数数据类型匹配。`,
    tags: ["位置模式", "Deconstruct", "解构", "模式匹配"],
  },
  {
    id: "dcs-pattern-matching-4",
    chapter: "dcs-pattern-matching",
    level: 4,
    question: `模式匹配如何改变 C# 的设计模式实现？请以「策略模式」和「状态模式」为例，对比传统 OOP 实现和模式匹配实现的优劣。`,
    answer:
      `模式匹配对设计模式的影响——以策略模式为例：\n\n传统 OOP 策略模式：\n\`\`\`csharp\ninterface IShippingStrategy {\n    decimal Calculate(Order order);\n}\nclass AirShipping : IShippingStrategy {\n    public decimal Calculate(Order order) => order.Weight * 10;\n}\nclass SeaShipping : IShippingStrategy {\n    public decimal Calculate(Order order) => order.Weight * 2;\n}\n// 使用\ndecimal cost = strategy.Calculate(order);\n\`\`\`\n\n模式匹配策略模式：\n\`\`\`csharp\nabstract record ShippingMethod;\nrecord AirShipping() : ShippingMethod;\nrecord SeaShipping() : ShippingMethod;\nrecord GroundShipping(decimal Distance) : ShippingMethod;\n\ndecimal Calculate(ShippingMethod method, Order order) => (method, order) switch\n{\n    (AirShipping, { Weight: var w })           => w * 10,\n    (SeaShipping, { Weight: var w })           => w * 2,\n    (GroundShipping { Distance: var d }, { Weight: var w }) => w * 0.5m * d,\n    _ => throw new ArgumentException(\"Unknown method\")\n};\n\`\`\`\n\n状态模式对比：\n\`\`\`csharp\n// 传统 OOP 状态模式\ninterface IState {\n    IState Handle(Event e);\n}\nclass IdleState : IState {\n    public IState Handle(Event e) => e switch {\n        StartEvent => new RunningState(),\n        _ => this\n    };\n}\nclass RunningState : IState {\n    public IState Handle(Event e) => e switch {\n        StopEvent => new IdleState(),\n        PauseEvent => new PausedState(),\n        _ => this\n    };\n}\n// 每个状态一个类，状态转换分散在各类中\n\n// 模式匹配状态模式\nrecord State;\nrecord Idle : State;\nrecord Running : State;\nrecord Paused : State;\n\nState Handle(State current, Event e) => (current, e) switch {\n    (Idle, Start)    => new Running(),\n    (Running, Stop)  => new Idle(),\n    (Running, Pause) => new Paused(),\n    (Paused, Resume) => new Running(),\n    (Paused, Stop)   => new Idle(),\n    _ => current  // 默认不转换\n};\n// 所有转换在一个地方，状态表一目了然\n\`\`\`\n\n优劣对比：\n\n传统 OOP 的优势：\n1. 多态分发：新增策略只需新增类，不修改现有代码（开闭原则）。\n2. 数据与行为绑定：每个策略类封装自己的数据和计算逻辑。\n3. 运行时多态：策略对象可以在运行时替换。\n\n模式匹配的优势：\n1. 集中可见：所有分支在一个 switch 表达式中，逻辑一目了然。状态转换表特别清晰。\n2. 跨类型匹配：可以同时对多个维度匹配（如 \`(method, order)\`），OOP 需要访问者模式才能做到。\n3. 解构数据：record + 位置模式可以提取数据，OOP 需要暴露属性。\n4. 穷尽性检查：编译器警告未处理的分支（如果是 enum 或 record 的所有变体）。\n\n选择原则：\n- 行为多变、数据固定 → 传统 OOP（策略模式）。\n- 数据多变、行为固定 → 模式匹配（数据驱动分支）。\n- 状态机 → 模式匹配（转换表集中可见，调试方便）。\n- 需要运行时替换策略 → 传统 OOP（接口多态）。\n\n模式匹配不是取代 OOP，而是多了一种工具。函数式风格的模式匹配在「数据驱动的分支逻辑」上更简洁，OOP 在「行为驱动的多态」上更灵活。`,
    tags: ["策略模式", "状态模式", "OOP对比", "函数式", "设计模式"],
  },
];
