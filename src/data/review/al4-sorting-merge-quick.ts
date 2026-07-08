import type { ReviewQuestion } from "./types";

/** 归并与快速排序 复习题 */
export const al4SortingMergeQuickQuestions: ReviewQuestion[] = [
  {
    id: "al4-sorting-merge-quick-1",
    chapter: "al4-sorting-merge-quick",
    level: 1,
    question: "归并排序的时间和空间复杂度？",
    answer: "时间 O(n log n)（最好最坏相同），空间 O(n)。稳定排序。",
    tags: ["归并排序"],
  },
  {
    id: "al4-sorting-merge-quick-2",
    chapter: "al4-sorting-merge-quick",
    level: 2,
    question: "快排为什么最坏 O(n^2)？如何避免？",
    answer: "已排序+选第一个做 pivot 时每次只分出1个元素。随机化 pivot 或三数取中可避免。",
    tags: ["快排", "随机化"],
  },
  {
    id: "al4-sorting-merge-quick-3",
    chapter: "al4-sorting-merge-quick",
    level: 3,
    question: "需要稳定排序的场景选哪种？",
    answer: "用归并排序。相等元素保持原序。Java Collections.sort 用归并（TimSort）。",
    tags: ["稳定排序", "归并"],
  },
  {
    id: "al4-sorting-merge-quick-4",
    chapter: "al4-sorting-merge-quick",
    level: 4,
    question: "对比归并、快排、堆排三种 O(n log n) 排序的优劣。",
    answer: "归并：O(n log n)保证，稳定，空间O(n)。快排：平均O(n log n)，原地，最快。堆排：O(n log n)保证，原地，缓存不友好。按需选择。",
    tags: ["综合", "排序对比"],
  },
];
