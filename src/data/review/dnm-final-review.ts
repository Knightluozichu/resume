import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const dnmFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dnm-final-review-1",
    chapter: "dnm-final-review",
    level: 1,
    question: `.NET 内存管理的两大核心机制是什么？`,
    answer: `1.托管堆+GC 自动回收：CLR 管理托管堆按分代自动分配回收，开发者不需手动 free。2.IDisposable+Finalizer 资源释放：非托管资源用 Dispose 主动释放，Finalizer 作安全网。GC 管托管内存生命周期，Dispose 管非托管资源生命周期。`,
    tags: ["GC","IDisposable","Finalizer","托管堆"],
  },
  {
    id: "dnm-final-review-2",
    chapter: "dnm-final-review",
    level: 2,
    question: `GC 分代回收完整流程？对象如何从 Gen0 晋升到 Gen2？`,
    answer: `新对象分配 Gen0。Gen0 预算用尽触发 Gen0 回收：标记可达，不可达回收，存活晋升 Gen1。Gen1 预算用尽触发 Gen1 回收（扫 Gen0+1）：Gen0→Gen1, Gen1→Gen2。Gen2 预算用尽触发 Full GC 扫全堆+LOH。对象每存活一次晋升一代。LOH 对象直接属 Gen2 视角。`,
    tags: ["分代","晋升","Gen0","Gen2","LOH"],
  },
  {
    id: "dnm-final-review-3",
    chapter: "dnm-final-review",
    level: 3,
    question: `如何系统性排查 .NET 应用内存增长问题？`,
    answer: `1.dotnet-counters 监控 GC Heap Size 确认泄漏。2.高峰时 dotnet-dump collect 生成 dump。3.!eeheap -gc 看哪代泄漏。4.!dumpheap -stat 排序找热点类型。5.!dumpheap -type+!gcroot 追根。6.排查常见根因：静态集合增长、事件未取消、GCHandle 未 Free、缓存无过期。7.非托管检查 P/Invoke malloc/free 和 AddMemoryPressure。8.修复后重新监控。`,
    tags: ["内存泄漏","SOS","诊断","eeheap","dumpheap"],
  },
  {
    id: "dnm-final-review-4",
    chapter: "dnm-final-review",
    level: 4,
    question: `综合全书设计 .NET 应用内存优化策略清单。`,
    answer: `1.分配优化：struct 替代 class、Span/Memory 零拷贝、stackalloc。2.池化复用：ArrayPool/StringBuilder/ObjectPool。3.生命周期：缩短生命避免 Gen2 晋升、using Dispose、SuppressFinalize。4.固定优化：缩短 fixed 作用域、长期用非托管内存。5.GC 调度：服务器 GC、LatencyMode、TryStartNoGCRegion。6.非托管协调：SafeHandle、AddMemoryPressure。7.监控：dotnet-counters+定期 dump+CI 内存回归测试。`,
    tags: ["优化策略","struct","Span","ArrayPool","Dispose","GC调优"],
  }
];
