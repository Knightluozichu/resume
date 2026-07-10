import type { ReviewQuestion } from "./types";

/** 幂运算与根号：快速幂与整数开方 复习题 */
export const hdPowerQuestions: ReviewQuestion[] = [
  {
    id: "hd-power-1",
    chapter: "hd-power",
    level: 1,
    question: `快速幂的复杂度？为什么？`,
    answer: `O(log n)。每次指数右移一位（除2），循环 log2(n) 次。每次做一次平方和可能的乘法都是 O(1)。朴素做法需 n 次乘法 O(n)。`,
    tags: ["快速幂", "复杂度"],
  },
  {
    id: "hd-power-2",
    chapter: "hd-power",
    level: 2,
    question: `Newton 迭代法求平方根的收敛速度？`,
    answer: `二次收敛：每次迭代有效位数翻倍。从 1 位精度开始，5 次迭代达 32 位精度，10 次达 1024 位。远快于二分法的线性收敛。`,
    tags: ["Newton迭代", "收敛速度"],
  },
  {
    id: "hd-power-3",
    chapter: "hd-power",
    level: 3,
    question: `逐位确定法开方的原理？`,
    answer: `从最高可能位开始逐位测试：设当前位为1后平方是否超过n。不超过则设1并减去，超过则设0。每次处理2位（平方位移2位）。类似手算开方。`,
    tags: ["逐位开方", "原理"],
  },
  {
    id: "hd-power-4",
    chapter: "hd-power",
    level: 4,
    question: `Newton 迭代和逐位确定法开方各有什么优劣？`,
    answer: `Newton 迭代收敛快（5次到32位）但需要除法。逐位确定法不需除法（只用减法和比较），适合无除法器的硬件。实际中 Newton 更常用。`,
    tags: ["对比", "选型"],
  },
];
