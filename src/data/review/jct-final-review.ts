import type { ReviewQuestion } from "./types";

export const jctFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jct-fr-1",
    chapter: "jct-final-review",
    level: 2,
    question: "从「Java源码」到「程序执行」的完整旅程是什么？",
    answer:
      "完整旅程：①编写 .java 源文件；②javac 编译——词法分析→语法分析→语义分析→生成 .class 字节码文件。字节码是平台无关的中间格式；③类加载——ClassLoader 将 .class 加载到 JVM 内存。过程：加载（读取 class 文件生成 Class 对象）→验证（字节码安全检查）→准备（静态字段分配内存设默认值）→解析（符号引用转直接引用）→初始化（执行静态初始化块和静态字段赋值）。双亲委派模型保证核心类安全；④运行——JVM 解释器逐条解释字节码执行，热点代码（调用频繁的方法/循环）被 JIT 编译器编译为本地机器码缓存执行（混合模式）。JVM 内存模型：堆（对象实例+数组，GC 管理）、方法区/元空间（类信息+常量池+静态变量）、栈（方法栈帧：局部变量表+操作数栈）、程序计数器（当前执行指令地址）、本地方法栈（native 方法）；⑤GC——自动回收堆中无用对象。分代回收：新生代（Eden+S0+S1，Minor GC，复制算法）→老年代（Full GC，标记-清除/标记-整理）。",
    tags: ["编译", "类加载", "JVM"],
  },
  {
    id: "jct-fr-2",
    chapter: "jct-final-review",
    level: 3,
    question: "比较 Java 集合框架中 List、Set、Map 三大接口的核心特点和实现类。",
    answer:
      "List（有序可重复）：ArrayList（动态数组，get O(1)，中间增删 O(n)，最常用）、LinkedList（双向链表，首尾增删 O(1)，get O(n)）、Vector（线程安全的 ArrayList，已过时）、CopyOnWriteArrayList（写时复制，读无锁，适合读多写少）。Set（无序不重复）：HashSet（基于 HashMap，add O(1)，最常用）、LinkedHashSet（保持插入顺序）、TreeSet（基于 TreeMap，有序，O(log n)）。Map（键值映射，键唯一）：HashMap（哈希表+链表/红黑树，put/get O(1)，最常用，非线程安全）、LinkedHashMap（保持插入/访问顺序）、TreeMap（红黑树，键有序，O(log n)）、ConcurrentHashMap（线程安全，分段锁/CAS，高并发首选）、EnumMap（枚举键优化）、WeakHashMap（弱引用键，GC 回收）。选择原则：默认 ArrayList + HashMap；需要排序用 TreeSet/TreeMap；需要线程安全用 CopyOnWriteArrayList/ConcurrentHashMap；需要插入顺序用 LinkedHashSet/LinkedHashMap。",
    tags: ["集合", "List", "Map"],
  },
  {
    id: "jct-fr-3",
    chapter: "jct-final-review",
    level: 3,
    question: "Java 并发编程中有哪些同步工具？各自解决什么问题？",
    answer:
      "同步工具：①synchronized——内置锁，保证原子性+可见性+有序性，自动释放，适合简单同步。②ReentrantLock——显式锁，可中断、可超时、可公平、多 Condition，适合高级同步。③volatile——轻量级，保证可见性+禁止重排，不保证原子性，适合状态标志。④Atomic 原子类（AtomicInteger/AtomicReference）——CAS 无锁原子操作，适合计数器/状态机。⑤synchronized 集合 vs 并发集合——ConcurrentHashMap（高并发 Map）、CopyOnWriteArrayList（读多写少 List）、BlockingQueue（生产者-消费者队列，put/take 阻塞）。⑥CountDownLatch——等待 N 个线程完成（一次性，不可重置）。⑦CyclicBarrier——N 个线程互相等待到齐后继续（可重置）。⑧Semaphore——限制同时访问的线程数（资源许可）。⑨Phaser——增强版 CyclicBarrier，支持动态注册和分阶段。⑩LockSupport.park()/unpark()——线程阻塞/唤醒原语。使用原则：优先无锁（Atomic/CAS）→ volatile → synchronized → Lock → 并发工具类。避免过度同步（性能下降）和锁粒度过大（降低并发度）。",
    tags: ["并发", "同步", "锁"],
  },
  {
    id: "jct-fr-4",
    chapter: "jct-final-review",
    level: 4,
    question: "如果要设计一个高并发的 Java 后端服务，你会如何综合运用全书知识点？",
    answer:
      "高并发 Java 后端设计：①基础架构——用 Spring Boot 框架，注解+反射实现 IoC/DI（@RestController/@Autowired）；②数据模型——面向对象设计实体类（Employee/User），封装字段 private + getter/setter，继承体系（BaseEntity→User/Admin）；③接口抽象——定义 Service 接口（UserService），default 方法提供默认实现，函数式接口做策略注入（Comparator 排序、Predicate 过滤）；④集合+泛型——List<User> 管理用户列表，Map<Long, User> 按 ID 索引，泛型保证类型安全；⑤IO+Stream——try-with-resources 读写配置文件，Stream API 链式处理数据（filter+map+collect 统计报表）；⑥并发——ThreadPoolExecutor 线程池处理请求（CPU 密集 N+1，IO 密集 2N），ConcurrentHashMap 线程安全缓存，CompletableFuture 异步编排多任务，AtomicInteger 限流计数；⑦序列化——Jackson 序列化 JSON 响应，@JsonProperty 控制字段名；⑧网络——HttpClient 调用下游服务，超时+重试；⑨异常——全局异常处理（@ControllerAdvice），checked 异常用于可恢复外部错误，unchecked 用于编程错误；⑩JVM 调优——堆大小 -Xms/-Xmx，GC 策略（G1/ZGC），监控 GC 日志。核心：合理分层（Controller→Service→Repository），接口抽象解耦，并发控制资源，序列化通信，异常兜底。",
    tags: ["架构", "高并发", "综合应用"],
  },
];
