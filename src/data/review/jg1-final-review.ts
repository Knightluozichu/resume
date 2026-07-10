import type { ReviewQuestion } from "./types";

export const jg1FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jg1-fr-1",
    chapter: "jg1-final-review",
    level: 2,
    question: `用G1的内存模型（Region+RSet+卡表）解释为什么G1能以Region为单位回收，而不需要全堆扫描。`,
    answer: `G1以Region为单位回收的核心机制：①Region化堆布局——堆被划分为等大Region（1-32MB），每个Region动态充当Eden/Survivor/Old/Humongous，回收时只需选择部分Region组成CSet，而非全堆。②RSet反向引用索引——每个Region维护RSet，记录「哪些其他Region的哪些Card引用了本Region的对象」。回收某个Region时，只需查其RSet即可定位所有跨Region引用来源，不需要扫描全堆。例如回收Region A时，RSet(A)指向Region B/C中的dirty Card，GC只扫描B/C的这些Card（而非整个B/C Region）即可更新引用。③卡表精确定位——RSet底层用卡表（512字节/Card）记录跨引用的精确位置，Fine-grained PRT可精确定位到Card，即使退化为Coarse PRT也只需扫描一个Region而非全堆。④Write Barrier动态维护——每次写引用时通过Write Barrier将跨Region引用更新到DCQ，Refine线程异步更新RSet，保证RSet始终反映最新的跨引用关系。这套机制使得G1回收n个Region的时间与n成正比（而非与堆大小成正比），实现可扩展的Region级回收。`,
    tags: ["Region回收", "RSet", "卡表", "内存模型"],
  },
  {
    id: "jg1-fr-2",
    chapter: "jg1-final-review",
    level: 3,
    question: `从源码角度对比G1的Young GC、Mixed GC和Full GC三种回收路径的异同，分析各自的性能特征。`,
    answer: `三种回收路径源码对比：①CSet组成——Young GC CSet=Eden+Survivor（G1Policy::finalize_young_collection）；Mixed GC CSet=Eden+Survivor+部分Old（G1Policy::finalize_mixed_collection，增加finalize_old_collection_set从候选Old Region中选择）；Full GC CSet=整个堆（G1FullGCTask无CSet概念，直接全堆扫描）。②回收算法——Young/Mixed GC用复制式evacuation（存活对象复制到新Region），Full GC用标记-整理（存活对象原地移动消除碎片）。③并行度——Young/Mixed GC使用多个GC线程并行（ParallelGCThreads），Full GC在JDK 10前是单线程（Serial Old），JDK 10+才支持并行。④STW特性——Young/Mixed GC全程STW但时间可控（通过CSet大小和MaxGCPauseMillis），Full GC全程STW且时间不可控（与堆大小成正比）。⑤RSet使用——Young/Mixed GC的RSet扫描是停顿的主要贡献者，Full GC全堆扫描不需要RSet。⑥并发支持——Young/Mixed GC前有并发标记周期（Mixed GC特有），Full GC无并发阶段。性能特征：Young GC停顿最短（<50ms），Mixed GC停顿中等（100-300ms），Full GC停顿最长（秒级）。G1调优的核心目标是通过合理的Young/Mixed GC配置使Full GC频率趋近于0。`,
    tags: ["源码对比", "三种GC", "性能特征", "回收路径"],
  },
  {
    id: "jg1-fr-3",
    chapter: "jg1-final-review",
    level: 3,
    question: `一个G1应用的GC日志显示Mixed GC频繁触发但每次回收量很少，分析可能的根因和调优方案。`,
    answer: `可能根因分析：①IHOP过低——\`-XX:InitiatingHeapOccupancyPercent\`设得太低（如20%），并发标记周期频繁启动，每次只标记出少量垃圾Old Region，Mixed GC回收量少。调优：调高IHOP到35-45%让老年代积累更多垃圾再启动标记。②G1MixedGCCountTarget过大——\`-XX:G1MixedGCCountTarget=16\`（默认8）使每次Mixed GC只回收很少Old Region，Mixed GC次数增多但每次回收量少。调优：调小到8或4让每次Mixed GC回收更多Old Region。③MaxGCPauseMillis过小——停顿目标太紧（如50ms），G1在CSet选择时只能纳入极少Old Region，导致回收量少且Mixed GC次数多。调优：增大到200ms。④老年代存活率过高——大部分Old Region存活率超过G1MixedGCLiveThresholdPercent（85%），无法纳入CSet。说明对象过早晋升或存在内存泄漏。调优：增大MaxTenuringThreshold减少晋升，用jmap/MAT分析Old Region中的对象是否泄漏。⑤分配速率波动大——突发分配导致频繁Young GC，每次Young GC后Survivor不够晋升到Old，Mixed GC来不及回收。调优：增大Survivor或减小Eden。诊断流程：先看GC日志中Mixed GC的CSet Old Region数量和存活率，再看IHOP和MaxGCPauseMillis设置，最后分析堆dump确认Old Region中的对象分布。`,
    tags: ["Mixed GC调优", "根因分析", "IHOP", "GC日志诊断"],
  },
  {
    id: "jg1-fr-4",
    chapter: "jg1-final-review",
    level: 4,
    question: `设计一套G1生产环境的监控告警体系，覆盖从日常监控到异常诊断的完整流程。`,
    answer: `监控告警体系设计：①GC日志采集——JVM启动参数加\`-Xlog:gc*:file=/var/log/gc/gc.log:time,uptime,level,tags:filecount=10,filesize=50M\`，滚动输出GC日志；用Filebeat/Fluentd采集到ELK或Loki。②关键指标提取——从GC日志解析出：Young GC频率（次/分钟）、Mixed GC频率、Full GC计数、平均/最大/P99停顿时间、堆使用率峰值、分配速率（MB/s）、evacuation failure计数。③实时监控面板——Grafana展示：GC停顿时间趋势图（区分Young/Mixed/Full）、堆内存使用率分布图（Eden/Survivor/Old/Humongous Region数）、GC频率热力图、分配速率趋势。④告警规则——P0（立即告警）：Full GC>0、单次GC停顿>1秒、evacuation failure>0；P1（5分钟告警）：P99停顿>MaxGCPauseMillis*1.5、Mixed GC频率>10次/分钟、堆使用率>85%持续5分钟；P2（30分钟告警）：Young GC频率>60次/分钟、分配速率突增50%。⑤异常诊断流程——告警触发后自动执行：jcmd GC.heap_info（Region分布）→jmap -histo:live（对象Top 20）→jstack（线程状态）→导出heap dump（仅P0/P1）。⑥定期报告——每周生成GC分析报告：Full GC计数（目标=0）、平均停顿vs MaxGCPauseMillis达标率、IHOP自适应值变化趋势、RSet内存占比、推荐参数调整。⑦工具集成——JDK Mission Control（JFR）持续录制低开销事件，出现异常时用JFR分析GC前后的事件关联。`,
    tags: ["监控告警", "生产环境", "Grafana", "异常诊断"],
  },
];
