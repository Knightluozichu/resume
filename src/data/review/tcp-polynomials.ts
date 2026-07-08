import type { ReviewQuestion } from "./types";

/** 多项式运算 复习题 */
export const tcpPolynomialsQuestions: ReviewQuestion[] = [
  {
    id: "tcp-polynomials-1",
    chapter: "tcp-polynomials",
    level: 1,
    question: "多项式的系数表示和点值表示各有什么优劣？",
    answer: "系数表示直觉、加减法 O(n)，但乘法 O(n²)。点值表示乘法只需 O(n)（对应点值相乘），但加减法和求值不直观，且与系数表示的转换需要 O(n²)（FFT 降到 O(n log n)）。",
    tags: ["多项式", "表示方式"],
  },
  {
    id: "tcp-polynomials-2",
    chapter: "tcp-polynomials",
    level: 2,
    question: "FFT 将多项式乘法从 O(n²) 降到 O(n log n) 的关键原理是什么？",
    answer: "选择 n 次单位根作为求值点。单位根的对称性（ω^(k+n/2) = -ω^k）使 DFT 可分治：n 点 DFT 分解为两个 n/2 点 DFT，每层 O(n)，共 log n 层，总计 O(n log n)。",
    tags: ["FFT", "复杂度"],
  },
  {
    id: "tcp-polynomials-3",
    chapter: "tcp-polynomials",
    level: 3,
    question: "两个 n 次多项式相乘，结果是多少次？需要补零到多少项？",
    answer: "结果是 2n-1 次。为 FFT 需要补零到 N ≥ 2n-1 且 N 是 2 的幂，通常取 N = 2^ceil(log2(2n-1))。",
    tags: ["多项式乘法", "补零"],
  },
  {
    id: "tcp-polynomials-4",
    chapter: "tcp-polynomials",
    level: 4,
    question: "幂级数在算法分析中的典型应用是什么？",
    answer: "用作生成函数。将递归关系转化为生成函数的代数方程，求解后展开系数得到通项。Fibonacci 的生成函数 F(x) = x/(1-x-x²)，展开系数即为 Fibonacci 数。",
    tags: ["幂级数", "生成函数"],
  },
];
