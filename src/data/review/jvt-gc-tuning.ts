import type { ReviewQuestion } from "./types";

export const jvtGcTuningQuestions: ReviewQuestion[] = [
  {
    id: "jvt-gt-1",
    chapter: "jvt-gc-tuning",
    level: 2,
    question: "GC 调优的核心目标是什么？停顿时间和吞吐量为什么是一对矛盾？",
    answer:
      "GC 调优有两个核心目标，且互相制约：①低停顿（Low Latency）——减少 GC 造成的 STW（Stop-The-World）时间，让应用响应更快，适合交互式/在线服务；②高吞吐量（High Throughput）——减少 GC 占用的总时间占比（GC时间/总时间），让应用单位时间处理更多任务，适合批处理/计算密集。矛盾原因：降低停顿要求 GC 分多次小停顿完成（如 CMS/G1 并发+增量），但并发回收会占用 CPU 降低吞吐、产生浮动垃圾；提高吞吐要求 GC 一次性高效回收（如 Parallel 全堆并行），但单次停顿时间长。例如 Parallel 吞吐高但停顿长，CMS 停顿短但吞吐略降。调优本质是在停顿和吞吐间找平衡点，由业务决定优先级：在线交易优先停顿，离线计算优先吞吐。衡量指标：停顿看 GC 日志的 pause time，吞吐看 GCTimeRatio（-XX:GCTimeRatio=N，GC时间占比=1/(1+N)，默认99即1%）。",
    tags: ["调优目标", "停顿吞吐"],
  },
  {
    id: "jvt-gt-2",
    chapter: "jvt-gc-tuning",
    level: 3,
    question: "G1 收集器的关键参数有哪些？如何调优 G1 的停顿时间和大对象阈值？",
    answer:
      "G1 关键参数：①-XX:MaxGCPauseMillis=200——期望最大停顿时间（毫秒），G1 据此调整回收的 Region 数量，默认200。设小停顿短但吞吐降（频繁小回收），设大停顿长但吞吐高。注意这是「目标」非「保证」，G1 会尽力但不一定达成。②-XX:G1HeapRegionSize=1m-32m——Region 大小，必须是2的幂，G1 根据堆大小自动选（堆<4G用2M，4-32G递增），可手动指定。③-XX:InitiatingHeapOccupancyPercent=45（IHOP）——堆使用率达此阈值触发并发标记周期（混合回收的起点），默认45。调低提前标记减少 Full GC 风险，调高减少并发开销。④-XX:G1ReservePercent=10——预留内存百分比（假天花板），防止疏散失败（to-space exhausted），默认10。⑤-XX:G1NewSizePercent=5 / -XX:G1MaxNewSizePercent=60——Eden 区最小/最大占比。大对象处理：超过 Region 一半的对象是 Humongous，直接分配在连续 Old Region，参数 -XX:G1HeapRegionSize 调大 Region 可减少大对象。调优步骤：先设合理 MaxGCPauseMillis，观察 GC 日志，若疏散失败调高 G1ReservePercent 或 IHOP，大对象多则调大 Region。",
    tags: ["G1", "参数调优"],
  },
  {
    id: "jvt-gt-3",
    chapter: "jvt-gc-tuning",
    level: 3,
    question: "如何分析 GC 日志？一条 Full GC 日志能读出哪些信息？",
    answer:
      "GC 日志是调优的核心证据。示例 G1 Full GC 日志：[Times: user=2.31 sys=0.05, real=0.80 secs]。读法：①时间戳——[GC pause (G1 Evacuation Pause) (young) 2024-01-01T10:00:00.000+0800] 看发生时刻和频率；②GC 类型——(young) 年轻代回收、(mixed) 混合回收、(Full) 全堆回收，Full GC 是警告信号；③堆变化——[Eden: 100M->0M(100M) Survivors: 10M->10M(10M) Heap: 500M->300M(1G)] 看各区域回收前后大小和总容量，判断是否内存不足；④停顿时间——real=0.80 secs 是真实停顿（STW），user 是 CPU 累计时间（多核并行 user>real）；⑤GC 原因——Allocation Failure（分配失败）、System.gc()、To-space exhausted（疏散失败）、Concurrent Mode Failure 等定位根因。分析工具：①GCEasy/gcviewer 在线分析——上传日志生成停顿时间分布、吞吐量、GC 频率图表；②JDK9+ 统一日志 -Xlog:gc*=info:file=gc.log:time,uptime:filecount=10,filesize=10M；③关键指标：Full GC 频率（应趋近0）、平均停顿、吞吐量。健康标准：Full GC 基本不出现，Young GC 停顿在目标内，吞吐>95%。",
    tags: ["GC日志", "分析"],
  },
  {
    id: "jvt-gt-4",
    chapter: "jvt-gc-tuning",
    level: 4,
    question: "一个线上应用频繁 Full GC 且停顿长，请给出系统化的调优排查步骤。",
    answer:
      "系统化排查步骤（证据驱动）：①确认现象——用 jstat -gc <pid> 1000 持续观察，看 Full GC 次数和频率、老年代占用是否居高不下，确认是频繁 Full GC 而非 Minor GC；②开启 GC 日志——加 -Xlog:gc*=info:file=gc.log 或 -XX:+PrintGCDetails，重启或 jcmd 动态开启，收集一段时间日志；③分析日志找原因——看 Full GC 原因：Allocation Failure 说明堆不足或晋升过快、System.gc() 说明代码显式调用（加 -XX:+DisableExplicitGC 禁用）、Metaspace 满 说明类加载泄漏（调大 -XX:MaxMetaspaceSize 或查动态生成类）；④dump 堆分析——jcmd <pid> GC.heap_dump dump.hprof，用 MAT 看 Dominator Tree 找占内存最大的对象，若某缓存/集合 Retained Heap 巨大且持续增长是内存泄漏，修代码（限大小/弱引用/定期清理）；⑤调堆参数——若非泄漏而是堆不足，调大 -Xmx/-Xms（设相同避免扩容抖动），调 -Xmn 或 -XX:NewRatio 调整新生代占比（晋升过快则增大新生代）；⑥换收集器——CMS 碎片多 Full GC 可换 G1（-XX:+UseG1GC），设 -XX:MaxGCPauseMillis 降低停顿；⑦验证——改后持续观察 GC 日志确认 Full GC 频率下降、停顿达标。核心原则：先找根因（日志+dump），再针对性调参或改代码，切忌盲目调大堆掩盖问题。",
    tags: ["Full GC", "排查步骤"],
  },
];
