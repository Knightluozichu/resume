import type { ReviewQuestion } from "./types";

/** 算法复杂度 复习题 */
export const dsvComplexityQuestions: ReviewQuestion[] = [
  {
    id: "dsv-complexity-1",
    chapter: "dsv-complexity",
    level: 1,
    question: `大 O 表示法的核心原则是什么？`,
    answer: `抓大头、忽略常数。大 O 表示法抓最高阶项、忽略常数和低阶项，描述增长趋势而非绝对值。`,
    tags: ["大O表示法", "复杂度"],
  },
  {
    id: "dsv-complexity-2",
    chapter: "dsv-complexity",
    level: 2,
    question: `以下复杂度从小到大的正确排序是？`,
    answer: `O(1) < O(log n) < O(n) < O(n log n) < O(n²)。正确排序：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)。`,
    tags: ["复杂度排序", "增长趋势"],
  },
  {
    id: "dsv-complexity-3",
    chapter: "dsv-complexity",
    level: 3,
    question: `嵌套两层 for 循环（各 n 次）的时间复杂度是？`,
    answer: `O(n²)。外层 n 次乘以内层 n 次 = n×n = n²，即 O(n²)。`,
    tags: ["时间复杂度", "嵌套循环"],
  },
  {
    id: "dsv-complexity-4",
    chapter: "dsv-complexity",
    level: 4,
    question: `二分查找每次将搜索范围减半，其时间复杂度是？`,
    answer: `O(log n)。每次排除一半，递减次数为 log₂(n)，即 O(log n)。`,
    tags: ["二分查找", "对数复杂度"],
  },
];
