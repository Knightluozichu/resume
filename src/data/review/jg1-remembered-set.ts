import type { ReviewQuestion } from "./types";

export const jg1RememberedSetQuestions: ReviewQuestion[] = [
  {
    id: "jg1-rs-1",
    chapter: "jg1-remembered-set",
    level: 1,
    question: "G1的RSet（Remembered Set）是什么？它解决了什么问题？",
    answer: "RSet是G1用于记录「哪些其他Region引用了本Region中的对象」的数据结构，本质是一个反向引用索引。解决的问题：G1以Region为单位回收，回收某个Region时需要知道是否有其他Region（尤其是不参与本次回收的Region）引用了本Region的对象——否则evacuation时复制存活对象后，需要更新所有指向它的引用，但如果不扫描全堆就无法知道引用来源。RSet让G1只需扫描目标Region的RSet就能找到所有跨Region引用，避免全堆扫描。例如回收Region A时，RSet(A)记录了Region B和C中有对象引用A中的对象，GC只需扫描B和C中引用A的区域（通过卡表精确定位）即可更新引用，而不需要扫描整个堆。RSet是实现Region级回收的关键基础设施。",
    tags: ["RSet", "反向引用", "Region回收"],
  },
  {
    id: "jg1-rs-2",
    chapter: "jg1-remembered-set",
    level: 2,
    question: "G1的卡表（Card Table）和RSet是什么关系？卡粒度（Card粒度）如何影响RSet的精度和开销？",
    answer: "卡表是RSet的底层实现机制。关系：RSet记录的是Region级别的引用关系（哪个Region引用本Region），卡表记录的是更细粒度——512字节的Card粒度——具体哪个Card中有跨Region引用。G1的堆被划分为Card（每512字节一个Card），当写操作产生跨Region引用时，Write Barrier将目标Card标记为dirty，并记录到源Region的RSet中。精度与开销的权衡：①细粒度PRT（Per-Region Table）——每个Card单独记录，扫描精确但元数据大，适合跨引用少的Region；②粗粒度PRT——只记录「哪个Region有引用」不记Card，扫描时需要扫描整个引用Region，元数据小但扫描放大；③稀疏PRT/细粒度PRT/粗粒度PRT三级退化——G1在源码中用OtherRegionsInfo管理，当引用Card数超过阈值（Sparse→Fine）或引用Region数超过阈值（Fine→Coarse）时自动降级为更粗粒度。Card粒度512字节是精度和开销的平衡——太小则卡表本身占用大，太大则扫描时需要检查的多余数据多。",
    tags: ["卡表", "Card粒度", "PRT精度", "粗粒度退化"],
  },
  {
    id: "jg1-rs-3",
    chapter: "jg1-remembered-set",
    level: 2,
    question: "G1的Write Barrier如何工作？它在RSet维护中起什么作用？",
    answer: "G1使用两种Write Barrier：①SATB Write Barrier——用于并发标记阶段，在引用被覆盖前将旧值存入SATB队列，保证并发标记的正确性（三色标记的「对象消失」问题）；②RS Write Barrier（refinement barrier）——用于RSet维护，在写入新引用后，如果引用是跨Region的，将目标Card标记为dirty并加入DCQ（Dirty Card Queue）。工作流程：源码中G1PostBarrierInlining::post_barrier（hotspot/share/gc/g1/g1BarrierSet.cpp）在每次写引用后执行——判断源对象和目标对象是否在不同Region，如果是则将目标Card加入DCQ。Refine线程异步消费DCQ，将dirty Card更新到对应Region的RSet中。作用：Write Barrier是G1维护RSet的唯一入口，没有它G1无法知道跨Region引用关系。代价：每次写操作都增加额外开销（几条指令的判断+可能的队列写入），这是G1相比CMS的主要性能开销之一。",
    tags: ["Write Barrier", "DCQ", "Refine线程", "RSet维护"],
  },
  {
    id: "jg1-rs-4",
    chapter: "jg1-remembered-set",
    level: 3,
    question: "RSet的内存占用如何估算？什么情况下RSet会膨胀？如何通过参数控制RSet的开销？",
    answer: "内存占用估算：G1中每个Region的RSet平均占用Region大小的1%-5%，极端情况下可达20%。计算：每个Card条目约1字节（Card索引），一个Region有RegionSize/512个Card（如4MB Region→8192个Card），如果被N个其他Region引用，细粒度PRT占用约N*2字节（Region索引+Card位图），粗粒度PRT只需N/8字节（位图）。膨胀场景：①大量短生命周期跨Region引用——如数组遍历修改不同Region的对象，产生大量dirty Card；②大对象（Humongous）被广泛引用——一个Humongous对象跨越多Region，每个引用它的Region都要记录RSet；③对象关系图高度互联——如HashMap/缓存结构。控制参数：`-XX:G1RSetUpdatingPauseTimePercent`（控制Refine线程在GC暂停中更新RSet的时间比例，默认10%）；`-XX:G1ConcRefinementThreads`（控制并发Refine线程数，默认=ParallelGCThreads）；`-XX:G1HeapRegionSize`增大Region减少跨引用频率。可通过`-XX:+PrintRSets`或jcmd GC.heap_info查看RSet统计。",
    tags: ["RSet内存", "RSet膨胀", "参数控制"],
  },
];
