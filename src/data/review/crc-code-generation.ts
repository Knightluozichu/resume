import { ReviewQuestion } from "./types";

export const crcCodeGenerationQuestions: ReviewQuestion[] = [
  {
    id: "crc-code-generation-1",
    chapter: "crc-code-generation",
    level: 1,
    question: `目标代码生成的三个核心步骤是什么？各自的作用是什么？`,
    answer:
      `三个核心步骤：①指令选择——将 IR 的抽象操作映射为目标机器的具体指令。如 IR 的 t = a + 1 可选 ADD 或 INC 指令，需选择代价最小（指令数少/执行快）的指令序列。②寄存器分配——将 IR 中的虚拟寄存器（数量不限）映射到有限的物理寄存器。不冲突的虚拟寄存器可共享同一物理寄存器；寄存器不够时将变量溢出（spill）到内存栈。③指令调度——重排指令顺序以充分利用 CPU 流水线，避免数据冒险和流水线停顿。三者顺序通常为指令选择 → 寄存器分配 → 指令调度，输出最终的目标指令序列。`,
    tags: ["代码生成", "指令选择", "寄存器分配", "指令调度"],
  },
  {
    id: "crc-code-generation-2",
    chapter: "crc-code-generation",
    level: 2,
    question: `寄存器分配的图着色法是什么？干涉图如何构建？`,
    answer:
      `图着色法将寄存器分配建模为图着色问题：每个虚拟寄存器是图的一个节点，如果两个虚拟寄存器在同一时刻活跃（同时被使用，不能共享物理寄存器），则在它们之间画一条边（干涉边）。这样得到的图叫干涉图。寄存器分配 = 用 K 种颜色（K = 物理寄存器数）对干涉图着色，相邻节点（有干涉边）必须不同色。同一颜色的节点可共享一个物理寄存器。如果无法用 K 色完成着色（图色数 &gt; K），则选择一个节点溢出到内存：该变量用 load/store 在内存与寄存器间搬运，从干涉图中删除后继续着色。图着色是 NP 完全问题，实际用启发式算法（如 Chaitin 算法）近似求解。`,
    tags: ["寄存器分配", "图着色", "干涉图", "溢出", "NP完全"],
  },
  {
    id: "crc-code-generation-3",
    chapter: "crc-code-generation",
    level: 3,
    question: `以 \`t1 = a + b; t2 = t1 * c; x = t2\` 为例，说明 IR 如何经过寄存器分配后变为 x86 汇编。`,
    answer:
      `IR（虚拟寄存器 t1, t2）：t1 = a + b; t2 = t1 * c; x = t2。寄存器分配分析活跃性：t1 在第二条指令后不再使用，可复用其寄存器；t2 在第三条后不再使用。假设分配 EAX 给 t1/t2（t1 死后 EAX 给 t2）：①MOV EAX, a（将 a 载入 EAX）②ADD EAX, b（EAX = a + b = t1）③IMUL EAX, c（EAX = t1 * c = t2，复用 EAX）④MOV x, EAX（将结果存入 x）。t1 和 t2 因不干涉（t1 死后 t2 才出生）共享 EAX，4 条指令完成，无溢出。如果物理寄存器不足，t1 或 t2 会被溢出到栈，需额外 load/store。`,
    tags: ["寄存器分配", "x86汇编", "活跃性", "复用", "MOV", "ADD"],
  },
  {
    id: "crc-code-generation-4",
    chapter: "crc-code-generation",
    level: 2,
    question: `什么是寄存器溢出（Spill）？溢出后程序的执行行为如何变化？`,
    answer:
      `寄存器溢出：当虚拟寄存器的干涉图无法用有限的物理寄存器（K 个）完成着色时，选择某些变量不分配物理寄存器，改为存放在内存（栈帧）中。溢出后的变量每次使用前需从内存 load 到临时寄存器，使用后需 store 回内存。执行行为变化：原本一条指令完成的寄存器操作，溢出后变成 load + 操作 + store 三步，增加了内存访问开销，降低了执行速度。但保证了程序正确性——物理寄存器有限时必须有人让出。优化策略：优先溢出使用频率低、干涉度高的变量；溢出后重新计算干涉图可能减少其他冲突（溢出变量的 load/store 生命周期短）。线性扫描寄存器分配是图着色的快速近似替代。`,
    tags: ["寄存器溢出", "Spill", "内存", "load", "store", "栈帧"],
  },
];
