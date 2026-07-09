import { ReviewQuestion } from "../types";

export const eacInstructionSelectionQuestions: ReviewQuestion[] = [
  {
    id: "eac-instruction-selection-1",
    chapter: "eac-instruction-selection",
    level: 2,
    question: "指令选择（Instruction Selection）解决什么问题？为什么 IR 不能直接逐条翻译为目标指令？",
    answer:
      "指令选择解决「将机器无关的 IR 映射为目标机器的指令序列」的问题，目标是选出成本最低（最快/最短）的指令组合。不能逐条翻译 IR 的原因：①目标机通常有复合指令，一条 IR 操作可能对应多条目标指令，也可能多条 IR 操作能合并为一条目标指令（如 `*(x,4)` 可用 `SHL x,2` 而非 `MUL x,4`）②不同指令组合实现同一 IR 效果但成本不同（如 `ADD` vs `LEA` 都能做加法，但 LEA 不影响标志位）③寻址模式丰富（如 `LOAD [base+index*scale]` 一条指令完成地址计算+加载）④需考虑指令的副作用和约束。指令选择的本质是「在目标指令集的所有合法覆盖中选最优」，这是一个组合优化问题，通常用树重写+动态规划求解。",
    tags: ["指令选择", "IR翻译", "复合指令", "寻址模式", "覆盖"],
  },
  {
    id: "eac-instruction-selection-2",
    chapter: "eac-instruction-selection",
    level: 3,
    question: "树重写（Tree Pattern Matching）如何做指令选择？动态规划如何求最优覆盖？",
    answer:
      "树重写：将 IR 表达为树形结构，每条目标指令描述为「树模式（瓦片/Tile）+成本」。指令选择 = 用瓦片无重叠地覆盖整棵 IR 树，使总成本最小。例如规则 `*(x,4) → SHL(x,2) cost 1` 优于 `*(x,4) → MUL(x,4) cost 3`。动态规划求最优覆盖：对 IR 树每个子树，记录「用各规则覆盖该子树的最小成本」，自底向上递推。状态：`Cost(node, rule)` = rule 自身成本 + 各子树在 rule 要求下的最优覆盖成本。转移：`Cost(node, rule) = rule.cost + Σ best(Cost(child, r) for r in applicable_rules)`。边界：叶节点成本由寄存器/常量加载规则决定。整棵树根节点的最优 rule 即全局最优指令序列。树形 DP 天然适合递归 IR，时间复杂度 O(树节点数 × 规则数)。burg、iburg 等工具自动从规则描述生成最优指令选择器。",
    tags: ["树重写", "树模式匹配", "瓦片", "动态规划", "最优覆盖", "iburg"],
  },
  {
    id: "eac-instruction-selection-3",
    chapter: "eac-instruction-selection",
    level: 2,
    question: "指令选择中的「瓦片（Tile）」和「成本」是什么？为什么需要成本模型？",
    answer:
      "瓦片（Tile）：一条目标指令对应的 IR 树模式。例如 `ADD reg, reg` 对应 `+(reg, reg)` 子树；`SHL reg, 2` 对应 `*(reg, const_power_of_2)` 子树。每条瓦片覆盖 IR 树的一部分，整棵树被一组无重叠的瓦片完整覆盖。成本：每条瓦片的执行代价，通常用时钟周期数或指令字节数衡量。如 `MUL` 可能 cost 3（慢），`SHL` cost 1（快），`ADD` cost 1。需要成本模型的原因：同一 IR 子树可能被多条不同瓦片覆盖（如 `a+1` 可用 `ADD` 也可用 `INC` 也可用 `LEA`），需成本模型决定选哪个最优。成本模型反映了目标机的微架构特性——不同指令的延迟、吞吐、资源占用不同。准确的成本模型是指令选择质量的关键，但也是难点（现代 CPU 乱序执行使精确成本难以建模，实践中常简化为静态周期估计）。",
    tags: ["瓦片", "Tile", "成本模型", "指令选择", "微架构"],
  },
  {
    id: "eac-instruction-selection-4",
    chapter: "eac-instruction-selection",
    level: 1,
    question: "指令选择、指令调度和寄存器分配三者有什么关系？为什么它们的顺序影响代码质量？",
    answer:
      "三者是后端的核心阶段：指令选择把 IR 映射为目标指令（用虚拟寄存器）；寄存器分配把虚拟寄存器映射到有限的物理寄存器（不够则溢出到内存）；指令调度重排指令顺序以避免流水线停顿（如数据依赖、资源冲突）。它们的顺序影响代码质量：①先选指令再分配寄存器——经典顺序（GCC/LLVM 默认），指令选择可自由使用虚拟寄存器，但寄存器分配可能因寄存器不足插入 spill 代码，破坏调度的最优性 ②先分配寄存器再选指令——限制指令选择能用寻址模式（如必须用内存操作数），但避免 spill ③指令调度与寄存器分配的相互依赖——调度改变指令顺序会影响活跃变量范围（进而影响寄存器需求），寄存器分配插入的 spill 又影响调度。实践中常需多轮迭代或交替执行，如 LLVM 的寄存器分配和调度交替进行。没有完美顺序，工程上需权衡。",
    tags: ["指令选择", "寄存器分配", "指令调度", "后端顺序", "spill"],
  },
];
