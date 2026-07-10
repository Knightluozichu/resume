import type { ReviewQuestion } from "./types";

export const jg1RegionManagementQuestions: ReviewQuestion[] = [
  {
    id: "jg1-rm-1",
    chapter: "jg1-region-management",
    level: 1,
    question: `G1的Region大小如何确定？为什么默认大小是1-32MB且必须是2的幂？`,
    answer: `Region大小确定方式：G1根据堆大小自动计算，目标是将堆划分为约2048个Region。计算公式：RegionSize = 堆大小 / 2048，然后向上取整到最近的2的幂，范围限制在1MB到32MB之间。例如4GB堆→RegionSize=2MB，8GB堆→RegionSize=4MB。也可通过\`-XX:G1HeapRegionSize\`手动指定（必须是2的幂）。必须是2的幂的原因：①位运算高效——Region索引和地址转换可以用位移（address >> log2(RegionSize)）替代除法；②内存对齐——2的幂大小保证Region起始地址对齐，有利于CPU缓存行对齐和TLB效率；③Humongous判定——大对象阈值（RegionSize/2）也是2的幂的除法，计算简单。2048个Region的目标是为了在Region粒度和管理开销之间取得平衡——Region太少则回收粒度粗（不够灵活），Region太多则RSet和元数据开销大。`,
    tags: ["Region大小", "2的幂", "2048个Region"],
  },
  {
    id: "jg1-rm-2",
    chapter: "jg1-region-management",
    level: 2,
    question: `G1堆内存布局中，Eden/Survivor/Old的比例是如何动态调整的？与传统收集器有什么不同？`,
    answer: `传统收集器：新生代内部Eden:Survivor0:Survivor1=8:1:1是固定的（\`-XX:SurvivorRatio\`控制），新生代与老年代比例由\`-XX:NewRatio\`控制。G1的不同：①Region动态分配——G1没有固定的新生代大小，Eden Region数量在每次Young GC后根据停顿目标动态调整。如果上一次Young GC停顿时间远低于MaxGCPauseMillis，G1会增加Eden Region数量（让更多对象在Young GC中被回收），反之减少；②Survivor由\`-XX:TargetSurvivorCount\`和存活对象量决定Survivor Region数量；③Old Region在对象晋升时从Free List分配，没有固定比例。源码中G1AdaptiveSizePolicy负责根据历史GC数据调整Eden大小。这种自适应策略使得G1在不需要手动调参的情况下就能在吞吐和停顿之间自动平衡。`,
    tags: ["堆布局", "动态比例", "自适应策略"],
  },
  {
    id: "jg1-rm-3",
    chapter: "jg1-region-management",
    level: 2,
    question: `G1中Humongous对象的分配流程是什么？为什么Humongous对象容易导致性能问题？`,
    answer: `分配流程：①判定——对象大小超过RegionSize/2即为Humongous对象；②分配——在堆中找连续的Free Region，第一个标记为Humongous Start（H），后续标记为Humongous Continuation（HC）；③如果找不到连续Free Region，触发并发标记或Full GC。性能问题原因：①碎片风险——Humongous对象占用连续Region，回收后这些Region必须连续才能分配新的Humongous对象，容易造成外部碎片；②并发标记触发——大量Humongous分配可能快速消耗Free Region，迫使G1频繁触发并发标记甚至Full GC；③RSet开销——Humongous对象的RSet需要记录所有引用它的Region，如果被大量对象引用，RSet膨胀严重；④Mixed GC延迟——Humongous对象在JDK 8u40之前只能在Full GC中回收，之后才支持在并发标记阶段回收。优化建议：避免创建超过RegionSize/2的大数组，或增大RegionSize使大对象不再是Humongous。`,
    tags: ["Humongous", "大对象分配", "碎片"],
  },
  {
    id: "jg1-rm-4",
    chapter: "jg1-region-management",
    level: 3,
    question: `G1源码中HeapRegion类如何表示一个Region？Region的状态机（Free→Eden→Survivor→Old）在源码中如何流转？`,
    answer: `HeapRegion类（hotspot/share/gc/g1/heapRegion.hpp）表示一个Region，核心字段：_bottom（Region起始地址）、_end（Region结束地址）、_top（已分配指针）、_type（Region类型）。状态流转通过HeapRegionType管理：①Free→Eden——Young GC前G1从Free List分配Region设为Eden类型，对象分配在_top指针推进；②Eden→Survivor——Young GC时Eden中存活对象复制到Survivor Region，原Eden Region清空_top回到_bottom变为Free，目标Region标记为Survivor；③Survivor→Old——对象年龄达到MaxTenuringThreshold后，在Young GC时从Survivor复制到Old Region；④Old→Free——Mixed GC将Old Region纳入CSet，evacuation后存活对象复制到新Old Region，原Region变Free。源码中G1CollectedHeap::allocate_new_region负责分配，HeapRegion::note_start_of_marking/note_end_of_marking负责标记阶段状态切换。Region状态机保证每个Region在任何时刻只有一种明确角色。`,
    tags: ["HeapRegion", "状态机", "源码分析"],
  },
];
