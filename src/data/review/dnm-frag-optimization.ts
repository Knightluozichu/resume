import type { ReviewQuestion } from "./types";

/** 碎片优化 复习题 */
export const dnmFragOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "dnm-frag-optimization-1",
    chapter: "dnm-frag-optimization",
    level: 1,
    question: `内存碎片化是什么？分哪两种？`,
    answer: `空闲内存不连续导致无法分配。1.外部碎片：堆中有小空闲块但都不够大，总空闲够但连续不够。2.内部碎片：对象实际占用大于请求（对齐填充）。GC 压缩解决外部碎片，LOH 不压缩是主要来源。值类型对齐导致内部碎片。`,
    tags: ["碎片化","外部碎片","内部碎片","压缩"],
  },
  {
    id: "dnm-frag-optimization-2",
    chapter: "dnm-frag-optimization",
    level: 2,
    question: `为什么用 struct 替代 class 减少 GC 压力？有什么代价？`,
    answer: `struct 是值类型分配在栈上或内联在包含对象中不进堆不产生 GC。class 每次 new 进堆产生 GC 负担。代价：1.struct 按值复制大 struct 成本高需 ref/in 传递。2.装箱进堆要避免。3.不能继承。4.struct 数组连续内存缓存友好但 List<struct> 扩容复制整块。`,
    tags: ["struct","class","值类型","GC压力"],
  },
  {
    id: "dnm-frag-optimization-3",
    chapter: "dnm-frag-optimization",
    level: 3,
    question: `Span<T> 和 Memory<T> 如何减少分配？两者区别？`,
    answer: `Span<T> 是连续内存的栈上视图（ref struct），零拷贝切片替代 Substring。Memory<T> 是堆安全版本可存入字段跨 await。区别：Span 是 ref struct 只能存在栈上不能做字段不能跨 await；Memory 是普通 struct 可存字段跨 await，通过 .Span 获取 Span。热路径用 Span 异步用 Memory。`,
    tags: ["Span","Memory","零拷贝","ref struct"],
  },
  {
    id: "dnm-frag-optimization-4",
    chapter: "dnm-frag-optimization",
    level: 4,
    question: `设计零 GC 分配且线程安全的日志缓冲区。`,
    answer: `方案：1.预分配非托管缓冲区(Marshal.AllocHGlobal)用 ConcurrentQueue 池化。2.写日志时 TryDequeue 租用用 Span<byte> 写入，失败时 AllocHGlobal 新分配不进托管堆。3.写满后 P/Invoke 写文件归还池。4.Span 指向非托管内存 ref unsafe 写入零托管分配。5.每线程租用独立缓冲区无共享。6.池上限超出直接 FreeHGlobal。核心：池化+非托管+Span=零 GC。`,
    tags: ["Span","池化","非托管内存","零分配","日志"],
  }
];
