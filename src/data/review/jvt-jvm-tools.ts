import type { ReviewQuestion } from "./types";

export const jvtJvmToolsQuestions: ReviewQuestion[] = [
  {
    id: "jvt-jt-1",
    chapter: "jvt-jvm-tools",
    level: 2,
    question: "jps、jstat、jmap、jstack、jcmd 各自的作用是什么？",
    answer:
      "JDK 自带命令行工具各司其职：①jps——列出 JVM 进程，类似 ps，显示 pid 和主类名，jps -l 显示全限定名，-v 显示 JVM 参数；②jstat——监控 GC 和类加载统计，jstat -gc <pid> 1000 每秒打印堆各区域使用量和 GC 次数，-gcutil 显示百分比，-class 显示类加载统计，是观察 GC 趋势的首选；③jmap——堆内存分析，jmap -heap <pid> 打印堆配置和各代使用，-histo:live 打印存活对象直方图（按类统计实例数和字节数），-dump:format=b,file=dump.hprof 导出堆 dump 文件供 MAT 分析；④jstack——线程栈 dump，jstack <pid> 打印所有线程的调用栈和锁状态，-l 显示额外锁信息，是死锁和线程卡住诊断利器；⑤jcmd——JDK7+ 的统一命令工具，jcmd <pid> help 列出所有命令，可替代上述工具：GC.heap_dump 替代 jmap dump、Thread.print 替代 jstack、VM.flags 看 JVM 参数、VM.system_properties 看系统属性、JFR.start 启动飞行记录。jcmd 是新一代首选，功能更全且支持动态诊断（如运行时改日志级别 JFR.dump）。",
    tags: ["JDK工具", "命令行"],
  },
  {
    id: "jvt-jt-2",
    chapter: "jvt-jvm-tools",
    level: 3,
    question: "如何用 jstack 诊断线程问题？什么情况下要连续 dump 三次？",
    answer:
      "jstack 诊断线程问题流程：①jps 找到目标 JVM 的 pid；②jstack <pid> > thread.txt 或 jstack -l <pid> 打印线程栈，-l 包含锁信息；③分析输出——每个线程块包含线程名、优先级、线程状态（RUNNABLE/BLOCKED/WAITING/TIMED_WAITING）、调用栈、锁信息（waiting on / locked）。常见诊断：①死锁——jstack 末尾会自动检测并打印 Found one Java-level deadlock，显示死锁线程和互相持有的锁；②线程卡住——某线程长期 BLOCKED 说明等锁，看 locked 等哪个锁，配合调用栈定位；③CPU 飙高——先 top -Hp <pid> 找 CPU 高的线程 tid，printf '%x' tid 转十六进制，jstack 输出中找 nid=0xtid 的线程，看其调用栈就是热点。连续 dump 三次的场景：①区分瞬时和持续状态——单次 dump 可能是瞬时快照（线程恰好在某个方法），连续三次间隔1-2秒，若三次都卡在同一位置才是真问题；②死锁确认——单次可能是死锁即将解除，三次都在就是稳定死锁；③性能热点确认——三次都在同一方法说明是真热点而非偶发。命令：for i in 1 2 3; do jstack <pid> > t_$i.txt; sleep 2; done。",
    tags: ["jstack", "线程诊断"],
  },
  {
    id: "jvt-jt-3",
    chapter: "jvt-jvm-tools",
    level: 3,
    question: "对比 JConsole、VisualVM、MAT、Arthas 四款工具的特点和适用场景。",
    answer:
      "①JConsole——JDK 自带，基于 JMX 的 GUI 监控工具，实时看内存/线程/类加载/MBean，可连接本地和远程 JVM。优点简单开箱即用；缺点只能监控不能深度分析，无 dump 分析。适用快速看个大概。②VisualVM——JDK 自带（JDK9+ 单独下载），集监控+dump 分析一体，可看堆直方图、线程 dump、CPU/内存采样、插件扩展。比 JConsole 强，适合中度分析。③MAT（Memory Analyzer Tool）——Eclipse 出品，专攻堆 dump 深度分析，Dominator Tree 找内存占用大户、Leak Suspects 自动报告泄漏嫌疑、Shallow/Retained Heap 计算、GC Roots 路径追踪。是内存泄漏排查的权威工具，但不监控实时。适用深度内存分析。④Arthas——阿里开源，运行时热诊断工具，无需改代码无需重启，命令式交互。功能强大：dashboard 实时看概览、thread 线程分析、jad 反编译、watch 方法监控入参返回值、trace 方法调用链耗时、profiler 火焰图、heapdump 堆转储。适用生产环境在线诊断（不停机）。选择：快速监控 JConsole/VisualVM，内存泄漏 MAT，生产在线热诊断 Arthas。",
    tags: ["可视化工具", "对比"],
  },
  {
    id: "jvt-jt-4",
    chapter: "jvt-jvm-tools",
    level: 4,
    question: "生产环境 CPU 飙高，如何在不重启应用的情况下定位到具体是哪段代码导致的？",
    answer:
      "不停机定位 CPU 热点的标准流程：①top 找进程——top 看 CPU 高的 Java 进程 pid；②top -Hp <pid> 找线程——top -Hp <pid> 看该进程内哪个线程 CPU 高，记下线程 tid；③tid 转十六进制——printf '%x' <tid> 得到 nid（如 0x1a2b）；④jstack 定位——jstack <pid> | grep -A 30 nid=0x1a2b 找到该线程的调用栈，栈顶方法就是热点。若热点不明显（栈在变化），连续 jstack 三次取交集。替代方案用 Arthas 更简单（无需手动转 nid）：①arthas-boot.jar attach 到目标 JVM；②thread -n 3 打印 CPU 占用最高的3个线程及其栈；③若需更细定位，trace <类全名> <方法名> 看方法内部调用链耗时，定位到具体子调用；④profiler start 生成火焰图，profiler stop 查看可视化火焰图，横轴宽的方法是热点。火焰图最直观——横向宽度代表 CPU 占用比例，最宽的栈顶就是瓶颈。常见根因：死循环/正则回溯（栈顶在业务方法）、GC 频繁（栈顶在 GC 线程，看 jstat）、锁竞争自旋（多个线程 BLOCKED 在同一锁）。注意：生产 dump 要在低峰期，jstack 影响小但 heapdump 会 STW。",
    tags: ["CPU诊断", "Arthas", "火焰图"],
  },
];
