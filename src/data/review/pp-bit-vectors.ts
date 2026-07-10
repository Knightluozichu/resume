import type { ReviewQuestion } from "./types";

/** 位向量与位运算 复习题 */
export const ppBitVectorsQuestions: ReviewQuestion[] = [
  {
    id: "pp-bit-vectors-1",
    chapter: "pp-bit-vectors",
    level: 1,
    question: `位向量如何设置、清除、测试第i位？`,
    answer: `设置: bits[i/32]|=1<<(i%32)。清除: bits[i/32]&=~(1<<(i%32))。测试: (bits[i/32]&(1<<(i%32)))!=0。`,
    tags: ["位向量", "位运算"],
  },
  {
    id: "pp-bit-vectors-2",
    chapter: "pp-bit-vectors",
    level: 2,
    question: `位向量排序的复杂度？`,
    answer: `时间O(n+N)，空间O(N/8)字节。N为值域大小。当N与n同阶时优于O(n log n)比较排序。`,
    tags: ["位向量排序"],
  },
  {
    id: "pp-bit-vectors-3",
    chapter: "pp-bit-vectors",
    level: 3,
    question: `位向量排序适用于什么场景？限制？`,
    answer: `适用：非负整数、范围已知、无重复。限制：只支持整数、值域不能太大、需O(N)扫描。`,
    tags: ["位向量排序", "适用场景"],
  },
  {
    id: "pp-bit-vectors-4",
    chapter: "pp-bit-vectors",
    level: 4,
    question: `阐述位向量在电话号码案例中的应用及体现的编程思想。`,
    answer: `1000万7位号码用10^7 bit=1.25MB位向量，设置bit自动去重，扫描输出自动有序。体现：正确定义问题（去重非排序）、利用数据特征（稠密整数）、空间换设计（位级表示）、换角度思考（非比较模型）。`,
    tags: ["综合", "位向量", "编程思想"],
  },
];
