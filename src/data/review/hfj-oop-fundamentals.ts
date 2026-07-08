import type { ReviewQuestion } from "./types";

export const hfjOopFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "hfj-oop-1",
    chapter: "hfj-oop-fundamentals",
    level: 2,
    question: "类和对象的关系是什么？用书中的比喻解释。",
    answer:
      "类是蓝图（设计图纸），对象是根据蓝图建造的实际实例。一个类可以创建无数个对象，每个对象有相同的结构（相同的实例变量和方法）但各有自己的状态（实例变量的值不同）。例如 class Dog 是蓝图，定义了 size、breed、name 等属性和 bark()、eat() 等方法。new Dog() 创建一个具体对象，size=70, name=\"旺财\"；再 new Dog() 创建另一个对象，size=20, name=\"小花\"。它们共用同一套方法代码，但各自独立存储属性值。类定义在堆上不存在，对象通过 new 在堆上分配内存。",
    tags: ["类", "对象", "实例化"],
  },
  {
    id: "hfj-oop-2",
    chapter: "hfj-oop-fundamentals",
    level: 2,
    question: "封装是什么？为什么要用 private 隐藏实例变量？",
    answer:
      "封装是面向对象的核心原则之一：将数据（实例变量）隐藏在类内部，外部只能通过公开的方法（getter/setter）来访问和修改。用 private 隐藏实例变量的原因：①保护不变量——可以在 setter 中添加校验逻辑，如 setSize(int s) 中检查 s > 0 才赋值，防止 size 被设为负数；②控制访问——可以只提供 getter 不提供 setter，实现只读属性；③灵活修改——内部实现可变（如把 int size 改成存储单位换算），只要公开方法签名不变，外部代码不受影响；④降低耦合——外部不依赖内部数据结构，只依赖公开接口。不封装的代码 dog.size = -999 合法但荒谬，封装后 dog.setSize(-999) 被拒绝。",
    tags: ["封装", "private", "getter/setter"],
  },
  {
    id: "hfj-oop-3",
    chapter: "hfj-oop-fundamentals",
    level: 3,
    question: "实例变量和局部变量有什么区别？它们分别存储在哪里？",
    answer:
      "实例变量（成员变量）：①声明在类中方法外，属于对象；②在堆上随对象一起分配；③有默认值（int=0, boolean=false, 引用=null）；④生命周期与对象相同，对象被 GC 回收时消失；⑤可被访问修饰符控制（public/private/protected）。\n局部变量：①声明在方法内部；②在栈上随方法栈帧分配；③没有默认值，必须初始化后才能使用，否则编译报错；④生命周期与方法调用相同，方法返回时栈帧弹出，变量消失；⑤只能在方法内访问，不能用访问修饰符。\n关键区别：实例变量属于对象状态，多个方法共享；局部变量属于方法临时数据，方法间不共享。",
    tags: ["实例变量", "局部变量", "栈与堆"],
  },
  {
    id: "hfj-oop-4",
    chapter: "hfj-oop-fundamentals",
    level: 3,
    question: "构造器（constructor）和普通方法有什么区别？如果类没有写构造器会怎样？",
    answer:
      "区别：①名称——构造器名必须与类名完全相同，普通方法可任意命名；②返回类型——构造器没有返回类型（连 void 都没有），普通方法必须有返回类型或 void；③调用时机——构造器在 new 创建对象时自动调用且只调用一次，普通方法通过对象.方法名() 显式调用可多次；④作用——构造器用于初始化对象状态（给实例变量赋初值），普通方法执行业务逻辑。\n如果类没有写构造器，编译器会自动生成一个无参的默认构造器（public ClassName() {}），实例变量赋默认值。但如果手动写了任何构造器，编译器就不再生成默认无参构造器。此时如果还需要无参构造，必须显式写出。",
    tags: ["构造器", "初始化", "默认构造器"],
  },
];
