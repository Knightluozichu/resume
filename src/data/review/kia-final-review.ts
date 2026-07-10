import type { ReviewQuestion } from "./types";

export const kiaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "kia-fr-1",
    chapter: "kia-final-review",
    level: 1,
    question: `Kotlin的核心设计哲学是什么？用三个关键词概括并解释。`,
    answer:
      `Kotlin的核心设计哲学用三个关键词概括：①简洁（Concise）——消除Java样板代码，data class一行替代equals/hashCode/toString/copy，默认参数替代方法重载，顶层函数+扩展函数替代工具类，类型推断省略冗余类型声明。目标：代码表达「做什么」而非「怎么做」。②安全（Safe）——编译期消除NPE（类型系统区分String与String?），sealed class+when实现编译期穷尽检查，类默认final防止意外继承，智能转换减少运行时ClassCastException。目标：在编译期拦截尽可能多的错误。③惯用（Idiomatic）——鼓励使用Kotlin惯用法而非照搬Java，如用扩展函数而非继承、用协程而非回调、用DSL而非Builder模式、用集合操作而非for循环、用作用域函数组织代码。目标：写出地道的Kotlin代码，充分利用语言特性。核心理念：Kotlin不是「更好的Java」，而是用不同的思维方式写更安全、更简洁、更表达意图的代码。`,
    tags: ["设计哲学", "简洁", "安全", "惯用", "全书总结"],
  },
  {
    id: "kia-fr-2",
    chapter: "kia-final-review",
    level: 2,
    question: `对比Kotlin和Java在常见开发场景中的解决方案选择。`,
    answer:
      `Kotlin vs Java常见场景选型对比：①数据建模——Kotlin用data class User(val name, val age)自动生成equals/hashCode/copy/toString；Java需手写或Lombok。②状态分支——Kotlin用sealed class Result + when穷尽检查，新增子类编译器报错；Java用enum + switch无编译检查。③空值处理——Kotlin用String? + ?. + ?: + 智能转换，编译期安全；Java用if (x != null)运行时检查。④集合操作——Kotlin用list.map{}.filter{}.sortedBy{}链式；Java用Stream API或for循环。⑤异步编程——Kotlin用suspend + coroutineScope + Flow同步风格；Java用回调/Thread/CompletableFuture回调链。⑥单例模式——Kotlin用object Singleton一行；Java用双重检查锁+volatile。⑦工具函数——Kotlin用顶层函数+扩展函数"abc".lastChar()；Java用XxxUtils.staticMethod()。⑧配置构建——Kotlin用带接收者Lambda+@DslMarker类型安全DSL；Java用Builder模式链式调用。选型原则：优先用Kotlin惯用法而非照搬Java，用语言特性（data class/sealed/扩展/协程/DSL）替代设计模式（Builder/Singleton/Strategy/Template Method）。`,
    tags: ["选型矩阵", "Java对比", "场景对比", "惯用法"],
  },
  {
    id: "kia-fr-3",
    chapter: "kia-final-review",
    level: 3,
    question: `用一段完整的Kotlin代码示例展示语言核心特性的综合运用，并解释每个特性的作用。`,
    answer:
      `综合示例——一个协程驱动的用户搜索模块。代码：\`data class User(val id: String, val name: String, val score: Int?)\`——data class自动生成equals/copy/解构声明，score为Int?表示可能为空。\`sealed class SearchState { object Loading : SearchState(); data class Success(val users: List<User>) : SearchState(); data class Error(val msg: String) : SearchState() }\`——sealed class限制状态层级，配合when实现编译期穷尽检查。\`suspend fun searchUsers(query: String): List<User> = withContext(Dispatchers.IO) { api.search(query).map { it.toDomain() }.filter { it.score != null }.sortedByDescending { it.score } }\`——suspend挂起函数不阻塞线程，withContext切换到IO线程，集合操作map/filter/sortedByDescending链式处理。\`fun searchFlow(query: Flow<String>): Flow<SearchState> = query.debounce(300).distinctUntilChanged().flatMapLatest { q -> flow { emit(SearchState.Loading); try { emit(SearchState.Success(searchUsers(q))) } catch (e: Exception) { emit(SearchState.Error(e.message ?: "unknown")) } } }\`——Flow异步流处理搜索框输入，debounce防抖、distinctUntilChanged去重、flatMapLatest取消旧请求。\`searchFlow.collect { state -> when (state) { is SearchState.Loading -> showLoading(); is SearchState.Success -> showUsers(state.users); is SearchState.Error -> showError(state.msg) } }\`——when中is匹配后智能转换，state.users和state.msg直接访问。综合运用：data class（数据建模）、sealed class（状态建模）、空安全（Int?）、suspend/withContext（协程）、集合操作（map/filter/sorted）、Flow（异步流）、when（穷尽分支）、智能转换（is后自动转换）。`,
    tags: ["综合示例", "data class", "sealed class", "协程", "Flow", "集合操作", "when"],
  },
  {
    id: "kia-fr-4",
    chapter: "kia-final-review",
    level: 3,
    question: `如何系统性地从Java迁移到Kotlin？有哪些注意事项和最佳实践？`,
    answer:
      `从Java迁移到Kotlin的系统性步骤和注意事项：①渐进式迁移——Kotlin与Java 100%互操作，可先在新文件中用Kotlin，旧Java文件逐步转换。项目build.gradle加kotlin插件和依赖即可。②从数据类开始——Java的POJO/DTO优先转为data class，立即享受equals/hashCode/copy的自动生成。③消除null——Java的@Nullable/@NotNull标注转为Kotlin的String?和String，用?.和?:处理可空值。注意Java互操作的平台类型（String!）需显式标注可空性。④集合操作——Java的for循环和Stream API转为Kotlin的list.map{}.filter{}链式操作，更简洁。⑤回调转协程——Java的回调接口转为suspend函数，用coroutineScope + async替代回调嵌套。⑥工具类转扩展函数——Java的StringUtils.java转为strings.kt中的扩展函数fun String.xxx()。⑦sealed class替换enum+状态码——有限状态用sealed class + when替换enum + switch。注意事项：①平台类型——Java返回值在Kotlin中是平台类型（可能null），需手动判断可空性。②@JvmStatic/@JvmField——Kotlin供Java调用的代码需加注解。③@JvmOverloads——有默认参数的函数供Java调用需加。④性能——Kotlin协程和集合操作有inline优化，但注意Sequence vs List的选择。⑤团队培训——先学val/var、when、data class、扩展函数，再学协程和DSL。最佳实践：新项目全Kotlin，旧项目渐进迁移，优先迁移数据层和工具类。`,
    tags: ["Java迁移", "互操作", "渐进式", "最佳实践", "平台类型"],
  },
];
