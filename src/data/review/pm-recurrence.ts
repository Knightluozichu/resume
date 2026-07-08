import type { ReviewQuestion } from "./types";

/** 递归与递推关系 复习题 */
export const pmRecurrenceQuestions: ReviewQuestion[] = [
  {
    id: "pm-recurrence-1",
    chapter: "pm-recurrence",
    level: 1,
    question: "递归和递推的区别是什么？",
    answer: "递归是编程技术（函数调用自身），递推是数学关系（用小输入的值定义大输入）。递归是递推关系的程序实现。递推分析递归算法的复杂度。",
    tags: ["递归", "递推"],
  },
  {
    id: "pm-recurrence-2",
    chapter: "pm-recurrence",
    level: 2,
    question: "主定理的三种情况分别是什么？",
    answer: "1) f(n) < n^(log_b a) → T(n)=O(n^(log_b a))；2) f(n) = n^(log_b a) → T(n)=O(n^(log_b a)·log n)；3) f(n) > n^(log_b a) → T(n)=O(f(n))。比较合并代价与子问题总代价。",
    tags: ["主定理", "三种情况"],
  },
  {
    id: "pm-recurrence-3",
    chapter: "pm-recurrence",
    level: 3,
    question: "归并排序的递推关系和复杂度是什么？",
    answer: "T(n) = 2T(n/2) + O(n)。a=2, b=2, n^(log_2 2)=n=f(n)，情况2，T(n)=O(n log n)。",
    tags: ["归并排序", "复杂度"],
  },
  {
    id: "pm-recurrence-4",
    chapter: "pm-recurrence",
    level: 4,
    question: "朴素递归 Fibonacci 的复杂度为什么是 O(2^n)？",
    answer: "T(n) = T(n-1) + T(n-2) + O(1)。递归树中每个节点分裂为两个，大量重复计算（如 fib(3) 被计算多次）。递归树节点数与 Fibonacci 数成正比，约 φ^n ≈ 1.618^n。可用记忆化或动态规划优化到 O(n)。",
    tags: ["Fibonacci", "复杂度"],
  },
];
