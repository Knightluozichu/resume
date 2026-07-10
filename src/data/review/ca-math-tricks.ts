import type { ReviewQuestion } from "./types";

/** 数学技巧：数论、组合与快速幂 复习题 */
export const caMathTricksQuestions: ReviewQuestion[] = [
  {
    id: "ca-math-tricks-1",
    chapter: "ca-math-tricks",
    level: 1,
    question: `快速幂的复杂度是多少？为什么？`,
    answer: `O(log n)。因为每次将指数右移一位（除以2），循环最多 log2(n) 次，每次做一次平方和可能的乘法都是 O(1)。`,
    tags: ["快速幂", "复杂度"],
  },
  {
    id: "ca-math-tricks-2",
    chapter: "ca-math-tricks",
    level: 2,
    question: `费马小定理如何用于求模逆元？`,
    answer: `若 p 为质数，a^(p-1)≡1(mod p)，则 a^(-1)≡a^(p-2)(mod p)。用快速幂计算 a^(p-2) mod p 即得逆元。`,
    tags: ["逆元", "费马小定理"],
  },
  {
    id: "ca-math-tricks-3",
    chapter: "ca-math-tricks",
    level: 3,
    question: `如何 O(1) 查询组合数 C(n,m) mod p？`,
    answer: `预处理 fact[i]=i! mod p 和 invfact[i]=(i!)^(-1) mod p。查询时 C(n,m)=fact[n]*invfact[m]*invfact[n-m] mod p，三次乘法 O(1)。`,
    tags: ["组合数", "预处理"],
  },
  {
    id: "ca-math-tricks-4",
    chapter: "ca-math-tricks",
    level: 4,
    question: `快速幂中每次乘法后为什么要立即取模？`,
    answer: `不取模则 a*a 可能超过 long long 范围（a 最大接近 mod≈10^9，a*a≈10^18 接近 long long 上限）。每步取模保证中间结果始终 < mod。`,
    tags: ["取模", "溢出"],
  },
];
