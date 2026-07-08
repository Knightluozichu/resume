import type { ReviewQuestion } from "./types";

export const jctConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "jct-cc-1",
    chapter: "jct-concurrency",
    level: 2,
    question: "创建线程有哪些方式？为什么推荐用线程池而不是直接 new Thread()？",
    answer:
      "创建线程方式：①extends Thread 重写 run()——`new MyThread().start()`；②implements Runnable——`new Thread(runnable).start()`（推荐，解耦任务与线程）；③implements Callable + FutureTask——有返回值，`Future<Integer> f = executor.submit(callable); int result = f.get()`；④线程池——`ExecutorService pool = Executors.newFixedThreadPool(n); pool.submit(runnable)`。推荐线程池原因：①资源控制——无限制 new Thread 会导致 OOM（每个线程约 1MB 栈空间），线程池限制最大线程数；②减少开销——线程创建/销毁有开销，池化复用线程；③管理能力——线程池提供队列、拒绝策略、监控等；④统一编排——shutdown 优雅关闭，CompletableFuture 链式异步。生产环境禁止 Executors.newFixedThreadPool/newCachedThreadPool（队列无界或线程无界导致 OOM），必须用 ThreadPoolExecutor 手动配置七参数：corePoolSize、maximumPoolSize、keepAliveTime、unit、workQueue、threadFactory、handler。",
    tags: ["线程", "线程池", "Executor"],
  },
  {
    id: "jct-cc-2",
    chapter: "jct-concurrency",
    level: 3,
    question: "synchronized 和 ReentrantLock 有什么区别？各自的使用场景？",
    answer:
      "区别：①实现——synchronized 是 JVM 内置关键字（monitorenter/monitorexit 指令），ReentrantLock 是 java.util.concurrent.locks.Lock 接口的实现类（基于 AQS）；②释放——synchronized 自动释放（代码块结束或异常），ReentrantLock 必须手动 unlock()（通常在 finally 中），忘记 unlock 导致死锁；③中断——synchronized 不可中断（等锁时不响应 interrupt），ReentrantLock.lockInterruptibly() 可被中断；④超时——synchronized 无超时，ReentrantLock.tryLock(timeout) 支持超时获取；⑤公平性——synchronized 非公平，ReentrantLock 可选公平/非公平；⑥条件变量——synchronized 一个 wait/notify 队列，ReentrantLock 可多个 Condition 精确唤醒；⑦性能——JVM 对 synchronized 做了锁升级优化（偏向锁→轻量级锁→重量级锁），性能与 ReentrantLock 接近。使用场景：简单同步用 synchronized（简洁不易出错），需要超时/中断/多条件/公平锁用 ReentrantLock。原则：优先 synchronized，只有需要高级功能时才用 ReentrantLock。",
    tags: ["synchronized", "ReentrantLock", "锁"],
  },
  {
    id: "jct-cc-3",
    chapter: "jct-concurrency",
    level: 3,
    question: "volatile 关键字的作用是什么？它和 synchronized 有什么区别？",
    answer:
      "volatile 两个作用：①保证可见性——volatile 变量的写操作立即刷新到主内存，读操作从主内存读取（而非线程工作内存/CPU 缓存），所有线程都能看到最新值；②禁止指令重排序——在 volatile 变量的读写前后插入内存屏障，防止编译器/CPU 重排序。volatile 不保证原子性——`volatile int count; count++` 仍然是读-改-写三步操作，多线程下不安全。volatile vs synchronized：①volatile 只保证可见性和有序性，不保证原子性；synchronized 保证原子性+可见性+有序性；②volatile 轻量级（不阻塞线程），synchronized 重量级（加锁阻塞）；③volatile 适合状态标志（`volatile boolean running = true`），synchronized 适合复合操作。volatile 典型场景：DCL 单例模式中 `private static volatile Singleton instance`——防止 new Singleton() 的指令重排序（分配内存→初始化→引用赋值 可能重排为 分配→引用赋值→初始化，其他线程拿到未初始化的对象）。CAS+volatile 是无锁并发的核心：AtomicInteger 用 volatile value 保证可见性，CAS 保证原子性。",
    tags: ["volatile", "可见性", "指令重排"],
  },
  {
    id: "jct-cc-4",
    chapter: "jct-concurrency",
    level: 4,
    question: "ThreadPoolExecutor 的工作流程是什么？如何合理配置线程池参数？",
    answer:
      "工作流程：①提交任务时，如果当前线程数 < corePoolSize，创建新核心线程执行；②如果线程数 >= corePoolSize，任务入 workQueue 等待；③如果队列已满且线程数 < maximumPoolSize，创建非核心线程执行；④如果队列满且线程数 >= maximumPoolSize，触发拒绝策略。线程空闲超过 keepAliveTime 的非核心线程被回收。拒绝策略：AbortPolicy（默认，抛 RejectedExecutionException）、CallerRunsPolicy（调用者线程执行）、DiscardPolicy（静默丢弃）、DiscardOldestPolicy（丢弃队列最老任务再提交）。参数配置：CPU 密集型——corePoolSize = N+1（N=CPU核数），多一个线程在偶尔的页面缺失等暂停时保证 CPU 不闲；IO 密集型——corePoolSize = 2N（IO 等待时 CPU 可处理其他线程）；混合型——根据 IO 等待比例估算。队列选择：有界队列（ArrayBlockingQueue）防止 OOM，无界队列（LinkedBlockingQueue）容易积压。实战推荐：用 ThreadPoolExecutor 手动创建，避免 Executors 工厂方法（队列/线程无界风险）。",
    tags: ["线程池", "ThreadPoolExecutor", "拒绝策略"],
  },
];
