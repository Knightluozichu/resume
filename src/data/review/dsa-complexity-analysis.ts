import type { ReviewQuestion } from "./types";

/** 复杂度分析 复习题 */
export const dsaComplexityAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "dsa-complexity-analysis-1",
    chapter: "dsa-complexity-analysis",
    level: 1,
    question: "均摊分析和平均复杂度的区别是什么？",
    answer: "均摊针对一系列操作的总代价，平均针对单一操作的期望。均摊分析针对一系列操作的总代价均摊到每次（不涉及概率），平均复杂度针对单一操作在随机输入下的期望（依赖概率假设）。",
    tags: ["均摊分析", "平均复杂度"],
  },
  {
    id: "dsa-complexity-analysis-2",
    chapter: "dsa-complexity-analysis",
    level: 2,
    question: "主定理 T(n)=aT(n/b)+O(n^d) 中，当 a=b^d 时，T(n)=？",
    answer: "O(n^d log n)。a=b^d 时各层代价均衡，T(n)=O(n^d log n)。如归并排序 T(n)=2T(n/2)+O(n)，a=2,b=2,d=1，a=b^d → O(n log n)。",
    tags: ["主定理", "分治递推"],
  },
  {
    id: "dsa-complexity-analysis-3",
    chapter: "dsa-complexity-analysis",
    level: 3,
    question: "vector 的 push_back 均摊 O(1) 的关键策略是？",
    answer: "倍增扩容（容量翻倍）。倍增扩容使扩容次数仅 O(log n)，总搬迁代价为等比数列求和 < n，均摊 O(1)。",
    tags: ["vector", "均摊O(1)"],
  },
  {
    id: "dsa-complexity-analysis-4",
    chapter: "dsa-complexity-analysis",
    level: 4,
    question: "势能法中均摊代价的计算公式是？",
    answer: "实际代价 + ΔΦ。势能法：均摊代价 = 实际代价 + Φ(D_i) - Φ(D_{i-1})。势能始终非负则证明均摊上界成立。",
    tags: ["势能法", "均摊代价"],
  },
];
