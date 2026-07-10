import type { ReviewQuestion } from "./types";

/** 位操作基础：掩码与位运算 复习题 */
export const hdBitManipulationQuestions: ReviewQuestion[] = [
  {
    id: "hd-bit-manipulation-1",
    chapter: "hd-bit-manipulation",
    level: 1,
    question: `AND、OR、XOR 分别有什么用途？`,
    answer: `AND 用于选取特定位（掩码为1的位保留）。OR 用于设置特定位为1。XOR 用于翻转特定位（掩码为1的位翻转）。`,
    tags: ["基本运算"],
  },
  {
    id: "hd-bit-manipulation-2",
    chapter: "hd-bit-manipulation",
    level: 2,
    question: `XOR 有哪些重要性质？`,
    answer: `自反性 a^a=0，恒等性 a^0=a，可逆性 a^b^b=a，交换律 a^b=b^a，结合律 (a^b)^c=a^(b^c)。这些性质广泛用于加密、校验、去重。`,
    tags: ["XOR"],
  },
  {
    id: "hd-bit-manipulation-3",
    chapter: "hd-bit-manipulation",
    level: 3,
    question: `Brian Kernighan 法数 1 的个数为什么快？`,
    answer: `x&(x-1) 消除最低位的 1，循环次数等于 1 的个数。如果只有 3 个 1，只需 3 次循环而非逐位统计的 32 次。`,
    tags: ["popcount", "Brian Kernighan"],
  },
  {
    id: "hd-bit-manipulation-4",
    chapter: "hd-bit-manipulation",
    level: 4,
    question: `如何判断一个数是否是 2 的幂？`,
    answer: `x && !(x & (x-1))。2 的幂只有一个 1，x-1 会使该位变 0 低位全变 1，所以 x&(x-1)=0。加 x 排除 0 的情况。`,
    tags: ["2的幂", "应用"],
  },
];
