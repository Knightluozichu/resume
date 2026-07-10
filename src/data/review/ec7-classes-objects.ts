import type { ReviewQuestion } from "./types";

export const ec7ClassesObjectsQuestions: ReviewQuestion[] = [
  {
    id: "ec7-classes-objects-1",
    chapter: "ec7-classes-objects",
    level: 1,
    question: `C# 类的访问修饰符 public、private、protected 各自的可见范围是什么？`,
    answer:
      `public：任何代码都可访问（外部、子类、同程序集）。\nprivate：只有声明类内部可访问（默认修饰符）。\nprotected：声明类内部和派生类可访问。\n还有 internal（同程序集可访问）和 protected internal（同程序集或派生类可访问）。\n封装原则：字段一律 private，通过 public 属性暴露受控访问。`,
    tags: ["访问修饰符", "封装"],
  },
  {
    id: "ec7-classes-objects-2",
    chapter: "ec7-classes-objects",
    level: 2,
    question: `C# 7.0 的 init 访问器与 set 有什么区别？与只读属性 \`{ get; }\` 有什么区别？写出代码示例。`,
    answer:
      `init：只能在对象构造阶段（构造函数或对象初始化器）赋值，之后只读。set：任何时候都可写。\`{ get; }\` 只读属性只能在构造函数中赋值，不能用对象初始化器赋值。\n\`\`\`csharp\npublic class Config\n{\n    // init：初始化器可赋值，之后只读\n    public string Name { get; init; }\n    // set：任何时候可写\n    public int Timeout { get; set; }\n    // get only：只能构造函数赋值\n    public int Id { get; }\n\n    public Config(int id) { Id = id; }\n}\n// init 允许：\nvar c = new Config(1) { Name = \"MyConfig\", Timeout = 30 };\n// c.Name = \"Other\";  // 编译错误：init 后只读\n// c.Id = 2;           // 编译错误：get only\nc.Timeout = 60;  // 合法：set 可写\n\`\`\`\ninit 适合不可变但需初始化器灵活赋值的场景（如 DTO、配置对象）。`,
    tags: ["init", "属性", "不可变性"],
  },
  {
    id: "ec7-classes-objects-3",
    chapter: "ec7-classes-objects",
    level: 3,
    question: `静态成员和实例成员有什么区别？为什么静态方法不能访问实例成员？写一个使用静态计数器的示例。`,
    answer:
      `静态成员属于类本身，所有实例共享，通过类名访问（如 Employee.TotalCount）。实例成员属于对象，每个对象独立一份，通过对象引用访问。\n静态方法不能访问实例成员的原因：静态方法不关联任何对象实例，没有 this 指针，无法确定要访问哪个对象的实例成员。实例方法可以访问静态成员（类级别的数据对所有实例可见）。\n\`\`\`csharp\npublic class Employee\n{\n    private static int _count = 0;  // 静态：所有实例共享\n    public int Id { get; }         // 实例：每个对象独立\n    public string Name { get; set; }\n\n    public Employee(string name)\n    {\n        Name = name;\n        Id = ++_count;  // 实例方法访问静态成员\n    }\n\n    public static int TotalCount => _count;  // 静态方法，无 this\n    // public static string GetName() => Name;  // 编译错误：静态方法不能访问实例成员\n}\nvar e1 = new Employee(\"Alice\");  // Id=1\nvar e2 = new Employee(\"Bob\");    // Id=2\nConsole.WriteLine(Employee.TotalCount);  // 2\n\`\`\``,
    tags: ["static", "实例成员", "this"],
  },
  {
    id: "ec7-classes-objects-4",
    chapter: "ec7-classes-objects",
    level: 4,
    question: `设计一个 BankAccount 类，要求：余额不能为负、存款和取款有验证逻辑、每笔交易有唯一递增 ID、支持构造函数链。写出完整代码。`,
    answer:
      `\`\`\`csharp\npublic class BankAccount\n{\n    private static int _nextId = 0;\n    private decimal _balance;\n\n    public int Id { get; }\n    public string Owner { get; init; }\n    public decimal Balance\n    {\n        get => _balance;\n        private set => _balance = value < 0 ? 0 : value;\n    }\n\n    // 主构造函数\n    public BankAccount(string owner, decimal initialDeposit)\n    {\n        Id = ++_nextId;\n        Owner = owner;\n        Balance = initialDeposit;\n    }\n    // 构造函数链\n    public BankAccount(string owner) : this(owner, 0) { }\n\n    public void Deposit(decimal amount)\n    {\n        if (amount <= 0)\n            throw new ArgumentException(\"存款必须为正\");\n        Balance += amount;\n    }\n\n    public bool Withdraw(decimal amount)\n    {\n        if (amount <= 0 || amount > Balance)\n            return false;\n        Balance -= amount;\n        return true;\n    }\n}\n\`\`\`\n设计要点：(1) _balance private + Balance 属性 private set 保证余额只能通过 Deposit/Withdraw 修改；(2) 属性 set 中 value < 0 ? 0 : value 防负数；(3) static _nextId 生成唯一递增 ID；(4) 构造函数链避免重复初始化逻辑；(5) init 允许初始化器设 Owner 但之后只读。`,
    tags: ["封装", "属性验证", "静态", "构造函数链", "设计"],
  },
];
