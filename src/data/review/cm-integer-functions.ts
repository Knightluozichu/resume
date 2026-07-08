import type { ReviewQuestion } from "./types";

/** 整函数：取整、取模与谱 复习题 */
export const cmIntegerFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "cm-integer-functions-1",
    chapter: "cm-integer-functions",
    level: 1,
    question: "⌊x⌋ 和 ⌈x⌉ 的定义是什么？",
    answer: "⌊x⌋ 是不超过 x 的最大整数（floor），⌈x⌉ 是不小于 x 的最小整数（ceil）。关系 ⌈x⌉=-⌊-x⌋。",
    tags: ["取整"],
  },
  {
    id: "cm-integer-functions-2",
    chapter: "cm-integer-functions",
    level: 2,
    question: "n! 中素数 p 的幂次公式是什么？",
    answer: "v_p(n!) = Σ_{k≥1} ⌊n/p^k⌋。每 p 个数贡献一个 p，每 p² 个数额外贡献一个，以此类推。",
    tags: ["素数幂次"],
  },
  {
    id: "cm-integer-functions-3",
    chapter: "cm-integer-functions",
    level: 3,
    question: "Beatty 定理的内容是什么？",
    answer: "若 α,β 为正无理数且 1/α+1/β=1，则 {⌊nα⌋} 与 {⌊nβ⌋}（n=1,2,...）恰好覆盖所有正整数且不重叠。例如 α=φ（黄金比），β=φ²。",
    tags: ["Beatty定理"],
  },
  {
    id: "cm-integer-functions-4",
    chapter: "cm-integer-functions",
    level: 4,
    question: "证明嵌套取整恒等式 ⌊x/m⌋=⌊⌊x⌋/m⌋。",
    answer: "设 x=⌊x⌋+{x}，⌊x⌋=qm+r（0≤r<m）。则 ⌊x/m⌋=⌊q+(r+{x})/m⌋。因 0≤r+{x}<m（r<m 且 {x}<1），故 ⌊(r+{x})/m⌋=0，得 ⌊x/m⌋=q=⌊⌊x⌋/m⌋。",
    tags: ["证明", "取整"],
  },
];
