import type { ReviewQuestion } from "./types";

/** CLR via C# · GC与内存复习题 */
export const cvcGcMemoryQuestions: ReviewQuestion[] = [
  {
    id: "cvc-gc-memory-1",
    chapter: "cvc-gc-memory",
    level: 1,
    question: "CLR 的 GC 分代回收将堆分为几代？每代的特点是什么？",
    answer:
      "CLR 将 GC 堆分为 3 代 + 大对象堆（LOH）：\n\n1. **Gen 0（第 0 代）**：新创建的小对象分配在此。回收频率最高，成本最低（只扫描 Gen0 中的少量对象）。大部分临时对象在 Gen0 就被回收。\n\n2. **Gen 1（第 1 代）**：Gen0 回收后存活的对象晋升到 Gen1。作为 Gen0 和 Gen2 之间的缓冲区，回收成本中等（扫描 Gen0 + Gen1）。\n\n3. **Gen 2（第 2 代）**：Gen1 回收后存活的对象晋升到 Gen2。长生命周期对象。回收成本最高（扫描整个堆），称为 Full GC。Gen2 回收暂停所有线程（Stop-The-World）。\n\n4. **LOH（大对象堆）**：>= 85000 字节的对象直接分配在 LOH。在 GC 视角下属于 Gen2——回收 LOH 等于 Full GC。LOH 不做内存压缩（大对象复制成本太高），容易产生内存碎片。\n\n核心假设：**越新的对象越快变成垃圾**。分代策略使得大部分垃圾在 Gen0 就被快速回收，不需要扫描整个堆。",
    tags: ["分代回收", "Gen0", "Gen2", "LOH", "Full GC"],
  },
  {
    id: "cvc-gc-memory-2",
    chapter: "cvc-gc-memory",
    level: 2,
    question: "有 Finalizer 的对象为什么需要两次 GC 才能回收？这对性能有什么影响？",
    answer:
      "两次 GC 的原因：\n\n1. **第一次 GC**：GC 发现对象不可达（没有根引用），但该对象有 Finalizer。GC 不直接回收它，而是将其移入 freachable 队列（finalization reachable queue）。freachable 队列本身是一个根——这使得对象重新「可达」，不能被回收。\n\n2. **终结器线程执行**：CLR 的专用终结器线程从 freachable 队列取出对象，调用其 Finalizer（~ClassName()）。调用完成后，对象从 freachable 队列移除，此时对象才真正不可达。\n\n3. **第二次 GC**：对象现在真正不可达，被回收。\n\n性能影响：\n1. **内存延迟释放**：对象在 freachable 队列中等待，内存不能立即回收。如果大量对象有 Finalizer，内存居高不下。\n2. **两次 GC 开销**：对象需要被 GC 扫描两次。\n3. **终结器线程瓶颈**：终结器线程是单线程的，Finalizer 执行慢会阻塞其他对象的回收。\n4. **执行顺序不确定**：Finalizer 的调用顺序和时机都不确定，不能依赖。\n\n解决方案：实现 IDisposable，用 Dispose() 主动释放资源，调用 GC.SuppressFinalize(this) 取消 Finalizer——对象只需一次 GC 即可回收。",
    tags: ["Finalizer", "freachable", "两次GC", "性能"],
  },
  {
    id: "cvc-gc-memory-3",
    chapter: "cvc-gc-memory",
    level: 3,
    question: "实现一个标准的 Dispose 模式，并解释 Dispose(true)、Dispose(false) 和 GC.SuppressFinalize 的作用。",
    answer:
      "标准 Dispose 模式：\n\n```csharp\npublic class ResourceHolder : IDisposable\n{\n    private IntPtr _unmanagedHandle;  // 非托管资源\n    private FileStream? _stream;      // 托管资源\n    private bool _disposed = false;\n\n    public void Dispose()\n    {\n        Dispose(true);\n        GC.SuppressFinalize(this);\n    }\n\n    protected virtual void Dispose(bool disposing)\n    {\n        if (_disposed) return;\n\n        if (disposing)\n        {\n            // disposing=true：由 Dispose() 调用\n            // 安全释放托管资源\n            _stream?.Dispose();\n        }\n\n        // 无论 disposing 值，都释放非托管资源\n        if (_unmanagedHandle != IntPtr.Zero)\n        {\n            CloseHandle(_unmanagedHandle);\n            _unmanagedHandle = IntPtr.Zero;\n        }\n\n        _disposed = true;\n    }\n\n    ~ResourceHolder()\n    {\n        Dispose(false);\n    }\n}\n```\n\n三个关键点：\n\n1. **Dispose(true)**：由公共 Dispose() 调用。此时对象还在正常状态，其他托管对象（如 _stream）也未被 GC 回收，可以安全访问并释放它们。\n\n2. **Dispose(false)**：由 Finalizer 调用。此时 GC 正在回收，其他托管对象（如 _stream）可能已经被回收或处于不确定状态，不能安全访问。只能释放非托管资源（如 _unmanagedHandle），因为非托管资源不受 GC 管理。\n\n3. **GC.SuppressFinalize(this)**：在 Dispose() 中调用。告诉 GC「我已经手动释放了资源，不需要调用 Finalizer」。这样对象只需一次 GC 就能回收内存，避免了 Finalizer 的两次 GC 代价。如果不调用 SuppressFinalize，即使已经 Dispose 了，GC 还是会调用 Finalizer（Dispose(false)），虽然 _disposed 标志会阻止重复释放，但仍然浪费一次 GC。",
    tags: ["Dispose模式", "IDisposable", "Finalizer", "GC.SuppressFinalize"],
  },
  {
    id: "cvc-gc-memory-4",
    chapter: "cvc-gc-memory",
    level: 4,
    question: "一个 .NET 服务运行一段时间后内存持续增长，GC.Collect() 也降不下来。请描述你的排查思路和常见内存泄漏原因。",
    answer:
      "排查思路：\n\n1. **确认是真泄漏还是 GC 延迟**：用 dotnet-counters 监控 GC 计数和堆大小。如果 Gen2 持续增长但 Gen0/Gen1 正常回收，说明长生命周期对象在泄漏。\n\n2. ** dump 堆快照**：用 dotnet-dump 或 dotMemory 截取堆快照，查看对象数量和引用链。比较两个时间点的快照，找出持续增长的对象类型。\n\n3. **追踪引用链**：从泄漏对象反向追溯到根引用，找出是谁持有它。\n\n常见内存泄漏原因：\n\n1. **事件订阅未取消**：`publisher.Event += handler` 后没有 `-= `。发布者持有订阅者引用，订阅者无法被 GC 回收。这是最常见的泄漏。\n   修法：及时 `-=`，或用 WeakEventManager。\n\n2. **静态集合无限增长**：`static List<T>` 或 `static Dictionary<K,V>` 做缓存，只加不删。\n   修法：用 MemoryCache 设过期，或用 ConditionalWeakTable 弱引用缓存。\n\n3. **静态字段持有大对象**：static 字段是 GC 根，持有的大对象永远不会被回收。\n   修法：用 WeakReference 或定期置 null。\n\n4. **被遗忘的 Timer**：`new Timer(callback, ...)` 创建后没 Dispose，Timer 持有 callback 委托，委托持有目标对象。\n   修法：用 using 或在 Stop 时 Dispose Timer。\n\n5. **字符串拼接产生大对象**：循环中 `s += chunk` 产生大量中间 string，如果 s 超过 85000 字节进 LOH，LOH 不压缩导致碎片。\n   修法：用 StringBuilder。\n\n6. **未 Dispose 的 IDisposable**：尤其 FileStream、数据库连接——Finalizer 延迟回收导致资源占用。\n   修法：确保所有 IDisposable 用 using 块。\n\n7. **捕获变量的闭包**：Lambda 捕获局部变量，如果 Lambda 被长生命周期对象引用，被捕获的变量也无法回收。\n   修法：避免在长生命周期对象中存储捕获大量变量的闭包。",
    tags: ["内存泄漏", "GC.Collect", "事件订阅", "静态字段", "排查"],
  },
];
