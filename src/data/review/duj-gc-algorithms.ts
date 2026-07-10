import type { ReviewQuestion } from "./types";

export const dujGcAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "duj-gc-1",
    chapter: "duj-gc-algorithms",
    level: 1,
    question: `GC Roots可达性分析如何判断对象是否存活？GC Roots包括哪些？`,
    answer: `可达性分析从GC Roots出发沿引用链搜索，能到达的对象是存活的，不能到达的是可回收的。GC Roots包括：①虚拟机栈中引用的对象（方法局部变量）；②方法区静态属性引用的对象；③方法区常量引用的对象；④本地方法栈JNI引用；⑤synchronized持有的对象；⑥JVM内部引用（基本类型Class对象、异常对象、类加载器）。注意：引用计数法因无法解决循环引用已被废弃。可达性分析配合四种引用强度（强/软/弱/虚）还能实现灵活回收策略。`,
    tags: ["GC Roots", "可达性分析", "对象存活"],
  },
  {
    id: "duj-gc-2",
    chapter: "duj-gc-algorithms",
    level: 2,
    question: `三种基础GC算法的原理和优缺点是什么？为什么新生代用复制、老年代用标记-整理？`,
    answer: `三种算法：①标记-清除——标记存活→清除死亡。优点简单不移动对象，缺点产生内存碎片。②复制——存活对象复制到另一半→清空原来。优点无碎片高效，缺点浪费一半空间。③标记-整理——标记存活→整理到一端→清边界外。优点无碎片不浪费，缺点移动开销大STW长。分代策略原因：新生代对象朝生夕灭（98%在一次Minor GC死亡），存活少复制效率极高，且Eden:S0:S1=8:1:1只浪费10%。老年代存活率高，复制需复制大量对象且无额外空间，所以用标记-清除（CMS）或标记-整理（Serial Old/Parallel Old）。`,
    tags: ["GC算法", "标记-清除", "复制", "标记-整理", "分代收集"],
  },
  {
    id: "duj-gc-3",
    chapter: "duj-gc-algorithms",
    level: 2,
    question: `从Serial到ZGC，收集器演进的核心思路是什么？每步解决了什么问题？`,
    answer: `演进路径：Serial→ParNew/Parallel Scavenge→CMS→G1→ZGC。核心思路从「单线程STW」到「多线程并行STW」到「并发减少STW」到「Region化可预测停顿」到「几乎全并发超低停顿」。Serial单线程STW适合客户端。ParNew多线程并行缩短STW。CMS首次引入并发（初始标记STW→并发标记→重新标记STW→并发清除），降低停顿但碎片化。G1用Region化设计实现可预测停顿（-XX:MaxGCPauseMillis），Mixed GC选择性回收垃圾最多Region。ZGC染色指针+读屏障几乎全并发，停顿<10ms不随堆增长。每步核心取舍：吞吐量vs停顿时间vs内存开销。`,
    tags: ["收集器演进", "Serial", "CMS", "G1", "ZGC"],
  },
  {
    id: "duj-gc-4",
    chapter: "duj-gc-algorithms",
    level: 3,
    question: `CMS的Concurrent Mode Failure是什么？如何避免？`,
    answer: `Concurrent Mode Failure：CMS并发清除阶段用户线程仍在运行产生新对象，如果老年代空间不足以容纳新晋升对象就触发此故障，CMS退化为Serial Old（单线程Full GC完全STW），停顿极长。触发原因：①-XX:CMSInitiatingOccupancyFraction设太高并发GC启动太晚；②浮动垃圾（并发标记后新产生的垃圾本轮不回收）；③碎片化导致连续空间不够分配大对象。避免方法：①降低CMSInitiatingOccupancyFraction（默认92%降到70-80%）让CMS更早启动；②定期触发Full GC做压缩整理；③增大老年代空间；④升级到G1——Region化天然避免碎片化，CMS已在JDK 9废弃、JDK 14移除。`,
    tags: ["CMS", "Concurrent Mode Failure", "GC调优"],
  },
];
