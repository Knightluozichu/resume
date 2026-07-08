import type { ReviewQuestion } from "./types";

/** 算法 复习题 */
export const mglAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "mgl-algorithms-1",
    chapter: "mgl-algorithms",
    level: 1,
    question: "动态规划适用的两个条件是？",
    answer: "最优子结构 + 重叠子问题。DP 需要：①最优子结构（最优解含子问题最优解）②重叠子问题（子问题被反复计算）。用表格记忆化避免重复。",
    tags: ["动态规划", "最优子结构"],
  },
  {
    id: "mgl-algorithms-2",
    chapter: "mgl-algorithms",
    level: 2,
    question: "分治法和动态规划的关键区别是？",
    answer: "分治子问题独立，DP 子问题重叠。分治的子问题独立不重叠（如归并排序两半独立），DP 的子问题重叠（如斐波那契 fib(n-2) 被重复计算），需记忆化。",
    tags: ["分治", "动态规划"],
  },
  {
    id: "mgl-algorithms-3",
    chapter: "mgl-algorithms",
    level: 3,
    question: "面额 [1,3,4] 找 6 元，贪心算法给出几枚？最优解几枚？",
    answer: "贪心 3 枚（4+1+1），最优 2 枚（3+3）。贪心选最大面额 4，剩 2 选 1+1，共 3 枚。最优是 3+3=2 枚。贪心失败因为不具备贪心选择性质。",
    tags: ["贪心算法", "找零问题"],
  },
  {
    id: "mgl-algorithms-4",
    chapter: "mgl-algorithms",
    level: 4,
    question: "归并排序的时间复杂度递推关系是？",
    answer: "T(n) = 2T(n/2) + O(n) = O(n log n)。归并排序分治：两半各 T(n/2) + 合并 O(n)，总 T(n)=2T(n/2)+O(n)=O(n log n)。",
    tags: ["归并排序", "递推关系"],
  },
];
