import type { ReviewQuestion } from "./types";

export const jg1YoungGcQuestions: ReviewQuestion[] = [
  {
    id: "jg1-yg-1",
    chapter: "jg1-young-gc",
    level: 1,
    question: "G1 Young GC的触发条件和执行流程是什么？",
    answer: "触发条件：Eden Region分配满（`_young_list_target_length`达到上限），应用线程请求分配新对象时Eden无可用空间，触发Young GC。执行流程（源码G1CollectedHeap::do_collection_pause）：①准备阶段——Mutator线程在安全点暂停，G1VMThread接管；②根扫描——从GC Roots（线程栈、静态字段、JNI引用等）出发标记直接引用的新生代对象；③RRS扫描——扫描各Survivor/Old Region的RSet中记录的引用新生代Region的Card，找到跨代引用；④更新RSets——处理DCQ中的dirty Card，更新各Region的RSet（这部分可在并发Refine线程中做，但部分必须在STW中完成）；⑤对象复制——将Eden和Survivor中的存活对象复制到新的Survivor或Old Region（evacuation），复制时使用复制算法（Cheney风格或指针碰撞）；⑥引用处理——处理SoftReference/WeakReference/PhantomReference；⑦重置——清空原Eden Region回Free List，更新Eden/Survivor大小目标。整个Young GC全程STW，停顿时间由回收的Region数量和RSet扫描量决定。",
    tags: ["Young GC", "触发条件", "执行流程", "STW"],
  },
  {
    id: "jg1-yg-2",
    chapter: "jg1-young-gc",
    level: 2,
    question: "G1 Young GC源码中evacuation（疏散复制）阶段如何实现？对象如何从Eden复制到Survivor/Old？",
    answer: "evacuation阶段源码（G1ParEvacuateFollowersClosure + G1ScanEvacuatedRegionClosure）：①分配目标空间——为每个GC线程分配G1ParGCAllocBuffer（PLAB），在目标Survivor或Old Region中预分配一段空间，复制对象时通过指针碰撞（bump-the-pointer）在PLAB内分配；②扫描根——GC线程从GC Roots和RSet出发找到存活对象，对每个存活对象调用`G1ParScanThreadState::copy_to_survivor_space`；③复制决策——对象年龄未达MaxTenuringThreshold且Survivor有空间→复制到Survivor Region；对象年龄达阈值或Survivor空间不足→晋升到Old Region；④对象复制——在目标Region的PLAB中分配空间，使用`memcpy`复制对象头和对象体，更新对象头的Mark Word（去除hashcode/锁信息等需重置的位）；⑤引用更新——将源对象的所有引用者更新为新地址（通过RSet反向定位引用者）；⑥前向指针——旧对象位置记录forwarding pointer指向新地址，防止同一对象被多次复制（多线程扫描时通过CAS保证只有一个线程复制）。Cheney算法的G1变体：复制后递归扫描新对象的引用，直到所有可达对象都被复制。",
    tags: ["evacuation", "PLAB", "对象复制", "前向指针"],
  },
  {
    id: "jg1-yg-3",
    chapter: "jg1-young-gc",
    level: 2,
    question: "G1 Young GC中RSet扫描（Scan RSets）的源码流程是什么？为什么这一步是停顿时间的主要贡献者？",
    answer: "RSet扫描源码流程（G1RemSet::scan_rem_set → G1ScanRSForRegionClosure）：①遍历CSet中每个Region的RSet——RSet记录了「哪些其他Region的哪些Card引用了本Region」；②对每个引用Region的Card——如果是Fine-grained PRT则精确定位到Card中的对象引用，如果是Coarse PRT则需扫描整个Region的dirty Card；③更新RSets——同时处理DCQ中积压的dirty Card（G1RemSet::refine_card），将新产生的跨Region引用更新到对应RSet；④合并处理——将RSet扫描和DCQ Refinement合并为一个阶段减少重复扫描。为什么是停顿主要贡献者：①RSet扫描量与跨代引用密度成正比——老年代有大量对象引用新生代时，RSet条目多，扫描量大；②Coarse PRT放大效应——当某Region被大量其他Region引用时退化为Coarse PRT，需要扫描整个Region而非精确Card；③DCQ积压——如果并发Refine线程来不及处理DCQ，积压的dirty Card必须在STW中处理。优化方向：控制RSet粒度（`-XX:G1RSetUpdatingPauseTimePercent`）、减少不必要的跨Region引用（合理设置Region大小）。",
    tags: ["RSet扫描", "DCQ", "停顿时间", "源码流程"],
  },
  {
    id: "jg1-yg-4",
    chapter: "jg1-young-gc",
    level: 3,
    question: "G1 Young GC后Eden/Survivor的大小如何自适应调整？源码中G1AdaptiveSizePolicy如何工作？",
    answer: "自适应调整源码（G1Policy::record_collection_pause_end → G1YoungGenSizePolicy::compute_eden_space）：①收集数据——每次Young GC后G1Analytics记录本次GC的停顿时间、回收的Region数、存活对象量、根扫描时间、RSet扫描时间等；②计算目标Eden大小——G1AdaptiveSizePolicy根据历史平均停顿时间与MaxGCPauseMillis的比较，调整下次Young GC的目标Eden Region数（`_young_list_target_length`）。如果上次停顿远低于目标→增加Eden（更多对象在一次GC中回收，减少GC频率，提升吞吐）；如果上次停顿接近或超过目标→减少Eden（降低单次GC时间）；③Survivor调整——根据存活对象量和`-XX:TargetSurvivorRatio`调整Survivor Region数，确保Survivor能容纳存活对象；④晋升阈值动态化——G1可动态调整`-XX:TargetSurvivorRatio`影响对象晋升速度，Survivor空间紧张时提前晋升到Old。关键源码：G1Policy::calculate_young_list_desired_min_length（计算最小Eden Region数）和calculate_young_list_desired_max_length（计算最大Eden Region数，受停顿目标约束）。这种自适应机制使得G1在运行过程中自动找到吞吐和停顿的平衡点。",
    tags: ["自适应调整", "G1AdaptiveSizePolicy", "Eden大小", "源码分析"],
  },
];
