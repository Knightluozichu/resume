import { ReviewQuestion } from "../types";

export const tbcRegisterAllocationQuestions: ReviewQuestion[] = [
  {
    id: "tbc-register-allocation-1",
    chapter: "tbc-register-allocation",
    level: 1,
    question: "寄存器分配的任务是什么？干涉图如何构建？",
    answer:
      "寄存器分配把指令选择后无限多的虚拟寄存器（TEMP）映射到有限的目标机器物理寄存器（K 个）。干涉图构建：先做活跃变量分析（liveness analysis）——对每条指令算出哪些 TEMP 在此后被使用（活跃），两个 TEMP 若在同一程序点同时活跃则「干涉」，在干涉图中连一条边。干涉意味着两者不能共用同一物理寄存器。寄存器分配就等价于干涉图的 K 着色——给每个节点（TEMP）分配一种颜色（寄存器），相邻节点颜色不同。着色失败则需溢出。",
    tags: ["寄存器分配", "干涉图", "活跃分析", "图着色", "K 着色"],
  },
  {
    id: "tbc-register-allocation-2",
    chapter: "tbc-register-allocation",
    level: 3,
    question: "Chaitin-Briggs 图着色算法的 Simplify / Spill / Select 三阶段是如何循环工作的？",
    answer:
      "Simplify（简化）：反复删除干涉图中度数小于 K 的节点，压入栈中——这些节点必然可着色（邻居少于 K 个，至少剩一种颜色）。Spill（潜在溢出）：当图中无低度数节点时，选一个高度数节点标记为「潜在溢出」，仍压入栈继续简化（乐观假设它能着色）。Select（选择着色）：栈清空后开始弹栈，每个节点选一个与所有已着色邻居都不同的颜色。若某潜在溢出节点找不到可用颜色则发生「实际溢出」——为它在栈帧分配槽位，重写指令（使用前 load、定义后 store），重建干涉图重新着色，直到全部着色成功。",
    tags: ["Chaitin-Briggs", "Simplify", "Spill", "Select", "图着色算法"],
  },
  {
    id: "tbc-register-allocation-3",
    chapter: "tbc-register-allocation",
    level: 3,
    question: "什么是实际溢出（actual spill）？如何处理？为什么不直接报错？",
    answer:
      "实际溢出发生在 Select 阶段——某潜在溢出节点弹栈时，所有 K 种颜色都被邻居占用，无法着色。处理：为该 TEMP 在栈帧中分配一个内存槽位，重写指令序列——每次使用该 TEMP 前插入一条 load 把值从栈读到新临时变量，每次定义后插入一条 store 把新临时变量写回栈。重写后这些新临时变量的活跃区间变短、干涉减少，重建干涉图重新跑 Simplify/Spill/Select，通常能成功。不直接报错是因为寄存器不足是常态——通过溢出到内存让程序仍能正确运行（用时间换空间），只是访问变慢，保证编译总能完成。",
    tags: ["实际溢出", "潜在溢出", "load store", "重写", "栈槽位"],
  },
  {
    id: "tbc-register-allocation-4",
    chapter: "tbc-register-allocation",
    level: 3,
    question: "move coalescing 的作用是什么？Briggs / George 准则如何保证合并不引入溢出？",
    answer:
      "move coalescing（移动合并）合并 MOVE 指令相关的两个非干涉 TEMP 节点为同一寄存器，从而消除那条 MOVE 指令，减少指令数、提升性能。但盲目合并可能增加干涉度导致溢出，所以用安全准则：Briggs 准则——合并后节点若度数小于 K 或其高度数邻居数小于 K 则安全（合并后仍能简化）；George 准则——若源节点每个邻居要么度数小于 K 要么已与目标节点干涉，则合并安全。这两个准则保证合并不引入原本不会发生的溢出，在性能（消 move）和安全（不溢出）之间平衡。",
    tags: ["move coalescing", "移动合并", "Briggs 准则", "George 准则", "MOVE 指令"],
  },
];
