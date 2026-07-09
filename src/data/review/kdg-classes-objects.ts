import type { ReviewQuestion } from "./types";

export const kdgClassesObjectsQuestions: ReviewQuestion[] = [
  {
    id: "kdg-co-1",
    chapter: "kdg-classes-objects",
    level: 1,
    question: "Kotlin的`data class`自动生成了哪些方法？与Java的POJO有什么区别？",
    answer:
      "`data class`自动生成：①equals()——基于主构造函数属性比较相等性。②hashCode()——基于主构造函数属性计算哈希。③toString()——格式为`ClassName(prop1=value1, prop2=value2)`。④copy()——创建副本，可修改部分属性：`u.copy(name=\"Bob\")`。⑤componentN()——解构声明支持：`val (name, id) = user`。与Java POJO的区别：①Java POJO需要手写或用Lombok生成这些方法，Kotlin一行`data class User(val name: String, val id: Int)`搞定。②data class的主构造函数必须至少有一个参数，且参数必须是val/var属性。③data class默认是final的（不可继承）。④data class的equals/hashCode只基于主构造函数属性。data class是Kotlin消除样板代码最典型的特性，特别适合建模数据实体、DTO、领域值对象。",
    tags: ["data class", "POJO", "样板代码", "equals"],
  },
  {
    id: "kdg-co-2",
    chapter: "kdg-classes-objects",
    level: 2,
    question: "Kotlin的`sealed class`（密封类）有什么作用？它如何与`when`配合？",
    answer:
      "密封类（sealed class）限定子类必须在同一文件（Kotlin 1.5+同一模块）内声明，编译器因此知道所有可能的子类。作用：①有限类型建模——当值的取值是有限集合时（如UI状态Loading/Success/Error），用sealed class表达。②when穷尽性检查——when表达式处理sealed class时，编译器验证所有子类分支都已覆盖，无需else分支。新增子类时，编译器在所有when表达式处报错提醒你处理新分支。③类型安全的状态机——sealed class + data class子类 + when智能转换构成类型安全的状态处理模式。示例：`sealed class Result`，子类`data class Success<T>(val data: T): Result()`、`data class Error(val msg: String): Result()`、`object Loading: Result()`。when处理时`is Success`分支自动智能转换state为Success类型，可直接访问state.data。对比Java的enum：enum实例是单例不能携带不同类型的数据，sealed class子类可以是data class携带各自的数据。",
    tags: ["sealed class", "密封类", "when", "穷尽检查", "状态机"],
  },
  {
    id: "kdg-co-3",
    chapter: "kdg-classes-objects",
    level: 2,
    question: "Kotlin为什么默认类是`final`的？`object`和`companion object`有什么区别？",
    answer:
      "Kotlin类默认final的设计理念：继承打破了封装——子类可以覆盖父类行为，父类作者无法预知子类如何修改。Effective Java建议「为继承设计并文档化，否则禁止继承」。Kotlin将默认值设为安全的选择（不可继承），需要继承时显式open，这是「安全优先」的设计哲学。`object`与`companion object`的区别：①object——声明一个单例对象，线程安全，直接通过对象名访问成员：`object Database { fun connect() = ... }`，调用`Database.connect()`。用于全局单例、工具类替代。②companion object——类内部的伴生对象，为类提供静态成员：`class Foo { companion object { fun create() = ... } }`，调用`Foo.create()`。companion object是真实对象，可实现接口、有名字、可作为参数传递。companion object的成员通过类名访问，模拟Java的static，但更强大——它是真实对象。object是顶层单例，companion object是类关联的单例。",
    tags: ["final", "open", "object", "companion object", "单例"],
  },
  {
    id: "kdg-co-4",
    chapter: "kdg-classes-objects",
    level: 3,
    question: "Kotlin的属性委托（`by`）能做什么？举例说明其应用场景。",
    answer:
      "属性委托（by）将属性的get/set逻辑委托给第三方对象，实现属性逻辑的复用。语法：`val/var <属性名>: <类型> by <委托对象>`。委托对象需实现`getValue`/`setValue`操作符函数。标准库提供的委托：①lazy——懒加载，首次访问时执行初始化Lambda并缓存结果：`val cache: Map<String,String> by lazy { loadFromDisk() }`。线程安全（默认LazyThreadSafetyMode.SYNCHRONIZED）。②Delegates.observable——可观察属性，值变化时回调：`var count by Delegates.observable(0) { _, old, new -> log(\"$old -> $new\") }`。③Delegates.vetoable——可否决属性修改，变化前检查。④Map委托——用Map存储属性：`val name by map`（map的key需匹配属性名）。自定义委托：实现`ReadOnlyProperty`/`ReadWriteProperty`接口，或直接提供`getValue`/`setValue`操作符。应用场景：懒加载昂贵资源、属性变化监听/数据绑定、从Map/SharedPreferences加载配置、权限校验属性、缓存属性。属性委托将横切关注点（懒加载、监听、校验）从业务逻辑中分离。",
    tags: ["属性委托", "by", "lazy", "observable", "委托模式"],
  },
];
