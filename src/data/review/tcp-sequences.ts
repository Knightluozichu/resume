import type { ReviewQuestion } from "./types";

/** 序列的生成与排列 复习题 */
export const tcpSequencesQuestions: ReviewQuestion[] = [
  {
    id: "tcp-sequences-1",
    chapter: "tcp-sequences",
    level: 1,
    question: `排列 [3,1,2] 的字典序下一个排列是什么？`,
    answer: `[3,2,1]。下降点 i=1（1<2），交换点 j=2（2>1），交换得 [3,2,1]，反转 i 之后（位置2之后为空），结果 [3,2,1]。`,
    tags: ["字典序", "排列"],
  },
  {
    id: "tcp-sequences-2",
    chapter: "tcp-sequences",
    level: 2,
    question: `朴素递归计算 Fibonacci 数列的时间复杂度是多少？为什么？`,
    answer: `O(φⁿ) ≈ O(1.618ⁿ)，指数级。因为 F(n) = F(n-1) + F(n-2) 的递归树中有大量重复计算，递归树节点数与 F(n) 成正比，而 F(n) ≈ φⁿ/√5。`,
    tags: ["递归序列", "Fibonacci"],
  },
  {
    id: "tcp-sequences-3",
    chapter: "tcp-sequences",
    level: 3,
    question: `矩阵快速幂计算 Fibonacci 的时间复杂度是多少？`,
    answer: `O(log n)。F(n) = [[1,1],[1,0]]^n 的右上角元素，矩阵幂用二进制分解在 O(log n) 次矩阵乘法内完成。`,
    tags: ["矩阵快速幂", "Fibonacci"],
  },
  {
    id: "tcp-sequences-4",
    chapter: "tcp-sequences",
    level: 4,
    question: `为什么字典序排列生成比递归法更实用？`,
    answer: `字典序法是迭代的（O(1) 额外空间）、保证顺序的、每次只生成一个排列（适合流式处理和提前终止）。递归法需要 O(n) 栈空间且不保证字典序。`,
    tags: ["排列生成", "字典序"],
  },
];
