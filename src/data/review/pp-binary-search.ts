import type { ReviewQuestion } from "./types";

/** 二分搜索的精确实现 复习题 */
export const ppBinarySearchQuestions: ReviewQuestion[] = [
  {
    id: "pp-binary-search-1",
    chapter: "pp-binary-search",
    level: 1,
    question: `二分搜索中为什么用 lo+(hi-lo)/2 而非 (lo+hi)/2？`,
    answer: `(lo+hi) 可能溢出 int 范围产生负数，导致数组越界。lo+(hi-lo)/2 保证不溢出。这是 Java 标准库 2006 年才修复的 bug。`,
    tags: ["二分搜索", "溢出"],
  },
  {
    id: "pp-binary-search-2",
    chapter: "pp-binary-search",
    level: 2,
    question: `为什么 lo=mid 会导致死循环？`,
    answer: `当 lo 和 hi 相邻时 mid=lo+(hi-lo)/2=lo，lo=mid 不变，lo 永远不前进。必须 lo=mid+1 收缩。`,
    tags: ["死循环", "边界条件"],
  },
  {
    id: "pp-binary-search-3",
    chapter: "pp-binary-search",
    level: 3,
    question: `如何用循环不变式证明二分搜索正确？`,
    answer: `不变式：key若存在则在[lo,hi]内。初始化为真（[0,n-1]）。保持：a[mid]<key时key在右，lo=mid+1后仍在[lo,hi]；类似>。终止：lo>hi时范围空，key不存在。`,
    tags: ["循环不变式", "正确性证明"],
  },
  {
    id: "pp-binary-search-4",
    chapter: "pp-binary-search",
    level: 4,
    question: `请对比 binarySearch、lower_bound、upper_bound 三者在终止条件和lo/hi更新上的区别。`,
    answer: `binarySearch：lo<=hi，lo=mid+1/hi=mid-1（精确匹配可跳过mid）。lower_bound：lo<hi，hi初始为length，hi=mid（找第一个>=key，mid可能为答案不能跳过）。upper_bound：lo<hi，hi初始为length，hi=mid（找第一个>key，a[mid]<=key时lo=mid+1）。核心区别：精确匹配可跳过mid（mid-1/mid+1），边界查找不能跳过mid（hi=mid）。`,
    tags: ["综合", "二分搜索变体", "对比"],
  },
];
