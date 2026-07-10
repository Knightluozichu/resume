import type { ReviewQuestion } from "./types";

export const kdgCoroutinesQuestions: ReviewQuestion[] = [
  {
    id: "kdg-co-1",
    chapter: "kdg-coroutines",
    level: 2,
    question: `Kotlin协程的\`suspend\`挂起函数与线程阻塞有什么区别？`,
    answer:
      `suspend挂起函数与线程阻塞的核心区别：①线程阻塞——线程被挂起等待，不执行其他任务，线程资源被占用。在Android中阻塞主线程导致ANR。10个阻塞操作需要10个线程。②协程挂起——协程被挂起（保存栈帧到堆上），但线程被释放给其他协程使用。挂起不阻塞线程。一个线程可以交替运行成千上万个协程。③实现机制——suspend函数在编译时被编译为状态机（CPS变换），每个挂起点对应一个状态。挂起时保存当前状态，恢复时从保存的状态继续。线程只是执行载体，协程在挂起点释放线程。④性能——10万个协程可以跑在少量线程上（每个协程约几KB），10万个线程会OOM（每个线程默认1MB栈）。⑤语法——suspend函数看起来像同步代码（\`val data = fetchData()\`），但实际是异步执行。\`delay(1000)\`在协程中是非阻塞的（挂起1秒），\`Thread.sleep(1000)\`是阻塞的（线程睡1秒）。总结：suspend = 非阻塞挂起（释放线程），blocking = 阻塞等待（占用线程）。`,
    tags: ["suspend", "挂起函数", "线程阻塞", "协程", "非阻塞"],
  },
  {
    id: "kdg-co-2",
    chapter: "kdg-coroutines",
    level: 2,
    question: `\`launch\`和\`async\`有什么区别？各自的使用场景是什么？`,
    answer:
      `launch和async的区别：①返回值——launch返回Job（不携带结果），async返回Deferred<T>（携带泛型结果T）。②结果获取——launch的协程结果只能通过副作用（如修改变量）传递；async通过\`deferred.await()\`获取结果。③异常处理——launch的异常会立即传播到父协程的异常处理器；async的异常在被await()时才抛出（不await则异常被吞）。④使用场景——launch适合fire-and-forget操作（如更新UI、发送日志、触发副作用），不需要返回值。async适合需要结果的并发操作（如并发请求多个API再合并结果）。示例：\`suspend fun loadAll() = coroutineScope { val user = async { api.getUser() }; val posts = async { api.getPosts() }; ScreenData(user.await(), posts.await()) }\` 两个请求并发执行。注意：不要用GlobalScope.launch——用viewModelScope/lifecycleScope/coroutineScope等结构化作用域。async不await时异常被吞，需注意异常处理。`,
    tags: ["launch", "async", "Deferred", "并发", "协程构建器"],
  },
  {
    id: "kdg-co-3",
    chapter: "kdg-coroutines",
    level: 3,
    question: `什么是结构化并发？它解决了什么问题？`,
    answer:
      `结构化并发（Structured Concurrency）是Kotlin协程的核心设计理念——协程有明确的父子作用域关系，父协程必须等待所有子协程完成。核心规则：①父等待子——父协程在所有子协程完成前不会完成（coroutineScope挂起等待）。②取消传播——父协程取消时，所有子协程自动取消。③异常传播——子协程的未捕获异常会传播到父协程。解决的问题：①协程泄漏——GlobalScope.launch启动的协程没有父，不会自动取消，可能永远运行导致内存泄漏。结构化并发确保协程在作用域结束时被取消。②取消不可控——非结构化并发中，启动的协程难以追踪和取消。结构化并发中取消父就取消所有子。③异常丢失——非结构化并发中异常可能被吞。结构化并发中异常传播到父，可以被统一处理。Android中的结构化并发：viewModelScope（ViewModel销毁时取消）、lifecycleScope（Lifecycle销毁时取消）。开发者应在这些作用域内启动协程，而非用GlobalScope。结构化并发让并发代码的生命周期管理像同步代码一样可预测。`,
    tags: ["结构化并发", "coroutineScope", "取消传播", "异常传播", "协程生命周期"],
  },
  {
    id: "kdg-co-4",
    chapter: "kdg-coroutines",
    level: 3,
    question: `Kotlin的\`Flow\`与RxJava的\`Observable\`有什么异同？Flow的操作符有哪些？`,
    answer:
      `Flow与RxJava Observable的异同：相同点——①都是异步数据流抽象。②都支持操作符链式处理（map/filter等）。③都支持背压处理。不同点——①Flow基于协程——Flow的emit/collect是suspend函数，天然支持协程的挂起与取消，不需要RxJava的线程调度器（subscribeOn/observeOn），用flowOn切换线程。②Flow是冷的——不调用collect就不执行。③Flow更简洁——不需要dispose管理，collect在协程中自动随协程取消而取消。④Flow不需要回调——RxJava大量用回调，Flow用suspend函数，代码更线性。Flow操作符：①变换——map（映射）、flatMapMerge/flatMapConcat/flatMapLatest（类似flatMap）、transform。②过滤——filter、debounce（防抖）、distinctUntilChanged（去重）、take（取前N个）。③组合——combine（合并）、zip（配对）、flattenMerge（扁平化）。④异常——catch（捕获上游异常）、retry（重试）。⑤线程——flowOn（切换上游线程）。⑥终端——collect（收集）、toList（转List）、first（取第一个）。热流：StateFlow（状态持有，类似BehaviorSubject）、SharedFlow（事件广播，类似PublishSubject）用于UI状态管理。`,
    tags: ["Flow", "RxJava", "异步流", "操作符", "背压", "冷流"],
  },
];
