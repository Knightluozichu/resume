import type { ReviewQuestion } from "./types";

export const crvProgrammingWorldQuestions: ReviewQuestion[] = [
  {
    id: "crv-programming-world-01",
    chapter: "crv-programming-world",
    level: 1,
    question: "计算机的分层架构从上到下分为哪四层？",
    answer: "计算机分层架构从上到下分为：① 应用程序层——你写的代码；② 编程语言层——编译器/解释器，负责将源码翻译为机器可执行的指令；③ 操作系统层——进程/内存/文件管理，负责资源调度和隔离；④ 硬件层——CPU/内存/磁盘，执行实际计算和存储。代码从上层逐层穿透到底层硬件被执行。",
    tags: ["计算机分层", "架构", "基础概念"],
  },
  {
    id: "crv-programming-world-02",
    chapter: "crv-programming-world",
    level: 1,
    question: "源代码到执行结果输出经历哪些步骤？",
    answer: "源代码到执行经历五个步骤：① 源代码——用高级语言编写代码文件；② 编译/解释——编译器将源码转为字节码或机器码，解释器逐行执行；③ 加载——类加载器或操作系统将代码加载到内存；④ 执行——CPU 从内存取指令、译码、执行；⑤ 输出——结果写回内存或输出到外设。",
    tags: ["代码执行", "编译", "加载"],
  },
  {
    id: "crv-programming-world-03",
    chapter: "crv-programming-world",
    level: 2,
    question: "进程和线程有什么区别？它们在内存模型上有何不同？",
    answer: "进程是操作系统资源分配的基本单位，拥有独立的地址空间，包含代码段、数据段、堆和栈。线程是 CPU 调度的基本单位，存在于进程内部。内存模型差异：① 进程拥有独立地址空间，进程间内存隔离；② 线程共享进程的堆内存，但拥有独立的栈和寄存器；③ 线程间通信比进程间通信更高效（共享内存），但也更容易出现数据竞争。线程是轻量级的调度单位，上下文切换开销比进程小。",
    tags: ["进程", "线程", "内存模型", "并发"],
  },
  {
    id: "crv-programming-world-04",
    chapter: "crv-programming-world",
    level: 2,
    question: "编译型语言、解释型语言和混合型语言各有什么特点？",
    answer: "三种类型特点：① 编译型（C/C++）——源码直接编译为机器码，执行速度快，但跨平台性差，需针对不同平台重新编译；② 解释型（Python/Ruby）——逐行解释执行，灵活且跨平台，但执行速度慢；③ 混合型（Java/JavaScript）——先编译为字节码等中间代码，再由虚拟机解释执行或 JIT 即时编译为机器码，兼顾跨平台和性能。Java 的「一次编写到处运行」就是混合型的典型体现。",
    tags: ["编译型", "解释型", "混合型", "语言分类"],
  },
];
