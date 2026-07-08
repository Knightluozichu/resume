import type { ReviewQuestion } from "./types";

export const dnjV8EngineQuestions: ReviewQuestion[] = [
  {
    id: "dnj-v8-engine-1",
    chapter: "dnj-v8-engine",
    level: 2,
    question: "V8 的 JIT 编译管线分哪些阶段？为什么需要「解释执行 + 热点优化」双引擎？",
    answer:
      "V8 JIT 管线：JS 源码 → Parser（词法+语法分析生成 AST）→ Ignition（解释器，生成字节码并执行）→ TurboFan（优化编译器，将热点函数编译为机器码）。双引擎的原因：纯解释执行慢但启动快（无需编译等待），纯编译执行快但启动慢（需要全量编译）。V8 先用 Ignition 快速启动执行，同时收集类型反馈信息（IC），当某函数被频繁调用成为热点后，TurboFan 基于类型反馈将其编译为优化的机器码，速度提升 2-10 倍。当类型反馈失效（如参数类型变化）时触发反优化（Deopt），回退到 Ignition 重新收集反馈。",
    tags: ["V8", "JIT", "Ignition", "TurboFan"],
  },
  {
    id: "dnj-v8-engine-2",
    chapter: "dnj-v8-engine",
    level: 3,
    question: "V8 的隐藏类（Hidden Class / Map）是什么？它如何加速对象属性访问？",
    answer:
      "隐藏类是 V8 内部为对象维护的「形状描述符」。JS 是动态类型语言，对象可以随时增删属性，V8 用隐藏类记录对象的属性布局（属性名→偏移量映射）。当两个对象以相同顺序添加相同属性时，它们共享同一个隐藏类（Map0→Map1 迁移链）。加速原理：①内联缓存（IC）——访问 a.x 时 V8 缓存「a 的隐藏类 + x 的偏移量」，下次访问 b.x 时若 b 的隐藏类相同则直接命中，无需查找；②隐藏类相同时 TurboFan 可生成更激进的机器码。反模式：动态删除属性（delete）或以不同顺序添加属性会导致隐藏类发散（多态/超态），IC 命中率下降，性能退化。最佳实践：构造函数中一次性初始化所有属性，保持顺序一致。",
    tags: ["V8", "隐藏类", "内联缓存", "性能"],
  },
  {
    id: "dnj-v8-engine-3",
    chapter: "dnj-v8-engine",
    level: 3,
    question: "V8 的垃圾回收（GC）如何分代回收？Orinoco 做了哪些优化？",
    answer:
      "V8 GC 采用分代策略：①新生代（Young Generation）——Scavenge 算法，From/To 两个半区，GC 时将 From 中存活对象复制到 To，然后交换。短命对象（如临时变量）在新生代快速回收，停顿时间短（1-5ms）。经历一次 Scavenge 存活的对象晋升到老生代。②老生代（Old Generation）——Mark-Sweep-Compact 三步：标记可达对象、清除不可达对象、整理碎片。存活对象多、回收频率低但停顿长。Orinoco 优化：①增量标记——将标记阶段拆分为小步，穿插在 JS 执行间，用三色标记（白灰黑）+ 写屏障保证正确性，减少单次停顿；②并发回收——辅助线程并行执行标记和清除，主线程不暂停；③并行 Scavenge——新生代回收也用辅助线程加速。目标：把 GC 停顿从百毫秒级降到十毫秒以内。",
    tags: ["V8", "GC", "Orinoco", "分代回收"],
  },
  {
    id: "dnj-v8-engine-4",
    chapter: "dnj-v8-engine",
    level: 4,
    question: "Node.js 默认堆内存上限是多少？为什么有限制？如何调整？Buffer 与 V8 堆的关系？",
    answer:
      "Node.js 在 64 位系统上默认 V8 堆上限约 1.4GB（32 位约 0.7GB）。限制原因：V8 的 GC 在大堆上停顿时间会显著增加（标记阶段与堆大小成正比），1.4GB 是 V8 团队权衡 GC 性能后的默认值。调整方法：`node --max-old-space-size=4096 app.js`（单位 MB）。Buffer 与 V8 堆的关系：Buffer 分配在 V8 堆外（C++ 层的堆内存），不受 V8 GC 管理，不计入 1.4GB 限制。这意味着大文件处理用 Buffer 不会增加 GC 压力，但 Buffer 本身需要手动管理（或依赖底层 C++ 析构），大量未释放的 Buffer 仍会导致进程内存增长。这是 Node.js 能处理大文件流式 I/O 的关键设计——数据在堆外流转，不经过 V8 GC。",
    tags: ["V8", "内存限制", "Buffer", "GC", "性能"],
  },
];
