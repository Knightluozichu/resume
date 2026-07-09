import { ReviewQuestion } from "../types";

export const dbcMachineDependentOptQuestions: ReviewQuestion[] = [
  {
    id: "dbc-machine-dependent-opt-1",
    chapter: "dbc-machine-dependent-opt",
    level: 1,
    question: "机器相关优化与机器无关优化的区别是什么？机器相关优化关注哪些方面？",
    answer:
      "区别：机器无关优化在 IR 层操作，不依赖目标机器特性（如 CSE、常量传播）；机器相关优化针对特定目标机器的特性做优化，依赖机器的指令集、寄存器结构、流水线、缓存等。机器相关优化关注：①指令选择——选择最省的机器指令序列（如用 LEA 替代 ADD+MOV）②寄存器分配——将虚拟寄存器映射到物理寄存器（图着色）③指令调度——重排指令避免流水线停顿，提高 ILP ④窥孔优化——局部指令替换 ⑤缓存优化——数据布局和访问模式优化。这些优化必须在目标机器确定后才能进行。",
    tags: ["机器相关优化", "机器无关优化", "指令选择", "寄存器分配", "指令调度"],
  },
  {
    id: "dbc-machine-dependent-opt-2",
    chapter: "dbc-machine-dependent-opt",
    level: 2,
    question: "指令调度为什么要重排指令？数据依赖有哪几种？",
    answer:
      "指令调度重排指令以避免流水线停顿：当一条指令需要等待前一条指令的结果（数据依赖）时，CPU 流水线会停顿（stall），插入无关指令填充延迟可提高 ILP（指令级并行）。数据依赖三种：①RAW（Read After Write，真依赖）——后指令读前指令写的值，必须等写完成 ②WAR（Write After Read，反依赖）——后指令写前指令读的变量，必须等读完成 ③WAW（Write After Write，输出依赖）——两条指令写同一变量，顺序不能乱。指令调度只能重排无依赖的指令。列表调度算法：每周期从无依赖的就绪指令中按优先级选择发射，填充流水线延迟槽。",
    tags: ["指令调度", "数据依赖", "RAW", "WAR", "WAW", "流水线停顿", "ILP"],
  },
  {
    id: "dbc-machine-dependent-opt-3",
    chapter: "dbc-machine-dependent-opt",
    level: 3,
    question: "寄存器分配的图着色法如何与机器相关？什么是寄存器合并？",
    answer:
      "机器相关性：图着色法的颜色数 k = 目标机器可用的物理寄存器数，不同机器 k 不同（x86 约 6-8 个通用寄存器，ARM 约 12 个）。着色失败需溢出到内存，溢出代价与机器的 load/store 开销相关。寄存器合并（Coalescing）：当干扰图中两个变量之间有 move 指令（`MOV R2, R1`）且它们不相邻（无干扰边），可以合并为一个寄存器，消除 move 指令。但合并可能增加干扰（合并后与两者的所有邻居都干扰），使着色变难。激进合并（Briggs / George 启发式）在合并收益与着色风险间权衡。合并是减少 move 指令的重要优化，尤其在函数调用边界（参数传递）处收益显著。",
    tags: ["寄存器分配", "图着色", "寄存器合并", "溢出", "move消除", "Briggs", "George"],
  },
  {
    id: "dbc-machine-dependent-opt-4",
    chapter: "dbc-machine-dependent-opt",
    level: 2,
    question: "缓存优化有哪些常见技术？为什么循环分块（tiling）能提升性能？",
    answer:
      "常见缓存优化：①循环交换——改变嵌套循环的顺序，使最内层循环访问连续内存（提高空间局部性）②循环分块（tiling）——将大循环分为小块，使每块的数据能放入 cache，减少 cache miss ③数据对齐——保证数据按 cache line 对齐 ④预取——提前将数据加载到 cache。循环分块原理：对 `for i: for j: c[i][j]+=a[i][k]*b[k][j]` 这样的矩阵运算，不分块时整行整列访问，cache 容量不够会反复 evict。分块为 `for ii: for jj: for i in ii: for j in jj` 后，每个小块 (ii×jj) 的数据可常驻 cache，大幅减少 cache miss。数据局部性是机器相关优化的核心，因为 cache 大小和行为因机器而异。",
    tags: ["缓存优化", "循环分块", "tiling", "循环交换", "局部性", "cache miss"],
  },
];
