import type { ReviewQuestion } from "./types";

export const adaeThreadAsyncQuestions: ReviewQuestion[] = [
  {
    id: "adae-ta-1",
    chapter: "adae-thread-async",
    level: 1,
    question: "AsyncTask的五个回调分别在哪个线程执行？整体执行流程是怎样的？",
    answer:
      "AsyncTask五个回调及线程：①onPreExecute——主线程，execute后doInBackground前调用，做准备工作（显示进度条）。②doInBackground(Params...)——子线程（后台线程池），执行耗时任务，可调publishProgress发进度，返回Result。③onProgressUpdate(Progress...)——主线程，由publishProgress触发，更新进度UI。④onPostExecute(Result)——主线程，doInBackground返回后调用，用结果刷新UI。⑤onCancelled()——主线程，调用cancel(true)后代替onPostExecute执行。整体流程：主线程execute(onPreExecute)→线程池执行doInBackground→(可选publishProgress→onProgressUpdate)→doInBackground返回→主线程onPostExecute。注意：①AsyncTask实例必须在主线程创建、在主线程execute。②3.0起默认SERIAL_EXECUTOR串行执行（一个接一个），避免并发问题；可用executeOnExecutor(THREAD_POOL_EXECUTOR)并行。③一个实例只能execute一次。④doInBackground里应检查isCancelled()尽早退出。AsyncTask已被官方废弃，推荐协程/RxJava。",
    tags: ["AsyncTask", "五回调", "doInBackground", "主线程"],
  },
  {
    id: "adae-ta-2",
    chapter: "adae-thread-async",
    level: 2,
    question: "AsyncTask内置的线程池是如何配置的？为什么3.0后默认改为串行执行？",
    answer:
      "AsyncTask线程池配置（CPU核数N=Runtime.availableProcessors）：①THREAD_POOL_EXECUTOR——真正执行任务的并行线程池，核心池大小=N+1，最大池大小=2N+1，keepAlive=3秒，队列=LinkedBlockingQueue(128)，拒绝策略=CallerRunsPolicy。②SERIAL_EXECUTOR——串行执行器，维护一个Runnable队列，一个接一个地把任务交给THREAD_POOL_EXECUTOR执行，保证任务顺序。③默认execute用的是SERIAL_EXECUTOR，即任务串行；executeOnExecutor可指定THREAD_POOL_EXECUTOR并行。为什么3.0改串行：①2.x时代默认并行，但很多开发者没意识到AsyncTask会并发执行，在doInBackground里访问共享资源（如静态变量、文件）导致竞态和崩溃。②串行化让任务「一个完成才下一个」，从机制上消除默认并发，降低误用风险。③代价是吞吐降低，需要并行时手动executeOnExecutor。这反映了Android在「易用性」与「性能」间偏向安全的权衡。理解线程池配置才能在长任务队列中避免任务堆积和拒绝。",
    tags: ["AsyncTask", "线程池", "SERIAL_EXECUTOR", "串行执行"],
  },
  {
    id: "adae-ta-3",
    chapter: "adae-thread-async",
    level: 2,
    question: "HandlerThread和IntentService的原理与适用场景是什么？",
    answer:
      "HandlerThread：①原理——继承Thread，run()里调Looper.prepare()+Looper.loop()，让自己成为一个带Looper的消息循环线程。外部getLooper()拿到它的Looper，可构造Handler向它的MessageQueue发任务，任务在该线程串行执行。②特点——自带Looper的子线程，任务串行（一个MessageQueue），用完quit()释放Looper。③场景——需要在子线程串行处理一系列任务（如后台日志上报、有序的本地操作），比手动new Thread+Handler更规范。IntentService：①原理——继承Service，内部用一个HandlerThread+Handler，onStartCommand把每个Intent包装成Message发给HandlerThread串行处理，onHandleIntent在子线程执行，处理完自动stopSelf。②特点——本质是「带消息队列的后台Service」，任务串行、执行完自动销毁、比普通Service省心、优先级比纯线程高（不易被杀）。③场景——后台有序任务（下载、同步、上传），不需要持续运行。两者都是Handler机制的工程化封装：HandlerThread提供「带Looper的线程」，IntentService在此基础上加了Service生命周期管理。现代开发中可被WorkManager/协程替代。",
    tags: ["HandlerThread", "IntentService", "Looper", "Service"],
  },
  {
    id: "adae-ta-4",
    chapter: "adae-thread-async",
    level: 3,
    question: "AsyncTask已被废弃，现代Android异步方案有哪些？它们各自的优势是什么？",
    answer:
      "AsyncTask废弃后的现代异步方案：①Kotlin协程（首选）——suspend函数用同步写法写异步，结构化并发（coroutineScope自动管理生命周期，父取消子也取消），轻量（协程比线程省资源，可启十万级），与Lifecycle/ViewModel集成（viewModelScope/lifecycleScope），异常处理用try-catch自然。优势：最简洁、最安全、官方主推。②RxJava——基于Observable的响应式流，强大的操作符（map/filter/flatMap/zip）、线程调度（subscribeOn/observeOn）、背压处理。优势：复杂事件流编排、错误重试、组合能力强；缺点是学习曲线陡、过度使用致代码难读。③ListenableFuture/CompletableFuture——Future的增强，支持回调监听完成、链式组合。优势：轻量、Java生态友好；缺点是回调嵌套不如协程直观。④WorkManager——面向「需要保证执行」的后台任务（即使退出App/重启也执行），约束调度（网络/电量/充电时才跑）。优势：持久化、约束、系统级可靠，适合上传/同步。选型原则：UI相关异步用协程，复杂流用RxJava，保证执行的用WorkManager，Java遗留用ListenableFuture。协程是未来主流。",
    tags: ["协程", "RxJava", "WorkManager", "异步方案", "AsyncTask废弃"],
  },
];
