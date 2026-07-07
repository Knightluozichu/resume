import type { ReviewQuestion } from "./types";

/** CLR via C# · 接口设计复习题 */
export const cvcInterfacesDesignQuestions: ReviewQuestion[] = [
  {
    id: "cvc-interfaces-design-1",
    chapter: "cvc-interfaces-design",
    level: 1,
    question: "接口和抽象类的核心区别是什么？",
    answer:
      "核心区别：\n\n**接口（Interface）**：\n- 定义「能做什么」（has-a 能力）\n- 纯契约，不提供实例字段、构造函数（C# 8.0 前无默认实现）\n- 一个类可以实现多个接口（多实现）\n- 不能有访问修饰符（默认 public）\n\n**抽象类（Abstract Class）**：\n- 定义「是什么」（is-a 关系）\n- 可以提供字段、构造函数、默认实现、protected 成员\n- 一个类只能继承一个抽象类（单继承）\n- 可以有访问修饰符和虚方法链\n\n简记：接口是「合同」，谁都能签多份；抽象类是「血脉」，只能有一个父亲。\n\n选择原则：优先用接口定义能力契约，用抽象类提供默认实现和共享状态。两者可以结合——抽象类实现接口提供默认代码，子类继承抽象类。",
    tags: ["接口", "抽象类", "单继承", "多实现"],
  },
  {
    id: "cvc-interfaces-design-2",
    chapter: "cvc-interfaces-design",
    level: 2,
    question: "显式接口实现是什么？它与隐式实现有什么区别？给出一个使用场景。",
    answer:
      "显式接口实现以 `ReturnType InterfaceName.MethodName()` 形式实现接口方法。\n\n与隐式实现的区别：\n- **隐式** `public void Dispose()`：方法是类的公共成员，通过类引用 `obj.Dispose()` 直接调用，出现在 IntelliSense 中。\n- **显式** `void IDisposable.Dispose()`：方法不是类的公共成员，通过类引用 `obj.Dispose()` 编译报错，必须通过接口引用 `((IDisposable)obj).Dispose()` 调用，不出现在 IntelliSense 中。\n\n使用场景：\n1. **隐藏非公共 API**：`IDisposable.Dispose()` 不应被用户主动调用。显式实现后，用户必须先转型为 `IDisposable` 才能调用，减少了误用风险。\n2. **消歧**：两个接口有同名方法时，显式实现可以分别提供不同逻辑。例如同时实现 `IDrawable.Draw()` 和 `ICard.Draw()`，两个 Draw 语义完全不同。\n3. **API 清洁**：实现了很多接口的类，公共方法可能很臃肿。显式实现将不常用的接口方法隐藏，只暴露核心 API。\n\nCLR 实现：显式实现的方法在类型对象的方法表中有独立槽位，通过接口映射表访问，不在公共方法槽中。",
    tags: ["显式接口实现", "隐式实现", "IDisposable", "消歧"],
  },
  {
    id: "cvc-interfaces-design-3",
    chapter: "cvc-interfaces-design",
    level: 3,
    question: "C# 8.0 的默认接口方法（Default Interface Method）与抽象类的虚方法有什么区别？它解决了什么问题？",
    answer:
      "默认接口方法与抽象类虚方法的区别：\n\n1. **override 语义**：抽象类的虚方法可以被 `override` 覆盖，子类用 `base.Method()` 访问父类实现。默认接口方法不能被 `override`——实现类可以提供同名方法「遮蔽」它，但不能用 `base` 调用接口的默认实现。\n2. **调用方式**：抽象类方法通过类引用调用。默认接口方法只能通过接口引用调用，通过类引用调不到。\n3. **继承模型**：抽象类是单继承。接口是多实现——一个类可以实现多个带默认方法的接口。\n4. **字段**：抽象类可以有实例字段。接口不能有实例字段（默认方法只能用接口中定义的静态成员）。\n\n解决的问题：**向后兼容**。在 C# 8.0 之前，向已有接口添加新方法会破坏所有实现类——每个实现类都必须提供新方法的实现。有了默认接口方法，可以给接口加方法并提供默认实现，现有实现类无需修改。这是 Java default method 的对等特性。\n\n典型例子：`IEnumerable<T>` 接口在 C# 8.0 添加了 `GetEnumerator()` 的默认实现，所有已有的 `IEnumerable<T>` 实现类自动获得这个方法，无需修改代码。",
    tags: ["默认接口方法", "C# 8.0", "向后兼容", "虚方法"],
  },
  {
    id: "cvc-interfaces-design-4",
    chapter: "cvc-interfaces-design",
    level: 4,
    question: "设计一个日志系统：需要支持控制台日志、文件日志和数据库日志，且日志器需要可比较（按优先级排序）和可处置（释放资源）。请说明你会如何设计接口和抽象类，并解释理由。",
    answer:
      "设计方案：\n\n```csharp\n// 接口：定义能力\npublic interface IComparable<T>\n{\n    int CompareTo(T other);\n}\n\npublic interface IDisposable\n{\n    void Dispose();\n}\n\n// 抽象类：提供默认实现和共享状态\npublic abstract class Logger : IComparable<Logger>, IDisposable\n{\n    public int Priority { get; init; }\n    protected string Name { get; }\n\n    protected Logger(string name, int priority)\n    {\n        Name = name;\n        Priority = priority;\n    }\n\n    // 抽象方法：子类必须实现\n    public abstract void Log(string message);\n\n    // 具体方法：子类直接复用\n    public void LogError(string msg) => Log($\"[ERROR] {msg}\");\n\n    // 接口实现：所有子类共享比较逻辑\n    public int CompareTo(Logger other) => Priority.CompareTo(other.Priority);\n\n    // 显式接口实现：隐藏 Dispose\n    void IDisposable.Dispose() => Dispose(true);\n    protected virtual void Dispose(bool disposing) { }\n}\n\n// 具体实现\npublic class ConsoleLogger : Logger { ... }\npublic class FileLogger : Logger { ... }  // 需要释放文件句柄\npublic class DatabaseLogger : Logger { ... }  // 需要释放连接\n```\n\n设计理由：\n\n1. **用抽象类而非接口作为基类**：三种日志器共享大量代码（Priority、Name、LogError、CompareTo），抽象类可以提供这些默认实现。如果用接口，每个实现类都要重复写这些代码。\n\n2. **抽象类实现接口**：`Logger` 实现 `IComparable<Logger>` 和 `IDisposable`，所有子类自动获得这些能力。子类不需要重复声明接口实现。\n\n3. **显式实现 IDisposable**：`Dispose` 不应被用户直接调用（应在 `using` 块中由 CLR 调用）。显式实现隐藏了它。\n\n4. **抽象方法 Log**：每种日志器的输出方式不同，必须由子类实现。用 `abstract` 强制子类提供实现。\n\n5. **protected 成员**：`Name` 和 `Dispose(bool)` 是 `protected`——只有子类能访问，不暴露给外部。接口做不到这一点。\n\n总结：抽象类提供「是什么」（Logger 身份）+ 共享代码；接口提供「能做什么」（可比较、可处置）。两者结合是 C# 类型设计的最佳实践。",
    tags: ["接口设计", "抽象类", "IDisposable", "IComparable", "设计模式"],
  },
];
