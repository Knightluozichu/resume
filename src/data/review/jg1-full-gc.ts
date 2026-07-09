import type { ReviewQuestion } from "./types";

export const jg1FullGcQuestions: ReviewQuestion[] = [
  {
    id: "jg1-fg-1",
    chapter: "jg1-full-gc",
    level: 1,
    question: "G1 Full GC的触发条件有哪些？为什么G1要尽量避免Full GC？",
    answer: "触发条件：①Mixed GC/Young GC疏散失败——evacuation时目标Region空间不足（Survivor或Old Region无法容纳存活对象），触发Full GC作为兜底；②并发标记跟不上分配速度——老年代增长过快，IHOP触发并发标记后标记还没完成老年代就满了，被迫Full GC；③Metaspace空间不足——元空间（Metaspace）分配失败时触发Full GC回收元空间；④`System.gc()`显式调用——除非设置`-XX:+DisableExplicitGC`；⑤大对象分配失败——Humongous对象找不到连续Free Region时退化Full GC；⑥RSet内存不足——RSet占用的本地内存超出限制。为什么避免Full GC：①全程STW——Full GC使用Serial Old收集器（单线程），回收整个堆，停顿时间可达数秒甚至数十秒；②无并发——不像Mixed GC有并发标记阶段，Full GC全程暂停应用；③性能退化——Full GC后G1的统计模型可能被重置，自适应策略失效。G1的设计目标就是通过Young GC和Mixed GC的组合避免Full GC。",
    tags: ["Full GC", "触发条件", "避免原因", "Serial Old"],
  },
  {
    id: "jg1-fg-2",
    chapter: "jg1-full-gc",
    level: 2,
    question: "G1的evacuation failure（疏散失败）是如何发生的？源码中如何处理？",
    answer: "evacuation failure发生场景：Young GC或Mixed GC的evacuation阶段，存活对象需要复制到目标Region（Survivor/Old），但目标Region已满无法分配。具体触发：①PLAB分配失败——GC线程在目标Region的PLAB（G1ParGCAllocBuffer）中分配空间失败，尝试扩展PLAB或分配新PLAB也失败（目标Region无剩余空间）；②全堆空间不足——所有Free Region已用完，无法分配新的Survivor/Old Region。源码处理（G1CollectedHeap::handle_evacuation_failure）：①设置_evacuation_failed标志——通知所有GC线程停止evacuation；②回退策略——对于已经复制到新位置的对象保留，对于未能复制的对象在原位置标记为存活（不回收），这些对象留在原Region中；③Full GC兜底——Young/Mixed GC结束后检测到_evacuation_failed，触发Full GC回收整个堆；④记录日志——GC日志中会输出`to-space exhausted`或`evacuation failure`。预防措施：增大堆或减少Eden（降低单次GC回收量）、增大Survivor（减少晋升压力）、调低IHOP（提前Mixed GC回收老年代）。",
    tags: ["evacuation failure", "疏散失败", "源码处理", "Full GC兜底"],
  },
  {
    id: "jg1-fg-3",
    chapter: "jg1-full-gc",
    level: 2,
    question: "G1 Full GC的执行流程是什么？它使用什么算法？与Mixed GC有何本质区别？",
    answer: "执行流程（源码G1CollectedHeap::do_full_collection → G1FullGCTask）：①全堆STW——暂停所有应用线程，单线程（JDK 10前）或并行（JDK 10+的G1FullGCMarker）执行；②全堆标记——从GC Roots出发标记整个堆（新生代+老年代+Humongous）的所有存活对象，不区分Region类型；③计算新地址——为每个存活对象计算在压缩后的新地址（标记-整理算法，将存活对象向堆底移动消除碎片）；④更新引用——将所有引用更新为新地址；⑤复制对象——将存活对象移动到新位置（原地整理，不使用Region间复制）；⑥清空——未被占用的Region全部清空回Free List。算法：标记-整理（Mark-Compact），与G1日常的复制式evacuation完全不同——Full GC在Region内部整理存活对象消除碎片，而evacuation是将存活对象复制到其他Region。本质区别：①Full GC回收整个堆，Mixed GC只回收CSet中的Region；②Full GC用标记-整理（原地移动），Mixed GC用复制（Region间迁移）；③Full GC全程STW且单线程（JDK 10前），Mixed GC也是STW但有并行GC线程。",
    tags: ["Full GC流程", "标记-整理", "vs Mixed GC", "源码"],
  },
  {
    id: "jg1-fg-4",
    chapter: "jg1-full-gc",
    level: 3,
    question: "G1的退化路径有哪些？如何通过监控和调优避免Full GC的发生？",
    answer: "退化路径（Young/Mixed GC退化为Full GC的场景）：①疏散失败→Full GC——Eden/Survivor/Old空间不足导致evacuation失败，源码中_evacuation_failed=true触发Full GC；②并发标记失败→Full GC——IHOP设置过高或分配速度过快，老年代在并发标记完成前就满了，Mixed GC来不及回收；③Humongous分配失败→Full GC——连续Free Region不足，Full GC整理碎片释放连续空间；④Metaspace满→Full GC——元空间OOM触发Full GC回收类元数据。避免策略：①监控GC日志——关注`to-space exhausted`/`evacuation failure`/`Full GC`关键字，使用GCViewer或GCEasy分析GC频率和停顿分布；②调低IHOP——`-XX:InitiatingHeapOccupancyPercent=35`（默认45%）让并发标记更早启动，给Mixed GC更多时间；③增大堆或调整Region大小——`-XX:G1HeapRegionSize`增大减少Humongous对象；④控制晋升速率——`-XX:MaxTenuringThreshold`增大让对象在Survivor多活几轮减少Old增长；⑤关闭显式GC——`-XX:+DisableExplicitGC`防止`System.gc()`触发Full GC；⑥预留空间——`-XX:G1ReservePercent=20`（默认10%）增加保留内存应对疏散峰值。",
    tags: ["退化路径", "避免Full GC", "监控调优", "IHOP"],
  },
];
