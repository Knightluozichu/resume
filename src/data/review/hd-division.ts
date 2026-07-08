import type { ReviewQuestion } from "./types";

/** 除法优化：常量除法与取模 复习题 */
export const hdDivisionQuestions: ReviewQuestion[] = [
  {
    id: "hd-division-1",
    chapter: "hd-division",
    level: 1,
    question: "为什么编译器把除以常量优化成乘法？",
    answer: "除法 20-40 周期，乘法 3-5 周期。对常量除数 d，可找到魔法数 M 和移位 k 使 x/d=(x*M)>>k 精确成立。乘法+移位快 4-8 倍。",
    tags: ["魔法数除法", "编译器优化"],
  },
  {
    id: "hd-division-2",
    chapter: "hd-division",
    level: 2,
    question: "有符号数除以 2 的幂为什么不能直接右移？",
    answer: "C 除法向零取整（-3/2=-1），算术右移向下取整（-3>>1=-2）。负数不一致。修正：负数加 (2^k-1) 再右移。",
    tags: ["有符号除法", "取整"],
  },
  {
    id: "hd-division-3",
    chapter: "hd-division",
    level: 3,
    question: "取模 x%8 如何用位运算优化？",
    answer: "x%8 = x & 7。因为 8=2^3，7=2^3-1 是全1掩码，x&7 取低 3 位即余数。只对 2 的幂成立。",
    tags: ["取模优化", "位运算"],
  },
  {
    id: "hd-division-4",
    chapter: "hd-division",
    level: 4,
    question: "魔法数除法的原理和限制？",
    answer: "原理：1/d≈M/2^k，所以 x/d≈x*M>>k。选 k 足够大使精度无损。限制：M 和 k 需精确计算，手写易错。大数可能溢出。让编译器自动优化更安全。",
    tags: ["魔法数", "原理"],
  },
];
