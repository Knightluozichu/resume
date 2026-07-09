import type { ReviewQuestion } from "./types";

export const gchRealtimeGcQuestions: ReviewQuestion[] = [
  {
    id: "gch-rt-1",
    chapter: "gch-realtime-gc",
    level: 1,
    question: "实时GC的工作量模型是什么？Slack为正和为负分别意味着什么？",
    answer:
      "工作量模型：W = 分配率 × 时间间隔。mutator在每个GC周期内分配的对象量等于GC需要回收的工作量。例如分配率100MB/s、GC周期10ms，则每周期工作量W=1MB，GC必须在10ms内处理完1MB垃圾。Slack = 时间预算 - 必需GC时间。Slack为正意味着GC在时间预算内有余量，可以安全完成工作，甚至可以少做一些GC工作让mutator多运行（Slack-based调度的做法）。Slack为零意味着GC刚好能在截止时间内完成，处于临界状态。Slack为负意味着必需的GC时间超过了时间预算，GC无法在截止时间内完成所有工作，这是溢出状态——GC工作堆积，可能导致后续停顿超过截止时间或触发降级（如Full GC）。Slack为负的应对策略：①增大GC频率（缩短周期，减少每周期工作量）；②减小mutator分配率（限流或背压）；③增大时间预算（但会增加单次停顿）；④增加GC线程（并行处理更多工作）。",
    tags: ["工作量模型", "Slack", "分配率", "截止时间", "溢出"],
  },
  {
    id: "gch-rt-2",
    chapter: "gch-realtime-gc",
    level: 2,
    question: "Metronome调度和Slack-based调度各自的工作原理和优缺点是什么？",
    answer:
      "Metronome调度：固定周期T（如1ms），每周期内固定比例分给mutator和GC（如60%/40%）。优点：①停顿严格可预测——每周期GC停顿不超过预算（如0.4ms）；②实现相对简单——固定调度不需要复杂计算；③适合hard real-time——严格保证截止时间。缺点：①浪费——分配率低时GC仍占用40%时间片但无事可做；②不够灵活——分配率突增时固定40%可能不够，导致Slack为负；③吞吐损失——即使不需要GC也固定分配时间。Slack-based调度：根据Slack值动态调整mutator和GC的时间分配。Slack大时GC少做（mutator多运行），Slack小时GC多做。优点：①自适应——根据实际分配率调整GC工作量，不浪费；②吞吐更好——分配率低时mutator获得更多时间；③灵活——分配率突增时自动增加GC频率。缺点：①停顿不如Metronome可预测——动态调度导致每周期停顿可能不同；②实现复杂——需精确计算Slack，需处理调度决策的边界条件；③不适合hard real-time——可能偶尔超过截止时间。",
    tags: ["Metronome", "Slack-based", "调度策略", "固定周期", "动态调整"],
  },
  {
    id: "gch-rt-3",
    chapter: "gch-realtime-gc",
    level: 2,
    question: "实时GC对算法有什么特殊要求？为什么标记-清除比标记-压缩更适合实时GC？",
    answer:
      "实时GC对算法的特殊要求：①可拆分性——GC工作必须能拆成小片段在时间预算内完成。标记阶段可按Region/页拆分，每段标记一部分对象；清除阶段可按块拆分，每段清除一部分堆。②可中断性——GC片段必须能在任意点中断并恢复，需要保存中间状态（标记栈位置、扫描进度等）。③可预估性——每段GC的工作量必须可预估，才能计算Slack并做调度决策。标记-清除比标记-压缩更适合实时GC的原因：①标记-清除不移动对象——移动对象需要原子性（不能在中途停），而标记和清除都可以在任意点中断恢复；②标记-清除的清除阶段只需将未标记对象加入自由链表，每个对象的处理是独立的，天然可拆分；③标记-压缩的三趟流程（计算地址→更新引用→移动对象）有依赖关系——必须先算完所有地址才能更新引用，更新完引用才能移动，难以在中间中断恢复；④标记-清除的工作量更容易预估——标记阶段遍历存活对象（数量可统计），清除阶段遍历堆（大小已知），而压缩的移动开销与存活对象大小和引用密度相关，预估更难。",
    tags: ["实时GC", "可拆分性", "可中断性", "可预估性", "标记-清除", "标记-压缩"],
  },
  {
    id: "gch-rt-4",
    chapter: "gch-realtime-gc",
    level: 1,
    question: "实时GC与ZGC/Shenandoah等低延迟GC有什么本质区别？各自适合什么场景？",
    answer:
      "本质区别：实时GC追求「可预测的停顿上限」（hard real-time，保证截止时间），而ZGC/Shenandoah追求「最低平均停顿」（soft real-time，尽量短但不保证上限）。具体区别：①调度模型——实时GC有严格的工作量模型和Slack计算，主动控制GC频率和停顿；ZGC/Shenandoah通过并发化减少STW，不做主动调度。②屏障开销——实时GC通常用读屏障（Baker式），每次读引用都检查转发状态，开销大但保证mutator不访问未就位对象；ZGC也用读屏障但配合染色指针优化，Shenandoah用Brooks转发指针。③GC频率——实时GC以固定或动态周期运行，频率高但每次短；ZGC/Shenandoah在堆使用率达到阈值时触发，频率较低。④吞吐——实时GC因屏障开销和固定GC时间片，吞吐损失较大（10%~30%）；ZGC/Shenandoah的吞吐损失较小（5%~15%）。适合场景：实时GC适合「任何时候都不能超过X毫秒」的hard real-time系统（航空、医疗、工业控制、高频交易）；ZGC/Shenandoah适合「大多数时候快但偶尔可以慢」的soft real-time系统（Web服务、微服务、大数据处理）。",
    tags: ["实时GC", "ZGC", "Shenandoah", "hard real-time", "soft real-time", "吞吐损失"],
  },
];
