import type { ReviewQuestion } from "./types";

/** SOS 堆分析 复习题 */
export const dnmSosHeapQuestions: ReviewQuestion[] = [
  {
    id: "dnm-sos-heap-1",
    chapter: "dnm-sos-heap",
    level: 1,
    question: `!eeheap 展示什么信息？与 !dumpheap 有何区别？`,
    answer: `!eeheap 展示 CLR 各子系统内存统计：GC Heap 各代大小、JIT Code Heap、Loader Heap、HandleTable。!dumpheap 遍历托管堆按类型统计对象。区别：!eeheap 是 CLR 级全景含非托管结构，!dumpheap 是对象级细粒度统计。`,
    tags: ["eeheap","dumpheap","CLR内存"],
  },
  {
    id: "dnm-sos-heap-2",
    chapter: "dnm-sos-heap",
    level: 2,
    question: `如何用 SOS 检查某一代堆的大小和对象分布？`,
    answer: `1.!eeheap -gc 看各代大小。2.!dumpheap -gen 2 列出 Gen2 对象。3.!dumpheap -gen 2 -stat 按类型统计。4.!dumpheap -min 85000 列出 LOH 对象。5.对比多次 dump 的 Gen2 大小，持续增长说明泄漏。`,
    tags: ["gen","SOS","堆分析","分代"],
  },
  {
    id: "dnm-sos-heap-3",
    chapter: "dnm-sos-heap",
    level: 3,
    question: `如何用 SOS 检测 GC 句柄泄漏（GCHandle）？`,
    answer: `1.!gcinfo 看句柄表统计各类型数量。2.!gchandle 列出所有句柄及指向对象。3.Strong 句柄异常多说明 GCHandle.Alloc 未 Free。4.!gcroot 验证句柄是根因。修法：确保所有 Alloc 有对应 Free，用 try/finally 或 using。`,
    tags: ["GCHandle","句柄泄漏","gcinfo","gchandle"],
  },
  {
    id: "dnm-sos-heap-4",
    chapter: "dnm-sos-heap",
    level: 4,
    question: `描述完整的内存泄漏 SOS 诊断工作流。`,
    answer: `1.监控发现内存持续增长。2.高峰时 dotnet-dump collect 生成 dump A，间隔后生成 dump B。3.分别 !dumpheap -stat 对比 Count 变化，增长类型是嫌疑。4.!dumpheap -type 列出对象。5.!gcroot 追根找共同根。6.!dumpobj 确认根对象。7.解除引用修复。`,
    tags: ["内存泄漏","诊断工作流","SOS","dumpheap","gcroot"],
  }
];
