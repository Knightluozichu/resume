import type { ReviewQuestion } from "./types";

/** 组合数学 复习题 */
export const mglCombinatoricsQuestions: ReviewQuestion[] = [
  {
    id: "mgl-combinatorics-1",
    chapter: "mgl-combinatorics",
    level: 1,
    question: "从 10 人中选 3 人组成委员会（顺序不重要），有多少种选法？",
    answer: "C(10,3) = 120。组合问题（顺序不重要）：C(10,3) = 10!/(3!×7!) = 120。",
    tags: ["组合", "C(n,k)"],
  },
  {
    id: "mgl-combinatorics-2",
    chapter: "mgl-combinatorics",
    level: 2,
    question: "排列 P(n,k) 和组合 C(n,k) 的关系是？",
    answer: "P(n,k) = C(n,k) × k!。排列 = 组合 × k!。因为 k 个元素有 k! 种排列方式，组合除以 k! 消除顺序得到排列。",
    tags: ["排列", "组合"],
  },
  {
    id: "mgl-combinatorics-3",
    chapter: "mgl-combinatorics",
    level: 3,
    question: "帕斯卡三角形的递推关系是？",
    answer: "C(n,k) = C(n-1,k-1) + C(n-1,k)。C(n,k)=C(n-1,k-1)+C(n-1,k)，即每个数等于肩上两数之和。这是二项式系数的核心递推。",
    tags: ["帕斯卡三角", "递推"],
  },
  {
    id: "mgl-combinatorics-4",
    chapter: "mgl-combinatorics",
    level: 4,
    question: "1-100 中能被 2 或 3 整除的数有多少个？（容斥原理）",
    answer: "50+33-16=67。容斥：|A∪B|=|A|+|B|-|A∩B|=50+33-16=67。被2整除50个+被3整除33个-被6整除16个。",
    tags: ["容斥原理", "计数"],
  },
];
