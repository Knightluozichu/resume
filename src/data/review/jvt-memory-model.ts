import type { ReviewQuestion } from "./types";

export const jvtMemoryModelQuestions: ReviewQuestion[] = [
  {
    id: "jvt-mm-1",
    chapter: "jvt-memory-model",
    level: 2,
    question: "JVM 堆的分代结构是什么？为什么要分代？",
    answer:
      "堆分为新生代（Young Generation）和老年代（Old Generation）。新生代又分为 Eden 区和两个 Survivor 区（S0、S1），比例默认 Eden:S0:S1 = 8:1:1，新生代:老年代默认 = 1:2（-XX:NewRatio=2）。分代原因基于「弱代假说」：①绝大多数对象朝生夕灭——新生代回收频繁但每次回收大部分对象，用复制算法高效；②熬过多次 GC 的对象更可能长期存活——老年代回收不频繁，用标记整理算法避免碎片。对象流转：新对象先分配在 Eden；Minor GC 后存活对象进入 Survivor，年龄+1；年龄达阈值（默认 15，-XX:MaxTenuringThreshold）晋升老年代；大对象（超过 -XX:PretenureSizeThreshold）直接进老年代避免在新生代复制。分代让 GC 针对不同生命周期的对象用不同算法，提升整体回收效率。",
    tags: ["堆内存", "分代"],
  },
  {
    id: "jvt-mm-2",
    chapter: "jvt-memory-model",
    level: 3,
    question: "对象在 JVM 中的内存布局是怎样的？如何计算一个对象占多少内存？",
    answer:
      "对象内存布局分三部分：①对象头（Object Header）——HotSpot 64 位 JVM 中，普通对象头 12 字节（Mark Word 8字节 + Klass Pointer 4字节，开启指针压缩）；数组对象头 16 字节（额外 4 字节存数组长度）；Mark Word 存哈希码、GC 分代年龄、锁状态、偏向线程 ID 等；Klass Pointer 指向方法区的类元数据。②实例数据（Instance Data）——对象字段值，按类型对齐（long/double 8字节，int 4字节...），字段重排序优化（相同类型字段聚在一起减少 padding）；③对齐填充（Padding）——对象大小必须是 8 字节整数倍，不足补齐。计算示例：一个只有 2 个 int 字段的对象 = 对象头12 + 实例数据8 = 20 字节，padding 到 24 字节。开启指针压缩（-XX:+UseCompressedOops，堆<32G默认开启）Klass Pointer 4字节而非8字节，省内存。可用 Java Object Layout（JOL）工具打印对象布局验证。",
    tags: ["对象布局", "内存占用"],
  },
  {
    id: "jvt-mm-3",
    chapter: "jvt-memory-model",
    level: 3,
    question: "OOM 可能发生在哪些内存区域？各区域 OOM 的原因和报错信息是什么？",
    answer:
      "OOM 可发生在多个区域，报错信息不同便于定位：①堆溢出——java.lang.OutOfMemoryError: Java heap space，原因内存泄漏或大对象/堆太小，可用 -Xmx 增大堆或 dump 分析；②元空间溢出——java.lang.OutOfMemoryError: Metaspace（JDK8+），原因动态生成大量类（如 CGLIB/反射代理）或 -XX:MaxMetaspaceSize 设太小，JDK7 前是 PermGen space；③栈溢出——java.lang.StackOverflowError（递归过深）或 OOM: unable to create new native thread（线程数过多，每个线程默认 1MB 栈），可调 -Xss 减小栈大小或控制线程数；④直接内存溢出——java.lang.OutOfMemoryError: Direct buffer memory，NIO 的 ByteBuffer.allocateDirect 用尽直接内存，调 -XX:MaxDirectMemorySize；⑤GC 开销超限——java.lang.OutOfMemoryError: GC overhead limit exceeded，GC 回收太少（98% 时间 GC 且只回收 2% 内存），说明堆基本被无法回收对象占满，本质是堆溢出的前兆。诊断：先看报错信息确定区域，再针对性 dump 或调参。",
    tags: ["OOM", "内存溢出"],
  },
  {
    id: "jvt-mm-4",
    chapter: "jvt-memory-model",
    level: 4,
    question: "为什么 JDK8 用元空间（Metaspace）替换永久代（PermGen）？这个改动带来了什么影响？",
    answer:
      "JDK8 移除永久代，类元数据移到本地内存（Native Memory）的元空间。替换原因：①永久代大小固定（-XX:MaxPermSize）易溢出——动态生成类多（Spring AOP、CGLIB、Groovy 脚本）的场景常踩 PermGen OOM，调参困难；②元空间用本地内存，大小随可用内存动态扩展（仅受 -XX:MaxMetaspaceSize 限制，默认无上限），不易溢出；③JRockit 和 HotSpot 融合——JRockit 从无永久代，统一架构；④GC 优化——永久代回收条件苛刻（Full GC 且类无活跃实例、加载器已卸载），元空间的类卸载逻辑更清晰。带来的影响：①好处——PermGen OOM 基本消失，动态类生成场景更稳定；②新风险——元空间无上限可能吃光本地内存导致进程被 OS 杀死（OOM Killer），生产建议设 -XX:MaxMetaspaceSize 兜底；③监控变化——jstat 的 Perm 区列变 Metaspace，监控工具需更新；④调参变化——-XX:PermSize/-XX:MaxPermSize 失效，改用 -XX:MetaspaceSize（初始高水位，触及触发 Full GC 回收类）和 -XX:MaxMetaspaceSize（上限）。",
    tags: ["元空间", "永久代", "JDK8"],
  },
];
