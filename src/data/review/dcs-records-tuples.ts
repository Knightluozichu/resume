import type { ReviewQuestion } from "./types";

/** 深入理解 C# · Record 与元组复习题 */
export const dcsRecordsTuplesQuestions: ReviewQuestion[] = [
  {
    id: "dcs-records-tuples-1",
    chapter: "dcs-records-tuples",
    level: 1,
    question: "C# 9.0 的 `record` 和普通 `class` 有什么区别？record 自动生成了哪些成员？",
    answer:
      "record 与 class 的核心区别：record 是「基于值的相等性」的引用类型（也可声明为 record struct），class 是「基于引用的相等性」。\n\n```csharp\n// record\nrecord Point(int X, int Y);\n\n// 等价的 class（需要手写大量代码）\nclass PointClass {\n    public int X { get; }\n    public int Y { get; }\n    public PointClass(int x, int y) { X = x; Y = y; }\n    // 还需手写：Equals, GetHashCode, ToString, ==, !=, Deconstruct\n}\n```\n\nrecord 自动生成的成员：\n1. 构造函数：`Point(int X, int Y)` —— 主构造函数参数成为 init-only 属性。\n2. 基于值的 Equals：两个 record 实例所有属性相等则 Equals 返回 true（class 默认比较引用）。\n3. GetHashCode：基于所有属性值计算哈希，值相等的 record 哈希相同。\n4. ToString：自动生成可读格式 `Point { X = 1, Y = 2 }`。\n5. == 和 != 运算符：重载为值相等比较。\n6. Deconstruct：`var (x, y) = point` 解构出属性值。\n7. with 表达式支持：`var p2 = p1 with { X = 10 }` 创建副本并修改部分属性。\n8. Copy constructor：编译器生成受保护的拷贝构造函数，供 with 表达式使用。\n\n值相等性示例：\n```csharp\nvar p1 = new Point(1, 2);\nvar p2 = new Point(1, 2);\nConsole.WriteLine(p1.Equals(p2));  // True（record 比值）\nConsole.WriteLine(p1 == p2);       // True\n// 如果是 class：Equals 返回 False（比较引用），== 也返回 False\n```\n\nrecord 适合不可变的数据载体（DTO、值对象、领域事件），class 适合有可变状态和行为的对象。",
    tags: ["record", "class", "值相等性", "自动生成", "C# 9.0"],
  },
  {
    id: "dcs-records-tuples-2",
    chapter: "dcs-records-tuples",
    level: 2,
    question: "`with` 表达式如何工作？它对 record 的不可变性有什么意义？为什么 class 不能用 with 表达式？",
    answer:
      "with 表达式的工作原理：\n\n```csharp\nrecord Point(int X, int Y);\n\nvar p1 = new Point(1, 2);\nvar p2 = p1 with { X = 10 };  // p2 = Point(10, 2)\n// p1 不变：Point(1, 2)\n// p2 是 p1 的副本，仅 X 被修改\n```\n\n编译后的等价代码：\n```csharp\n// with { X = 10 } 编译为：\nvar copy = new Point(p1);  // 调用编译器生成的拷贝构造函数\ncopy.X = 10;               // 修改指定属性（init accessor）\nvar p2 = copy;\n```\n\nwith 表达式做了三件事：\n1. 调用 record 的受保护拷贝构造函数，创建完整副本。\n2. 对副本应用指定的属性修改（通过 init-only setter）。\n3. 返回修改后的副本。\n\n对不可变性的意义：\nrecord 的属性是 init-only（只能在构造或初始化器中赋值），对象创建后不可变。with 表达式是「修改不可变对象」的方式——不修改原对象，而是创建一个修改了部分属性的副本。这使得不可变对象的「更新」操作简洁高效，不需要手写 `new Point(10, p1.Y)`。\n\n为什么 class 不能用 with：\n1. 没有拷贝构造函数：class 默认没有拷贝构造函数（C# 不像 C++ 那样自动生成）。with 需要拷贝构造函数创建副本。\n2. 没有自动的 init-only 属性：class 的属性可能是 set（可变），with 表达式修改副本属性需要 init accessor。\n3. 没有编译器生成的 with 支持：with 表达式是编译器为 record 专门生成的语法糖，class 没有对应的编译器转换。\n4. 语义不同：class 的相等性基于引用，复制引用没有意义（两个引用指向同一对象）。record 的相等性基于值，复制值再修改才有语义意义。\n\n如果需要 class 支持 with 类似操作，可以手动实现拷贝构造 + init 属性，但语法不如 with 简洁。C# 10.0 的 record struct 也可用 with。",
    tags: ["with表达式", "不可变性", "拷贝构造", "record"],
  },
  {
    id: "dcs-records-tuples-3",
    chapter: "dcs-records-tuples",
    level: 3,
    question: "C# 的元组（Tuple）和 record 有什么区别？什么时候用元组，什么时候用 record？元组的 `Item1/Item2` 和命名元组有什么区别？",
    answer:
      "元组与 record 的区别：\n\n| 特性 | 元组 `(int, string)` | record `record Point(int X, int Y)` |\n|---|---|---|\n| 类型身份 | 结构体，无独立类型名 | 有类型名 |\n| 值相等 | 是 | 是 |\n| 不可变 | 是 | 是 |\n| 成员命名 | 编译期别名，运行时仍 Item1/Item2 | 真实属性名 |\n| with 表达式 | 支持 | 支持 |\n| Deconstruct | 自带 | 自动生成 |\n| 可继承 | 不可以 | 可以（record 可继承 record） |\n| 模式匹配 | 元组模式 | 位置/属性模式 |\n\n元组命名：\n```csharp\n// 匿名元组\nvar t1 = (1, \"hello\");\nConsole.WriteLine(t1.Item1);  // 1\nConsole.WriteLine(t1.Item2);  // hello\n\n// 命名元组\nvar t2 = (Id: 1, Name: \"hello\");\nConsole.WriteLine(t2.Id);     // 1\nConsole.WriteLine(t2.Name);   // hello\nConsole.WriteLine(t2.Item1);  // 1（仍可用 Item1）\n\n// 命名元组的本质：编译器用 TupleElementNamesAttribute 标注成员名\n// 运行时反射看到的仍然是 Item1/Item2\n```\n\n什么时候用元组：\n1. 临时组合多个值：方法返回多个值 `return (success, message)` ——不需要定义类型。\n2. 内部实现细节：私有方法的参数/返回值，不需要暴露类型名。\n3. 短生命周期：用完即弃，不会存储在字段中。\n4. 简单的键值对：字典的 ValueTuple 键。\n\n什么时候用 record：\n1. 公共 API：公开方法的参数/返回值，有明确类型名更清晰。\n2. 领域模型：DTO、值对象、领域事件——需要类型名表达业务语义。\n3. 长生命周期：存储在字段、集合中，需要类型名。\n4. 需要继承：record 可继承，元组不行。\n5. 需要自定义行为：record 可以添加方法、实现接口。\n\n规则：元组用于「实现内部临时组合」，record 用于「领域模型的值对象」。如果一个组合值需要类型名来表达业务含义，用 record；如果只是临时打包传一下，用元组。",
    tags: ["元组", "record", "命名元组", "ValueTuple", "设计决策"],
  },
  {
    id: "dcs-records-tuples-4",
    chapter: "dcs-records-tuples",
    level: 4,
    question: "record 的继承体系如何工作？基类 record 和子类 record 的值相等性如何处理？`with` 表达式在继承场景下有什么陷阱？",
    answer:
      "record 继承体系：\n\n```csharp\nrecord Shape(string Color);\nrecord Circle(string Color, double Radius) : Shape(Color);\nrecord Rectangle(string Color, double W, double H) : Shape(Color);\n\nvar c = new Circle(\"red\", 5);\nvar r = new Rectangle(\"red\", 3, 4);\nConsole.WriteLine(c.Equals(r));  // False（运行时类型不同）\n```\n\nrecord 继承的关键机制：\n\n1. 虚拟 Equals：\n   record 的 Equals 是 virtual（密封但可重写），编译器生成 `EqualityContract` 属性记录实际类型。比较时不仅比较属性值，还比较 `EqualityContract`——运行时类型必须相同才相等。\n   ```csharp\n   // 编译器生成的 Equals\n   protected virtual bool Equals(Circle other) {\n       return EqualityContract == other.EqualityContract  // 类型检查\n           && base.Equals(other)                          // 基类属性\n           && Radius == other.Radius;                     // 自身属性\n   }\n   ```\n   所以 Circle(\"red\", 5) 和 Rectangle(\"red\", 3, 4) 即使 Color 相同也不相等——EqualityContract 不同。\n\n2. 基类引用的相等性：\n   ```csharp\n   Shape s1 = new Circle(\"red\", 5);\n   Shape s2 = new Circle(\"red\", 5);\n   Console.WriteLine(s1.Equals(s2));  // True（运行时类型相同，值相同）\n   ```\n   record 的 Equals 被重写为调用运行时类型的 Equals（通过 EqualityContract 分发），所以基类引用也能正确比较值。\n\nwith 表达式在继承场景下的陷阱：\n\n```csharp\nShape s = new Circle(\"red\", 5);\nvar s2 = s with { Color = \"blue\" };\n// s2 的类型是什么？\n```\n\nwith 表达式生成拷贝构造函数调用，拷贝构造函数是 virtual 的。编译器为 record 生成一个 `protected` 拷贝构造函数，并在继承链中正确传递。\n\n陷阱1：with 表达式不能修改子类特有属性\n```csharp\nShape s = new Circle(\"red\", 5);\nvar s2 = s with { Radius = 10 };  // 编译错误！\n// s 的编译时类型是 Shape，Shape 没有 Radius 属性\n// with 表达式只能修改编译时类型的属性\n```\n\n陷阱2：with 表达式保留运行时类型\n```csharp\nShape s = new Circle(\"red\", 5);\nvar s2 = s with { Color = \"blue\" };\n// s2 是 Circle(\"blue\", 5)，不是 Shape(\"blue\")\n// with 通过虚拟拷贝构造保留了运行时类型 Circle\n```\n\n陷阱3：不能跨类型 with\n```csharp\nCircle c = new Circle(\"red\", 5);\nvar r = c with { } as Rectangle;  // r 是 null\n// with 创建的是同类型副本，不能变成其他子类\n```\n\n核心要点：record 继承体系通过 EqualityContract 保证类型安全的值相等性。with 表达式通过虚拟拷贝构造保留运行时类型，但只能修改编译时类型的属性。这意味着基类引用上用 with 表达式受限——需要先 cast 或用模式匹配获取具体类型。",
    tags: ["record继承", "值相等性", "EqualityContract", "with陷阱", "多态"],
  },
];
