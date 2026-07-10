import type { ReviewQuestion } from "./types";

/** 数学预备知识 复习题 */
export const tcpMathematicalPreliminariesQuestions: ReviewQuestion[] = [
  {
    id: "tcp-mathematical-preliminaries-1",
    chapter: "tcp-mathematical-preliminaries",
    level: 1,
    question: `大 O 表示法定义中，f(n) = O(g(n)) 的精确含义是什么？`,
    answer: `存在正常数 C 和 n₀，使得对所有 n > n₀，有 f(n) ≤ C·g(n)。大 O 描述的是渐近上界，只关注增长趋势。`,
    tags: ["大O", "定义"],
  },
  {
    id: "tcp-mathematical-preliminaries-2",
    chapter: "tcp-mathematical-preliminaries",
    level: 2,
    question: `归并排序的递归关系 T(n) = 2T(n/2) + n 的解是什么？`,
    answer: `T(n) = O(n log n)。展开递归树有 log n 层，每层总工作量为 n，故总和为 n log n。`,
    tags: ["递归关系", "归并排序"],
  },
  {
    id: "tcp-mathematical-preliminaries-3",
    chapter: "tcp-mathematical-preliminaries",
    level: 3,
    question: `模运算中，(a * b) mod m 等于什么？`,
    answer: `((a mod m) * (b mod m)) mod m。模运算对乘法满足分配律，这是 RSA 等密码算法的基础。`,
    tags: ["模运算", "数论"],
  },
  {
    id: "tcp-mathematical-preliminaries-4",
    chapter: "tcp-mathematical-preliminaries",
    level: 4,
    question: `调和级数 sum(1/k) 的增长趋势是什么？`,
    answer: `O(log n)。调和级数 H_n = 1 + 1/2 + 1/3 + ... + 1/n ≈ ln(n) + γ（欧拉常数），增长趋势是对数级的。`,
    tags: ["求和", "调和级数"],
  },
];
