import type { ReviewQuestion } from "./types";

/** 0 的故事与二进制 复习题 */
export const pm0And1Questions: ReviewQuestion[] = [
  {
    id: "pm-0-and-1-1",
    chapter: "pm-0-and-1",
    level: 1,
    question: "0 在数学中的三重含义是什么？",
    answer: "1) 数量的「没有」；2) 数轴的原点（正负数对称中心）；3) 位值制的占位符（区分 12 和 102 的关键）。第三重含义对记数法最重要。",
    tags: ["零", "含义"],
  },
  {
    id: "pm-0-and-1-2",
    chapter: "pm-0-and-1",
    level: 2,
    question: "十进制 13 的二进制表示是什么？",
    answer: "1101。13 = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8+4+0+1 = 13。",
    tags: ["二进制", "转换"],
  },
  {
    id: "pm-0-and-1-3",
    chapter: "pm-0-and-1",
    level: 3,
    question: "布尔代数的四个基本运算是什么？",
    answer: "与（AND，两者为真才真）、或（OR，一者为真即真）、非（NOT，取反）、异或（XOR，不同为真）。对应位运算 &、|、~、^。",
    tags: ["布尔代数", "运算"],
  },
  {
    id: "pm-0-and-1-4",
    chapter: "pm-0-and-1",
    level: 4,
    question: "为什么计算机使用二进制而非十进制？",
    answer: "物理实现简单可靠：电子元件最易区分两种状态（高低电压），抗干扰强。十进制需要 10 种状态，电路复杂且易误判。布尔代数为二进制提供了完整数学基础。",
    tags: ["二进制", "物理基础"],
  },
];
