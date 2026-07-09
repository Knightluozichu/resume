import type { ReviewQuestion } from "./types";

export const apoStabilityMonitoringQuestions: ReviewQuestion[] = [
  {
    id: "apo-sm-1",
    chapter: "apo-stability-monitoring",
    level: 2,
    question: "ANR 的触发条件和常见原因是什么？如何预防和分析？",
    answer:
      "触发条件：①Activity——主线程5秒内未响应输入事件（触摸/按键）②Service——前台Service onCreate/onStartCommand执行超20秒后台超200秒 ③BroadcastReceiver——前台onReceive超10秒后台超60秒 ④ContentProvider——publish超10秒。常见原因：①主线程做文件IO/数据库操作/网络请求 ②主线程锁竞争——等待其他线程释放锁 ③Binder调用阻塞——跨进程通信对方进程未及时响应 ④主线程大量计算——JSON解析、排序、正则匹配 ⑤主线程频繁GC——内存抖动导致Stop-The-World。预防：①StrictMode检测主线程磁盘IO/网络违规 ②所有耗时操作用协程/线程池异步 ③避免主线程持有锁用CAS或细粒度锁 ④Binder调用设超时和异步 ⑤减少内存抖动避免GC。分析：ANR后系统生成/data/anr/traces.txt用adb pull导出查看main线程调用栈定位阻塞位置。线上用WatchDog机制监控主线程响应超时后抓取调用栈上报。",
    tags: ["ANR", "主线程阻塞", "traces.txt", "StrictMode", "WatchDog"],
  },
  {
    id: "apo-sm-2",
    chapter: "apo-stability-monitoring",
    level: 3,
    question: "Java Crash 和 Native Crash 有什么区别？如何分别捕获？",
    answer:
      "区别：①Java Crash——JVM层面的未捕获异常（NullPointerException/OOM等）有完整Java堆栈可通过try-catch捕获 ②Native Crash——C/C++层面的信号错误（SIGSEGV段错误/SIGABRT abort/SIGBUS总线错误）发生在JNI层或底层库Java try-catch无法捕获进程直接终止 ③Java Crash堆栈可读性好（类名+方法名+行号）Native Crash需符号表解析 ④Java Crash可恢复（UncaughtExceptionHandler后可选择不退出）Native Crash不可恢复（信号已导致内存损坏）。Java Crash捕获：实现Thread.UncaughtExceptionHandler接口用Thread.setDefaultUncaughtExceptionHandler()注册全局处理器在uncaughtException()回调中收集堆栈设备信息自定义日志写入文件并上传服务器最后交默认处理器终止进程。Native Crash捕获：用Google Breakpad或Crashpad库——注册信号处理器（sigaction）在信号回调中安全生成minidump（避免崩溃进程中做复杂操作）minidump含寄存器栈内存加载的共享库信息上传到服务器后用符号表（.so文件）解析出C++函数名行号。Crashlytics自动集成两者捕获。",
    tags: ["Java Crash", "Native Crash", "UncaughtExceptionHandler", "Breakpad"],
  },
  {
    id: "apo-sm-3",
    chapter: "apo-stability-monitoring",
    level: 4,
    question: "设计一个线上性能监控方案，覆盖启动时间、帧率、内存三个维度。",
    answer:
      "三维度监控方案：①启动时间监控——Application.attachBaseContext()记录冷启动开始首个Activity.onWindowFocusChanged()记录结束差值为冷启动时间。分段上报：Application.onCreate时间、首个Activity创建时间。用Firebase Performance Trace或自定义上报。按版本/设备/渠道聚合统计P50/P90/P99 ②帧率监控——Choreographer.postFrameCallback注册FrameCallback doFrame()中计算两次frameTimeNanos差值差值/16ms-1=丢帧数。每秒统计FPS低于50时记录当前Activity名和操作上下文并上报。统计「严重卡顿」（连续丢帧>3帧次数）③内存监控——每30秒采样Runtime.totalMemory()-freeMemory()（已用堆内存）和Debug.getNativeHeapAllocatedSize()（Native内存）。内存使用率超80%时预警。OOM前最后一次采样上报。结合LeakCanary在Debug构建检测泄漏Release构建上报内存趋势。上报策略：批量上报（每60秒或满50条）用WorkManager在WiFi时上传避免监控本身影响性能。聚合维度：版本/设备/Android版本/渠道P50/P90/P99分位值。告警阈值：启动P90>3s、帧率低于50超10%会话、内存P90>maxMemory*80%。",
    tags: ["线上监控", "启动时间", "帧率", "内存监控", "综合设计"],
  },
  {
    id: "apo-sm-4",
    chapter: "apo-stability-monitoring",
    level: 4,
    question: "稳定性优化的优先级和闭环是什么？如何持续降低 Crash 率？",
    answer:
      "优先级：①启动Crash——用户根本进不去App最高优先级 ②主流程Crash——首页/核心功能崩溃影响所有用户 ③边缘场景Crash——特定设备/操作触发 ④ANR——影响体验但不一定杀进程 ⑤OOM——可预防和降级。闭环：采集（Crashlytics自动收集+自定义监控）→上报（批量+WiFi+压缩）→分析（堆栈聚类归因+设备/版本分布+复现路径）→修复（热修复紧急+版本迭代常规）→验证（监控Crash率变化）→预防（Lint+CI+测试）。持续降低Crash率方法：①每日查看Crashlytics新增Crash按影响用户数排序 ②Top 10 Crash优先修复 ③热修复框架（Tinker/Robust）紧急修复不用等发版 ④Crash归因到代码行+修复+回归测试 ⑤灰度发布——先5%用户灰度监控Crash率无异常后全量 ⑥新增功能加try-catch兜底 ⑦Null Safety——Kotlin的?和?:语法减少NPE ⑧CI集成Lint+静态分析+单元测试 ⑨Monkey/Fuzz测试发现边缘场景 ⑩设备矩阵测试——覆盖主流机型和Android版本。目标Crash Rate<0.1%。",
    tags: ["稳定性优先级", "Crash率", "热修复", "灰度发布", "监控闭环"],
  },
];
