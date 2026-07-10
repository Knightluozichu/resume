import type { ReviewQuestion } from "./types";

/** 算法导论总复习 复习题 */
export const ialFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ial-final-review-1",
    chapter: "ial-final-review",
    level: 1,
    question: `CLRS 的四种算法设计范式是什么？`,
    answer: `分治（归并排序）、贪心（活动选择、Kruskal）、DP（LCS、矩阵链乘）、图论（BFS/DFS、最短路）。每种有适用条件和证明方法。`,
    tags: ["设计范式"],
  },
  {
    id: "ial-final-review-2",
    chapter: "ial-final-review",
    level: 2,
    question: `贪心和 DP 如何选择？`,
    answer: `有贪心选择性质（局部最优→全局最优）优先贪心，更简单高效。有最优子结构+重叠子问题但不满足贪心性质用 DP。能证明贪心正确则贪心，否则 DP。`,
    tags: ["贪心 vs DP"],
  },
  {
    id: "ial-final-review-3",
    chapter: "ial-final-review",
    level: 3,
    question: `CLRS 方法论的核心步骤是什么？`,
    answer: `1.分析问题结构；2.选择设计范式；3.证明正确性（循环不变式/归纳法）；4.分析复杂度（渐近分析/主定理/摊还分析）；5.实现与验证。`,
    tags: ["方法论"],
  },
  {
    id: "ial-final-review-4",
    chapter: "ial-final-review",
    level: 4,
    question: `全书四大板块如何串联？`,
    answer: `基础（渐近分析+递归）是数学语言→排序是分治范式入门→数据结构是高效算法的基础设施→高级算法综合运用前三者。递进：语言→工具→基础设施→综合应用。`,
    tags: ["综合", "知识体系"],
  },
];
