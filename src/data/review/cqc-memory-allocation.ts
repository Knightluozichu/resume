import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · 内存分配复习题 */
export const cqcMemoryAllocationQuestions: ReviewQuestion[] = [
  {
    id: "cqc-memory-allocation-1",
    chapter: "cqc-memory-allocation",
    level: 1,
    question: "值类型和引用类型在内存分配上有什么区别？GC 如何参与？",
    answer:
      "值类型（int、struct、enum）：分配在栈上（局部变量）或内联在包含对象中（字段）。函数结束时栈帧自动回收，GC 不介入。赋值时拷贝整个值。\n\n引用类型（class、string、array、delegate）：分配在堆上。GC 负责回收不再被引用的堆对象。赋值时拷贝引用（指针），不拷贝对象本身。\n\nGC 参与方式：\n- 值类型在栈上，函数结束自动清理，GC 不需要管理。\n- 引用类型在堆上，GC 通过分代回收机制追踪引用关系，定期回收不可达对象。\n- 装箱的值类型在堆上，GC 需要回收。\n\n因此减少堆分配 = 减少 GC 压力 = 提高性能。",
    tags: ["值类型", "引用类型", "栈堆", "GC"],
  },
  {
    id: "cqc-memory-allocation-2",
    chapter: "cqc-memory-allocation",
    level: 2,
    question: "什么是装箱？装箱的开销是什么？如何消除装箱？",
    answer:
      "装箱：值类型（如 int）转换为 object 或接口时，在堆上分配新对象并拷贝值。\n\n开销：\n1. 堆分配新对象（GC 后续要回收）\n2. 值从栈拷贝到堆\n3. 拆箱时类型检查 + 值从堆拷贝回栈\n4. 循环中装箱会产生大量垃圾，增加 GC 压力\n\n常见装箱场景及消除方法：\n1. `ArrayList.Add(1)` → 用 `List<int>` 泛型集合\n2. `string.Format(\"{0}\", 42)` → 用插值字符串 `$\"{42}\"`\n3. `IComparable ca = a` → 用 `IComparable<int>` 泛型接口\n4. `Hashtable` 存值类型 → 用 `Dictionary<int, T>`\n\n原则：一律用泛型集合和泛型接口，避免非泛型 API 的装箱。",
    tags: ["装箱", "拆箱", "GC压力", "泛型集合"],
  },
  {
    id: "cqc-memory-allocation-3",
    chapter: "cqc-memory-allocation",
    level: 3,
    question: "为什么 `Span<T>` 能做到零拷贝？它有什么限制？在什么场景下使用？",
    answer:
      "零拷贝原理：`Span<T>` 是 ref struct，内部存储一个引用（指向数据起始地址）和长度。它不拥有数据，只是对现有内存（数组、字符串、原生内存）的「窗口」。切片操作只创建新的 Span（新引用+新长度），不拷贝底层数据。\n\n限制（ref struct 约束）：\n1. 只能在栈上——不能作为 class 的字段\n2. 不能跨 await 边界——await 可能切换线程，Span 指向的内存可能已被释放\n3. 不能装箱——不能转为 object\n4. 不能作为泛型参数传入不支持 ref struct 的方法\n\n这些限制保证 Span 指向的内存始终有效，不会出现悬垂引用。\n\n使用场景：\n- 字符串切片解析（替代 Substring）\n- 数组部分操作（不拷贝）\n- 高性能 IO 缓冲区\n- 解析二进制协议（如 BinaryPrimitives 配合 Span）\n- 热路径上避免不必要的内存分配",
    tags: ["Span", "零拷贝", "ref struct", "限制", "使用场景"],
  },
  {
    id: "cqc-memory-allocation-4",
    chapter: "cqc-memory-allocation",
    level: 4,
    question: "综合分析：一个高并发 Web API 频繁触发 Gen 0 GC 导致延迟波动。你会如何排查和优化内存分配？",
    answer:
      "排查步骤：\n\n1. 用 dotnet-counters 监控 GC 统计：gen0gen1gen2 回收频率、堆大小、分配速率/秒。\n2. 用 dotnet-trace / PerfView 采集 GC 事件，定位 GC 触发的热点时间。\n3. 用 dotnet-dump 转储堆快照，分析对象类型和分配来源。\n4. 用 BenchmarkDotNet 测量疑似热路径的分配量。\n\n常见优化策略：\n\n1. 消除装箱：用泛型集合替换 ArrayList/Hashtable。\n2. 字符串拼接：用 StringBuilder 或 string.Create 替代循环中的 +=。\n3. LINQ 热路径：手写 foreach 循环替代 Where/Select 的迭代器和闭包分配。\n4. List 预分配：知道大小时 `new List<T>(capacity)` 避免扩容。\n5. 对象池：用 ObjectPool<T> 或 ArrayPool<T>.Shared 复用 byte[] 等大对象。\n6. Span 切片：解析逻辑用 Span<T> 替代 Substring 避免中间字符串分配。\n7. struct 替代 class：小而短生命周期的对象用 struct 在栈上分配。\n8. 避免闭包捕获：lambda 不捕获局部变量就不会分配闭包对象。\n\n优先级：先测量确认分配热点，再针对性优化。通常 80% 的分配来自 20% 的代码。",
    tags: ["综合", "GC", "内存优化", "dotnet-counters", "对象池", "ArrayPool"],
  },
];
