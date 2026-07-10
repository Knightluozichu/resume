import type { ReviewQuestion } from "./types";

export const jctOopDesignQuestions: ReviewQuestion[] = [
  {
    id: "jct-oop-1",
    chapter: "jct-oop-design",
    level: 2,
    question: `封装、继承、多态分别解决什么问题？Java 如何实现它们？`,
    answer:
      `封装解决「数据保护」问题——隐藏内部实现细节，暴露公共接口。Java 用 private/protected/public 访问修饰符实现，字段设为 private，通过 getter/setter 控制访问。继承解决「代码复用」问题——子类复用父类的字段和方法。Java 用 extends 关键字实现单继承，子类用 super 调用父类构造器和方法。多态解决「扩展性」问题——同一接口不同实现，新增类型不改旧代码。Java 通过动态绑定实现：父类引用指向子类对象（Employee e = new Manager()），调用重写方法时运行时绑定到子类版本。三者关系：封装是基础（先有类才能继承），继承是桥梁（先有继承才能多态），多态是目标（开闭原则——对扩展开放，对修改关闭）。`,
    tags: ["封装", "继承", "多态"],
  },
  {
    id: "jct-oop-2",
    chapter: "jct-oop-design",
    level: 2,
    question: `方法重载（overload）和方法重写（override）有什么区别？`,
    answer:
      `重载（overload）：同一个类中，方法名相同但参数列表不同（参数个数、类型、顺序不同），与返回值无关。编译期决定调用哪个方法（静态分派）。例如 \`println(int)\`、\`println(String)\`、\`println(double)\` 是重载。重写（override）：子类中定义与父类完全相同的方法（方法名、参数列表相同），返回值可以是父类返回值的子类型（协变返回）。运行时根据实际对象类型决定调用哪个方法（动态分派）。重写规则：①访问修饰符不能更严格（父 public 子不能 protected）；②不能抛出更宽的 checked 异常；③不能用 static 重写非 static；④@Override 注解帮助编译器检查是否正确重写。重载是「同名不同参」，重写是「子类覆盖父类」。`,
    tags: ["重载", "重写", "多态"],
  },
  {
    id: "jct-oop-3",
    chapter: "jct-oop-design",
    level: 3,
    question: `Java 的 \`final\` 关键字有哪些用法？分别意味着什么？`,
    answer:
      `final 三种用法：①final 变量——值只能赋值一次，赋值后不可修改。基本类型 final 变量值不可变，引用类型 final 变量引用不可变（但对象内部状态可变）。必须在使用前赋值（声明时、构造器中、实例初始化块中）。②final 方法——不能被子类重写，但可以重载。用于防止子类修改核心逻辑，或为了性能（编译器可内联）。③final 类——不能被继承（如 String、Integer）。用于防止子类破坏不变性约定或安全约束。局部变量 final：匿名内部类引用的外部局部变量必须 effectively final（Java 8+）。参数 final：方法参数可声明 final，防止方法内被修改，但实践中较少使用。final 引用 vs final 值：\`final List<String> list = new ArrayList<>()\`，list 不能指向新对象，但 \`list.add(\"a\")\` 合法——引用锁定，对象内部可变。`,
    tags: ["final", "不可变"],
  },
  {
    id: "jct-oop-4",
    chapter: "jct-oop-design",
    level: 4,
    question: `对象构造的完整过程是什么？当 new Manager() 时发生了什么？`,
    answer:
      `对象构造完整过程（new Manager()）：①类加载——如果 Manager 类未加载，先加载 Manager 及其父类 Employee，执行静态初始化块和静态字段赋值（从 Object→Employee→Manager 顺序）；②分配内存——在堆上为 Manager 对象分配内存，所有字段清零（int→0, 引用→null）；③调用构造器——Manager 构造器第一行隐式或显式调用 super(...)，执行 Employee 构造器；④Employee 构造器也先调 super()，最终到 Object 构造器；⑤从 Object 往下执行实例初始化块和字段赋值（Employee 的初始化块→Manager 的初始化块）；⑥执行构造器体——Employee 构造器体→Manager 构造器体；⑦返回对象引用。关键：构造器调用顺序是「父类先」，但初始化块和字段赋值也是「父类先」。如果构造器中调用了可重写方法（动态绑定），子类方法可能在子类字段未初始化时被调用——这是构造器调用虚方法的陷阱。`,
    tags: ["对象构造", "初始化顺序", "super"],
  },
];
