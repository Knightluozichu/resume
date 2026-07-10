import type { ReviewQuestion } from "./types";

export const jg1G1OverviewQuestions: ReviewQuestion[] = [
  {
    id: "jg1-go-1",
    chapter: "jg1-g1-overview",
    level: 1,
    question: `G1（Garbage First）收集器的设计目标和核心特征是什么？`,
    answer: `设计目标：①在停顿时间可控的前提下追求高吞吐量——通过\`-XX:MaxGCPauseMillis\`设定停顿目标（默认200ms），G1在回收时估算各Region回收耗时，选择在目标时间内能完成的最大Region集合；②适合大堆——通过Region化内存布局避免全堆扫描，在6GB以上堆上优势明显；③压缩式回收——G1的evacuation阶段复制存活对象到空Region，天然避免内存碎片（CMS的标记-清除会产生碎片）。核心特征：Region化堆布局（无物理分代边界）、Garbage First策略（优先回收垃圾最多的Region）、并发标记+疏散回收的组合、可预测停顿模型。G1在JDK 9起成为默认收集器。`,
    tags: ["G1设计目标", "可预测停顿", "Region化"],
  },
  {
    id: "jg1-go-2",
    chapter: "jg1-g1-overview",
    level: 2,
    question: `G1收集器的四种Region类型（Eden/Survivor/Old/Humongous）各自的角色和转换条件是什么？`,
    answer: `①Eden Region——新对象分配区，Young GC时存活对象被复制到Survivor Region，原Eden Region清空后回到Free List；②Survivor Region——Young GC后存活对象的暂存区，对象经过一定次数（\`-XX:MaxTenuringThreshold\`，默认15）Young GC后晋升到Old Region；③Old Region——长期存活对象存储区，在Mixed GC中被纳入CSet回收；④Humongous Region——大对象专用，当对象大小超过Region大小的50%时，在连续的Humongous Region中分配，大对象跨越多个Region时第一个Region标记为Humongous Start，后续标记为Humongous Continuation。转换条件：Region类型不是固定的，一个Free Region可以在不同GC周期中扮演不同角色。Young GC触发Eden→Survivor转换，Mixed GC触发Old Region回收，并发标记阶段识别Old Region中的垃圾。`,
    tags: ["Region类型", "Eden Survivor Old Humongous", "Region转换"],
  },
  {
    id: "jg1-go-3",
    chapter: "jg1-g1-overview",
    level: 2,
    question: `G1收集器相比CMS收集器有哪些优势和劣势？在什么场景下应该选择G1？`,
    answer: `优势：①无内存碎片——G1使用复制式evacuation，CMS使用标记-清除产生碎片，G1不需要做Full GC整理；②可预测停顿——G1通过MaxGCPauseMillis控制回收时间，CMS的STW阶段时长不可控；③大堆友好——G1的Region化布局在大堆（6GB+）下扫描效率优于CMS的全堆扫描；④Mixed GC——G1可以增量回收老年代，CMS只能整堆Full GC。劣势：①内存开销——G1的RSet占用约1%-20%堆内存（取决于跨Region引用密度），CMS的卡表开销更小；②CPU开销——G1的并发标记和RSet维护比CMS更复杂，活跃引用频繁变更时Write Barrier开销大；③小堆不如Parallel——6GB以下堆G1的固定开销占比过高。选择G1的场景：堆大于6GB、需要可控停顿、无法接受CMS的碎片导致的Full GC停顿。`,
    tags: ["G1 vs CMS", "优势劣势", "选型场景"],
  },
  {
    id: "jg1-go-4",
    chapter: "jg1-g1-overview",
    level: 3,
    question: `G1收集器的三色标记法如何解决并发标记中的「对象消失」问题？`,
    answer: `三色标记法：白色（未访问）、灰色（已访问但引用未扫描完）、黑色（已访问且引用已扫描完）。并发标记中「对象消失」问题：Mutator线程在GC并发标记的同时修改引用——如果将黑色对象到白色对象的引用建立（黑→白新引用），同时断开灰色对象到该白色对象的引用（灰→白旧引用断开），则GC认为白色对象不可达而错误回收。G1的解决方案（SATB——Snapshot At The Beginning）：在GC开始时逻辑上拍一张引用快照，并发标记期间通过Write Barrier在引用被修改时，将被覆盖的旧引用对象标记为存活（即「在并发标记开始时可达的对象，在标记结束前都视为存活」）。具体实现：G1使用SATB Mark Queue，Write Barrier在写操作前将旧引用值加入SATB队列，再发标记阶段处理队列中的引用，保证这些对象不会被遗漏。代价：可能保留一些实际已成为垃圾的对象（浮动垃圾），下一轮GC回收。`,
    tags: ["三色标记", "SATB", "并发标记", "对象消失"],
  },
];
