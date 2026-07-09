import type { ReviewQuestion } from "./types";

export const gchModernGcQuestions: ReviewQuestion[] = [
  {
    id: "gch-mg-1",
    chapter: "gch-modern-gc",
    level: 1,
    question: "为什么Shenandoah和ZGC能达到比G1更低的停顿？核心技术差异是什么？",
    answer:
      "根本原因：Shenandoah和ZGC实现了「并发疏散」（concurrent evacuation），而G1的疏散阶段仍然需要STW。G1的流程：并发标记（SATB）→ STW疏散（存活对象复制到空闲Region）。疏散必须STW因为移动对象时mutator不能访问被移动的对象（会读到错误地址），G1无法在移动时让mutator继续运行。Shenandoah和ZGC通过转发指针技术解决了这个问题：①Shenandoah的Brooks指针——每个对象头中有一个转发指针，初始指向自己。对象被移动后，转发指针指向新地址。mutator每次访问对象时先读转发指针，如果指向自己则直接访问，如果指向别处则跳转到新地址。GC移动对象时只需更新转发指针，mutator通过旧地址仍能找到新位置。②ZGC的染色指针——在64位地址的高位编码GC状态（Marked0/Marked1/Remapped），读屏障检查指针颜色判断对象是否正在被移动/转发，自动修正为新地址。两者都实现了「移动对象时mutator不停」，因此疏散阶段可以并发执行，STW仅限于极短的初始标记和再标记阶段。",
    tags: ["并发疏散", "Shenandoah", "ZGC", "G1", "Brooks指针", "染色指针"],
  },
  {
    id: "gch-mg-2",
    chapter: "gch-modern-gc",
    level: 2,
    question: "染色指针和Brooks转发指针各自的工作原理是什么？各有什么优缺点？",
    answer:
      "染色指针（ZGC）：在64位指针的高位（如第42-45位）编码GC状态。Marked0/Marked1表示标记中（两个位交替使用区分GC轮次），Remapped表示已就位。读屏障检查指针颜色：如果是Marked状态，对象可能正在被移动，需检查转发表获取新地址并修正指针（自愈）；如果是Remapped，对象已就位，直接访问。通过OS的多视图映射（multi-mapping），同一物理内存映射到不同虚拟地址，染色指针的地址转换由MMU完成。优点：①不额外占用对象头空间（利用地址高位）；②停顿更短（<1ms）；③支持16TB超大堆。缺点：①需要OS支持多视图映射；②读屏障开销（每次读引用都检查颜色）；③实现复杂。Brooks转发指针（Shenandoah）：在每个对象的对象头中增加一个转发指针，初始指向自己。对象被移动后，转发指针更新为新地址。每次访问对象先读转发指针，fwd==self则未移动，fwd!=self则跳转。优点：①实现相对简单直观；②不需要OS特殊支持；③概念清晰。缺点：①每个对象额外1指针空间开销（约5%堆大小）；②每次对象访问都需额外读一次转发指针（缓存影响）；③停顿不如ZGC短（<10ms vs <1ms）。",
    tags: ["染色指针", "Brooks指针", "ZGC", "Shenandoah", "读屏障", "多视图映射"],
  },
  {
    id: "gch-mg-3",
    chapter: "gch-modern-gc",
    level: 2,
    question: "CMS为什么被废弃？G1如何解决CMS的问题？",
    answer:
      "CMS被废弃的核心原因是碎片问题无法根治：①CMS使用标记-清除算法（不压缩），长期运行后老年代碎片严重。当碎片导致大对象分配失败时，触发Full GC（Serial Old的标记-压缩，全程STW停顿极长），反而比不用CMS更差。②Concurrent Mode Failure——当分配速度超过并发标记速度时，老年代在标记完成前就满了，退化为Full GC。③浮动垃圾——并发期间产生的垃圾本轮不回收，需预留空间，降低堆利用率。G1的解决方案：①Region化——堆分为等大Region（1-32MB），每个Region动态充当Eden/Survivor/Old/Humongous，无物理分代边界。回收时以Region为单位选择垃圾最多的回收（Garbage First），而非回收整个老年代。②Mixed GC——在Young GC基础上增量回收部分Old Region，每次回收少量Old Region消除碎片，而非等到Full GC才压缩。③可预测停顿——通过MaxGCPauseMillis设定停顿目标，根据每个Region的回收成本模型选择能在目标时间内完成的最大Region集合。④复制式回收——存活对象复制到空闲Region，天然无碎片（vs CMS的标记-清除）。G1通过Region化+Mixed GC+复制式回收，在保持低停顿的同时解决了CMS的碎片问题，因此JDK 9起G1成为默认GC。",
    tags: ["CMS", "G1", "碎片", "Concurrent Mode Failure", "Region化", "Mixed GC"],
  },
  {
    id: "gch-mg-4",
    chapter: "gch-modern-gc",
    level: 1,
    question: "在一个32GB堆、要求99线延迟<10ms的在线交易系统中，应该选择G1还是ZGC？为什么？",
    answer:
      "应选择ZGC。分析：①延迟要求——99线<10ms意味着99%的GC停顿必须在10ms以内。G1的典型停顿在~200ms级（虽然MaxGCPauseMillis可设，但在32GB堆上疏散阶段的实际停顿很难控制在10ms以内，因为G1疏散是STW的）。ZGC的停顿<1ms，且不随堆大小增长，32GB堆下99线轻松<10ms。②堆大小——32GB对G1来说偏大（G1推荐8GB~32GB，32GB是上限），疏散开销随堆增大。ZGC专为超大堆设计，32GB完全在舒适区。③吞吐权衡——在线交易系统是延迟敏感型而非吞吐敏感型，ZGC的读屏障开销（约10%~15%吞吐损失）是可接受的，而G1可能出现的200ms停顿会导致交易超时。④分代——ZGC目前无分代（JDK 21开始实验性分代ZGC），在年轻代回收效率上不如G1，但对于交易系统（对象生命周期相对均匀）影响不大。综上，ZGC的亚毫秒停顿+不随堆增长+32GB舒适区，使其比G1更适合此场景。如果堆较小（如4GB）或延迟要求宽松（如100ms），G1的吞吐优势更明显，则是更好的选择。",
    tags: ["G1", "ZGC", "GC选型", "99线延迟", "在线交易", "32GB堆"],
  },
];
