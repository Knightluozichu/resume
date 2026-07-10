import type { ReviewQuestion } from "./types";

export const kdgKotlinAndroidQuestions: ReviewQuestion[] = [
  {
    id: "kdg-ka-1",
    chapter: "kdg-kotlin-android",
    level: 2,
    question: `Kotlin扩展函数的原理是什么？它与继承有什么区别？`,
    answer:
      `扩展函数的原理：扩展函数在编译时被解析为静态方法调用，不修改接收者类的源码或字节码。例如\`fun View.visible() { this.visibility = View.VISIBLE }\`在编译后等价于一个静态方法\`ViewExtensions.visible(view)\`，调用\`button.visible()\`被编译为\`ViewExtensions.visible(button)\`。与继承的区别：①源码修改——扩展函数不修改接收者类源码；继承创建子类。②运行时——扩展函数是静态解析的，在编译时确定调用；继承是多态的虚方法分派。③访问权限——扩展函数只能访问接收者的public成员，不能访问protected/private；子类可以访问protected。④覆盖——扩展函数不能被子类覆盖（静态解析）；继承的方法可以被override。⑤null安全——扩展函数可以在可空类型上定义：\`fun String?.orEmpty(): String = this ?: \"\"\`。⑥性能——扩展函数零运行时开销（就是静态方法调用）。应用场景：为Android SDK类（View/Context/String）添加便捷方法而不修改SDK；为第三方库类添加功能；替代工具类（StringUtil.capitalize -> String.capitalize）。限制：扩展函数与成员函数同名时成员函数优先；扩展函数是静态解析的，接收者的动态类型不影响调用。`,
    tags: ["扩展函数", "静态解析", "继承", "Android API", "原理"],
  },
  {
    id: "kdg-ka-2",
    chapter: "kdg-kotlin-android",
    level: 3,
    question: `Kotlin协程如何替代Android中的回调地狱？给出具体对比。`,
    answer:
      `协程替代回调地狱的原理：suspend函数挂起时不阻塞线程，等待结果后恢复执行。这让异步代码可以像同步代码一样顺序编写，无需嵌套回调。具体对比——加载用户+帖子数据的场景：①回调地狱（Java风格）：\`api.auth(callback: (token) -> { api.getUser(token, callback: (user) -> { api.getPosts(user.id, callback: (posts) -> { // 终于拿到所有数据 }) }) })\`——三层嵌套，代码向右缩进，错误处理分散在每个回调中。②协程（Kotlin风格）：\`suspend fun loadAll(): Data = coroutineScope { val token = api.auth(); val user = api.getUser(token); val posts = api.getPosts(user.id); Data(user, posts) }\`——顺序写法，无嵌套，try-catch统一处理异常。③并发优化——回调方式并发获取多个数据需要手动管理回调计数；协程用async并行：\`val user = async { api.getUser() }; val posts = async { api.getPosts() }; combine(user.await(), posts.await())\`。④生命周期管理——回调需要手动取消；协程用viewModelScope/lifecycleScope自动随生命周期取消。⑤线程切换——回调需要Handler/post切线程；协程用withContext(Dispatchers.Main)切换。核心：协程用suspend将异步操作「线性化」，消除嵌套和回调管理。`,
    tags: ["协程", "回调地狱", "异步编程", "suspend", "Android"],
  },
  {
    id: "kdg-ka-3",
    chapter: "kdg-kotlin-android",
    level: 2,
    question: `Kotlin与Java互操作时需要注意哪些问题？有哪些关键注解？`,
    answer:
      `Kotlin与Java互操作的注意事项和关键注解：①平台类型——Java返回的类型在Kotlin中是平台类型（如String!），Kotlin不强制空安全检查，可能NPE。解决：在Kotlin侧显式标注可空类型String?或用@Nullable/@NonNull注解Java代码。②@JvmStatic——Kotlin伴生对象的方法默认通过Companion对象访问。加@JvmStatic后变为真正的静态方法（Java: Util.staticMethod()）。③@JvmField——Kotlin属性默认通过getter/setter访问。加@JvmField后暴露为公共字段（Java: config.MAX_SIZE而非config.getMAX_SIZE()）。④@file:JvmName——自定义Kotlin顶层函数的Java类名。默认是文件名+Kt后缀，用@file:JvmName(\"StringUtils\")可自定义。⑤@JvmOverloads——为有默认参数的函数生成Java重载。Kotlin默认参数在Java中不可见，@JvmOverloads生成所有参数组合的重载。⑥checked exception——Kotlin不检查checked exception。⑦集合映射——Kotlin的只读List在Java中仍是可变的。⑧void/Unit——Java的void映射到Kotlin的Unit。最佳实践：在Kotlin/Java互操作边界处做好空安全标注，用@JvmStatic/@JvmField/@JvmOverloads让Java调用更自然。`,
    tags: ["Java互操作", "@JvmStatic", "@JvmField", "平台类型", "@JvmOverloads"],
  },
  {
    id: "kdg-ka-4",
    chapter: "kdg-kotlin-android",
    level: 3,
    question: `Jetpack Compose如何利用Kotlin DSL特性构建声明式UI？与XML布局有什么区别？`,
    answer:
      `Jetpack Compose利用Kotlin DSL特性构建声明式UI的方式：①@Composable函数——用注解标记的函数是UI组件，函数参数是数据，函数体是UI描述：\`@Composable fun Greeting(name: String) { Text(\"Hello, $name\") }\`。②带接收者的Lambda——Compose的Row/Column等布局用带接收者的Lambda构建嵌套结构：\`Column { Text(\"line1\"); Text(\"line2\") }\`，Lambda内this=ColumnScope，调用Text等函数像标签嵌套。③Modifier链式——\`Modifier.padding(8.dp).fillMaxWidth().background(Color.Red)\`用链式调用描述样式。④状态驱动——\`var count by remember { mutableStateOf(0) }\`，状态变化自动触发重组（recomposition），UI自动刷新。⑤末尾Lambda约定——\`Button(onClick = { ... }) { Text(\"Click\") }\`中content参数是末尾Lambda移到括号外。与XML布局的区别：①声明式vs命令式——Compose描述UI「应该是什么样子」（数据->UI），XML需要命令式findViewById+设置数据。②类型安全——Compose用Kotlin类型系统检查参数正确性，XML只在运行时检查。③无状态重建——Compose的状态自动驱动UI刷新，XML需要手动更新View。④性能——Compose智能重组（只重组状态变化的部分），XML需要手动优化。核心：Compose是Kotlin DSL能力的极致应用——用函数+Lambda+状态管理将UI构建从XML+命令式编程升级为Kotlin+声明式编程。`,
    tags: ["Jetpack Compose", "声明式UI", "DSL", "XML布局", "@Composable"],
  },
];
