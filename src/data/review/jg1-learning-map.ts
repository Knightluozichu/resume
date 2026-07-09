import type { ReviewQuestion } from "./types";

export const jg1LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "jg1-lm-1",
    chapter: "jg1-learning-map",
    level: 1,
    question: "《JVM G1源码分析和调优》全书的知识体系结构和章节递进逻辑是什么？",
    answer: "全书分为十个章节，覆盖G1收集器的四大知识体系：①G1基础架构——G1收集器概述、Region管理与内存布局、RSet与卡表，理解G1的内存模型和跨代引用追踪机制；②GC周期——G1 GC周期（并发标记+疏散回收）、Young GC源码分析、Mixed GC源码分析、Full GC与退化，理解G1三种回收路径的触发条件和执行流程；③调优实践——G1调优实践，参数调优、问题诊断与性能优化；④全书复习——知识整合。递进逻辑：从内存布局（Region/RSet）到GC周期（Young/Mixed/Full）到调优实践，空间结构→回收流程→工程调优的闭环。",
    tags: ["知识体系", "递进逻辑", "G1架构"],
  },
  {
    id: "jg1-lm-2",
    chapter: "jg1-learning-map",
    level: 2,
    question: "G1收集器与传统分代收集器（如CMS）在架构上的核心区别是什么？为什么G1能实现可预测停顿？",
    answer: "核心区别：①内存布局——传统收集器物理分代（新生代/老年代是连续内存），G1将堆划分为多个等大Region（1-32MB），每个Region可以动态充当Eden/Survivor/Old/Humongous，没有物理上的固定分代边界；②回收方式——传统收集器回收整个新生代或老年代，G1以Region为单位回收（即Garbage First，优先回收垃圾最多的Region）；③停顿控制——传统收集器无法精确控制停顿，G1通过`-XX:MaxGCPauseMillis`设定停顿目标，在回收前估算每个Region的回收耗时，选择能在目标时间内完成的最大Region集合。可预测停顿的关键：G1维护每个Region的回收成本模型（基于历史GC数据），在 evacuation 阶段按性价比排序选择Region，确保总回收时间不超过用户设定目标。",
    tags: ["G1 vs CMS", "Region", "可预测停顿"],
  },
  {
    id: "jg1-lm-3",
    chapter: "jg1-learning-map",
    level: 2,
    question: "用一次线上Mixed GC频繁触发的问题，串联G1全书的四大知识体系。",
    answer: "主线：一次线上G1 Mixed GC频繁触发、应用吞吐下降的诊断与修复。①G1基础架构——理解Region布局判断是否大对象（Humongous）占用过多Region，RSet维护是否因跨Region引用过多导致内存浪费；②GC周期——分析并发标记阶段是否因标记速度跟不上分配速度导致Mixed GC触发频率升高，Young GC是否因Eden过小频繁触发；③源码分析——深入G1CollectedHeap::do_collection了解Mixed GC的CSet选择策略，确认是否因IHOP阈值设置不当导致老年代Region过早纳入回收；④调优实践——调整`-XX:InitiatingHeapOccupancyPercent`降低Mixed GC触发频率，调整`-XX:G1HeapRegionSize`优化Region分配，用GC日志分析工具验证调优效果。依赖关系：内存布局是基础，GC周期决定回收时机，源码分析定位根因，调优实践给出最终方案。",
    tags: ["Mixed GC", "事故串联", "依赖关系"],
  },
  {
    id: "jg1-lm-4",
    chapter: "jg1-learning-map",
    level: 3,
    question: "为什么说理解G1源码对实际调优至关重要？「会调G1参数」和「懂G1源码」的区别是什么？",
    answer: "会调G1参数的人遇到问题就改`-XX:MaxGCPauseMillis`或`-XX:G1HeapRegionSize`，能暂时缓解但不理解为什么有效、什么时候会失效。懂G1源码的人能解释：为什么MaxGCPauseMillis设太小反而降低吞吐（G1为满足停顿目标减少回收Region数量，导致GC频率升高）；为什么IHOP默认45%在某些场景需要调低（大对象频繁分配时老年代增长快，45%触发标记可能来不及）；为什么Mixed GC的CSet选择不是越多越好（CSet过大导致 evacuation 时间超出停顿目标，G1会中止回收留下浮动垃圾）；为什么RSet的粗粒度PRT会导致扫描放大（一个Region被大量其他Region引用时，RSet变粗，扫描成本激增）。判断标志：能否从Region内存模型、RSet追踪机制、GC周期状态机三个维度解释一个G1现象的根因，而非「遇到问题就调参数」。",
    tags: ["源码与调优", "理解深度", "参数vs原理"],
  },
];
