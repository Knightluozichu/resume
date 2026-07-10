import type { ReviewQuestion } from "./types";

export const kiaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "kia-lm-1",
    chapter: "kia-learning-map",
    level: 1,
    question: `《Kotlin实战》全书的知识体系结构和递进逻辑是什么？`,
    answer:
      `全书分为十个章节（含学习地图和全书复习），覆盖三大知识维度：①语言核心——Kotlin简介（为什么用Kotlin、Java互操作、设计哲学）、Kotlin基础（val/var变量声明、类型推断、when表达式、字符串模板、集合创建）、函数定义与调用（默认参数、命名参数、表达式体函数、扩展函数、顶层函数与顶层属性）、类对象与接口（主构造函数、open/override继承、接口默认实现、data class、sealed class、object单例、companion object、by委托）；②类型与抽象——Lambda编程（高阶函数、函数类型、Lambda语法约定it/末尾Lambda、集合函数式操作map/filter/reduce、inline内联函数、标准库作用域函数let/run/apply/also/with）、类型系统与泛型（空安全String/String?、?.安全调用、?:Elvis、!!非空断言、智能转换is/as、out协变/in逆变、星投影、reified具体化）、DSL与领域建模（带接收者的Lambda、类型安全构建器、@DslMarker作用域控制、中缀调用infix、运算符重载）；③并发与工程——并发与协程（suspend挂起函数、launch/async构建器、结构化并发coroutineScope、Dispatcher调度器、Flow异步流、withContext线程切换）。递进逻辑：从基础语法到函数到OOP到Lambda到类型系统到DSL到协程，每个主题建立在前一个之上，最终汇聚为完整的Kotlin开发能力。`,
    tags: ["知识体系", "三大维度", "递进逻辑", "全书概览"],
  },
  {
    id: "kia-lm-2",
    chapter: "kia-learning-map",
    level: 2,
    question: `Kotlin与Java在语言设计哲学上有什么核心区别？`,
    answer:
      `Kotlin与Java的核心区别：①简洁——Kotlin用data class一行替代Java手写equals/hashCode/toString/copy；用默认参数替代方法重载；用顶层函数替代工具类。②安全——Kotlin在类型系统层面区分非空String和可空String?，编译期消除NPE；Java靠运行时检查。③类默认final——Kotlin类默认不可继承需open关键字，Java默认可继承。④协程——Kotlin语言级suspend函数+结构化并发，Java靠CompletableFuture/线程池。⑤类型推断——Kotlin全面类型推断（val x = 42），Java需显式类型。⑥扩展函数——Kotlin可给已有类添加方法而不修改源码，Java需继承或工具类。核心理念：Kotlin强调「简洁、安全、惯用」，消除Java的样板代码和空指针陷阱，同时保持与Java 100%互操作。`,
    tags: ["Java对比", "设计哲学", "简洁安全", "互操作"],
  },
  {
    id: "kia-lm-3",
    chapter: "kia-learning-map",
    level: 3,
    question: `用一次完整的Kotlin项目开发流程，串联全书的知识体系。`,
    answer:
      `主线：从零开发一个功能完整的Kotlin应用。①简介——选择Kotlin因为它与Java互操作、编译期空安全、语法简洁。②基础——用val/var声明变量，when表达式处理分支逻辑，字符串模板拼接，listOf创建集合。③函数——用默认参数减少重载，命名参数提升可读性，扩展函数给String添加lastChar()方法，顶层函数放工具方法。④OOP——用data class建模数据实体（自动生成equals/copy），sealed class表达UI状态（Loading/Success/Error），object单例管理全局状态，companion object提供工厂方法，by委托复用实现。⑤Lambda——用高阶函数封装通用逻辑，集合操作map/filter/reduce处理数据，inline内联函数消除闭包开销。⑥类型系统——用String?处理可空值，?.和?:安全处理null，智能转换简化类型检查，泛型Repository<T>抽象数据层，out/in型变设计安全API。⑦DSL——用带接收者的Lambda构建类型安全的配置API，@DslMarker防止作用域泄漏。⑧协程——用suspend函数封装网络请求，launch启动后台任务，async并发获取多接口数据，Flow实现搜索框实时搜索。依赖关系：语言核心是表达基础，类型系统是安全基础，协程是并发基础，DSL是设计能力。`,
    tags: ["功能串联", "综合应用", "完整项目"],
  },
  {
    id: "kia-lm-4",
    chapter: "kia-learning-map",
    level: 2,
    question: `Kotlin的三大知识维度（语言核心/类型与抽象/并发与工程）之间有什么内在联系？`,
    answer:
      `三大维度的内在联系：①语言核心是地基——简介确立设计哲学、基础语法提供表达手段、函数机制提供封装能力、OOP提供建模手段。没有语言核心就无法写出Kotlin代码。②类型与抽象是上层建筑——Lambda/高阶函数建立在函数类型之上，空安全/泛型建立在类型系统之上，DSL建立在带接收者Lambda之上。类型系统让代码更安全（编译期消除NPE），泛型让代码更通用（out/in型变），DSL让代码更声明式。③并发与工程是落地能力——协程建立在语言核心（suspend是语言级特性）和类型系统（协程上下文是泛型）之上，让异步编程像同步代码一样简洁。交叉点：函数×Lambda=高阶函数+inline；OOP×类型=data class+sealed+泛型；Lambda×DSL=带接收者Lambda；协程×Lambda=Flow。三者递进构成完整的Kotlin开发能力闭环。`,
    tags: ["维度联系", "交叉关系", "语言核心", "类型系统", "协程"],
  },
];
