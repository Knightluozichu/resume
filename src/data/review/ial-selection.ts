import type { ReviewQuestion } from "./types";

/** 选择与中位数 复习题 */
export const ialSelectionQuestions: ReviewQuestion[] = [
  {
    id: "ial-selection-1",
    chapter: "ial-selection",
    level: 1,
    question: `什么是顺序统计量？`,
    answer: `数组中第 i 小的元素。i=1 是最小值，i=n 是最大值，i=(n+1)/2 是中位数。`,
    tags: ["顺序统计量"],
  },
  {
    id: "ial-selection-2",
    chapter: "ial-selection",
    level: 2,
    question: `为什么选择问题可以 O(n) 而排序需要 O(n log n)？`,
    answer: `排序需确定所有 n 个元素顺序，Ω(n log n)。选择只需找第 k 小，分区后只递归一侧 T(n)=T(n/2)+O(n)=O(n)。不需完全排序。`,
    tags: ["选择 vs 排序"],
  },
  {
    id: "ial-selection-3",
    chapter: "ial-selection",
    level: 3,
    question: `BFPRT 如何保证最坏 O(n)？`,
    answer: `每5个一组取中位数，再取中位数的中位数做 pivot。可证此 pivot 至少大于 3n/10 个元素，每次分区至少排除 30%。T(n)≤T(n/5)+T(7n/10)+O(n)=O(n)。`,
    tags: ["BFPRT", "复杂度"],
  },
  {
    id: "ial-selection-4",
    chapter: "ial-selection",
    level: 4,
    question: `随机选择和BFPRT各适合什么场景？`,
    answer: `随机选择期望 O(n) 但最坏 O(n^2)，常数小，实践中更快。BFPRT 最坏 O(n) 但常数大，理论价值高。实际用随机选择，需要最坏保证用 BFPRT。`,
    tags: ["对比", "实践"],
  },
];
