import { ReviewQuestion } from "./types";

export const dbcCodeGenerationQuestions: ReviewQuestion[] = [
  {
    id: "dbc-code-generation-1",
    chapter: "dbc-code-generation",
    level: 1,
    question: `代码生成阶段的输入和输出是什么？基本块和流图是如何构造的？`,
    answer:
      `输入是优化后的中间表示（IR，如三地址码），输出是目标机器代码。基本块构造：①确定首指令——程序的第一条指令 / 任何跳转目标指令 / 跳转指令的下一条指令 ②从首指令到下一条首指令前为一个基本块。基本块是连续的 IR 序列，只有一个入口（首指令）和一个出口（末指令，通常是跳转）。流图构造：以基本块为节点，加边——如果 B2 紧跟 B1 且 B1 末尾不是无条件跳转，或有跳转从 B1 指向 B2 的首指令，则 B1→B2 有边。流图反映程序的控制流结构。`,
    tags: ["代码生成", "基本块", "流图", "IR", "三地址码"],
  },
  {
    id: "dbc-code-generation-2",
    chapter: "dbc-code-generation",
    level: 2,
    question: `寄存器分配的图着色法是如何工作的？什么是溢出？`,
    answer:
      `图着色法三步：①活跃变量分析——后向数据流分析找出在每个程序点哪些变量同时活跃（OUT[b]=∪IN[s], IN[b]=(OUT-DEF)∪USE）②构建干扰图——节点=变量，若两个变量在某个程序点同时活跃则连边（表示不能共用寄存器）③k 着色——用 k 种颜色对图着色（k=可用物理寄存器数），相邻节点不同色。同色=可共用寄存器。溢出（Spill）：当图无法 k 着色时（色数 > k），选择某些节点溢出到内存——为该变量分配栈空间，使用前 load 到临时寄存器，使用后 store 回内存，然后重新分配。溢出后干扰图改变，可能变为可着色。`,
    tags: ["寄存器分配", "图着色", "活跃变量分析", "干扰图", "溢出"],
  },
  {
    id: "dbc-code-generation-3",
    chapter: "dbc-code-generation",
    level: 3,
    question: `代码生成中如何为表达式树选择最优指令序列？`,
    answer:
      `使用树重写 + 动态规划（龙书 Ershov 算法）：①将 IR 表达式树与目标机器指令模式匹配 ②每条指令模式有一个代价（如周期数）③用动态规划求最优覆盖——自底向上计算每个子树的最小代价覆盖 ④选择代价最小的指令组合。关键约束：寄存器数量有限。Ershov 算法给每个节点标注需要的最少寄存器数（Sethi-Ullman 编号），当超过 k 个寄存器时需溢出到栈（插入 store/load）。这样生成的代码在给定寄存器数下是最优的。现代编译器（如 GCC、LLVM）用更复杂的指令选择器（如 BURS——自底向上重写系统）。`,
    tags: ["指令选择", "树重写", "动态规划", "Ershov", "Sethi-Ullman", "最优覆盖"],
  },
  {
    id: "dbc-code-generation-4",
    chapter: "dbc-code-generation",
    level: 2,
    question: `什么是窥孔优化？列举几种常见的窥孔优化技术。`,
    answer:
      `窥孔优化：在目标代码上滑动一个小的「窥孔」窗口（几条连续指令），用更高效的等价指令序列替换。常见技术：①冗余 load/store 消除——\`STORE R0, a; LOAD R0, a\` → 删除 LOAD（R0 已是 a 的值）②死代码消除——跳转后的不可达代码删除 ③强度削弱——\`MUL R0, R1, 1\` → \`MOV R0, R1\`（乘 1 用 move 替代）④控制流优化——\`JMP L1; L1: JMP L2\` → \`JMP L2\`（跳转跳转合并）⑤代数简化——\`ADD R0, R0, 0\` → 删除（加 0 无操作）。窥孔优化简单高效，是代码生成最后阶段的局部清理。`,
    tags: ["窥孔优化", "load/store消除", "强度削弱", "控制流优化", "代数简化"],
  },
];
