import type { ReviewQuestion } from "./types";

export const jvtFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jvt-fr-1",
    chapter: "jvt-final-review",
    level: 3,
    question: "用一条线上事故的诊断全过程串联全书八大主题，说明每个知识点的作用。",
    answer:
      "线上 OOM 事故诊断全程：①JVM架构——应用启动报类加载冲突，理解双亲委派模型定位是依赖冲突，用 -verbose:class 看类加载来源；②内存模型——运行中堆持续增长，理解堆/元空间结构判断是 Java heap space（堆溢出）还是 Metaspace（元空间溢出）；③垃圾回收——jstat -gc 发现 Full GC 频繁且回收效果差，理解 GC Roots 可达性分析判断对象无法回收；④GC调优——临时调大 -Xmx 缓解，但根因未除仍会泄漏，理解调优治标不治本；⑤诊断工具——jmap -dump 导出堆 dump，jstack 看线程，jstat 看 GC，工具是诊断的眼睛；⑥线程分析——jstack 发现无线程死锁但有线程长期 BLOCKED 在某缓存锁，理解线程状态定位瓶颈；⑦内存泄漏排查——MAT 打开 dump，Dominator Tree 发现某 static Cache 的 Retained Heap 占 60%，Leak Suspects 指出泄漏，GC Roots 路径显示是 static 字段持有；⑧CPU性能——修复前 CPU 偶高，GC 线程占大头，修复后 CPU 恢复正常。一次事故，八大主题全部参与：架构类加载定位启动问题，内存模型判断溢出区域，GC 分析回收效率，调优临时缓解，工具采集证据，线程分析看阻塞，泄漏排查定位根因，CPU 分析看影响。",
    tags: ["知识串联", "故障诊断"],
  },
  {
    id: "jvt-fr-2",
    chapter: "jvt-final-review",
    level: 3,
    question: "JVM 故障诊断的四大常见场景（OOM、CPU高、响应慢、死锁）各自的排查思路是什么？",
    answer:
      "①OOM 排查——看报错信息确定区域（heap space=堆、Metaspace=元空间、Direct buffer=直接内存）；堆溢出则 jmap dump + MAT 分析 Retained Heap 找泄漏对象或大对象，看 GC Roots 路径定位持有者；非泄漏则调大 -Xmx 或优化对象创建。②CPU 高排查——top 找进程，top -Hp 找线程，tid 转十六进制，jstack 找栈顶方法；或 Arthas thread -n 3 + profiler 火焰图。根因可能是计算密集（优化算法）、GC 频繁（看 jstat 调堆/修泄漏）、锁竞争自旋（优化锁）。③响应慢排查——CPU 不高说明在等，jstack 看线程状态分布：大量 WAITING 在 socketRead=IO阻塞（查慢查询/下游）、BLOCKED=锁竞争、WAITING 在 getConnection=连接池耗尽；看 jstat GC 是否频繁 STW；看外部依赖响应时间。④死锁排查——jstack 自动检测打印 Found deadlock，或 Arthas thread -b 找阻塞源；看死锁线程互相持有的锁和调用栈，修复统一锁顺序或用 tryLock 超时。共性：先看现象选工具，jstack/jmap/jstat 是三大核心工具，dump+分析是定位根因的关键，切忌盲目重启掩盖问题。",
    tags: ["故障场景", "排查"],
  },
  {
    id: "jvt-fr-3",
    chapter: "jvt-final-review",
    level: 4,
    question: "盘点 JVM 调优和诊断中的常见误区，每个给出正确实践。",
    answer:
      "①盲目调大堆——Xmx 越大越好？错，堆大导致 Full GC 停顿长，应按需设置并匹配收集器（大堆用 G1/ZGC）；②重启大法——OOM 就重启不查根因，问题反复，应 dump 后分析定位泄漏；③忽视 GC 日志——不看日志拍脑袋调参，应开 -Xlog:gc 用数据驱动调优；④混淆 Shallow/Retained——看 Shallow 漏掉泄漏，应看 Retained Heap 找内存大户；⑤jstack 只 dump 一次——单次快照可能误判，应连续三次确认稳定状态；⑥CPU 高就加机器——可能是锁竞争或 GC，加机器不解决根因，应先定位是计算/IO/锁/GC；⑦Full GC 不当回事——Full GC 是警告，应趋近零，频繁 Full GC 必有根因（泄漏/晋升过快/元空间满）；⑧线程池无界队列——LinkedBlockingQueue 默认无界致任务堆积 OOM，应用有界队列+合理拒绝策略；⑨ThreadLocal 不 remove——线程池场景必泄漏，应 finally 中 remove；⑩静态集合当缓存不限大小——只增不减必泄漏，应用 Caffeine 设 maxSize 或弱引用。每个误区对应一个证据驱动的正确实践：数据驱动调参、dump 定位根因、连续采样、Retained 优先、对症下药。",
    tags: ["误区", "最佳实践"],
  },
  {
    id: "jvt-fr-4",
    chapter: "jvt-final-review",
    level: 4,
    question: "JVM 技术体系的核心思想是什么？如何从「会重启」到「会诊断」再到「会调优」进阶？",
    answer:
      "核心思想：JVM 是「内存管理 + 执行引擎 + 垃圾回收」的抽象层，故障诊断本质是「理解 JVM 内部机制 + 用工具采集证据 + 数据驱动定位根因」。三层进阶：①会重启（入门）——遇到问题就重启扩容，能恢复但不理解根因，问题反复。特征：把 JVM 当黑盒，OOM/CPU高一律重启。②会诊断（中级）——掌握 jps/jstat/jmap/jstack/jcmd 五大工具，能根据现象选工具采集证据，看懂 dump 和 GC 日志，定位到具体对象/方法/线程。特征：证据驱动，能用 MAT 分析泄漏、用 jstack 找死锁、用火焰图找热点，不停机定位问题。③会调优（高级）——理解 GC 收集器原理（G1 Region/ZGC 着色指针）、JIT 编译机制、内存模型细节，能根据业务特征选收集器、调停顿/吞吐参数、优化对象分配和锁竞争。特征：主动优化而非被动救火，能预判瓶颈、设计 JVM 参数、建立监控告警。进阶关键：从「黑盒重启」到「工具诊断」靠学工具，从「诊断」到「调优」靠理解原理——工具是手段，原理决定你能看懂工具输出并做出正确决策。最终目标是「不故障」（监控预防）而非「会修故障」（被动救火）。",
    tags: ["核心思想", "进阶"],
  },
];
