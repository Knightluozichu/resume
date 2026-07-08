import type { ReviewQuestion } from "./types";

/** 排序 复习题 */
export const dsaSortingQuestions: ReviewQuestion[] = [
  {
    id: "dsa-sorting-1",
    chapter: "dsa-sorting",
    level: 1,
    question: "C++ std::sort 的底层实现是什么算法？",
    answer: "内省排序（快排+堆排+插入排序的混合）。std::sort 用内省排序（introsort）：以快排为主，三数取中选基准；递归深度超过 2log n 时切换堆排序保证最坏 O(n log n)；分区到小数组（n<16）时切换插入排序优化常数。",
    tags: ["std::sort", "内省排序"],
  },
  {
    id: "dsa-sorting-2",
    chapter: "dsa-sorting",
    level: 2,
    question: "快速排序的最坏时间复杂度是 O(n²)，在什么情况下出现？",
    answer: "每次选到最差基准（如已排序数据选首尾元素）。当每次分区极度不平衡（一边 0 个一边 n-1 个）时退化为 O(n²)。最典型场景是对已排序数据固定选首/尾为基准。三数取中或随机选基准可大幅降低概率，introsort 则用堆排兜底。",
    tags: ["快速排序", "最坏情况"],
  },
  {
    id: "dsa-sorting-3",
    chapter: "dsa-sorting",
    level: 3,
    question: "为什么对小数组（n < 16）用插入排序而不是快排？",
    answer: "插入排序常数小，小数组下比快排更快。插入排序对接近有序的小数组接近 O(n)，且无递归开销（省去函数调用、栈帧）。快排虽是 O(n log n) 但常数大（递归、分区），n<16 时插入排序实际更快。这是 std::sort 的关键优化。",
    tags: ["插入排序", "小数组优化"],
  },
  {
    id: "dsa-sorting-4",
    chapter: "dsa-sorting",
    level: 4,
    question: "归并排序和堆排序都是 O(n log n)，为什么归并更常用于外部排序？",
    answer: "归并排序顺序访问磁盘，缓存友好。外部排序数据在磁盘上，随机访问代价极高。归并排序合并时是顺序读写（磁盘最友好），且天然支持多路归并。堆排序的父子索引跳跃是随机访问，磁盘上性能极差。",
    tags: ["归并排序", "外部排序"],
  },
];
