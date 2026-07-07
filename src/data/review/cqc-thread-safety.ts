import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · 线程安全复习题 */
export const cqcThreadSafetyQuestions: ReviewQuestion[] = [
  {
    id: "cqc-thread-safety-1",
    chapter: "cqc-thread-safety",
    level: 1,
    question: "什么是竞态条件？为什么 `count++` 不是线程安全的？",
    answer:
      "竞态条件：多线程同时读写共享数据，且读-改-写操作不是原子执行时，结果不可预测。\n\n`count++` 不是原子的，实际是三步：\n1. 读 count 的值到寄存器\n2. 寄存器值加 1\n3. 写回 count\n\n两个线程同时执行：\n- 线程A 读 count=0\n- 线程B 读 count=0（A 还没写回）\n- 线程A 写 count=1\n- 线程B 写 count=1（应为 2，丢失一次更新）\n\n10 个线程各增 1 万次，期望 10 万，实际可能只有 8 万多。\n\n修复：用 `Interlocked.Increment(ref count)`（原子操作）或 `lock`（互斥锁）。",
    tags: ["竞态条件", "count++", "非原子", "线程安全"],
  },
  {
    id: "cqc-thread-safety-2",
    chapter: "cqc-thread-safety",
    level: 2,
    question: "lock、Interlocked、并发集合三种同步策略各自的适用场景是什么？优先级如何？",
    answer:
      "lock（互斥锁）：适合保护多步复合操作的临界区，如「检查字典是否有键、没有则添加」。简单可靠但串行化。\n\nInterlocked（原子操作）：适合简单数值操作，如 count++、累加、标志位切换。无锁最快，但只能做单一原子操作。\n\n并发集合（ConcurrentDictionary 等）：适合多线程读写集合。内置细粒度锁或无锁 CAS，比自己写 lock 更高效安全。\n\n优先级：能用并发集合就不用 lock（集合已内置同步），能用 Interlocked 就不用 lock（无锁更快），必须保护复合操作时才用 lock。\n\n示例：\n- count++ → Interlocked.Increment\n- 多线程字典写入 → ConcurrentDictionary\n- 多步复合操作 → lock(私有对象)",
    tags: ["lock", "Interlocked", "并发集合", "优先级", "场景"],
  },
  {
    id: "cqc-thread-safety-3",
    chapter: "cqc-thread-safety",
    level: 3,
    question: "为什么不能 `lock(this)` 或 `lock(typeof(T))`？应该用什么替代？",
    answer:
      "`lock(this)` 的危险：this 是公开可见的对象，外部代码可能 lock 你的实例，导致你的内部锁和外部锁互相阻塞，产生不可预知的死锁。你无法控制外部代码是否 lock 你的实例。\n\n`lock(typeof(T))` 更危险：Type 对象是全 AppDomain 共享的单例，锁住它会影响所有使用该类型的代码，极易死锁。\n\n替代方案：用私有只读对象作为锁：\n```\nprivate readonly object _lock = new object();\n```\n\n确保只有你自己的代码能引用和锁定这个对象，锁的范围完全受控，不会与外部代码冲突。\n\n最佳实践：每个需要同步的类都定义自己的 `_lock` 对象，不公开、不共享。",
    tags: ["lock(this)", "typeof", "私有锁对象", "死锁"],
  },
  {
    id: "cqc-thread-safety-4",
    chapter: "cqc-thread-safety",
    level: 4,
    question: "综合分析：一个系统有多个线程向共享的 `Dictionary<string, List<int>>` 添加数据，偶发崩溃和数据丢失。你会如何排查和修复？",
    answer:
      "问题诊断：`Dictionary` 不是线程安全的，多线程同时写会导致哈希桶链表损坏，可能死循环、数据丢失或 NullReferenceException。即使一个写一个读也不安全（rehash 时）。嵌套的 `List<int>` 也有并发添加的问题。\n\n修复方案（按复杂度递增）：\n\n方案1：用 ConcurrentDictionary + lock 保护内部 List\n```\nvar dict = new ConcurrentDictionary<string, List<int>>();\n// GetOrAdd 获取 List 后仍需 lock 保护 List 的写入\nlock (list) { list.Add(value); }\n```\n缺点：需要双层同步，容易出错。\n\n方案2：用 ConcurrentDictionary + ConcurrentBag（如果不需要 List 的顺序）\n```\nvar dict = new ConcurrentDictionary<string, ConcurrentBag<int>>();\ndict.GetOrAdd(key, _ => new ConcurrentBag<int>()).Add(value);\n```\n优点：完全无锁（ConcurrentBag 无锁 CAS），线程安全。\n\n方案3：用 ConcurrentDictionary<string, int> 直接计数（如果只需聚合）\n```\ndict.AddOrUpdate(key, 1, (_, old) => old + 1);\n```\n\n方案4：用 Channel<T> 生产者-消费者模式（如果需要顺序处理）\n- 多个生产者写入 Channel\n- 单个消费者线程读取处理\n- 完全避免共享数据竞争\n\n推荐：方案2最简洁安全。如果需要 List 语义，用方案1但务必 lock 内部 List。如果可以改架构，方案4最可靠。",
    tags: ["综合", "Dictionary并发", "ConcurrentDictionary", "ConcurrentBag", "Channel"],
  },
];
