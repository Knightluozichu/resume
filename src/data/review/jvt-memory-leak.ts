import type { ReviewQuestion } from "./types";

export const jvtMemoryLeakQuestions: ReviewQuestion[] = [
  {
    id: "jvt-ml-1",
    chapter: "jvt-memory-leak",
    level: 2,
    question: `什么是内存泄漏？Java 有 GC 为什么还会内存泄漏？`,
    answer:
      `内存泄漏指对象不再被使用但仍被引用无法被 GC 回收，导致内存逐渐耗尽。Java 虽有 GC，但 GC 只能回收「不可达」对象（无 GC Roots 引用链）。「对象不再被使用」是业务语义，「不可达」是 GC 语义，两者不等价——若一个对象业务上不再需要，但某个长生命周期对象（如静态集合、缓存、单例）仍持有其引用，GC 认为它「可达」就不会回收，这就是 Java 内存泄漏。典型场景：①静态集合类不断 put 不 remove——static Map 作为缓存只增不减；②监听器/回调未注销——注册到事件源但用完不注销，事件源一直持有监听器引用；③ThreadLocal 未 remove——线程池线程复用，ThreadLocal 持有的对象在线程生命周期内不释放；④内部类持有外部类——非静态内部类隐式持有外部类引用，内部类长期存活则外部类无法回收；⑤资源未关闭——连接/流/文件句柄未 close 持有 native 资源。危害：缓慢累积直到 OOM 崩溃，且重启才恢复。与 C/C++ 内存泄漏（忘记 free）不同，Java 泄漏是「引用管理不当」而非「忘记释放」。`,
    tags: ["内存泄漏", "GC"],
  },
  {
    id: "jvt-ml-2",
    chapter: "jvt-memory-leak",
    level: 3,
    question: `Shallow Heap 和 Retained Heap 的区别是什么？为什么排查泄漏要看 Retained Heap？`,
    answer:
      `①Shallow Heap（浅堆）——对象自身占用的内存大小，即对象头+实例数据+对齐填充，不含其引用的对象。例如一个 ArrayList 对象 Shallow Heap 只是 ArrayList 对象头+内部数组引用等几十字节，不含数组里的元素对象。②Retained Heap（深堆/保留堆）——对象被回收后能释放的总内存，即对象的 Shallow Heap 加上所有「只能通过该对象到达」的对象的 Shallow Heap。若一个对象被回收，那些只有它能引用到的对象也会变不可达被回收，这部分才算 Retained。关键：若一个对象还被其他对象引用（不独占），那部分不计入它的 Retained。排查泄漏看 Retained Heap 的原因：泄漏对象往往是个「根持有者」（如大缓存），它的 Shallow 可能很小（就是个 Map），但它 Retained 巨大（Map 里成千上万的对象只有它引用）。MAT 的 Dominator Tree 按 Retained 排序，最大的就是内存占用大户——一个 Retained 异常大的对象通常是泄漏点。例如 static Map 持有 10万条目，Map 本身 Shallow 几十字节，但 Retained 可能几百MB，删掉它就能释放全部。看 Shallow 会漏掉这种「小自身大引用」的泄漏。`,
    tags: ["Shallow", "Retained", "MAT"],
  },
  {
    id: "jvt-ml-3",
    chapter: "jvt-memory-leak",
    level: 3,
    question: `如何用 MAT 分析堆 dump 文件定位内存泄漏？`,
    answer:
      `MAT 定位泄漏流程：①获取 dump——jmap -dump:format=b,file=dump.hprof <pid> 或 jcmd <pid> GC.heap_dump dump.hprof 或 OOM 时自动 dump（-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=dump.hprof）；②MAT 打开 dump 文件——MAT 会自动生成 Leak Suspects 报告；③看 Leak Suspects——MAT 自动分析后给出泄漏嫌疑，Problem Suspect 列出可疑对象、占用大小、引用链，直接定位最可能的泄漏点；④Dominator Tree——按 Retained Heap 降序，最大的对象是内存占用大户，展开看它引用了什么；⑤Histogram——按类统计实例数和内存，某类实例数异常多可疑，可按 Retained 排序；⑥GC Roots 路径——右键对象 Merge Shortest Paths to GC Roots -> exclude weak/soft references，看是谁持有它（静态变量/线程栈），找到泄漏源头；⑦OQL 查询——类似 SQL 查对象，如 SELECT * FROM java.util.HashMap 查所有 HashMap。典型发现：某 static HashMap 持有几十万 Entry 不释放，引用链是 Class.static field -> HashMap -> Entry[]，修复：限制大小（LinkedHashMap removeEldestEntry 或 Caffeine 设 maxSize）、用弱引用/软引用、定期清理。`,
    tags: ["MAT", "dump分析"],
  },
  {
    id: "jvt-ml-4",
    chapter: "jvt-memory-leak",
    level: 4,
    question: `ThreadLocal 为什么会导致内存泄漏？如何正确使用避免泄漏？`,
    answer:
      `ThreadLocal 泄漏机制：每个 Thread 持有 ThreadLocalMap，key 是 ThreadLocal 的弱引用，value 是强引用。当 ThreadLocal 实例无外部强引用被回收后，key 变成 null（弱引用），但 value 仍被 ThreadLocalMap 强引用无法回收——若线程长期存活（线程池复用），这些 key=null 的 value 永不释放形成泄漏。泄漏放大的场景：线程池 + 大量 ThreadLocal + 不 remove。正确使用避免泄漏：①用完必 remove——finally 块中 threadLocal.remove()，这是最根本的防御，避免 value 持有；②ThreadLocal 用 static final 修饰——保证 ThreadLocal 实例本身不被回收（key 不变 null），但这不解决 value 泄漏，remove 仍是必须；③线程池场景尤其注意——线程复用不销毁，ThreadLocalMap 持续累积，每次用完必须 remove；④优先用 try-with-resources 或工具封装——如 TransmittableThreadLocal 配合框架自动清理。深层原因：ThreadLocalMap 设计用弱引用 key 是为了 ThreadLocal 回收后能清理 entry，但 value 强引用导致 value 泄漏；ThreadLocalMap 在 get/set 时会顺带清理 key=null 的 entry（启发式清理），但不能保证及时，故手动 remove 是唯一可靠方案。InheritableThreadLocal 同理，线程池场景用 TransmittableThreadLocal 更安全。`,
    tags: ["ThreadLocal", "内存泄漏"],
  },
];
