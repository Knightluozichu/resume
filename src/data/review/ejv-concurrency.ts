import type { ReviewQuestion } from "./types";

export const ejvConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "ejv-cc-1",
    chapter: "ejv-concurrency",
    level: 2,
    question: "volatile 保证什么、不保证什么？AtomicLong 如何解决 volatile 的局限？",
    answer:
      "volatile 保证：①可见性——一个线程对 volatile 变量的写入，其他线程立即可见（不会被缓存在寄存器或 CPU 缓存中）；②有序性——禁止指令重排序（通过内存屏障），如 Double-Checked Locking 中 volatile 防止对象在构造完成前被发布。volatile 不保证：原子性——`count++` 是读-改-写三步操作，volatile 只保证每次读/写是原子的，但不保证整个 `count++` 不可分割。两个线程同时 `count++` 可能读到相同的值，都加 1 后写回，结果只加了 1。AtomicLong 解决方案：`AtomicLong count` 的 `count.incrementAndGet()` 用 CAS（Compare-And-Swap）操作保证原子性——CPU 指令级别的原子操作，读取当前值、加 1、比较并交换，如果值被其他线程修改则重试。CAS 比 synchronized 更轻量（无锁、无阻塞），适合高并发计数场景。Java 8+ 还提供了 LongAdder，在高并发下性能更好（分段计数，减少 CAS 竞争）。",
    tags: ["volatile", "原子性", "AtomicLong"],
  },
  {
    id: "ejv-cc-2",
    chapter: "ejv-concurrency",
    level: 3,
    question: "Executors.newCachedThreadPool 和 newFixedThreadPool 各有什么问题？应该怎么正确创建线程池？",
    answer:
      "newCachedThreadPool 的问题：核心线程数为 0，最大线程数为 Integer.MAX_VALUE，队列为 SynchronousQueue——每提交一个任务如果没有空闲线程就创建新线程。在高负载下会无限制创建线程，导致 OOM（OutOfMemoryError：unable to create new native thread）或系统资源耗尽。newFixedThreadPool 的问题：核心线程数=最大线程数=n，队列为无界 LinkedBlockingQueue——线程数固定为 n，但任务队列无上限。在任务提交速度超过处理速度时，队列无限增长，导致 OOM（OutOfMemoryError：堆内存）。正确创建线程池的方式：直接用 ThreadPoolExecutor 构造器，手动配置：①核心线程数和最大线程数——根据 CPU 核数和任务类型（CPU 密集型 vs IO 密集型）设定；②有界队列——如 `new ArrayBlockingQueue<>(1000)`，防止队列无限增长；③拒绝策略——当线程数满且队列满时的处理方式（CallerRunsPolicy/AbortPolicy/DiscardPolicy），通常是 CallerRunsPolicy（让提交者自己执行）做背压。Joshua Bloch 的建议：不要用 Executors 的工厂方法，直接用 ThreadPoolExecutor。",
    tags: ["线程池", "ThreadPoolExecutor", "OOM"],
  },
  {
    id: "ejv-cc-3",
    chapter: "ejv-concurrency",
    level: 3,
    question: "ConcurrentHashMap 相比 Collections.synchronizedMap 有什么优势？它为什么不需要锁整个 Map？",
    answer:
      "ConcurrentHashMap 的优势：①更高的并发度——synchronizedMap 对整个 Map 加一把锁，所有操作（读/写）都串行化；ConcurrentHashMap（Java 8+）用 CAS + synchronized 锁单个桶（Node），不同桶的操作完全并行；②读操作无锁——get 操作不加锁，通过 volatile 读保证可见性；③弱一致性的迭代器——迭代时不需要加锁，迭代器反映的是创建时的或之后某个时刻的 Map 状态，不会抛 ConcurrentModificationException。synchronizedMap 的问题：①全锁——一个线程在 put，另一个线程连 get 都被阻塞；②迭代需外部同步——否则可能抛 ConcurrentModificationException。不需要锁整个 Map 的原因：①数据结构层面——Java 8 的 ConcurrentHashMap 用 Node 数组，每个桶（Node）可以独立加锁；②CAS 操作——put 时先尝试 CAS 写入空桶（无锁），冲突时才 synchronized 锁桶头节点；③读无锁——Node 的 val 和 next 是 volatile 的，读操作通过 volatile 读获取最新值；④size 用 LongAdder 风格的分散计数，避免 size 字段的竞争。",
    tags: ["ConcurrentHashMap", "并发集合", "锁"],
  },
  {
    id: "ejv-cc-4",
    chapter: "ejv-concurrency",
    level: 4,
    question: "什么是安全发布（safe publication）？不可变对象如何保证线程安全？final 字段在其中起什么作用？",
    answer:
      "安全发布：确保对象被正确地「发布」给其他线程——即一个线程创建的对象，其他线程看到时必须是完全构造好的状态，而不是部分构造的（如字段还未赋值）。不安全发布的后果：另一个线程可能看到对象的字段是默认值（0/null）而不是构造器设置的值，或者看到对象引用但对象还未完全初始化（指令重排序导致构造器调用在对象引用赋值之后）。安全发布的方式：①static final 字段——JVM 保证类初始化时 static final 字段对所有线程可见；②volatile 字段——写入 volatile 变量的 happen-before 后续读取；③synchronized——锁的释放 happen-before 后续获取；④final 字段——JMM 保证 final 字段在构造器完成时对所有线程可见（即使没有同步），但前提是构造器中没有把 this 引用泄漏（不要在构造器中启动线程或注册回调）。不可变对象保证线程安全的原因：①状态永不改变——不需要同步来防止并发修改；②final 字段保证可见性——所有 final 字段在构造完成后对其他线程可见；③没有 this 逸出——构造器不泄漏 this 引用。所以不可变对象可以自由共享，不需要任何同步。这是「不可变优先」原则的并发理论基础。",
    tags: ["安全发布", "不可变", "final", "JMM"],
  },
];
