import type { ReviewQuestion } from "./types";

export const crvJvmLanguageQuestions: ReviewQuestion[] = [
  {
    id: "crv-jvm-language-01",
    chapter: "crv-jvm-language",
    level: 1,
    question: `JVM 的三大子系统是什么？各自的职责是什么？`,
    answer: `JVM 三大子系统：① 类加载子系统——负责将类文件加载到内存，经历加载（读取 .class 文件）、链接（验证/准备/解析）、初始化（执行静态初始化块）三个阶段；② 运行时数据区——JVM 内存管理区域，包括方法区（类信息/常量）、堆（对象实例）、虚拟机栈（栈帧/局部变量）、程序计数器（当前指令地址）；③ 执行引擎——负责执行字节码，包括解释器（逐行解释）、JIT 编译器（热点代码编译为机器码）和垃圾回收器（自动回收内存）。`,
    tags: ["JVM", "类加载", "运行时数据区", "执行引擎"],
  },
  {
    id: "crv-jvm-language-02",
    chapter: "crv-jvm-language",
    level: 1,
    question: `JVM 内存区域中哪些是线程共享的，哪些是线程私有的？`,
    answer: `线程共享：① 堆——存储对象实例，所有线程共享，是 GC 的主战场，分为新生代和老年代；② 方法区——存储类信息、常量池、静态变量、JIT 编译代码，所有线程共享。线程私有：③ 虚拟机栈——每个方法调用创建一个栈帧，存储局部变量表、操作数栈、方法出口，线程私有；④ 程序计数器——记录当前线程执行的字节码指令地址，线程切换后可恢复，线程私有。设计原因：共享区域存放需要跨线程访问的数据，私有区域避免线程间的数据竞争。`,
    tags: ["JVM内存", "堆", "方法区", "虚拟机栈", "线程共享"],
  },
  {
    id: "crv-jvm-language-03",
    chapter: "crv-jvm-language",
    level: 2,
    question: `描述垃圾回收的分代机制和 Minor GC / Full GC 的区别。`,
    answer: `分代机制：JVM 堆分为新生代（Eden + Survivor S0/S1）和老年代。对象先在 Eden 分配，经过一次 Minor GC 后存活对象进入 Survivor，经过多次 Minor GC 仍存活的对象晋升到老年代。Minor GC：只回收新生代，频率高但速度快，因为新生代大部分对象朝生夕死。Full GC：回收整个堆（新生代+老年代），频率低但耗时长，会触发 STW（Stop The World）暂停所有应用线程。GC 流程：新生代 Minor GC → 存活对象晋升 → 老年代积累 → Full GC 回收释放并整理内存。调优目标：减少 Full GC 频率，避免长时间 STW。`,
    tags: ["垃圾回收", "分代", "Minor GC", "Full GC", "STW"],
  },
  {
    id: "crv-jvm-language-04",
    chapter: "crv-jvm-language",
    level: 2,
    question: `面向对象范式和函数式范式各有什么优势？`,
    answer: `面向对象优势：① 封装——隐藏实现细节，降低系统复杂度；② 继承——代码复用，建立类型层次；③ 多态——运行时绑定，提高扩展性；④ 适合建模现实世界实体关系，大型业务系统开发。函数式优势：① 纯函数——无副作用，相同输入永远相同输出，易于测试和推理；② 不可变性——数据不可变，天然避免并发问题；③ 高阶函数和组合——map/filter/reduce 等操作可链式组合，代码简洁；④ 惰性求值——按需计算，节省资源。现代趋势：多范式融合（如 Scala 混合 OOP+FP，Java 引入 Lambda 和 Stream，Rust 融合函数式特性），根据场景选择合适的范式。`,
    tags: ["面向对象", "函数式", "编程范式", "多范式"],
  },
];
