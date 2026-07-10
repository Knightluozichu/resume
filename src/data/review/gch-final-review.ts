import type { ReviewQuestion } from "./types";

export const gchFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gch-fr-1",
    chapter: "gch-final-review",
    level: 1,
    question: `用GC全栈视角分析「一个Java应用在32GB堆上频繁Full GC，每次停顿5秒」的根因，并给出解决方案。`,
    answer:
      `全栈分析：①算法维度——Full GC通常意味着Minor GC和Mixed GC无法有效回收，可能是老年代碎片严重（标记-清除积累）或存活率过高（复制式不适用）。②分代维度——检查Survivor是否过小导致对象过早晋升Old，Old区是否因碎片导致分配失败触发Full GC。检查晋升率是否异常（大对象直接进Old、Survivor太小动态年龄判断提前晋升）。③并发维度——如果使用CMS，检查是否有Concurrent Mode Failure（并发标记跟不上分配速度退化为Full GC）。如果是G1，检查Mixed GC是否因IHOP设置不当导致触发频率过低，老年代积累过多。④现代GC维度——32GB堆上G1的疏散停顿可能过长，考虑迁移到ZGC（停顿<1ms不随堆增长）。解决方案：①短期——调大Survivor或MaxTenuringThreshold减少过早晋升；调整G1的IHOP让Mixed GC更早触发；增大G1HeapRegionSize减少Humongous对象碎片。②中期——分析GC日志确认Full GC触发原因（promotion failed / allocation failed / concurrent mode failure），针对性调优。③长期——评估迁移到ZGC，32GB堆ZGC停顿<1ms，根治长停顿问题。`,
    tags: ["全栈分析", "Full GC", "32GB堆", "碎片", "Concurrent Mode Failure", "ZGC迁移"],
  },
  {
    id: "gch-fr-2",
    chapter: "gch-final-review",
    level: 2,
    question: `从算法演进的角度，解释每代GC解决了前代的什么问题，又引入了什么新问题。`,
    answer:
      `演进链条：①标记-清除（1959）解决了手动管理的悬垂指针/泄漏问题，引入碎片问题（不移动对象）。②复制式回收（1963）解决了碎片问题（紧凑复制），引入空间减半问题（需要From/To半区）。③标记-压缩（1970s）解决了空间减半问题（原地滑动），引入多趟遍历开销（计算地址→更新引用→移动对象）。④分代回收（1970s）解决了全堆扫描问题（弱分代假说→Minor GC只扫年轻代），引入跨代引用追踪问题（需要写屏障+卡表+RSet的运行时开销）。⑤并发回收（1980s）解决了STW停顿长问题（与mutator同时运行），引入并发正确性问题（三色不变式、漏标/浮动垃圾、读写屏障开销）。⑥实时GC解决了停顿不可预测问题（工作量模型+Metronome调度），引入吞吐损失问题（固定GC时间片或屏障开销）。⑦现代实现（CMS/G1/ZGC/Shenandoah）将上述理论落地：CMS解决了分代+并发但碎片致命→废弃；G1解决了CMS碎片（Region+Mixed GC）但疏散仍STW；ZGC/Shenandoah解决了疏散STW（并发疏散+转发指针）但引入屏障开销和无分代问题。每代GC在解决前代问题的同时引入新的权衡，不存在完美方案。`,
    tags: ["算法演进", "标记-清除", "复制式", "压缩", "分代", "并发", "实时", "现代GC"],
  },
  {
    id: "gch-fr-3",
    chapter: "gch-final-review",
    level: 2,
    question: `如果设计一个面向AI推理服务的GC，你会如何选型？需要考虑哪些特殊因素？`,
    answer:
      `AI推理服务的GC特征分析：①对象生命周期——推理请求是短生命周期（输入tensor/中间结果），模型权重是长生命周期（加载后常驻）。符合弱分代假说，分代回收有效。②内存模式——大对象多（模型参数、batch tensor），可能触发Humongous分配。③延迟敏感——推理延迟通常要求<100ms，GC停顿会直接增加推理延迟。④吞吐需求——高QPS场景吞吐也重要。⑤堆大小——大模型（如LLM）可能需要数十GB堆。选型建议：①首选ZGC——推理服务的延迟敏感+大堆特征完美匹配ZGC的<1ms停顿+不随堆增长。模型权重作为长期存活对象在Old区/ZPage中，推理tensor作为短生命周期对象频繁分配回收。ZGC的并发疏散保证GC停顿不影响推理延迟。②备选G1——如果堆<32GB且延迟要求宽松（如<200ms），G1的吞吐优势更大，分代结构对短生命周期对象更友好。③不推荐CMS——已废弃且有碎片风险。④不推荐Shenandoah——虽然<10ms停顿也够，但Brooks指针的额外空间开销在大模型场景下浪费较大。特殊考虑：①大对象——需要配置合理的Region/ZPage大小避免Humongous分配碎片；②模型加载——加载大模型时可能触发Full GC，建议预分配或使用堆外内存（off-heap）；③预热——AI推理服务启动时模型加载会产生大量长生命周期对象，需考虑预热策略避免运行时晋升风暴。`,
    tags: ["AI推理", "GC选型", "ZGC", "大模型", "延迟敏感", "大对象"],
  },
  {
    id: "gch-fr-4",
    chapter: "gch-final-review",
    level: 1,
    question: `为什么说「没有银弹」是GC领域的铁律？用全书的算法权衡说明这一点。`,
    answer:
      `「没有银弹」在GC领域的体现——每个GC算法都在吞吐、延迟、内存三者间做权衡，不可能同时最优：①标记-清除——内存利用率高（~100%）但碎片严重，分配速度慢（O(n)链表）。适合嵌入式但不适合大堆。②复制式——无碎片+O(1)分配但空间减半。适合年轻代（存活率低）但不适合老年代（存活率高复制成本大）。③标记-压缩——无碎片+不浪费空间但多趟遍历开销大。适合老年代但停顿长。④分代回收——优化了回收频率（Minor GC快）但引入写屏障开销（5%~10%吞吐损失）和RSet内存占用。⑤并发回收——减少停顿但引入屏障开销和浮动垃圾。SATB不漏标但多标（浮动垃圾），INC不多标但再标记开销大。⑥实时GC——保证截止时间但吞吐损失大（10%~30%），且实现复杂。⑦G1——平衡停顿和碎片但疏散仍STW，32GB+堆停顿可能超标。⑧ZGC——<1ms停顿但读屏障开销降低吞吐10%~15%，无分代（JDK21前）影响年轻代效率。⑨Shenandoah——<10ms停顿但Brooks指针每对象+1指针空间开销。选择GC的本质是回答「你最在意什么」：吞吐优先→Parallel/G1；延迟优先→ZGC/Shenandoah；内存优先→Serial；实时保证→Metronome。不存在在所有维度都最优的GC，这就是「没有银弹」的铁律。`,
    tags: ["没有银弹", "算法权衡", "吞吐", "延迟", "内存", "GC选型"],
  },
];
