import type { ReviewQuestion } from "./types";

/** GF(2) 域上的运算 复习题 */
export const tcpGf2Questions: ReviewQuestion[] = [
  {
    id: "tcp-gf2-1",
    chapter: "tcp-gf2",
    level: 1,
    question: "GF(2) 中 1+1 等于什么？为什么？",
    answer: "等于 0。GF(2) 是模 2 的整数环，1+1 = 2 mod 2 = 0。这意味着 1 = -1，加法等于减法，等同于异或运算。",
    tags: ["GF(2)", "加法"],
  },
  {
    id: "tcp-gf2-2",
    chapter: "tcp-gf2",
    level: 2,
    question: "GF(2) 多项式的加法和普通多项式加法有什么区别？",
    answer: "GF(2) 多项式加法系数模 2（异或），不进位。例如 (x²+x+1) + (x²+1) = x（x² 项 1+1=0 消去）。普通多项式加法系数是实数，1+1=2。",
    tags: ["GF(2)", "多项式"],
  },
  {
    id: "tcp-gf2-3",
    chapter: "tcp-gf2",
    level: 3,
    question: "CRC 校验的基本原理是什么？",
    answer: "把数据看作 GF(2) 多项式，补零后除以生成多项式 G(x)，余数作为校验码附在数据后。接收方用 G(x) 除收到的数据，余数为 0 则无错误。",
    tags: ["CRC", "校验"],
  },
  {
    id: "tcp-gf2-4",
    chapter: "tcp-gf2",
    level: 4,
    question: "CRC 能纠正错误吗？为什么？",
    answer: "不能。CRC 只检测错误——通过余数是否为 0 判断有无错误，但不定位错误位置。纠错需要 Reed-Solomon、BCH 等更强的编码。",
    tags: ["CRC", "纠错"],
  },
];
