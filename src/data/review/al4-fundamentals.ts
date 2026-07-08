import type { ReviewQuestion } from "./types";

/** 算法基础 复习题 */
export const al4FundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "al4-fundamentals-1",
    chapter: "al4-fundamentals",
    level: 1,
    question: "大O表示法忽略常数因子意味着什么？",
    answer: "大O描述增长趋势而非绝对时间。O(2n) 和 O(n) 大O相同但实际差两倍。大O只在 n 足够大时有效。",
    tags: ["大O"],
  },
  {
    id: "al4-fundamentals-2",
    chapter: "al4-fundamentals",
    level: 2,
    question: "Union-Find 三个版本的复杂度？",
    answer: "quick-find: find O(1) union O(n)。quick-union: find/union O(n)。加权+路径压缩: 均摊 O(alpha(n))。",
    tags: ["Union-Find"],
  },
  {
    id: "al4-fundamentals-3",
    chapter: "al4-fundamentals",
    level: 3,
    question: "n=100万时 O(n)、O(n log n)、O(n^2) 的执行次数？",
    answer: "O(n): 100万。O(n log n): 2000万。O(n^2): 1万亿。分别约0.01秒、0.2秒、2.8小时。",
    tags: ["复杂度比较"],
  },
  {
    id: "al4-fundamentals-4",
    chapter: "al4-fundamentals",
    level: 4,
    question: "用 Union-Find 优化演进说明如何逐步优化数据结构。",
    answer: "四步：quick-find（union慢）→quick-union（树退化）→加权（长路径）→路径压缩（均摊O(1)）。每次找瓶颈，针对性优化。",
    tags: ["综合", "优化方法论"],
  },
];
