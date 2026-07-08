import type { ReviewQuestion } from "./types";

/** 算子与谱定理 复习题 */
export const ladOperatorsQuestions: ReviewQuestion[] = [
  {
    id: "lad-operators-1",
    chapter: "lad-operators",
    level: 1,
    question: "自伴算子的定义？",
    answer: "T=T*，实数域即对称矩阵。自伴算子特征值为实数。",
    tags: ["定义"],
  },
  {
    id: "lad-operators-2",
    chapter: "lad-operators",
    level: 2,
    question: "复谱定理的结论？",
    answer: "复内积空间上，T 正规当且仅当存在正交规范基使其对角化（正规↔正交可对角化）。",
    tags: ["复谱定理"],
  },
  {
    id: "lad-operators-3",
    chapter: "lad-operators",
    level: 3,
    question: "为什么实谱定理要求自伴？",
    answer: "实正规算子（如旋转）可能无实特征值，不能实对角化；自伴算子特征值为实数，才有实正交特征基，故实谱定理需自伴这一更强前提。",
    tags: ["实谱定理"],
  },
  {
    id: "lad-operators-4",
    chapter: "lad-operators",
    level: 4,
    question: "陈述极分解并说明与奇异值的关系。",
    answer: "任何算子 T=S√(T*T)，S 为等距。√(T*T) 是正算子，其特征值即奇异值，度量各正交方向的拉伸强度，是 SVD 的核心。",
    tags: ["极分解", "奇异值"],
  },
];
