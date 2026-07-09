import type { ReviewQuestion } from "./types";

export const kdgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "kdg-lm-1",
    chapter: "kdg-learning-map",
    level: 1,
    question: "《Kotlin编程权威指南》全书的知识体系结构和递进逻辑是什么？",
    answer:
      "全书分为十个章节（含学习地图和全书复习），覆盖Kotlin开发的三大知识维度：①语言核心——基础语法（val/var变量声明、类型系统、空安全、when表达式、字符串模板、智能转换）、函数与类型系统（函数声明、默认参数、表达式体、高阶函数、Lambda、函数类型、inline内联函数、集合函数式操作map/filter/reduce）、类与对象（主构造函数、open/override继承、接口、data class数据类、sealed class密封类、object单例、companion object伴生对象、属性委托by）、高级类型（泛型类与泛型函数、out协变/in逆变、星投影、上界约束、reified具体化类型参数）；②并发与抽象——协程（launch/async构建器、suspend挂起函数、结构化并发coroutineScope、Flow异步流、Dispatcher调度器）、DSL构建（带接收者的Lambda、@DslMarker作用域控制、中缀调用infix、扩展函数、类型安全构建器）；③工程实践——Kotlin Android开发（扩展函数、Android KTX简化、协程替代回调地狱、Java互操作@JvmStatic/@JvmField、Jetpack Compose声明式UI）、测试与最佳实践（JUnit单元测试、MockK模拟框架every/verify、协程测试runTest、代码规范val优先/data class/sealed+when、测试金字塔）。递进逻辑：从基础语法到函数到OOP到高级类型到协程到DSL到Android到测试，每个主题建立在前一个之上，最终汇聚为完整的Kotlin开发能力。",
    tags: ["学习地图", "知识体系", "递进逻辑", "三大维度"],
  },
  {
    id: "kdg-lm-2",
    chapter: "kdg-learning-map",
    level: 2,
    question: "Kotlin与Java在语言设计哲学和核心特性上有什么区别？",
    answer:
      "Kotlin与Java的核心区别：①空安全——Kotlin在类型系统层面区分非空类型String和可空类型String?，编译期消除NPE；Java靠运行时检查。②不可变优先——Kotlin用val（不可变引用）和var（可变引用）显式区分，推荐val；Java只有final。③类默认final——Kotlin类默认不可继承，需open关键字；Java默认可继承。④data class——Kotlin一行声明自动生成equals/hashCode/copy/toString；Java需手写或Lombok。⑤协程——Kotlin语言级suspend函数+结构化并发；Java靠CompletableFuture/线程池。⑥类型推断——Kotlin全面类型推断（val x = 42）。⑦扩展函数——Kotlin可给已有类添加方法而不修改源码；Java需继承或工具类。⑧密封类——Kotlin sealed class让when分支穷尽检查。核心理念：Kotlin强调「简洁、安全、惯用」，消除Java的样板代码和空指针陷阱。",
    tags: ["Kotlin", "Java", "语言对比", "设计哲学"],
  },
  {
    id: "kdg-lm-3",
    chapter: "kdg-learning-map",
    level: 2,
    question: "用一次完整的Kotlin项目开发流程，串联全书的知识体系。",
    answer:
      "主线：从零开发一个功能完整的Kotlin Android应用。①基础语法——用val/var声明变量，String?处理可空值，when表达式分支逻辑，字符串模板拼接。②函数——用高阶函数封装通用逻辑，Lambda作为回调，集合操作map/filter/reduce处理数据。③类与对象——用data class建模数据实体，sealed class表达UI状态（Loading/Success/Error），object单例管理全局状态，companion object提供工厂方法。④高级类型——用泛型Repository<T>抽象数据层，out/in型变设计安全API，reified实现类型安全的JSON解析。⑤协程——用suspend函数封装网络请求，launch启动后台任务，async并发获取多接口数据，Flow实现搜索框实时搜索。⑥DSL——用带接收者的Lambda构建类型安全的配置API，@DslMarker防止作用域泄漏。⑦Android——用扩展函数增强View（view.visible()），协程替代AsyncTask，Compose声明式构建UI。⑧测试——JUnit测试ViewModel逻辑，MockK模拟Repository，runTest测试协程，Espresso测试UI。依赖关系：语言核心是表达基础，OOP是建模基础，高级类型是抽象基础，协程是并发基础，DSL是设计能力，Android是落地平台，测试是质量保障。",
    tags: ["项目开发", "知识串联", "完整流程", "全栈"],
  },
  {
    id: "kdg-lm-4",
    chapter: "kdg-learning-map",
    level: 1,
    question: "Kotlin的空安全机制如何在类型系统层面消除NPE？",
    answer:
      "Kotlin空安全的核心是在类型系统层面区分非空类型和可空类型：①非空类型——String类型的变量不能赋值为null，编译期保证。②可空类型——String?类型的变量可以持有null，但访问其成员时编译器要求显式处理空值。③安全调用操作符?.——b?.length在b为null时返回null而不抛NPE，返回类型为Int?。④Elvis运算符?:——b?.length ?: 0在左侧为null时返回右侧默认值，将Int?收窄为Int。⑤非空断言!!——b!!.length在b为null时抛NPE，不推荐使用。⑥let安全作用域——b?.let { println(it.length) }仅在b非空时执行块。⑦智能转换——if (b != null)之后编译器自动将b当作非空String，无需!!。这套机制将NPE从运行时异常降级为编译期错误：可空类型的成员访问被编译器拦截，强制开发者用?.或?:处理null。只有在Java互操作（平台类型）或!!断言时才可能NPE，大幅减少了生产环境的空指针崩溃。",
    tags: ["空安全", "NPE", "类型系统", "编译期检查"],
  },
];
