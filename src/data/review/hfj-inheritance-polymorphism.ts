import type { ReviewQuestion } from "./types";

export const hfjInheritancePolymorphismQuestions: ReviewQuestion[] = [
  {
    id: "hfj-ip-1",
    chapter: "hfj-inheritance-polymorphism",
    level: 2,
    question: `继承的 IS-A 测试是什么？Dog extends Animal 意味着什么？`,
    answer:
      `IS-A 测试是判断继承关系是否合理的方法：如果「B IS-A A」（B是一个A）这句话在现实语义中成立，则 B extends A 是合理的。Dog extends Animal 意味着 Dog IS-A Animal——狗是一个动物。继承后 Dog 自动获得 Animal 的所有非 private 成员（实例变量和方法），可以添加自己的新成员，也可以重写父类方法。IS-A 是单向的：Dog IS-A Animal 成立，但 Animal IS-A Dog 不成立。IS-A 测试的价值：避免不合理的继承——比如「椅子有腿」不应该用继承（Chair extends Leg 是错的，椅子 IS-A 腚不成立），而应该用组合（Chair has-a Leg）。`,
    tags: ["继承", "IS-A", "extends"],
  },
  {
    id: "hfj-ip-2",
    chapter: "hfj-inheritance-polymorphism",
    level: 3,
    question: `多态的「编译时类型」和「运行时类型」是什么？\`Animal a = new Dog();\` 中 a 的方法调用如何确定？`,
    answer:
      `编译时类型（声明类型）：变量声明时的类型，编译器用于检查方法是否存在和类型安全。\`Animal a = new Dog();\` 中 a 的编译时类型是 Animal，编译器只允许 a 调用 Animal 中声明的方法（如果调 Dog 独有的方法编译报错）。\n运行时类型（实际类型）：对象创建时的实际类型，JVM 运行时用于决定调用哪个方法实现。\`new Dog()\` 创建的实际对象是 Dog。\n方法调用确定过程：①编译时，编译器检查 a 的编译时类型 Animal 是否有该方法，有则通过编译；②运行时，JVM 查看 a 指向的实际对象是 Dog，调用 Dog 中重写后的方法实现（如果 Dog 重写了该方法）或继承自 Animal 的方法（如果 Dog 没有重写）。这就是动态绑定/虚方法调用——多态的核心机制。`,
    tags: ["多态", "动态绑定", "编译时类型"],
  },
  {
    id: "hfj-ip-3",
    chapter: "hfj-inheritance-polymorphism",
    level: 3,
    question: `方法重写（override）和方法重载（overload）有什么区别？`,
    answer:
      `方法重写（override）：①发生在父子类之间；②方法签名必须完全相同——方法名、参数列表、返回类型（或子类型）一致；③访问权限不能缩小（父类 public 子类不能变 protected）；④运行时根据对象实际类型决定调用哪个实现（动态绑定）；⑤用 @Override 注解标记（编译器检查是否正确重写）；⑥是多态的基础。\n方法重载（overload）：①发生在同一个类内（或父子类间）；②方法名相同但参数列表不同（参数个数/类型/顺序不同）；③返回类型可以不同但不能仅靠返回类型区分；④编译时根据参数类型决定调用哪个方法（静态绑定）；⑤不是多态，只是方法名复用。\n口诀：重写改实现，重载改参数。`,
    tags: ["重写", "重载", "override", "overload"],
  },
  {
    id: "hfj-ip-4",
    chapter: "hfj-inheritance-polymorphism",
    level: 4,
    question: `接口（interface）和抽象类（abstract class）有什么区别？什么时候用接口，什么时候用抽象类？`,
    answer:
      `区别：①继承限制——一个类只能 extends 一个抽象类，但可以 implements 多个接口；②成员变量——抽象类可有实例变量（有状态），接口只能有常量（public static final）；③方法实现——抽象类可有具体方法实现，Java 8 前接口所有方法都是抽象的（Java 8+ 有 default/static 方法，Java 9+ 有 private 方法）；④构造器——抽象类有构造器（供子类 super 调用），接口没有构造器；⑤访问修饰符——抽象类成员可用各种修饰符，接口成员默认 public。\n何时用接口：定义行为契约/能力（如 Comparable、Runnable），不关心实现者是谁，需要多继承。何时用抽象类：在继承体系中间提供共性代码和模板方法，子类共享状态和部分实现。原则：优先用接口，需要共享代码时才引入抽象类。`,
    tags: ["接口", "抽象类", "interface", "abstract"],
  },
];
