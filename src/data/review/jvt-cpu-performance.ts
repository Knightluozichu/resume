import type { ReviewQuestion } from "./types";

export const jvtCpuPerformanceQuestions: ReviewQuestion[] = [
  {
    id: "jvt-cp-1",
    chapter: "jvt-cpu-performance",
    level: 2,
    question: "CPU 使用率高就一定是计算密集型问题吗？可能有哪些原因？",
    answer:
      "不一定。CPU 高的常见原因分四类：①计算密集——确实在执行大量计算，如复杂算法、正则回溯、序列化大对象，栈顶在业务代码；②GC 频繁——堆不足或内存泄漏导致 GC 线程疯狂回收，栈顶在 GC 相关线程（G1 GC thread / GC worker），看 jstat -gc 看 GC 频率和耗时；③锁竞争自旋——多线程争抢同一把锁，等待的线程在 JVM 优化下可能自旋（轻量级锁/偏向锁升级），CPU 空转，jstack 看到多个线程 BLOCKED 在同一锁；④线程上下文切换——线程数过多频繁切换，CPU 花在调度而非业务，看上下文切换次数（pidstat -w 或 /proc/<pid>/status 的 voluntary_ctxt_switches）。判断方法：①top -Hp 看哪个线程高，jstack 看其栈——栈顶在业务方法=计算密集，在 GC 线程=GC 问题，在 synchronized 等锁=锁竞争；②jstat -gc 看 GC 是否频繁；③vmstat 1 看 cs（上下文切换）和 us/sy（用户/系统CPU）。只有计算密集才是「业务真忙」，其余都是「资源浪费」，需对症下药：GC 问题调堆或修泄漏，锁竞争优化锁，线程多减并发。",
    tags: ["CPU性能", "诊断"],
  },
  {
    id: "jvt-cp-2",
    chapter: "jvt-cpu-performance",
    level: 3,
    question: "什么是火焰图？如何用火焰图定位 CPU 热点方法？",
    answer:
      "火焰图（Flame Graph）是性能分析的可视化工具，由 Brendan Gregg 发明，把 CPU 采样数据画成「火焰」形状的栈图。结构：①横轴——方法调用栈，每层是一个函数，宽度代表该函数（含子调用）占用 CPU 采样比例，越宽越耗 CPU；②纵轴——调用深度，底部是入口，顶部是当前执行方法，栈越深火焰越高；③颜色——通常随机暖色，便于区分，无性能含义（也可按类型着色）。定位热点：①找最宽的「平台」——横向最宽的方法是 CPU 占用最高的，重点关注栈顶（最上层）的宽块，那是真正执行的耗时代码；②看调用链——从底部入口追到顶部热点，理解谁调用了热点方法；③对比——优化前后对比火焰图宽度变化验证效果。生成方式：①Arthas——profiler start 采样，profiler stop 生成 SVG 火焰图；②async-profiler——./profiler.sh -d 30 -f flame.html <pid> 采样30秒生成；③JFR（JDK Mission Control）——jcmd <pid> JFR.start duration=30s filename=jfr，用 JMC 打开看火焰图。火焰图优于纯 jstack——jstack 是单点快照，火焰图是统计聚合，宽方法在多次采样中都出现，是真热点而非偶发。",
    tags: ["火焰图", "性能分析"],
  },
  {
    id: "jvt-cp-3",
    chapter: "jvt-cpu-performance",
    level: 3,
    question: "JIT 编译对 CPU 性能有什么影响？如何判断是 JIT 未生效导致的性能问题？",
    answer:
      "JIT（即时编译）将热点代码编译为机器码缓存，大幅提升运行速度。JIT 对性能的影响：①未编译时解释执行慢——方法首次执行和未达编译阈值时走解释器，速度慢；②编译提升——达阈值（-XX:CompileThreshold 默认10000）触发 JIT 编译为机器码，后续快几倍到几十倍；③C1/C2 分层——C1 快速编译简单优化，C2 激进优化（内联、逃逸分析、锁消除）更快但编译耗时；④逆优化——C2 优化基于类型 profile，若新类型出现导致推测失效会逆优化回解释，性能突降。JIT 未生效导致性能问题的迹象：①应用刚启动慢——JIT 未热，预热期性能低，可用 -XX:+PrintCompilation 看编译事件；②方法从未被编译——-XX:+PrintCompilation 输出中没有该方法，可能调用次数未达阈值或方法过大（-XX:MaxInlineSize）；③频繁逆优化——PrintCompilation 出现 made not entrant 频繁，类型 profile 不稳定。判断方法：①-XX:+PrintCompilation -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining 打印编译日志；②Arthas jvm 命令看 JIT 编译统计；③jstat -compiler 看编译次数。优化：预热（启动后压测触发编译）、调 -XX:CompileThreshold（小堆频繁触发）、避免超大方法（超内联阈值）、AOT 编译（jaotc 提前编译降低启动慢）。",
    tags: ["JIT", "性能"],
  },
  {
    id: "jvt-cp-4",
    chapter: "jvt-cpu-performance",
    level: 4,
    question: "一个 Java 应用响应变慢但 CPU 不高，可能的根因有哪些？如何排查？",
    answer:
      "CPU 不高却慢，说明线程没在「忙计算」而在「等」，常见根因：①IO 阻塞——数据库慢查询、网络慢、磁盘IO 高，线程 WAITING 在 socket read，看 jstack 大量线程在 java.net.SocketInputStream.socketRead0；②锁竞争——多线程等锁，线程 BLOCKED，CPU 不高但吞吐低，jstack 看阻塞链；③GC 频繁但非 CPU 密集——大量 Young GC 频繁 STW 但每次短，CPU 总和不显高但延迟累积，看 jstat -gc 的 YGC 频率和总耗时；④线程池耗尽——任务排队等待执行，新请求被拒或超时，看线程池队列长度；⑤数据库连接池耗尽——获取连接等待，jstack 看线程 WAITING 在 getConnection；⑥外部依赖慢——下游服务/Redis/MQ 慢，线程阻塞等待响应；⑦Full GC STW——偶发长停顿，平均 CPU 不高但单次卡顿明显，GC 日志看长 pause。排查步骤：①jstack 看线程状态分布——大量 BLOCKED/WAITING 说明在等，RUNNABLE 少说明没在算；②看等待的具体资源——jstack 栈顶在 socketRead=网络IO、在 getConnection=连接池、在 synchronized=锁、在 Unsafe.park=JUC 锁/条件；③看 GC——jstat -gc 或 GC 日志确认是否 STW 频繁；④看外部依赖——数据库慢查询日志、下游服务响应时间、网络延迟；⑤看连接池/线程池——监控池的使用率和等待时间。核心：慢且 CPU 低的本质是「阻塞」，jstack 是定位阻塞点的关键。",
    tags: ["响应慢", "排查"],
  },
];
