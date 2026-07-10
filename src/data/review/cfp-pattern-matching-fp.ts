import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 函数式模式匹配复习题 */
export const cfpPatternMatchingFpQuestions: ReviewQuestion[] = [
  {
    id: "cfp-pattern-matching-fp-1",
    chapter: "cfp-pattern-matching-fp",
    level: 1,
    question: `C# 的 \`switch\` 表达式和传统 \`switch\` 语句有什么区别？为什么说 switch 表达式是函数式的？`,
    answer:
      `区别：\n1. **返回值**：switch 语句是语句（不返回值，执行分支逻辑），switch 表达式是表达式（返回值，赋值给变量）\n2. **语法**：switch 语句用 \`case ... : break;\`，switch 表达式用 \`pattern => result,\` 箭头语法\n3. **穷尽性**：switch 表达式要求覆盖所有可能（或有 \`_\` 弃元），编译器检查穷尽性。switch 语句不要求\n4. **模式**：switch 表达式支持类型/属性/关系/逻辑模式，switch 语句主要支持常量模式\n\nswitch 表达式是函数式的原因：\n- **表达式替代语句**：函数式编程核心原则之一——用表达式（返回值）替代语句（执行动作）。\`var grade = score switch { ... }\` 把分支逻辑变成值表达式\n- **声明式**：描述「匹配什么返回什么」，不描述「怎么跳转」\n- **可组合**：switch 表达式可以嵌套在 LINQ 管道中——\`items.Select(x => x switch { ... })\`\n- **无副作用**：switch 表达式只返回值，不像 switch 语句可能包含赋值、break、return 等控制流`,
    tags: ["switch表达式", "switch语句", "表达式vs语句", "穷尽性"],
  },
  {
    id: "cfp-pattern-matching-fp-2",
    chapter: "cfp-pattern-matching-fp",
    level: 2,
    question: `请用 switch 表达式重写以下 if-else 链，并使用属性模式和关系模式。`,
    answer:
      `if-else 链：\n\`\`\`csharp\nstring category;\nif (user.Age >= 65)\n    category = \"Senior\";\nelse if (user.Age >= 18 && user.IsMember)\n    category = \"Adult Member\";\nelse if (user.Age >= 18)\n    category = \"Adult\";\nelse if (user.Age < 13)\n    category = \"Child\";\nelse\n    category = \"Teen\";\n\`\`\`\n\nswitch 表达式重写：\n\`\`\`csharp\nvar category = user switch\n{\n    { Age: >= 65 }                        => \"Senior\",\n    { Age: >= 18, IsMember: true }        => \"Adult Member\",\n    { Age: >= 18 }                        => \"Adult\",\n    { Age: < 13 }                         => \"Child\",\n    _                                     => \"Teen\"\n};\n\`\`\`\n\n使用的模式：\n1. **属性模式**：\`{ Age: >= 65 }\` 匹配 user 的 Age 属性\n2. **关系模式**：\`>= 65\`、\`>= 18\`、\`< 13\` 比较大小\n3. **组合属性模式**：\`{ Age: >= 18, IsMember: true }\` 同时匹配多个属性\n4. **弃元模式**：\`_\` 匹配剩余所有情况\n\n优势：声明式、返回值、穷尽性检查、可嵌套在表达式中。`,
    tags: ["switch表达式", "属性模式", "关系模式", "重写"],
  },
  {
    id: "cfp-pattern-matching-fp-3",
    chapter: "cfp-pattern-matching-fp",
    level: 3,
    question: `请定义一个 \`Shape\` 层次结构（Circle、Rectangle、Triangle），用 switch 表达式实现面积计算函数，要求穷尽所有形状。`,
    answer:
      `\`\`\`csharp\n// 不可变 record 定义形状\npublic abstract record Shape;\npublic record Circle(double Radius) : Shape;\npublic record Rectangle(double Width, double Height) : Shape;\npublic record Triangle(double Base, double Height) : Shape;\n\n// 面积计算：switch 表达式穷尽匹配\npublic static double Area(Shape shape) => shape switch\n{\n    Circle c             => Math.PI * c.Radius * c.Radius,\n    Rectangle r          => r.Width * r.Height,\n    Triangle t           => 0.5 * t.Base * t.Height,\n    // 不需要 _ 弃元——编译器知道所有子类型已覆盖\n    // 但如果将来新增 Shape 子类，编译器会警告（非穷尽）\n};\n\n// 使用\nShape s = new Circle(5);\nConsole.WriteLine(Area(s));  // 78.54...\n\`\`\`\n\n关键点：\n1. 用 \`record\` 定义不可变形状——值相等、with 表达式\n2. \`abstract record Shape\` 作为基类，子类 record 继承\n3. switch 表达式用**类型模式**匹配：\`Circle c =>\` 匹配类型并提取变量 \`c\`\n4. 穷尽性：如果未来新增 \`Square : Shape\` 但忘记在 Area 中处理，编译器会警告（C# 不强制报错，但会有提示）\n5. 这是函数式的「数据 + 函数」分离模式——数据用 record 定义，行为用模式匹配函数实现，而非 OOP 的虚方法`,
    tags: ["record", "类型模式", "穷尽性", "面积计算", "数据函数分离"],
  },
  {
    id: "cfp-pattern-matching-fp-4",
    chapter: "cfp-pattern-matching-fp",
    level: 4,
    question: `函数式模式匹配用「数据 + 函数」分离替代了 OOP 的「数据 + 行为」封装。请对比这两种设计方式，分析各自的优劣，以及什么场景应该选择哪种。`,
    answer:
      `OOP 方式（数据 + 行为封装）：\n\`\`\`csharp\nabstract class Shape {\n    public abstract double Area();\n}\nclass Circle : Shape {\n    public double Radius { get; }\n    public override double Area() => Math.PI * Radius * Radius;\n}\n\`\`\`\n\n函数式方式（数据 + 函数分离）：\n\`\`\`csharp\nabstract record Shape;\nrecord Circle(double Radius) : Shape;\n\nstatic double Area(Shape shape) => shape switch {\n    Circle c => Math.PI * c.Radius * c.Radius,\n    ...\n};\n\`\`\`\n\n对比分析：\n\n| 维度 | OOP（虚方法） | 函数式（模式匹配） |\n|---|---|---|\n| 新增数据类型 | 需要新类 + 重写方法 | 只需新增 record，但所有 match 函数要更新 |\n| 新增行为 | 需要在每个类加方法 | 只需新增一个 match 函数 |\n| 数据不可变 | 需要手动设计 | record 默认不可变 |\n| 穷尽性检查 | 无（虚方法不检查） | 有（编译器检查所有分支） |\n| 行为分散度 | 分散在各子类中 | 集中在一个函数中 |\n\n选择建议：\n\n**选 OOP（虚方法）当**：\n1. 行为与数据强绑定——每个子类的 Area 实现逻辑差异大，且只有该子类关心\n2. 频繁新增数据类型，行为稳定——新形状很少，但现有形状的 Area 不会变\n3. 需要多态分发——运行时根据实际类型调用，不需要穷尽列举\n4. 状态封装——对象有可变状态，行为依赖内部状态\n\n**选函数式（模式匹配）当**：\n1. 频繁新增行为，数据类型稳定——形状固定（Circle/Rect/Triangle），但经常新增操作（Area、Perimeter、Contains、Draw...）\n2. 需要穷尽性保证——编译器检查所有分支，新增子类型时编译器提示遗漏\n3. 数据不可变——record 天然不可变，适合值语义场景\n4. 行为集中可读——所有逻辑在一个函数中，一目了然，而非分散在各子类\n5. 跨类型操作——如 \`Intersect(Circle, Rectangle)\` 需要同时处理两种类型，OOP 的虚方法难以表达，模式匹配可以直接 \`switch (a, b)\`\n\nC# 的定位：C# 同时支持两种方式。\`record\` + 模式匹配适合数据建模（DTO、值对象、领域事件），\`class\` + 虚方法适合行为建模（服务、策略模式、状态机）。多范式的力量在于按场景选择。`,
    tags: ["OOP", "函数式", "数据行为分离", "虚方法", "穷尽性", "场景选择"],
  },
];
