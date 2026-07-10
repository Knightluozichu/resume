import type { ReviewQuestion } from "./types";

/** CLR via C# · 总复习复习题 */
export const cvcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cvc-final-review-1",
    chapter: "cvc-final-review",
    level: 1,
    question: `CLR via C# 全书四大板块是什么？它们之间的因果关系是什么？`,
    answer:
      `四大板块：\n1. **CLR 基础**（第 1-2 章）：学习地图与 CLR 执行模型。IL 编译、JIT、程序集加载。\n2. **类型设计**（第 3-5 章）：类型基础、接口设计、值类型与引用类型。类型对象、方法表、内存布局。\n3. **内存 GC**（第 6-7 章）：GC 与内存、异常处理。分代回收、Dispose 模式、异常栈展开。\n4. **高级 CLR**（第 8-10 章）：异步与 CLR、反射与特性、总复习。async 状态机、反射元数据查询。\n\n因果关系：\n- 执行模型是地基——定义代码如何运行（IL → JIT → 机器码）。不理解执行模型，类型系统无从解释。\n- 类型系统建立在地基上——类型对象由 CLR 加载元数据构建，方法表是 JIT 编译后方法地址的存储位置。\n- 内存管理依赖类型系统——GC 遍历引用图需要类型信息确定字段布局，值类型/引用类型的差异决定内存分配位置。\n- 高级机制综合前三者——async 依赖线程池（执行模型）+ 状态机内存分配（内存管理）；反射操作元数据（执行模型）+ 类型对象（类型系统）。\n\n跳过任何一层，上层知识就会悬空。`,
    tags: ["四大板块", "因果链", "总复习"],
  },
  {
    id: "cvc-final-review-2",
    chapter: "cvc-final-review",
    level: 2,
    question: `描述一个引用类型对象从 \`new\` 到被 GC 回收的完整过程中，CLR 做了哪些工作？`,
    answer:
      `完整过程：\n\n**1. 创建（new）**：\n- CLR 计算对象大小（从类型对象的字段布局信息获取）\n- 在 GC 堆的 Gen0 分配内存\n- 内存头部写入类型指针（Type Handle，指向类型对象）\n- 同步索引块初始化（用于 lock/GetHashCode）\n- 调用构造函数链（先基类后子类）初始化字段\n- 返回对象引用\n\n**2. 使用**：\n- 方法调用：JIT 将方法 IL 编译为机器码（首次调用），通过类型指针 → 方法表查找方法地址\n- 虚方法分派：通过类型指针 → 方法表 → 指向子类 override 的实现\n- 字段访问：通过类型对象的字段布局信息确定偏移量\n\n**3. GC 回收**：\n- GC 从根（栈变量、静态字段、寄存器、freachable 队列）出发遍历引用图\n- 标记所有可达对象\n- 不可达对象如果无 Finalizer → 直接回收内存\n- 不可达对象如果有 Finalizer → 移入 freachable 队列 → 终结器线程调用 Finalizer → 下次 GC 回收\n- 如果对象已 Dispose 并调用 SuppressFinalize → 不进 freachable，一次 GC 回收\n- 存活对象晋升：Gen0 → Gen1 → Gen2\n\n**4. 内存归还**：\n- Gen0/Gen1 回收后压缩内存（移动对象消除碎片）\n- Gen2/LOH 回收通常不压缩（LOH 从不压缩）\n- 更新所有引用的指针（压缩后对象地址变了）`,
    tags: ["对象生命周期", "GC", "new", "方法分派"],
  },
  {
    id: "cvc-final-review-3",
    chapter: "cvc-final-review",
    level: 3,
    question: `一个开发者说「我不需要学 CLR，C# 和 Java 差不多」。请用三个具体的技术差异反驳这个观点。`,
    answer:
      `三个 CLR 特有的技术差异：\n\n1. **值类型 vs 引用类型**：\n   Java 的基本类型（int、double）和对象类型（Integer、Double）是分离的——Integer 是引用类型，autoboxing 隐藏了性能代价。C# 的值类型（struct）是 CLR 的一等公民——\`List<int>\` 零装箱，\`Point struct\` 在栈上分配。不理解 CLR 的值类型/引用类型差异，C# 开发者会在热路径上意外装箱（用 ArrayList 而非 List<int>），产生大量 GC 压力。\n\n2. **GC 分代 + LOH**：\n   CLR 的 GC 有三代 + 大对象堆（LOH），LOH >= 85000 字节不压缩。Java 的 G1/ZGC 分代策略不同。CLR 开发者需要知道：大对象直接进 Gen2（Full GC 才回收），LOH 不压缩导致碎片。在循环中拼接大字符串（s += chunk）在 CLR 中可能触发 LOH 碎片——需要用 StringBuilder。Java 开发者可能不知道这个 CLR 特有的阈值。\n\n3. **async/await 状态机 + SynchronizationContext**：\n   C# 的 async/await 被编译器转换为状态机，SynchronizationContext 决定 await 后的线程。在 UI 线程调用 .Result 会死锁——因为 await 后的代码试图回到被阻塞的 UI 线程。Java 的 CompletableFuture 没有等价的 SynchronizationContext 机制。CLR 开发者必须理解 ConfigureAwait(false) 的作用——在库代码中避免死锁。Java 开发者转到 C# 会在异步代码中踩坑。\n\n总结：CLR 的值类型系统、GC 分代策略、async/SynchronizationContext 是 C# 特有的运行时机制。不理解这些，从 Java 转来的开发者会写出装箱、LOH 碎片、async 死锁的代码。`,
    tags: ["CLR vs Java", "值类型", "GC分代", "async死锁"],
  },
  {
    id: "cvc-final-review-4",
    chapter: "cvc-final-review",
    level: 4,
    question: `设计一个高性能的缓存服务，要求：异步加载、自动过期、线程安全、可监控。请说明你的设计中涉及哪些 CLR 知识，以及关键实现细节。`,
    answer:
      `缓存服务设计：\n\n\`\`\`csharp\npublic class AsyncCache<TKey, TValue> where TKey : notnull\n{\n    private readonly ConcurrentDictionary<TKey, CacheEntry> _cache = new();\n    private readonly Func<TKey, CancellationToken, Task<TValue>> _loader;\n    private readonly TimeSpan _ttl;\n\n    public AsyncCache(Func<TKey, CancellationToken, Task<TValue>> loader, TimeSpan ttl)\n    {\n        _loader = loader;\n        _ttl = ttl;\n    }\n\n    public async ValueTask<TValue> GetAsync(TKey key, CancellationToken ct = default)\n    {\n        if (_cache.TryGetValue(key, out var entry))\n        {\n            if (!entry.IsExpired)\n                return entry.Value;  // 同步完成，零堆分配（ValueTask）\n        }\n\n        // 异步加载\n        var value = await _loader(key, ct).ConfigureAwait(false);\n        _cache[key] = new CacheEntry(value, DateTime.UtcNow + _ttl);\n        return value;\n    }\n\n    private record CacheEntry(TValue Value, DateTime ExpiresAt)\n    {\n        public bool IsExpired => DateTime.UtcNow > ExpiresAt;\n    }\n}\n\`\`\`\n\n涉及的 CLR 知识：\n\n1. **类型系统**：\n   - 泛型 \`TKey, TValue\` 避免装箱——\`Dictionary<int, string>\` 的 key 不会装箱\n   - \`where TKey : notnull\` 约束确保引用类型 key 不为 null\n   - \`record CacheEntry\` 是值语义的引用类型——record 自动生成 Equals/GetHashCode\n\n2. **内存管理**：\n   - \`ConcurrentDictionary\` 是引用类型，分配在 GC 堆\n   - CacheEntry 是 record（class），也分配在堆上——过期后由 GC 回收\n   - 无 IDisposable 需求——TValue 如果是 IDisposable，需要在过期时 Dispose\n   - 过期清理：可以用 Timer 定期扫描，或惰性清理（GetAsync 时检查）\n\n3. **异步**：\n   - \`ValueTask<TValue>\` 而非 \`Task<TValue>\`——缓存命中时同步完成，零堆分配\n   - \`ConfigureAwait(false)\` 避免 SynchronizationContext 死锁——库代码最佳实践\n   - \`CancellationToken\` 支持取消——避免长时间等待\n   - 编译器将 GetAsync 转换为状态机\n\n4. **线程安全**：\n   - \`ConcurrentDictionary\` 使用细粒度锁——不同 key 的读写不互相阻塞\n   - \`TryGetValue\` + 赋值不是原子的——可能有多次加载（thundering herd）\n   - 解决方案：用 \`ConcurrentDictionary.GetOrAdd\` + \`Lazy<Task<TValue>>\` 去重\n\n5. **异常处理**：\n   - \`_loader\` 可能抛异常——异常存储在返回的 Task 中，调用者 await 时重新抛出\n   - 缓存不应存储失败结果——异常后不写入 _cache，下次请求重新加载\n   - \`CancellationToken\` 抛 \`OperationCanceledException\`——不缓存\n\n6. **反射（监控）**：\n   - 暴露 \`GetStats()\` 返回缓存命中率、条目数\n   - 用反射或源生成器生成 JSON 报告\n   - 可用 \`[MetricName(\"cache_hits\")]\` 特性标注监控字段\n\n7. **GC 优化**：\n   - ValueTask 在缓存命中时零分配——高频查询无 GC 压力\n   - 缓存未命中时分配 CacheEntry——但每 key 只分配一次\n   - 大量过期 entry 需要清理——可以 WeakReference 避免持有引用\n\n总结：一个缓存服务涉及类型系统（泛型/record）、内存管理（GC/分配优化）、异步（ValueTask/状态机）、线程安全（ConcurrentDictionary）、异常处理（Task 中的异常）、反射（监控特性）。CLR 知识贯穿设计的每个决策。`,
    tags: ["缓存设计", "ValueTask", "ConcurrentDictionary", "async", "综合应用"],
  },
];
