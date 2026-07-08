import type { ReviewQuestion } from "./types";

/** 大对象堆 复习题 */
export const dnmLargeObjectQuestions: ReviewQuestion[] = [
  {
    id: "dnm-large-object-1",
    chapter: "dnm-large-object",
    level: 1,
    question: "LOH 的分配阈值是多少？为什么要有单独的 LOH？",
    answer: "阈值 85,000 字节。>=85000 字节对象直接分配到 LOH。单独 LOH 因为大对象复制成本极高，因此默认不压缩。LOH 在 GC 视角下属 Gen2，回收 LOH 等于 Full GC。将大对象单独管理避免影响 Gen0/1 压缩效率。",
    tags: ["LOH","85000","大对象"],
  },
  {
    id: "dnm-large-object-2",
    chapter: "dnm-large-object",
    level: 2,
    question: "LOH 为什么不做压缩？带来什么问题？",
    answer: "不做压缩因大对象复制成本高且更新所有引用指针开销大。问题：内存碎片化——分配释放交替后出现不连续空闲块。总空闲够但连续不够，导致新大对象分配失败 OOM，即使实际空闲充足。",
    tags: ["LOH","不压缩","碎片化","OOM"],
  },
  {
    id: "dnm-large-object-3",
    chapter: "dnm-large-object",
    level: 3,
    question: "ArrayPool<T> 如何缓解 LOH 碎片化？使用注意事项？",
    answer: "ArrayPool.Shared.Rent(size) 租用数组，Return 归还复用，避免反复 new 大数组进 LOH。注意：1.归还后不能继续使用（可能被租给别人）。2.Rent 返回可能更大，需用 length/Span 限定范围。3.池中数组最终被 GC 回收。4.线程安全可跨线程租还。",
    tags: ["ArrayPool","LOH","碎片化","对象池"],
  },
  {
    id: "dnm-large-object-4",
    chapter: "dnm-large-object",
    level: 4,
    question: "服务每秒 1000 请求每个需 100KB byte[]，分析直接 new 和用 ArrayPool 的 GC 影响。",
    answer: "直接 new：每秒 100MB 分配，100KB>85000 进 LOH(Gen2)，每秒 1000 个 LOH 对象，Gen2 快速增长触发频繁 Full GC 停顿。用 ArrayPool：Rent 复用已有数组零分配，不进 LOH 不触发 GC，吞吐提升延迟降低。注意 Rent 的数组可能更大需 Span 限定范围。",
    tags: ["ArrayPool","LOH","Full GC","性能分析"],
  }
];
