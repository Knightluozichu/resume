import { ReviewQuestion } from "../types";

export const dbcTypeCheckingQuestions: ReviewQuestion[] = [
  {
    id: "dbc-type-checking-1",
    chapter: "dbc-type-checking",
    level: 1,
    question: "类型系统由哪三要素组成？什么是类型表达式？",
    answer:
      "类型系统三要素：①类型表达式——描述类型的结构化表示 ②类型规则——规定什么类型组合是合法的 ③类型等价——判断两个类型是否相同。类型表达式由基本类型和类型构造器组成：基本类型如 int、float、char、bool；类型构造器如 array(n, T)（数组）、pointer(T)（指针）、record(字段列表)（记录）、T1→T2（函数类型）。例如 `int[10]` 的类型表达式是 `array(10, int)`，`int*` 是 `pointer(int)`，函数 `int f(int)` 的类型是 `int→int`。",
    tags: ["类型系统", "类型表达式", "类型规则", "类型等价", "类型构造器"],
  },
  {
    id: "dbc-type-checking-2",
    chapter: "dbc-type-checking",
    level: 2,
    question: "结构等价和名字等价有什么区别？各适用于什么场景？",
    answer:
      "结构等价（Structural Equivalence）：递归比较类型的内部结构，两个类型结构相同即等价。如 `typedef int A; typedef int B;` 中 A 和 B 结构等价（底层都是 int）。适合 C 语言的 struct 比较、ML 的类型系统。名字等价（Name Equivalence）：类型名不同即不等价，即使底层结构相同。上述 A 和 B 名字不等价。适合 Pascal、Ada 等强类型语言。实际语言常混合使用：C 的 struct 用名字等价（不同 struct 名不等价），基本类型用结构等价。类型检查器需按语言规范选择正确的等价策略。",
    tags: ["结构等价", "名字等价", "typedef", "类型检查"],
  },
  {
    id: "dbc-type-checking-3",
    chapter: "dbc-type-checking",
    level: 3,
    question: "什么是隐式类型转换和显式类型转换？编译器如何处理混合类型表达式？",
    answer:
      "隐式转换（自动 widening）：编译器自动将窄类型提升为宽类型，如 int → float → double，不丢失精度。例如 `3 + 2.5` 中编译器自动插入 `(float)3 + 2.5`。显式转换（cast）：程序员用 `(int)3.14` 手动指定，可能丢失精度（narrowing），需类型检查器验证合法性。混合类型处理：编译器维护类型层级（如 int < float < double），遇到不同类型操作数时自动提升到更高层级。类型检查器为表达式分配类型时，递归检查子表达式类型，在需要处插入转换节点。无法自动转换的类型组合（如 int + struct）报类型错误。",
    tags: ["隐式转换", "显式转换", "类型提升", "widening", "narrowing", "cast"],
  },
  {
    id: "dbc-type-checking-4",
    chapter: "dbc-type-checking",
    level: 2,
    question: "参数多态、重载和子类型多态有什么区别？",
    answer:
      "参数多态（Parametric Polymorphism / 泛型）：同一函数适配任意类型，用类型变量 α 表示（全称量化）。如 ML 的 `fun id(x) = x` 对任意类型 α 都成立，类型为 `α → α`。重载（Overloading）：同名操作对不同类型有不同含义，由参数类型消歧。如 `+` 既可整数加也可浮点加，编译器根据参数类型选择对应实现。子类型多态（Subtype Polymorphism）：子类型可替换父类型使用，遵循 Liskov 替换原则。如 OOP 中 `Dog` 是 `Animal` 的子类型，`Animal a = new Dog()` 合法。参数多态是编译期统一处理，重载是编译期分派，子类型多态通常涉及运行时分派（虚函数表）。",
    tags: ["参数多态", "泛型", "重载", "子类型多态", "Liskov", "类型系统"],
  },
];
