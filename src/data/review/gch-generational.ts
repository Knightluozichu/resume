import type { ReviewQuestion } from "./types";

export const gchGenerationalQuestions: ReviewQuestion[] = [
  {
    id: "gch-gen-1",
    chapter: "gch-generational",
    level: 1,
    question: "弱分代假说的两条内容是什么？它们如何支撑分代回收的设计？",
    answer:
      "弱分代假说两条：①绝大多数对象朝生夕死——统计数据显示80%~98%的对象在一次Minor GC中就被回收。②老年代对象很少引用年轻代对象——跨代引用占比极低（<1%）。支撑分代设计的逻辑：第①条意味着年轻代GC回收率极高，用复制式回收只需复制极少量存活对象（2%~20%），回收极快，因此可以频繁执行Minor GC而不影响吞吐。第②条意味着Minor GC时不需要扫描整个老年代来找跨代引用，只需通过写屏障+卡表记录的少量dirty卡即可，大幅减少扫描范围。综合两条：分代回收将GC从「全堆扫描」降为「年轻代局部扫描 + dirty卡扫描」，Minor GC的开销与年轻代大小（而非全堆大小）成正比，而年轻代通常只占堆的1/3。如果弱分代假说不成立（如所有对象都长期存活），分代回收的优势消失，退化为频繁的全堆GC。",
    tags: ["弱分代假说", "分代回收", "朝生夕死", "跨代引用", "Minor GC"],
  },
  {
    id: "gch-gen-2",
    chapter: "gch-generational",
    level: 2,
    question: "写屏障和卡表如何协作解决跨代引用问题？Minor GC时的扫描流程是什么？",
    answer:
      "写屏障和卡表的协作机制：①写屏障——每次Old对象写入Young引用时，执行写屏障代码：将该Old对象所在的卡（Card，通常512B对齐的内存块）在卡表中标记为dirty（值为1）。这是一个轻量的运行时操作（地址位移+数组赋值）。②卡表——一个字节数组，每个字节对应Old区的一个卡，1=dirty（有跨代引用），0=clean（无跨代引用）。Minor GC时的扫描流程：①扫描所有GC Roots中直接指向Young区的引用；②遍历卡表，找出所有dirty卡（值为1的条目）；③只扫描这些dirty卡中的Old对象，找到它们指向Young区的引用，将这些Young对象标记为存活；④复制Young区存活对象到Survivor；⑤清除卡表的dirty标记（为下一轮准备）。关键优化：不扫描整个Old区，只扫描dirty卡。由于跨代引用占比<1%，dirty卡数量极少，扫描开销远小于全Old扫描。",
    tags: ["写屏障", "卡表", "跨代引用", "Minor GC", "dirty卡"],
  },
  {
    id: "gch-gen-3",
    chapter: "gch-generational",
    level: 2,
    question: "对象从Eden到Old的晋升机制是什么？哪些因素影响晋升？",
    answer:
      "晋升机制：①对象首先在Eden区分配；②Eden满触发Minor GC，存活对象复制到Survivor0，年龄设为1；③下次Minor GC时Survivor0的存活对象复制到Survivor1，年龄+1；④每次Minor GC存活对象在Survivor0和Survivor1之间复制，年龄递增；⑤当年龄达到晋升阈值（JVM默认15，由-XX:MaxTenuringThreshold控制）时，对象晋升到Old区。影响晋升的因素：①MaxTenuringThreshold——阈值越大对象在Survivor中停留越久，过早晋升风险越低但Survivor压力越大；②Survivor空间大小——Survivor太小时，Minor GC存活对象放不下会直接晋升（动态年龄判断：JVM根据Survivor使用率动态调整实际晋升年龄）；③大对象——超过一定阈值（PretenureSizeThreshold）的大对象直接在Old区分配，避免在Young区复制；④动态晋升策略——JVM会根据历史GC数据动态调整晋升年龄，目标是平衡Survivor利用率和过早晋升风险。过早晋升的问题：对象过早进入Old区导致Old区快速填满，触发频繁Major GC，且Old区GC开销大。",
    tags: ["对象晋升", "Eden", "Survivor", "MaxTenuringThreshold", "动态晋升"],
  },
  {
    id: "gch-gen-4",
    chapter: "gch-generational",
    level: 1,
    question: "G1的RSet与传统的卡表有什么区别？为什么G1需要RSet？",
    answer:
      "传统分代GC的卡表：按Old→Young的维度记录跨代引用，粒度是卡（512B）。Minor GC时扫描Young区+dirty卡即可，因为只需要知道Old→Young的引用方向。G1的RSet（Remembered Set）：每个Region维护一个RSet，记录「哪些其他Region引用了本Region」。不仅记录Old→Young，还记录任意Region→本Region的引用。G1需要RSet的原因：①G1以Region为单位回收（Garbage First），不像传统GC回收整个年轻代或老年代。Mixed GC时只回收部分Region（CSet），需要知道CSet外有哪些Region引用了CSet内的对象，才能正确标记存活对象。②G1的Region角色动态变化（Eden/Survivor/Old/Humongous），传统固定分代的卡表不适用。③RSet是反向引用索引——给定一个Region，RSet告诉你谁引用了它，无需扫描全堆。RSet的代价：①内存占用——RSet本身占用堆的1%~20%（取决于跨Region引用密度）；②维护开销——每次引用写入都需更新RSet（Write Barrier + DCQ + Refine线程异步处理）；③三级退化——为控制内存，RSet从稀细（Per-Region-Table）退化为粗（稀疏数组）再退化为非常粗（_bitmap），精度下降但内存节省。",
    tags: ["RSet", "卡表", "G1", "Region", "反向引用索引", "Mixed GC"],
  },
];
