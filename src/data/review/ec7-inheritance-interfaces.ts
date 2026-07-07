import type { ReviewQuestion } from "./types";

export const ec7InheritanceInterfacesQuestions: ReviewQuestion[] = [
  {
    id: "ec7-inheritance-interfaces-1",
    chapter: "ec7-inheritance-interfaces",
    level: 1,
    question: "virtual、abstract、override、new 四个关键字在继承中各自的作用是什么？",
    answer:
      "virtual：基类声明可覆写的方法，有默认实现，子类可选覆写。\nabstract：基类声明必须覆写的方法，无实现，类必须标记 abstract，不能实例化。\noverride：子类覆写 virtual/abstract 方法，参与运行时多态分派。\nnew：子类隐藏基类同名方法，不参与多态分派（`Animal a = new Dog(); a.Speak()` 调用 Animal 版本而非 Dog 版本）。\n推荐：用 virtual + override 实现多态；避免使用 new（破坏多态，容易出 bug）。",
    tags: ["virtual", "abstract", "override", "new", "多态"],
  },
  {
    id: "ec7-inheritance-interfaces-2",
    chapter: "ec7-inheritance-interfaces",
    level: 2,
    question: "`Animal a = new Dog(); a.Speak();` 为什么调用 Dog 的 Speak 而不是 Animal 的？如果 Dog 用 new 而非 override 会怎样？",
    answer:
      "运行时多态：CLR 根据对象的实际类型（Dog）而非声明类型（Animal）分派虚方法调用。Dog 用 override 覆写了 Speak，所以调用 Dog 版本。\n如果 Dog 用 new 而非 override：\n```csharp\npublic class Dog : Animal\n{\n    public new void Speak() => Console.WriteLine(\"Woof\");\n}\nAnimal a = new Dog();\na.Speak();  // 调用 Animal.Speak()，不是 Dog.Speak()！\n// 因为 new 是方法隐藏，不参与多态分派\n// 编译器看声明类型 Animal，Animal.Speak() 没被覆写\n((Dog)a).Speak();  // 这才调用 Dog.Speak()\n```\noverride 改变虚方法分派表，new 创建一个不相关的新方法（恰好同名）。多态场景必须用 virtual + override。",
    tags: ["运行时多态", "override", "new", "方法分派"],
  },
  {
    id: "ec7-inheritance-interfaces-3",
    chapter: "ec7-inheritance-interfaces",
    level: 3,
    question: "抽象类和接口有什么区别？设计一个 IMovable 接口和 Animal 抽象类，让 Dog 同时继承 Animal 和实现 IMovable。",
    answer:
      "区别：抽象类（单继承，可含字段/构造函数/具体实现，is-a 关系）；接口（多实现，只含方法/属性契约无字段，can-do 关系）。\n```csharp\n// 接口：can-do 能力\npublic interface IMovable\n{\n    void Move();\n    double Speed { get; }\n}\n\n// 抽象基类：is-a 关系 + 共享代码\npublic abstract class Animal\n{\n    public string Name { get; set; }\n    public abstract void Speak();  // 子类必须实现\n    public void Eat() => Console.WriteLine($\"{Name} is eating\");\n}\n\n// Dog：继承 Animal + 实现 IMovable\npublic class Dog : Animal, IMovable\n{\n    public override void Speak() => Console.WriteLine(\"Woof\");\n    public void Move() => Console.WriteLine($\"{Name} runs at {Speed}\");\n    public double Speed => 15.0;\n}\n\n// 多态使用\nvar zoo = new List<Animal> { new Dog { Name = \"Rex\" } };\nforeach (var a in zoo) a.Speak();  // Dog: Woof\n\nvar movers = new List<IMovable> { new Dog { Name = \"Buddy\" } };\nforeach (var m in movers) m.Move();  // Buddy runs at 15\n```",
    tags: ["抽象类", "接口", "is-a", "can-do", "多实现"],
  },
  {
    id: "ec7-inheritance-interfaces-4",
    chapter: "ec7-inheritance-interfaces",
    level: 4,
    question: "为什么说「组合优于继承」？给出一个继承导致问题的例子，以及用接口+组合重构的方案。",
    answer:
      "继承是最强的耦合（子类依赖基类实现细节），深层继承层次修改基类牵一发动全身。组合（has-a）通过持有接口引用实现复用，耦合度低，可运行时替换。\n问题例子：\n```csharp\n// 深层继承——强耦合\npublic class Bird { public virtual void Fly() { } }\npublic class Eagle : Bird { public override void Fly() { } }\npublic class Penguin : Bird { }  // 企鹅不会飞，但继承了 Fly()！\n// 如果 Bird 加 Swim()，Eagle 被迫实现一个不需要的方法\n```\n用接口+组合重构：\n```csharp\npublic interface IFlyable { void Fly(); }\npublic interface ISwimmable { void Swim(); }\n\npublic class Bird { public string Name { get; set; } }\n\npublic class Eagle : Bird, IFlyable\n{\n    public void Fly() => Console.WriteLine($\"{Name} soars\");\n}\npublic class Penguin : Bird, ISwimmable\n{\n    public void Swim() => Console.WriteLine($\"{Name} swims\");\n}\n// 每个类只实现自己需要的能力，不被迫继承不需要的方法\n// 组合：运行时可替换行为\npublic class Duck : Bird, IFlyable, ISwimmable\n{\n    private readonly IFlyable _flyBehavior = new DefaultFly();\n    public void Fly() => _flyBehavior.Fly();\n    public void Swim() => Console.WriteLine(\"duck paddling\");\n}\n```\n优势：接口定义能力（can-do），类按需实现；组合持有行为对象，可运行时替换（策略模式）；修改一个接口实现不影响其他能力。",
    tags: ["组合优于继承", "接口", "设计原则", "策略模式"],
  },
];
