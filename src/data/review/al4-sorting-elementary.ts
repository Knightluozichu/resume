import type { ReviewQuestion } from "./types";

/** 初级排序算法 复习题 */
export const al4SortingElementaryQuestions: ReviewQuestion[] = [
  {
    id: "al4-sorting-elementary-1",
    chapter: "al4-sorting-elementary",
    level: 1,
    question: "选择排序的比较次数和交换次数？",
    answer: "比较固定 ~n^2/2，交换 n 次（所有排序中最少）。",
    tags: ["选择排序"],
  },
  {
    id: "al4-sorting-elementary-2",
    chapter: "al4-sorting-elementary",
    level: 2,
    question: "为什么插入排序对近乎有序数据接近 O(n)？",
    answer: "比较次数=逆序对数+n。近乎有序数据逆序对很少，接近 n，即 O(n)。",
    tags: ["插入排序", "逆序对"],
  },
  {
    id: "al4-sorting-elementary-3",
    chapter: "al4-sorting-elementary",
    level: 3,
    question: "希尔排序为什么比普通插入排序快？",
    answer: "大间隔 h-排序让元素跨越式移动到接近最终位置。到最后 h=1 时数据已近乎有序，插入排序近乎 O(n)。",
    tags: ["希尔排序"],
  },
  {
    id: "al4-sorting-elementary-4",
    chapter: "al4-sorting-elementary",
    level: 4,
    question: "为什么高级排序在小数组上不如插入排序？",
    answer: "递归开销大、常数因子大、插入排序缓存友好。快排在 n<10~20 时切换到插入排序。",
    tags: ["综合", "插入排序", "快排"],
  },
];
