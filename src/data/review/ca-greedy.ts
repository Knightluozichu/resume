import type { ReviewQuestion } from "./types";

/** 贪心算法：局部最优到全局最优 复习题 */
export const caGreedyQuestions: ReviewQuestion[] = [
  {
    id: "ca-greedy-1",
    chapter: "ca-greedy",
    level: 1,
    question: `贪心算法的核心思想是什么？`,
    answer: `每一步做当前看来最优的选择，且不回退。关键在于贪心选择性质：局部最优能推导出全局最优。`,
    tags: ["贪心思想"],
  },
  {
    id: "ca-greedy-2",
    chapter: "ca-greedy",
    level: 2,
    question: `如何证明贪心策略的正确性？`,
    answer: `用交换法：假设存在更优解，找出它与贪心解的第一个不同选择，交换后证明不更差，矛盾。或用归纳法证明每步贪心选择都在某个最优解中。`,
    tags: ["正确性证明"],
  },
  {
    id: "ca-greedy-3",
    chapter: "ca-greedy",
    level: 3,
    question: `活动选择问题为什么按结束时间排序？`,
    answer: `选最早结束的活动能给后续留下最多时间。交换法证明：任何最优解都能调整为选最早结束活动的解，因此贪心正确。`,
    tags: ["活动选择", "排序依据"],
  },
  {
    id: "ca-greedy-4",
    chapter: "ca-greedy",
    level: 4,
    question: `贪心和动态规划的根本区别是什么？何时用哪个？`,
    answer: `贪心每步不可撤回，DP 考虑所有子问题。贪心高效但适用范围窄，需证明贪心选择性质。DP 适用广但慢。能证明贪心正确则优先贪心。`,
    tags: ["对比", "选型"],
  },
];
