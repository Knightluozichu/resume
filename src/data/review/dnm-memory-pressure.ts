import type { ReviewQuestion } from "./types";

/** 内存压力 复习题 */
export const dnmMemoryPressureQuestions: ReviewQuestion[] = [
  {
    id: "dnm-memory-pressure-1",
    chapter: "dnm-memory-pressure",
    level: 1,
    question: "GC.AddMemoryPressure 和 RemoveMemoryPressure 的作用？",
    answer: "当代码分配大量非托管内存（P/Invoke 调 C 的 malloc），GC 感知不到。AddMemoryPressure(bytes) 告诉 GC 额外占用 bytes 非托管内存，让 GC 调度回收时考虑。RemoveMemoryPressure 在释放非托管内存后调用恢复基准。协调 GC 对非托管内存的感知。",
    tags: ["AddMemoryPressure","非托管内存","GC调度"],
  },
  {
    id: "dnm-memory-pressure-2",
    chapter: "dnm-memory-pressure",
    level: 2,
    question: "为什么 GC 需要知道非托管内存使用量？不告知后果？",
    answer: "GC 回收触发基于托管堆预算和系统内存。若分配 2GB 非托管但托管堆 100MB，GC 认为内存充足不回收。后果：1.托管对象不及时回收内存泄漏表象。2.非托管内存增长到 OOM。3.GC 调度失准。告知后 GC 在压力增大时更积极回收触发 Dispose/Finalizer 释放非托管。",
    tags: ["MemoryPressure","GC调度","非托管内存","OOM"],
  },
  {
    id: "dnm-memory-pressure-3",
    chapter: "dnm-memory-pressure",
    level: 3,
    question: "SafeHandle 如何替代手动 AddMemoryPressure？",
    answer: "SafeHandle 封装非托管句柄：1.自动保证 Finalizer 调 ReleaseHandle 释放。2.自动引用计数防止 P/Invoke 期间释放。3.自动管理 AddMemoryPressure/RemoveMemoryPressure。4.比 IntPtr+手动 Finalizer 更安全。继承 SafeHandle 重写 ReleaseHandle，如 SafeFileHandle。推荐替代直接持有 IntPtr。",
    tags: ["SafeHandle","非托管资源","ReleaseHandle"],
  },
  {
    id: "dnm-memory-pressure-4",
    chapter: "dnm-memory-pressure",
    level: 4,
    question: "图像库通过 P/Invoke 调 C malloc 分配大缓冲区，如何协调 GC？",
    answer: "封装为 ImageBuffer:SafeHandle。1.继承 SafeHandleZeroOrMinusOneIsInvalid 构造时调 C malloc。2.重写 ReleaseHandle 调 free。3.SafeHandle 内部自动管理压力。4.若缓冲区 >1MB 额外显式 AddMemoryPressure 补充。5.实现 IDisposable 通过 Dispose 主动释放。6.用 Span dangerousGetHandle 包装安全访问。这样 GC 感知压力在紧张时主动回收触发 free。",
    tags: ["SafeHandle","图像缓冲区","AddMemoryPressure","P/Invoke"],
  }
];
