import type { ReviewQuestion } from "./types";

/** 排序算法：堆排、快排与线性排序 复习题 */
export const ialSortingQuestions: ReviewQuestion[] = [
  {
    id: "ial-sorting-1",
    chapter: "ial-sorting",
    level: 1,
    question: "比较排序的下界是多少？为什么？",
    answer: "Ω(n log n)。n 个元素有 n! 种排列，决策树至少 n! 个叶节点，高度 ≥log2(n!)=Ω(n log n)。任何比较排序都无法突破。",
    tags: ["比较排序", "下界"],
  },
  {
    id: "ial-sorting-2",
    chapter: "ial-sorting",
    level: 2,
    question: "为什么计数排序可以突破 O(n log n)？",
    answer: "计数排序不比较元素，而是用元素值做数组索引直接定位，利用了元素是有限范围内整数的性质。不受决策树下界约束，达 O(n+k)。",
    tags: ["计数排序", "非比较"],
  },
  {
    id: "ial-sorting-3",
    chapter: "ial-sorting",
    level: 3,
    question: "快速排序为什么随机选 pivot？",
    answer: "固定选 pivot（如第一个）可被构造最坏输入 O(n^2)。随机选后期望 O(n log n)，最坏概率极低。随机化消除了对手构造恶意输入的能力。",
    tags: ["快排", "随机化"],
  },
  {
    id: "ial-sorting-4",
    chapter: "ial-sorting",
    level: 4,
    question: "堆排序和快速排序各有什么优劣？",
    answer: "堆排最坏 O(n log n) 有保证、原地排序，但常数大、缓存不友好。快排期望 O(n log n)、最坏 O(n^2) 但概率低、常数小、缓存友好。需最坏保证用堆排，追求速度用快排。",
    tags: ["对比", "选型"],
  },
];
