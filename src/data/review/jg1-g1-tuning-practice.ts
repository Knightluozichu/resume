import type { ReviewQuestion } from "./types";

export const jg1G1TuningPracticeQuestions: ReviewQuestion[] = [
  {
    id: "jg1-tp-1",
    chapter: "jg1-g1-tuning-practice",
    level: 1,
    question: "G1调优的核心参数有哪些？各自的作用和推荐值是什么？",
    answer: "核心参数：①`-XX:MaxGCPauseMillis=200`——停顿时间目标，G1据此调整CSet大小，不是越小越好（太小则GC频率升高降低吞吐），推荐100-300ms；②`-XX:InitiatingHeapOccupancyPercent=45`——并发标记触发阈值，堆使用率达此值启动标记周期，大对象多时建议调低到35-40%；③`-XX:G1HeapRegionSize`——Region大小（1-32MB，2的幂），一般让G1自动选择，大堆（>64GB）可手动设大（如16-32MB）减少Region数和RSet开销；④`-XX:MaxTenuringThreshold=15`——对象晋升老年代年龄阈值，新生代对象周转快可调小（如10）加速回收；⑤`-XX:G1ReservePercent=10`——保留内存比例，应对疏散峰值，evacuation failure时调高到15-20%；⑥`-XX:ParallelGCThreads`——GC线程数，建议=CPU核心数（超线程则为核心数的5/8）；⑦`-XX:ConcGCThreads`——并发标记线程数，建议=ParallelGCThreads的1/4；⑧`-XX:G1MixedGCCountTarget=8`——Mixed GC分批次数，调大（如16）使每次Mixed GC回收更少Old Region降低单次停顿。调优原则：先设置堆大小和MaxGCPauseMillis，让G1自适应，再根据GC日志微调。",
    tags: ["核心参数", "MaxGCPauseMillis", "IHOP", "调优推荐值"],
  },
  {
    id: "jg1-tp-2",
    chapter: "jg1-g1-tuning-practice",
    level: 2,
    question: "如何通过GC日志诊断G1性能问题？关注哪些关键指标？",
    answer: "GC日志分析（需开启`-Xlog:gc*:file=gc.log:time,uptime,level,tags`）：关键指标：①GC频率——Young GC和Mixed GC的间隔时间，频率过高（<1秒）说明Eden过小或分配速率过快；②停顿时间——每条GC日志的`Pause Young`/`Pause Mixed`后的real时间，与MaxGCPauseMillis对比，频繁超标需调参；③`to-space exhausted`/`evacuation failure`——出现说明Survivor/Old空间不足，需调大G1ReservePercent或降低IHOP；④Mixed GC次数——一个并发标记周期内的Mixed GC次数，过少说明G1MixedGCCountTarget太大，过多说明候选Old Region太多（IHOP过高）；⑤并发标记耗时——`Concurrent Mark`阶段耗时，过长说明堆太大或ConcGCThreads太少；⑥`Allocation Rate`——日志中的分配速率（MB/s），过高需排查是否有大对象分配或内存泄漏。工具推荐：GCEasy（在线分析）、GCViewer（离线分析）、JDK Mission Control（实时监控）。诊断流程：先看Full GC频率（应为0），再看Mixed GC停顿是否达标，最后看Young GC频率和分配速率。",
    tags: ["GC日志", "性能诊断", "关键指标", "GCEasy"],
  },
  {
    id: "jg1-tp-3",
    chapter: "jg1-g1-tuning-practice",
    level: 2,
    question: "一个线上G1应用频繁Full GC，如何系统性排查和调优？",
    answer: "系统性排查步骤：①确认Full GC类型——查看GC日志中Full GC的触发原因（`System.gc()`/`Allocation Failure`/`Metadata GC Threshold`/`Ergonomics`）；②排除显式GC——如果是`System.gc()`，添加`-XX:+DisableExplicitGC`；③分析内存使用——用`jcmd <pid> GC.heap_info`查看各Region类型分布，用`jmap -histo <pid>`查看对象统计，用`jcmd <pid> GC.heap_dump`导出dump用MAT分析是否内存泄漏；④检查evacuation failure——如果GC日志有`to-space exhausted`，说明疏散空间不足，调高`-XX:G1ReservePercent=20`，调低`-XX:InitiatingHeapOccupancyPercent=35`让Mixed GC更早开始；⑤检查Humongous——`jcmd GC.heap_info`中Humongous Region数过多时，排查大对象分配（如大数组、大字符串），考虑增大`-XX:G1HeapRegionSize`或重构代码避免大对象；⑥检查Metaspace——如果是`Metadata GC Threshold`，增大`-XX:MetaspaceSize`和`-XX:MaxMetaspaceSize`；⑦验证调优——修改参数后用压测工具（wrk/JMeter）验证GC频率和停顿改善。常见根因：内存泄漏（static集合无限增长）、大对象频繁分配、IHOP过高导致Mixed GC来不及、堆不够大。",
    tags: ["Full GC排查", "系统性调优", "evacuation failure", "Humongous"],
  },
  {
    id: "jg1-tp-4",
    chapter: "jg1-g1-tuning-practice",
    level: 3,
    question: "G1在大堆（64GB+）场景下有哪些特殊调优考虑？RSet和并发标记的性能如何优化？",
    answer: "大堆特殊考虑：①Region大小——64GB堆默认RegionSize=32MB（约2048个Region），但跨Region引用密度可能高导致RSet膨胀。建议手动设`-XX:G1HeapRegionSize=32m`或更大，减少Region数降低RSet元数据总开销；②RSet优化——大堆RSet可能占5-10%堆内存（数GB）。监控`jcmd GC.heap_info`中RSet统计，如果RSet过大可增大RegionSize减少跨引用频率，或调高`-XX:G1RSetUpdatingPauseTimePercent=20`（默认10%）让更多RSet更新在并发阶段完成；③并发标记优化——大堆标记耗时长，增加`-XX:ConcGCThreads`（建议=ParallelGCThreads/2而非默认的1/4）加速并发标记，同时确保`-XX:InitiatingHeapOccupancyPercent`足够低（30-40%）让标记有充足时间完成；④NUMA感知——大堆跨NUMA节点访问延迟高，开启`-XX:+UseNUMA`让G1的Region分配考虑NUMA拓扑（JDK 10+）；⑤Full GC灾难——64GB堆Full GC停顿可能超过30秒，必须确保不触发Full GC（预留更多空间、IHOP更低、监控evacuation failure）；⑥混合回收策略——大堆老年代Region多，`-XX:G1MixedGCCountTarget=16`（默认8）让每次Mixed GC回收更少Region，控制单次停顿；⑦并发线程竞争——大堆应用通常线程数多，Write Barrier和Refine线程竞争增加，适当增加`-XX:G1ConcRefinementThreads`。",
    tags: ["大堆调优", "RSet优化", "并发标记", "NUMA"],
  },
];
