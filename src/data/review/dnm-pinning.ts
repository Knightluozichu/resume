import type { ReviewQuestion } from "./types";

/** 对象固定 复习题 */
export const dnmPinningQuestions: ReviewQuestion[] = [
  {
    id: "dnm-pinning-1",
    chapter: "dnm-pinning",
    level: 1,
    question: "什么是对象固定（Pinning）？为什么需要固定？",
    answer: "将托管堆对象标记为不可移动，防止 GC 压缩时改变地址。需要场景：将托管对象地址传给非托管代码（P/Invoke、COM 互操作），非托管代码持有指针若 GC 移动对象则变野指针。固定方式：fixed 语句、GCHandleType.Pinned、fixed 字段。",
    tags: ["Pinning","固定","P/Invoke","GCHandle"],
  },
  {
    id: "dnm-pinning-2",
    chapter: "dnm-pinning",
    level: 2,
    question: "对象固定如何影响 GC 压缩效率？",
    answer: "GC 压缩移动存活对象整理碎片，但固定对象不能移动必须跳过。固定对象分散在堆中像钉子把碎片钉住，GC 无法合并它们之间的空闲空间。导致 Gen0/Gen1（本应总是压缩）也出现碎片化，增加分配失败风险。",
    tags: ["Pinning","压缩","碎片化","GC"],
  },
  {
    id: "dnm-pinning-3",
    chapter: "dnm-pinning",
    level: 3,
    question: "fixed 语句的工作原理是什么？如何影响性能？",
    answer: "fixed (byte* p = &arr[0]){} 编译为设置固定标记，GC 看到标记不移动，作用域结束清除。影响：1.固定期间该堆区域无法压缩。2.循环中反复 fixed/unfixed 产生固定抖动。3.短期影响小，长期（异步 P/Invoke）影响大。优化：缩短作用域或用 fixed 缓冲区嵌入 struct。",
    tags: ["fixed","固定标记","pin thrashing"],
  },
  {
    id: "dnm-pinning-4",
    chapter: "dnm-pinning",
    level: 4,
    question: "设计高性能 P/Invoke 缓冲区方案，避免频繁固定造成碎片。",
    answer: "方案：1.预分配大 byte[] 用 GCHandleType.Pinned 长期固定一次，避免反复 pin/unpin。2.从池中租用传指针给非托管代码，用完归还。3.固定数组集中在一块区域，GC 跳过该块不影响其他。4.或直接用 NativeMemory.Alloc/Marshal.AllocHGlobal 分配非托管内存完全绕过托管堆，用 Span<T> 包装。5..NET 5+ 用 [LibraryImport] 源生成器自动处理固定。",
    tags: ["Pinning","P/Invoke","NativeBuffer","池化"],
  }
];
