import type { ReviewQuestion } from "./types";

export const kdgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "kdg-fr-1",
    chapter: "kdg-final-review",
    level: 2,
    question: `用知识图谱的方式，串联《Kotlin编程权威指南》全书八大核心领域的关系。`,
    answer:
      `全书八大核心领域以Kotlin语言为核心交汇：①基础语法——val/var变量声明、空安全（String?/?.//?:/!!）、when表达式、字符串模板、智能转换。这是Kotlin的地基，所有上层特性都建立在类型系统和空安全之上。②函数与Lambda——高阶函数、Lambda表达式（it/末尾Lambda）、函数类型、inline内联函数、集合操作map/filter/reduce。函数式编程能力是Kotlin的核心表达力。③类与对象——主构造函数、open/override继承、data class数据类、sealed class密封类、object单例、companion object、属性委托by。OOP建模能力是业务逻辑的基础。④高级类型——泛型、out协变/in逆变（PECS原则）、星投影、上界约束、reified具体化。泛型是抽象复用的核心。⑤协程——suspend挂起函数、launch/async构建器、结构化并发coroutineScope、Flow异步流、Dispatcher调度器。协程是并发编程的现代方案。⑥DSL——带接收者的Lambda、@DslMarker作用域控制、infix中缀调用、类型安全构建器。⑦Android——扩展函数、Android KTX、协程替代回调、Java互操作、Jetpack Compose。⑧测试——JUnit、MockK、runTest协程测试、测试金字塔。交叉关系：语言核心是所有特性的基础；函数式->协程（suspend是函数式+并发的交汇）；OOP->高级类型（泛型是OOP的抽象延伸）；协程->DSL（带接收者Lambda是两者的共同机制）；语言核心->Android（扩展函数/空安全改造Android开发）；全书->测试。`,
    tags: ["知识图谱", "八大领域", "交叉关系", "全书复习"],
  },
  {
    id: "kdg-fr-2",
    chapter: "kdg-final-review",
    level: 3,
    question: `对比Kotlin与Java在以下场景的差异：空安全、异步编程、数据建模、集合操作。`,
    answer:
      `Kotlin与Java四大场景对比：①空安全——Kotlin在类型系统层面区分非空String和可空String?，编译期消除NPE。?.安全调用、?:Elvis、智能转换。Java只有运行时NPE，靠Optional或手动检查。②异步编程——Kotlin用协程suspend函数，顺序写法无嵌套：\`val data = api.fetch()\`。launch/async/Flow，结构化并发自动管理生命周期。Java用CompletableFuture/回调/线程池，代码嵌套且需手动管理线程。对比：\`suspend fun load() { val a = api.getA(); val b = api.getB(a); }\` vs \`api.getA().thenCompose(a -> api.getB(a)).thenAccept(b -> ...)\`。③数据建模——Kotlin用\`data class User(val name: String, val age: Int)\`一行生成equals/hashCode/copy/toString/解构。sealed class + when实现穷尽状态匹配。Java需手写或Lombok生成，enum不能携带不同类型数据，switch不保证穷尽。④集合操作——Kotlin内置函数式操作：\`list.map { it*2 }.filter { it>5 }.sortedBy { it }.forEach { }\`，链式流畅。List<out T>协变只读。Java需Stream API：\`list.stream().map(x->x*2).filter(x->x>5).sorted().forEach()\`，写法冗长，且Stream是一次性消费的。总结：Kotlin在所有场景都更简洁、更安全、更惯用。`,
    tags: ["Kotlin", "Java", "空安全", "异步编程", "数据建模", "集合操作", "对比"],
  },
  {
    id: "kdg-fr-3",
    chapter: "kdg-final-review",
    level: 4,
    question: `设计一个完整的Kotlin Android项目架构，说明每层用了哪些Kotlin特性。`,
    answer:
      `完整Kotlin Android项目架构（MVVM + Clean Architecture）：①UI层（Compose）——@Composable函数构建声明式UI，StateFlow收集ViewModel状态，remember/mutableStateOf管理本地状态。sealed class UiState(Loading/Success/Error)驱动UI渲染，when穷尽匹配。viewModelScope.launch启动协程。②ViewModel层——class ViewModel用viewModelScope启动协程，suspend函数调用Repository，StateFlow/MutableStateFlow暴露UI状态。sealed class建模状态。@JvmStatic用于Java互操作。③Repository层——泛型Repository<T>抽象数据源，suspend函数提供顺序式API，Flow返回数据流。out/in型变设计安全API。data class建模数据实体。④DataSource层——Retrofit接口定义API（suspend函数），Room DAO用suspend/Flow。扩展函数增强Context/View。withContext(Dispatchers.IO)切换线程。reified实现类型安全的JSON解析。⑤Domain层（UseCase）——data class建模值对象，sealed class建模业务结果，泛型UseCase<Input, Output>。⑥DI层——object单例管理依赖，companion object提供工厂方法。⑦测试层——JUnit单元测试（反引号方法名），MockK模拟Repository（every/coEvery/verify/coVerify），runTest协程测试（虚拟时间），测试金字塔。⑧互操作——@JvmStatic/@JvmField/@JvmOverloads让Java调用友好。核心设计理念：用Kotlin的类型系统消除bug，用协程简化异步，用扩展函数和DSL增强API，用data class和sealed class简化建模，用测试保障质量。`,
    tags: ["项目架构", "MVVM", "Clean Architecture", "Compose", "协程", "泛型", "测试"],
  },
  {
    id: "kdg-fr-4",
    chapter: "kdg-final-review",
    level: 2,
    question: `Kotlin的「简洁、安全、惯用」设计哲学分别体现在哪些特性上？`,
    answer:
      `Kotlin「简洁、安全、惯用」设计哲学的体现：①简洁（消除样板代码）——data class一行生成equals/hashCode/copy/toString；类型推断（val x = 42）；字符串模板（\"$name\"）；主构造函数（class Person(val name:String)）；扩展函数（替代工具类）；when表达式（替代switch+break）。②安全（编译期消除错误）——空安全（String?类型系统区分，?./?:/!!处理null，编译期消除NPE）；sealed class穷尽匹配（when编译器强制覆盖所有分支，新增子类报错提醒）；智能转换（is检查后自动类型转换）；val不可变优先（减少并发bug）；不可变集合（listOf防止意外修改）；泛型型变（out/in让类型关系编译期安全）。③惯用（用Kotlin特有方式表达）——协程替代回调（suspend顺序写法，结构化并发）；扩展函数替代工具类（String.isEmail()）；DSL替代配置文件（Gradle Kotlin DSL/Compose UI/HTML DSL）；作用域函数（apply/let/run/also）；集合函数式操作（map/filter/reduce链式）；带接收者的Lambda。判断Kotlin代码质量的标准：是否用了val而非var？是否用了data class而非POJO？是否用了协程而非回调？是否用了扩展函数而非工具类？如果答案是「否」，说明在直译Java而非用惯用Kotlin。`,
    tags: ["设计哲学", "简洁", "安全", "惯用", "最佳实践", "全书总结"],
  },
];
