import type { ReviewQuestion } from "./types";

/** 排序 复习题 */
export const dsvSortingQuestions: ReviewQuestion[] = [
  {
    id: "dsv-sorting-1",
    chapter: "dsv-sorting",
    level: 1,
    question: `快速排序的平均时间复杂度是？`,
    answer: `O(n log n)。快排平均 O(n log n)，每次划分 O(n) + 递归深度 O(log n)。最坏 O(n²) 当 pivot 选择不佳时。`,
    tags: ["快速排序", "时间复杂度"],
  },
  {
    id: "dsv-sorting-2",
    chapter: "dsv-sorting",
    level: 2,
    question: `以下哪种排序算法是稳定的？`,
    answer: `归并排序。归并排序是稳定的（合并时 ≤ 保证相等元素顺序不变）。快排、堆排、选择排序都不稳定。`,
    tags: ["归并排序", "稳定性"],
  },
  {
    id: "dsv-sorting-3",
    chapter: "dsv-sorting",
    level: 3,
    question: `快速排序最坏情况 O(n²) 在什么条件下触发？`,
    answer: `每次 pivot 都是最值（如已排序数组选最后一个）。当 pivot 总是选到最大或最小值时，划分极度不均，递归深度变 n，退化为 O(n²)。解决：随机 pivot 或三数取中。`,
    tags: ["快速排序", "最坏情况"],
  },
  {
    id: "dsv-sorting-4",
    chapter: "dsv-sorting",
    level: 4,
    question: `小数据量（n<50）或近乎有序的数据，最适合用哪种排序？`,
    answer: `插入排序。插入排序常数极小、无递归开销，近乎有序时接近 O(n)。很多标准库在小子数组时切换为插入排序。`,
    tags: ["插入排序", "选型"],
  },
];
