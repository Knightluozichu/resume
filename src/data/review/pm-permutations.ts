import type { ReviewQuestion } from "./types";

/** 排列与组合 复习题 */
export const pmPermutationsQuestions: ReviewQuestion[] = [
  {
    id: "pm-permutations-1",
    chapter: "pm-permutations",
    level: 1,
    question: `排列和组合的区别是什么？`,
    answer: `排列考虑顺序，P(n,k) = n!/(n-k)!；组合不考虑顺序，C(n,k) = n!/(k!(n-k)!)。ABC 排列中 ABC≠BAC，组合中 {A,B,C}={B,A,C}。`,
    tags: ["排列", "组合"],
  },
  {
    id: "pm-permutations-2",
    chapter: "pm-permutations",
    level: 2,
    question: `乘法原理和加法原理分别适用于什么场景？`,
    answer: `乘法原理适用于分步计数（先A后B = m×n），加法原理适用于分类计数（A或B = m+n，需互斥）。复杂问题常交替使用。`,
    tags: ["计数原理", "应用"],
  },
  {
    id: "pm-permutations-3",
    chapter: "pm-permutations",
    level: 3,
    question: `容斥原理的公式是什么（两个集合）？`,
    answer: `|A∪B| = |A| + |B| - |A∩B|。加各集合大小，减去交集（重复计算的部分）。三个集合时交替加减。`,
    tags: ["容斥原理", "公式"],
  },
  {
    id: "pm-permutations-4",
    chapter: "pm-permutations",
    level: 4,
    question: `5人选3人排队和5人选3人组队各有多少种？`,
    answer: `排队（排列）P(5,3) = 5!/(5-3)! = 60 种。组队（组合）C(5,3) = 5!/(3!×2!) = 10 种。排列是组合的 3! 倍。`,
    tags: ["排列组合", "计算"],
  },
];
