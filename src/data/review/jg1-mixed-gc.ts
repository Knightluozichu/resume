import type { ReviewQuestion } from "./types";

export const jg1MixedGcQuestions: ReviewQuestion[] = [
  {
    id: "jg1-mg-1",
    chapter: "jg1-mixed-gc",
    level: 1,
    question: `G1 Mixed GC与Young GC的区别是什么？Mixed GC回收哪些Region？`,
    answer: `核心区别：①CSet组成——Young GC的CSet只包含新生代Region（Eden+Survivor），Mixed GC的CSet包含新生代Region+部分老年代Region；②触发时机——Young GC在Eden满时触发，Mixed GC在并发标记周期完成后的疏散阶段触发；③回收目标——Young GC只回收新生代（对象朝生夕死，回收效率高），Mixed GC增量回收老年代（分多次逐步清理老年代垃圾，避免一次性Full GC的长时间停顿）。Mixed GC回收的Region：所有Eden Region、所有Survivor Region、以及从CSet候选列表（并发标记阶段选出的垃圾比例高的Old Region）中按回收效率降序选择的部分Old Region（受MaxGCPauseMillis时间预算约束）。Mixed GC的设计目的：用多次短停顿的Mixed GC替代一次长停顿的Full GC，实现老年代的增量回收。一个并发标记周期通常触发多次Mixed GC直到老年代垃圾回收完毕。`,
    tags: ["Mixed GC", "Young GC", "CSet组成", "老年代回收"],
  },
  {
    id: "jg1-mg-2",
    chapter: "jg1-mixed-gc",
    level: 2,
    question: `Mixed GC的CSet中老年代Region的选择策略是什么？源码中如何控制选择数量？`,
    answer: `选择策略（源码G1Policy::finalize_collection_set）：①候选列表——并发标记的Cleanup阶段根据各Old Region的存活率排序，存活率低（垃圾多）的优先，形成\`_collection_set_candidates\`列表；②时间预算——Mixed GC的停顿时间预算 = MaxGCPauseMillis - 新生代Region回收预估时间 - 固定开销（根扫描/RSets更新等）；③贪心选择——按候选列表顺序（垃圾多→少），逐个估算Old Region的回收耗时（基于G1Analytics的历史数据），如果加入后总预估时间不超过时间预算则纳入CSet，否则停止；④数量上限——\`-XX:G1MixedGCCountTarget\`（默认8）控制期望分几次Mixed GC回收完所有候选Old Region，每次最多选择候选总量的1/target比例；⑤\`-XX:G1MixedGCLiveThresholdPercent\`（默认85%）——存活率超过此阈值的Old Region不纳入CSet（回收性价比太低，复制存活对象太多）。源码中G1Policy::finalize_old_collection_set遍历候选列表，用G1Analytics::predict_region_copy_time_ms估算每个Region的复制时间，累加判断是否超出预算。`,
    tags: ["CSet选择", "G1MixedGCCountTarget", "时间预算", "源码"],
  },
  {
    id: "jg1-mg-3",
    chapter: "jg1-mixed-gc",
    level: 2,
    question: `Mixed GC在什么情况下会终止（即停止选择更多Old Region）？终止后剩余Old Region如何处理？`,
    answer: `Mixed GC终止条件（源码G1Policy::finalize_old_collection_set中的三个退出条件）：①时间预算耗尽——加入下一个Old Region后预估总时间超过MaxGCPauseMillis，停止选择（留下浮动垃圾，下轮Mixed GC回收）；②候选列表耗尽——所有候选Old Region都已纳入CSet，本轮Mixed GC后老年代清理完毕，并发标记周期结束；③存活率过高——剩余候选Old Region的存活率超过\`G1MixedGCLiveThresholdPercent\`（默认85%），回收性价比太低，终止本轮Mixed GC。终止后剩余Old Region处理：①如果是条件①（时间预算），剩余候选Old Region保留在\`_collection_set_candidates\`列表，下一次Mixed GC继续从上次位置选择；②如果是条件②（候选耗尽），并发标记周期结束，等待下一次IHOP触发新的并发标记周期；③如果是条件③（存活率高），这些Region会在下一次并发标记周期中重新评估，如果存活率降低（更多对象死亡）则可能被重新纳入候选。关键点：G1不会强制回收所有垃圾Region，而是优先回收性价比高的，保证停顿可控。`,
    tags: ["Mixed GC终止", "浮动垃圾", "存活率阈值"],
  },
  {
    id: "jg1-mg-4",
    chapter: "jg1-mixed-gc",
    level: 3,
    question: `Mixed GC的evacuation阶段与Young GC有何不同？Old Region的存活对象复制到何处？源码如何处理？`,
    answer: `evacuation差异：①CSet更大——Mixed GC的CSet包含Old Region，evacuation需要复制更多存活对象（Old Region存活率通常远高于Eden），复制耗时更长；②RSet扫描量更大——Old Region的RSet条目更多（跨代引用更复杂），RSet扫描时间增加；③目标Region不同——Young GC中存活对象复制到Survivor或Old Region，Mixed GC中Old Region的存活对象只能复制到新的Old Region（不能再回到Survivor）。源码处理（G1ParEvacuateFollowersClosure）：①统一evacuation——Mixed GC和Young GC共用同一个evacuation代码路径，区别仅在CSet组成。G1ParScanThreadState::copy_to_survivor_space根据对象来源Region类型和年龄决定目标Region类型——来自Eden/Survivor的对象按年龄判断复制到Survivor或晋升Old，来自Old Region的对象（Mixed GC特有）直接复制到新Old Region；②Old Region回收——evacuation后原Old Region清空回Free List，_type重置为Free；③记忆集迁移——存活对象复制到新Region后，新Region的RSet需要记录所有引用者的位置（从原Region的RSet迁移），源码中通过G1ParScanThreadState::do_oop_evac更新引用。整个流程对应用透明，引用更新由GC自动完成。`,
    tags: ["evacuation差异", "Old Region复制", "源码处理"],
  },
];
