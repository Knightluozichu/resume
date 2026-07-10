import type { ReviewQuestion } from "./types";

/** 浮点算术与进制转换 复习题 */
export const tcpArithmeticQuestions: ReviewQuestion[] = [
  {
    id: "tcp-arithmetic-1",
    chapter: "tcp-arithmetic",
    level: 1,
    question: `IEEE 754 双精度浮点数的位分配是怎样的？`,
    answer: `1 位符号 + 11 位指数 + 52 位尾数，共 64 位。表示范围约 ±10³⁰⁸，精度约 15-16 位有效数字。`,
    tags: ["浮点数", "IEEE 754"],
  },
  {
    id: "tcp-arithmetic-2",
    chapter: "tcp-arithmetic",
    level: 2,
    question: `为什么浮点运算不满足结合律？`,
    answer: `因为中间结果的舍入方向不同。(a+b)+c 和 a+(b+c) 的中间值不同，舍入后可能得到不同结果。这是数值稳定性分析的核心。`,
    tags: ["精度损失", "结合律"],
  },
  {
    id: "tcp-arithmetic-3",
    chapter: "tcp-arithmetic",
    level: 3,
    question: `十进制 0.5 的二进制表示是什么？0.1 呢？`,
    answer: `0.5 = 0.1₂（有限，因为 0.5 = 1/2）。0.1 = 0.0001100110011...₂（无限循环，因为 0.1 = 1/10 分母含因子 5，不是 2 的幂）。`,
    tags: ["进制转换", "二进制"],
  },
  {
    id: "tcp-arithmetic-4",
    chapter: "tcp-arithmetic",
    level: 4,
    question: `机器 epsilon 的定义和双精度下的值是什么？`,
    answer: `机器 epsilon 是 1 与下一个可表示浮点数之间的差，衡量相对精度。双精度下 ε ≈ 2.22×10⁻¹⁶。`,
    tags: ["机器epsilon", "精度"],
  },
];
