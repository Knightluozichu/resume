import type { ReviewQuestion } from "./types";

export const kiaClassesInterfacesQuestions: ReviewQuestion[] = [
  {
    id: "kia-ci-1",
    chapter: "kia-classes-interfaces",
    level: 1,
    question: "Kotlin的data class解决了什么问题？它自动生成了哪些方法？",
    answer:
      "Kotlin的data class解决Java数据类样板代码问题。语法：`data class User(val name: String, val age: Int)`。自动生成的方法：①equals()——基于主构造函数属性比较两个对象是否相等。②hashCode()——基于属性计算哈希值，与equals一致。③toString()——返回「User(name=Kotlin, age=10)」格式，便于调试。④copy()——创建副本并可选修改部分属性，如`user.copy(age = 11)`。⑤componentN()——解构声明支持，`val (name, age) = user`按声明顺序提取属性。与Java对比：Java需手写或用Lombok/IDE生成这些方法，修改属性时容易忘记更新equals/hashCode。Kotlin的data class保证这些方法始终与属性一致。约束：①主构造函数至少一个参数。②参数必须用val或var声明。③不能是abstract/open/sealed/inner。最佳实践：数据建模优先data class，配合sealed class表达状态，使模式匹配更安全。",
    tags: ["data class", "equals", "hashCode", "copy", "解构声明"],
  },
  {
    id: "kia-ci-2",
    chapter: "kia-classes-interfaces",
    level: 2,
    question: "Kotlin的类默认final设计有什么好处？open关键字的含义是什么？",
    answer:
      "Kotlin类默认final（不可继承）的好处：①防止意外继承——Java类默认可继承，开发者可能不当重写方法导致bug。Kotlin默认不可继承，只有明确用open标记的类才能被继承，减少「脆弱基类」问题。②设计意图明确——open关键字表明「这个类/方法是为继承设计的」，调用者看到非open类就知道不应该继承它，API设计者明确控制可扩展点。③安全性——final类的方法调用可被编译器/JVM内联优化，因为不存在多态覆盖。④Effective Java建议——Joshua Bloch在《Effective Java》中建议「要么为继承而设计并文档化，要么禁止继承」，Kotlin的默认final正是贯彻这一理念。open关键字的含义：①open class——允许被继承。②open fun——允许被子类override。③override的成员默认是open的（与Java不同），如想禁止再继承需加final。如`open class Animal { open fun sound() }`，`class Dog : Animal() { final override fun sound() }`。",
    tags: ["final", "open", "继承", "脆弱基类", "Effective Java"],
  },
  {
    id: "kia-ci-3",
    chapter: "kia-classes-interfaces",
    level: 3,
    question: "Kotlin的object、companion object、sealed class分别解决什么问题？",
    answer:
      "三个特殊类解决不同问题：①object——单例声明，替代Java的双重检查锁单例。`object Database { fun connect() { ... } }`编译为饿汉单例，线程安全，首次访问时初始化。也可用作匿名对象`val listener = object : ClickListener { ... }`替代Java匿名内部类。②companion object——伴生对象，替代Java的static成员。在类内部用`companion object { const val MAX = 100; fun create() = MyClass() }`，通过类名访问MyClass.MAX/MyClass.create()。伴生对象是一个真正的对象（有类型、可实现接口），比Java static更灵活。加@JvmStatic让Java侧以真正的静态方法访问。工厂方法模式的首选。③sealed class——密封类，限制继承层级在同一文件/模块内。`sealed class Result` + `class Success : Result()` / `class Error : Result()`。配合when表达式实现编译期穷尽检查——新增子类时编译器强制处理新分支，避免遗漏。用于状态建模（Loading/Success/Error）、表达式AST、有限状态机。三者互补：object管单例、companion管静态、sealed管有限继承。",
    tags: ["object", "companion object", "sealed class", "单例", "静态", "穷尽检查"],
  },
  {
    id: "kia-ci-4",
    chapter: "kia-classes-interfaces",
    level: 2,
    question: "Kotlin接口与Java接口有什么区别？接口默认实现如何工作？",
    answer:
      "Kotlin接口与Java接口的区别：①默认实现——Kotlin接口方法可以有默认实现（与Java 8+类似），`interface Clickable { fun click() = println(\"clicked\") }`，实现类可不重写直接用默认实现。②无状态——接口不能有构造函数和实例字段，但可以有val属性（子类必须实现）。③多继承——一个类可实现多个接口（解决多继承问题），但只能继承一个类。接口方法冲突时需显式用super<接口名>.方法()指定。④open by default——接口中的方法默认是open的，实现类override后默认也是open的（与类不同）。⑤不能有状态——接口不能有backing field，不能有init块，不能有构造函数。但可有val属性声明（abstract的，子类需实现）。Kotlin用接口定义行为契约（能做什么），用abstract class定义部分实现（怎么做），用类做具体实现。委托模式`class Derived(b: Base) : Base by b`可复用接口实现而不需写转发代码。",
    tags: ["接口", "默认实现", "多继承", "委托", "by"],
  },
];
