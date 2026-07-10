import type { ReviewQuestion } from "./types";

export const jvtGarbageCollectionQuestions: ReviewQuestion[] = [
  {
    id: "jvt-gc-1",
    chapter: "jvt-garbage-collection",
    level: 2,
    question: `JVM 如何判断对象是否可以回收？可达性分析算法是什么？哪些是 GC Roots？`,
    answer:
      `判断对象存活有两种算法：①引用计数法——对象被引用+1，引用失效-1，为0可回收；缺点无法解决循环引用（A引用B、B引用A但都无外部引用），JVM 不用此法。②可达性分析算法——从 GC Roots 出发，沿引用链遍历，能到达的对象存活，到达不了的对象可回收。JVM（HotSpot）用可达性分析。GC Roots 包括：①虚拟机栈中局部变量表引用的对象（方法内局部变量）；②方法区中类静态属性引用的对象；③方法区中常量引用的对象；④本地方法栈中 JNI 引用的对象；⑤Java 虚拟机内部引用（基本类型 Class、异常对象、类加载器）；⑥同步锁（synchronized）持有的对象；⑦JMXBean、JVMTI 等 JVM 内部回调对象。可达性分析解决了循环引用问题——循环引用的对象若没有 GC Roots 引用链到达，都会被回收。真正的回收还要经过「不可达 → 第一次标记 → 是否需要执行 finalize → 第二次标记」流程，finalize 中对象若重新建立引用可自救（不推荐使用）。`,
    tags: ["可达性分析", "GC Roots"],
  },
  {
    id: "jvt-gc-2",
    chapter: "jvt-garbage-collection",
    level: 3,
    question: `对比标记-清除、复制、标记-整理三种 GC 算法的优缺点及适用场景。`,
    answer:
      `①标记-清除（Mark-Sweep）——先标记所有存活对象，再清除未标记对象。优点实现简单；缺点产生内存碎片（清除后空间不连续），大对象可能找不到连续空间触发提前 GC；适用老年代（CMS 用此法）。②复制（Copying）——将内存分两块，每次只用一块，GC 时把存活对象复制到另一块，清空当前块。优点无碎片、分配快（指针碰撞）；缺点可用内存减半，存活对象多时复制开销大；适用新生代（对象朝生夕灭，存活少复制开销小，HotSpot 用 Eden+2 Survivor 优化为 8:1:1 而非 1:1，浪费仅 10%）。③标记-整理（Mark-Compact）——标记存活对象后，把它们向一端移动整理，清除边界外内存。优点无碎片、不浪费空间；缺点移动对象需更新引用，STW 时间长；适用老年代（Parallel Old、Serial Old 用此法）。选择依据：新生代存活少用复制最高效；老年代存活多用标记清除（CMS 低停顿）或标记整理（无碎片但停顿长）。分代收集就是组合使用——新生代复制、老年代标记清除/整理。`,
    tags: ["GC算法", "对比"],
  },
  {
    id: "jvt-gc-3",
    chapter: "jvt-garbage-collection",
    level: 3,
    question: `Minor GC、Major GC、Full GC 的区别是什么？什么时候触发 Full GC？`,
    answer:
      `①Minor GC（Young GC）——只回收新生代（Eden+Survivor），频繁但速度快（因为新生代小且存活对象少用复制算法）。Eden 满触发，STW 时间短（通常几ms到几十ms）。②Major GC——回收老年代，常与 Full GC 混用，老年代空间不足触发。③Full GC——回收整个堆（新生代+老年代）和方法区（元空间），STW 时间长（可达数秒），应尽量避免。触发 Full GC 的场景：①老年代空间不足——对象晋升过快或大对象直接进老年代撑满；②元空间不足——加载类过多，JDK8+ 触发 Full GC 回收无用类；③System.gc()——显式建议触发（可用 -XX:+DisableExplicitGC 禁用）；④空间分配担保失败——Minor GC 前检查老年代连续空间是否足够容纳所有新生代对象，不够且不允许担保失败则提前 Full GC；⑤CMS 并发模式失败（Concurrent Mode Failure）——CMS 回收时老年代满，退化为 Serial Old 单线程 Full GC，停顿剧增。优化核心：减少 Full GC 频率，因为它的 STW 远长于 Minor GC。`,
    tags: ["GC类型", "触发条件"],
  },
  {
    id: "jvt-gc-4",
    chapter: "jvt-garbage-collection",
    level: 4,
    question: `对比 Serial、Parallel、CMS、G1、ZGC 五种收集器的核心思想和适用场景。`,
    answer:
      `①Serial——单线程收集，STW 时其他线程全停，新生代复制老年代标记整理。适用客户端/小堆（几十MB），简单低开销。②Parallel（Parallel Scavenge + Parallel Old）——多线程并行收集，追求吞吐量（用户时间/(用户+GC时间)），新生代复制老年代标记整理。适用后台计算/批处理，-XX:MaxGCPauseMillis 和 -XX:GCTimeRatio 调吞吐。③CMS（Concurrent Mark Sweep）——以低停顿为目标，老年代用标记清除，分初始标记（STW）→并发标记→预清理→重标记（STW）→并发清除→并发重置。优点停顿短；缺点碎片多（标记清除）、CPU 敏感（并发占CPU）、浮动垃圾（并发标记后产生）。JDK9 废弃 JDK14 移除。④G1（Garbage First）——堆分为多个 Region（默认2048个），每个 Region 可动态扮演 Eden/Survivor/Old/Humongous，优先回收垃圾最多的 Region（Garbage First）。停顿可预测（-XX:MaxGCPauseMillis 设目标），适合大堆（6GB+），JDK9+ 默认。⑤ZGC——着色指针 + 读屏障实现并发标记/转移/重定位，停顿<10ms 且不随堆增大而增长，支持 TB 级堆。JDK11 实验 JDK15 生产。选择：小堆 Serial/Parallel，吞吐优先 Parallel，低停顿大堆 G1，超低停顿超大堆 ZGC。`,
    tags: ["GC收集器", "对比"],
  },
];
