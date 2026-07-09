import type { ReviewQuestion } from "./types";

export const jvtThreadAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "jvt-ta-1",
    chapter: "jvt-thread-analysis",
    level: 2,
    question: "Java 线程有哪几种状态？各状态之间如何转换？",
    answer:
      "Java 线程有6种状态（Thread.State 枚举）：①NEW——已创建未启动（new Thread() 未调 start）；②RUNNABLE——可运行（已 start，可能正在执行或在就绪队列等 CPU），Java 把「运行中」和「就绪」合并为 RUNNABLE；③BLOCKED——阻塞等待 monitor 锁（synchronized），其他线程持有该锁，本线程等获取；④WAITING——无限期等待，需被其他线程显式唤醒，Object.wait()（无超时）、Thread.join()（无超时）、LockSupport.park() 触发；⑤TIMED_WAITING——限期等待，超时自动唤醒，Thread.sleep(ms)、Object.wait(ms)、Thread.join(ms)、LockSupport.parkNanos(ns) 触发；⑥TERMINATED——线程执行完毕或异常退出。转换：NEW --start()--> RUNNABLE；RUNNABLE --wait()/join()--> WAITING --notify()/notifyAll()--> RUNNABLE；RUNNABLE --sleep(ms)/wait(ms)--> TIMED_WAITING --超时/notify--> RUNNABLE；RUNNABLE --synchronized竞争失败--> BLOCKED --获取锁--> RUNNABLE；RUNNABLE --run结束--> TERMINATED。注意：java.util.concurrent.locks 的 Lock 不满足锁时是 WAITING（Condition.await）而非 BLOCKED（BLOCKED 仅指 synchronized 等锁）。",
    tags: ["线程状态", "状态转换"],
  },
  {
    id: "jvt-ta-2",
    chapter: "jvt-thread-analysis",
    level: 3,
    question: "死锁的四个必要条件是什么？如何在 Java 中检测和避免死锁？",
    answer:
      "死锁四个必要条件（缺一不可）：①互斥——资源同一时刻只能被一个线程占用；②持有并等待——线程持有资源的同时等待其他资源；③不可剥夺——资源不能被强行夺走，只能由持有者主动释放；④循环等待——多个线程形成环形等待链（A等B的资源，B等C的，C等A的）。检测：①jstack 自动检测——jstack <pid> 末尾打印 Found one Java-level deadlock，列出死锁线程和互持锁；②Arthas thread -b 找阻塞源头；③ThreadMXBean.findDeadlockedThreads() 编程检测。避免策略：①破坏循环等待——统一锁顺序，所有线程按相同顺序获取锁（如按账户 id 排序后再锁）；②破坏持有并等待——一次性获取所有锁（tryLock 超时失败则释放已有锁重试）；③破坏不可剥夺——用 ReentrantLock.tryLock(timeout) 带超时，获取失败释放已有锁；④Lock 检测——juc 的锁比 synchronized 灵活，支持 tryLock 和中断。经典场景：转账——A给B转账锁A再锁B，B给A转账锁B再锁A，顺序相反就死锁；修复：按 id 排序，始终先锁 id 小的账户。",
    tags: ["死锁", "锁竞争"],
  },
  {
    id: "jvt-ta-3",
    chapter: "jvt-thread-analysis",
    level: 3,
    question: "如何用 jstack 分析线程长时间 BLOCKED 的问题？",
    answer:
      "分析线程 BLOCKED 流程：①jstack <pid> dump 线程栈；②找 BLOCKED 线程——grep BLOCKED 或看线程状态，BLOCKED 块会显示 waiting to lock <0xaddr> (a ClassName)，即等哪个对象锁；③找锁持有者——jstack 中搜索该锁地址 0xaddr，找到 locked <0xaddr> 的线程，那个线程就是持锁者，看其调用栈在做什么（可能耗时操作或死循环持锁不放）；④确认持续性——连续 dump 三次，若持锁者一直不变说明持锁线程卡住（死循环/IO阻塞/长事务），若持锁者变化说明只是高并发竞争（可优化减少锁粒度）。常见根因：①持锁线程做慢操作——如 synchronized 方法里查数据库，应缩小锁范围只锁必要部分；②死锁——A等B的锁、B等A的锁，jstack 自动检测；③锁粒度过大——整段代码 synchronized，改为细粒度锁或读写锁 ReentrantReadWriteLock；④线程池耗尽——非锁阻塞但表现类似，看是否 WAITING 在线程池队列。修复方向：缩小锁范围、换细粒度锁、避免持锁做IO、用并发容器（ConcurrentHashMap）替代同步包装。",
    tags: ["jstack", "BLOCKED"],
  },
  {
    id: "jvt-ta-4",
    chapter: "jvt-thread-analysis",
    level: 4,
    question: "线程池配置不当会导致哪些问题？如何诊断线程池耗尽？",
    answer:
      "线程池配置不当的后果：①核心线程数过小——任务排队，响应慢，CPU 利用率低；②最大线程数过大——线程过多导致频繁上下文切换（CPU 开销大）、内存占用高（每线程约1MB栈）、可能 OOM unable to create new native thread；③队列过大——任务堆积内存溢出（如 LinkedBlockingQueue 无界默认 Integer.MAX_VALUE）；④拒绝策略不当——AbortPolicy 抛异常可能让调用方崩溃，DiscardPolicy 静默丢任务难发现。诊断线程池耗尽：①jstack 看线程状态——若大量线程 WAITING 在 ThreadPoolExecutor 的队列（getTask），说明任务少线程空闲；若大量 RUNNABLE 且 CPU 高说明任务多在跑；若无新线程创建且队列满说明达 maxPool；②看线程池指标——ThreadPoolExecutor 提供 getActiveCount/getQueue().size()/getCompletedTaskCount()，自定义监控埋点上报；③现象——新任务提交被拒（RejectedExecutionException）或响应超时。合理配置：CPU 密集型 corePool=CPU核数+1，IO 密集型 corePool=CPU核数*2*(1+等待/计算时间比)，队列用有界队列防溢出，拒绝策略用 CallerRunsPolicy 让提交线程自己跑形成背压，关键业务单独线程池隔离防互相拖垮。",
    tags: ["线程池", "诊断"],
  },
];
