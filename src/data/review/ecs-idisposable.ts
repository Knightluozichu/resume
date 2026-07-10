import type { ReviewQuestion } from "./types";

/** Effective C# IDisposable 模式复习题 */
export const ecsIdisposableQuestions: ReviewQuestion[] = [
  {
    id: "ecs-idisposable-1",
    chapter: "ecs-idisposable",
    level: 1,
    question: `IDisposable 模式有哪两条释放路径？各自清理什么资源？`,
    answer:
      `两条路径：\n\n1. 确定性释放（using / Dispose()）：时机确定，清理托管加非托管资源。using 语句离开作用域或显式调用 Dispose() 时触发，此时所有托管对象都还活着，可安全调用其 Dispose。\n\n2. 终结器兜底（~T() → Dispose(false)）：GC 回收时触发，仅清理非托管资源。此时托管对象可能已被回收，不可访问。\n\n模式核心是 Dispose(bool disposing)：disposing=true 清两类资源并 SuppressFinalize；disposing=false 仅清非托管。确定性释放是首选路径，终结器是安全网。`,
    tags: ["IDisposable", "两条路径", "托管资源", "非托管资源"],
  },
  {
    id: "ecs-idisposable-2",
    chapter: "ecs-idisposable",
    level: 2,
    question: `终结器里为什么不能访问托管对象？`,
    answer:
      `GC 回收时终结器的执行顺序不确定——一个对象的终结器运行时，它引用的托管对象可能已经被 GC 回收或正在被回收。访问一个正在被回收或已回收的对象是未定义行为，可能抛异常或产生错误结果。\n\n因此 Dispose(false)（终结器路径）只清理自己直接持有的非托管资源（文件句柄、原生内存），跳过托管清理分支。托管对象的清理只能在 disposing=true（确定性路径）时做，因为那时它们保证还活着。\n\n这也是为什么终结器只是兜底——它无法安全地做完整的资源清理，只能处理非托管的最后一步。`,
    tags: ["终结器", "托管对象", "GC顺序", "Dispose(false)"],
  },
  {
    id: "ecs-idisposable-3",
    chapter: "ecs-idisposable",
    level: 3,
    question:
      `为什么确定性释放后要调用 GC.SuppressFinalize(this)？即使当前类型没有终结器也要调用吗？`,
    answer:
      `原因：有终结器的对象 GC 回收代价高——会被提升一代并放入终结队列，增加回收开销。确定性释放已经清理了所有资源，再让 GC 跑一次终结器是浪费，且可能触发重复清理（若没 _disposed 标志）。\n\n即使当前类型没有终结器也调用：这是防御性编程。当前类型没终结器，但派生类可能加终结器。基类在 Dispose 里调用 SuppressFinalize，派生类加终结器时基类逻辑不用改——派生类的终结器会被正确抑制。如果不调用，派生类加终结器后必须自己记得加 SuppressFinalize，容易遗漏。\n\n SuppressFinalize 对没有终结器的对象是无副作用的安全空操作，所以基类调用零成本却有前瞻性。`,
    tags: ["SuppressFinalize", "终结队列", "派生类", "防御性编程"],
  },
  {
    id: "ecs-idisposable-4",
    chapter: "ecs-idisposable",
    level: 4,
    question:
      `为什么只持有托管资源的类型不应该加终结器？请从 GC 代价和安全性两方面分析，并给出正确做法。`,
    answer:
      `GC 代价：有终结器的对象会被 GC 特殊对待——创建时注册到终结队列，回收时不能直接释放，要先提升一代、等待终结器线程执行、再真正释放。这增加了回收延迟和内存压力。一个只持有托管资源（如 FileStream）的类型，终结器里又不能安全访问这些托管对象（它们可能已被回收），加了终结器纯粹增加 GC 代价却什么都做不了。\n\n安全性：终结器里访问托管对象是未定义行为。如果误在终结器里调用 _managedStream.Dispose()，而 _managedStream 已被 GC 回收，会抛异常或产生错误。终结器的存在反而诱导开发者写出不安全的清理代码。\n\n正确做法：\n1. 只有直接持有非托管资源（IntPtr 句柄、原生内存）的类型才加终结器，作为忘 using 的兜底。\n2. 纯托管资源类型只实现 IDisposable（提供 Dispose），不加终结器。托管资源靠它们自己的 Dispose 或 GC 回收。\n3. 持有非托管资源时，优先用 SafeHandle 包装非托管句柄——SafeHandle 自带终结器，你的类型就不用再加，把非托管释放的责任交给 SafeHandle。`,
    tags: ["终结器代价", "GC", "SafeHandle", "综合"],
  },
];
