import type { ReviewQuestion } from "./types";

export const jg1GcCycleQuestions: ReviewQuestion[] = [
  {
    id: "jg1-gc-1",
    chapter: "jg1-gc-cycle",
    level: 1,
    question: `G1的GC周期包含哪些阶段？Young GC和Mixed GC在周期中的位置是什么？`,
    answer: `G1的GC周期分为两大类：①日常Young GC——不需要经过完整周期，Eden满了就触发，只回收新生代Region（Eden+Survivor），STW阶段包括根扫描/RRS扫描/更新RSets/对象复制；②完整GC周期——当堆使用率超过IHOP（默认45%）时触发并发标记周期，包含五个阶段：初始标记（Initial Mark，STW，搭便车一次Young GC）→并发标记（Concurrent Mark，与应用线程并发执行，沿引用链标记存活对象）→最终标记（Remark，STW，处理SATB队列和Refine线程剩余工作）→清理（Cleanup，STW，统计各Region垃圾比例、选择CSet候选、回收完全为垃圾的Region）→疏散回收（Evacuation，即Mixed GC，STW，将CSet中存活对象复制到新Region）。Young GC在周期外独立触发；Mixed GC只在并发标记周期的疏散阶段触发，回收新生代+部分老年代Region。`,
    tags: ["GC周期", "Young GC", "Mixed GC", "并发标记"],
  },
  {
    id: "jg1-gc-2",
    chapter: "jg1-gc-cycle",
    level: 2,
    question: `G1并发标记周期的五个阶段中，哪些是STW？哪些是并发的？为什么要这样设计？`,
    answer: `五阶段STW/并发划分：①初始标记——STW，需要暂停所有应用线程标记GC Roots直接引用的对象，搭便车一次Young GC减少独立STW开销；②并发标记——并发，GC线程与应用线程同时运行，沿引用链递归标记所有存活对象，这是耗时最长的阶段但不暂停应用；③最终标记——STW，处理并发标记期间SATB队列收集的引用变更（保证标记完整性），由于只需处理增量，停顿时间短；④清理——部分STW，统计各Region存活/垃圾比例、选择Mixed GC的CSet候选、回收完全为空（无存活对象）的Region，此阶段需要短暂STW；⑤疏散回收——STW，将CSet中存活对象复制到新Region并更新引用。设计原因：标记阶段（②）耗时最长但不需要移动对象，可与应用并发执行；只有需要修改堆内存的阶段（①③④⑤）才STW，最大化应用运行时间。SATB机制保证并发标记的正确性，代价是可能产生浮动垃圾。`,
    tags: ["STW", "并发标记", "阶段设计"],
  },
  {
    id: "jg1-gc-3",
    chapter: "jg1-gc-cycle",
    level: 2,
    question: `G1中IHOP（InitiatingHeapOccupancyPercent）的作用是什么？自适应IHOP如何工作？`,
    answer: `IHOP（\`-XX:InitiatingHeapOccupancyPercent\`，默认45%）决定何时启动并发标记周期——当堆使用率达到IHOP阈值时，G1在下一次Young GC时搭便车触发初始标记。作用：控制Mixed GC的触发频率——IHOP过高（如70%）则并发标记启动晚，老年代积累过多垃圾，Mixed GC回收压力大可能退化为Full GC；IHOP过低（如20%）则并发标记过于频繁，增加CPU开销和浮动垃圾。自适应IHOP（\`-XX:+G1UseAdaptiveIHOP\`，JDK 9+默认开启）：G1根据历史GC数据动态调整IHOP——如果上一次Mixed GC的回收时间远低于MaxGCPauseMillis，G1认为有足够余量，降低IHOP让标记更早启动（增加回收频率但每次回收量小）；如果Mixed GC频繁超时，提高IHOP让标记延迟启动（减少频率但每次回收量大）。自适应目标是让Mixed GC的停顿时间尽量接近但不超MaxGCPauseMillis。`,
    tags: ["IHOP", "自适应IHOP", "并发标记触发"],
  },
  {
    id: "jg1-gc-4",
    chapter: "jg1-gc-cycle",
    level: 3,
    question: `G1的CSet（Collection Set）选择算法如何在源码中实现？它如何平衡停顿目标和回收效率？`,
    answer: `CSet选择算法（源码G1Policy::finalize_collection_set）：①Young GC的CSet——包含所有Eden和Survivor Region（固定的），加上G1Policy::collection_set_candidates中的老年代Region（仅Mixed GC）；②Mixed GC的CSet——首先包含所有新生代Region，然后从候选老年代Region（并发标记阶段识别出的垃圾比例高的Old Region）中按「回收效率」（垃圾字节数/预估回收耗时）降序选择，直到预估总回收时间达到MaxGCPauseMillis目标。源码流程：G1Policy::finalize_cset先用G1Analytics中的历史数据估算每个候选Region的回收耗时（\`_cost_per_card_ms\`、\`_cost_per_byte\`等模型），再按\`_ihop_control\`控制的选择比例确定老年代Region数量上限（\`-XX:G1MixedGCCountTarget\`，默认8，即期望分8次Mixed GC回收完所有候选Old Region）。平衡机制：如果加入某个Region后预估时间超过MaxGCPauseMillis，则停止添加（留下浮动垃圾下轮回收）；如果所有候选都加入仍未达目标时间，也不额外添加（避免过度回收）。这实现了「在停顿目标内最大化回收量」的Garbage First策略。`,
    tags: ["CSet选择", "源码实现", "停顿目标", "回收效率"],
  },
];
