import type { ReviewQuestion } from "./types";

export const dujPracticeTuningQuestions: ReviewQuestion[] = [
  {
    id: "duj-pt-1",
    chapter: "duj-practice-tuning",
    level: 2,
    question: "JVM调优的四步法是什么？为什么「先量化再调优」是第一原则？",
    answer: "四步法：①监控——jstat/GC日志/JMX/Prometheus监控GC频率/停顿时间/堆使用率/线程数/CPU使用率，建立基线发现异常；②分析——jmap dump+MAT分析对象分布、jstack分析线程锁竞争、jcmd获取运行时信息，定位根因；③调整——JVM参数调优/代码优化/架构优化，一次只改一个变量；④验证——压测对比/指标回归/长时间观察，确认改善无副作用。先量化再调优是第一原则因为：没有基线数据无法判断调优是否有效——不知道调整前的GC频率和停顿时间，调整后Full GC减少了也不知道是参数有效还是流量下降。量化核心是可比较——调整前后必须在相同负载下对比。调优是工程方法不是玄学。",
    tags: ["调优四步法", "监控", "分析", "验证", "量化"],
  },
  {
    id: "duj-pt-2",
    chapter: "duj-practice-tuning",
    level: 2,
    question: "频繁Full GC的常见原因有哪些？如何排查和解决？",
    answer: "常见原因：①内存泄漏——static集合持续添加不释放，老年代不断增长。排查jmap -histo:live+MAT找Retained Heap最大对象。解决修复代码用WeakHashMap或定期清理。②大对象进老年代——超过-XX:PretenureSizeThreshold直接分配老年代。解决调整阈值或减少大对象。③对象晋升过快——Survivor太小Minor GC后存活对象进老年代。排查jstat看S0/S1使用率。解决增大-Xmn或调整SurvivorRatio/MaxTenuringThreshold。④老年代空间不足——堆太小或NewRatio不合理。解决调大-Xmx或调整NewRatio。⑤元空间不足——动态类加载（CGLIB/JSP）。解决调大MaxMetaspaceSize或排查类生成源。⑥CMS Concurrent Mode Failure。解决降低CMSInitiatingOccupancyFraction或升级G1。排查流程：jstat -gcutil确认频率→jmap看对象分布→dump+MAT分析→定位根因→针对性调整→压测验证。",
    tags: ["Full GC", "内存泄漏", "排查", "GC调优"],
  },
  {
    id: "duj-pt-3",
    chapter: "duj-practice-tuning",
    level: 3,
    question: "如何排查OOM？不同类型的OOM分别指向什么问题？",
    answer: "排查流程：①开启-XX:+HeapDumpOnOutOfMemoryError自动dump；②看异常信息区分类型；③MAT分析dump看Leak Suspects找Retained Heap最大对象及GC Roots引用链；④jcmd补充信息。不同类型：①OOM: Java heap space——堆溢出，对象太多（泄漏/大对象/高并发），解决MAT找泄漏+调大-Xmx；②OOM: Metaspace——元空间溢出，加载类太多（CGLIB/JSP/热部署），解决调大MaxMetaspaceSize+排查ClassLoader泄漏；③OOM: Direct buffer memory——NIO堆外内存溢出，解决调大MaxDirectMemorySize+检查ByteBuf未release；④OOM: unable to create new native thread——线程数溢出，解决排查线程创建源+调整线程池+检查ulimit；⑤StackOverflowError——栈溢出递归过深或-Xss太小，解决修复递归+调大-Xss（注意影响线程数）；⑥GC overhead limit exceeded——GC花98%时间回收不到2%堆，通常是泄漏晚期表现。",
    tags: ["OOM", "HeapDump", "MAT", "排查流程"],
  },
  {
    id: "duj-pt-4",
    chapter: "duj-practice-tuning",
    level: 3,
    question: "从CMS迁移到G1需要调整哪些参数？G1的核心参数有哪些？",
    answer: "迁移调整：①启用-XX:+UseG1GC替代-XX:+UseConcMarkSweepGC；②移除CMS特有参数（CMSInitiatingOccupancyFraction等）；③G1不需要设-Xmn（新生代由G1动态调整，设-Xmn会禁用自适应）。G1核心参数：-XX:+UseG1GC（启用）；-XX:MaxGCPauseMillis=200（停顿目标，G1据此选择性回收Region，不是越小越好）；-XX:G1HeapRegionSize=16m（Region大小，默认按堆自动计算1-32MB）；-XX:InitiatingHeapOccupancyPercent=45（堆使用率超此值触发并发标记，调低更早回收）；-XX:G1NewSizePercent=5/G1MaxNewSizePercent=60（新生代占比范围）；-XX:G1MixedGCCountTarget=8（Mixed GC分多少次完成）；-XX:G1MixedGCLiveThresholdPercent=85（Region存活率超此值不参与回收）。GC日志JDK 9+用-Xlog:gc*替代JDK 8的-XX:+PrintGCDetails。G1适合6GB以上堆，小堆CMS可能更好，迁移后需压测验证。",
    tags: ["G1", "CMS迁移", "GC参数", "MaxGCPauseMillis"],
  },
];
