import type { ReviewQuestion } from "./types";

export const kiaConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "kia-co-1",
    chapter: "kia-concurrency",
    level: 1,
    question: "Kotlin协程的suspend挂起函数是什么？它如何实现不阻塞线程？",
    answer:
      "Kotlin的suspend挂起函数是协程的核心机制。定义：用suspend关键字标记的函数，可在协程中暂停执行而不阻塞当前线程，稍后恢复。如`suspend fun fetchData(): Data { delay(1000); return api.call() }`。不阻塞线程的原理：①编译器转换——suspend函数在编译时被转换为状态机（Continuation Passing Style），函数体被切割为多个挂起点之间的代码段。②挂起与恢复——当执行到挂起点（如delay、另一个suspend调用）时，函数保存当前状态（局部变量、执行位置）到Continuation对象，返回控制权给调用者（线程继续做其他事）。当条件满足（delay到期、网络响应到达）时，调度器恢复Continuation，从上次挂起点继续执行。③线程不阻塞——挂起期间线程可执行其他协程，如Dispatchers.IO线程池的线程在等待IO时处理其他协程。④与回调对比——suspend函数让异步代码看起来像同步代码（顺序写法），编译器自动处理回调链。约束：suspend函数只能在协程或其他suspend函数中调用。与Java对比：Java的CompletableFuture靠链式回调，回调多了形成「回调地狱」；Kotlin的suspend用顺序写法消除回调嵌套。",
    tags: ["suspend", "挂起函数", "协程", "状态机", "Continuation", "不阻塞"],
  },
  {
    id: "kia-co-2",
    chapter: "kia-concurrency",
    level: 2,
    question: "Kotlin的launch和async有什么区别？什么是结构化并发？",
    answer:
      "launch和async的区别：①launch——启动一个「发后即忘」（fire-and-forget）的协程，返回Job对象不携带结果。适用于不需要返回值的副作用操作（如UI更新、日志、后台同步）。`scope.launch { updateUI() }`。②async——启动一个携带结果的协程，返回Deferred<T>对象，通过await()获取结果。适用于需要返回值的并发计算。`val deferred = scope.async { fetchData() }; val data = deferred.await()`。③异常处理——launch中未捕获异常会传播到父协程的CoroutineExceptionHandler；async中异常在await()时抛出。结构化并发：①概念——协程有父子关系，子协程必须在父协程作用域内启动，父协程等待所有子协程完成才完成。②coroutineScope——`suspend fun loadAll() = coroutineScope { val a = async { fetchA() }; val b = async { fetchB() }; combine(a.await(), b.await()) }`，scope内所有async完成才返回。③自动取消——父协程取消时所有子协程自动取消，避免泄漏。④异常传播——子协程的未处理异常会取消父协程，进而取消所有兄弟子协程。与Java对比：Java的线程/CompletableFuture没有结构化关系，需手动管理生命周期和异常传播，容易泄漏。",
    tags: ["launch", "async", "Deferred", "结构化并发", "coroutineScope", "取消"],
  },
  {
    id: "kia-co-3",
    chapter: "kia-concurrency",
    level: 2,
    question: "Kotlin的Flow是什么？它和RxJava/LiveData有什么区别？",
    answer:
      "Kotlin的Flow是协程的异步流API，用于处理随时间产生的多个值。定义：`flow { for (i in 1..3) { emit(i); delay(100) } }`，emit发射值，collect收集值。与RxJava/LiveData的区别：①冷流vs热流——Flow是冷流（cold stream），每次collect才执行生产逻辑，无collect时不执行；RxJava的Observable也是冷流但Hot Observable是热流；LiveData是热流（有状态）。②背压——Flow天然支持背压（生产快于消费时），因为emit是suspend函数会等待消费方；RxJava需手动指定背压策略。③协程集成——Flow基于协程，天然支持结构化取消和协程上下文；RxJava有自己的订阅管理。④操作符——Flow提供map/filter/flatMapLatest/combine等操作符，数量少于RxJava但够用。⑤线程切换——Flow用flowOn(Dispatchers.IO)切换上游线程；RxJava用subscribeOn/observeOn。⑥生命周期——Flow通过collect绑定协程作用域，自动随协程取消而取消；LiveData感知Android生命周期。选择：纯Kotlin项目首选Flow；需复杂数据流变换用RxJava；Android UI状态用StateFlow/SharedFlow（Flow的热流变体）替代LiveData。",
    tags: ["Flow", "冷流", "背压", "RxJava", "LiveData", "异步流"],
  },
  {
    id: "kia-co-4",
    chapter: "kia-concurrency",
    level: 3,
    question: "如何用Kotlin协程实现一个支持取消、超时和并发的网络请求模块？",
    answer:
      "实现支持取消、超时和并发的网络请求模块：①suspend函数封装请求——`suspend fun fetchUser(id: String): User = withContext(Dispatchers.IO) { api.getUser(id).toDomain() }`，withContext切换到IO线程。②超时——`val user = withTimeoutOrNull(5000) { fetchUser(id) } ?: throw TimeoutException()`，withTimeout在指定时间内未完成则抛TimeoutCancellationException，withTimeoutOrNull返回null。③并发——`suspend fun loadProfile(id: String): Profile = coroutineScope { val user = async { fetchUser(id) }; val posts = async { fetchPosts(id) }; Profile(user.await(), posts.await()) }`，两个请求并发执行，总耗时为较慢的那个。④取消——调用方取消协程时，fetchUser中的IO操作自动取消（suspend函数检查取消状态）。⑤重试——`val result = retry(times = 3) { fetchUser(id) }`，用自定义retry函数重试。⑥依赖请求——`val user = fetchUser(id); val friends = fetchFriends(user.friendIds)`串行。⑦错误处理——`runCatching { fetchUser(id) }.getOrElse { User.empty() }`。⑦Flow搜索——`fun search(query: Flow<String>): Flow<List<Result>> = query.debounce(300).distinctUntilChanged().flatMapLatest { q -> flow { emit(api.search(q)) } }`。关键：结构化并发确保取消传播，withContext确保线程切换，async并发执行，withTimeout控制超时。",
    tags: ["协程实战", "超时", "并发", "取消", "withTimeout", "async", "withContext"],
  },
];
