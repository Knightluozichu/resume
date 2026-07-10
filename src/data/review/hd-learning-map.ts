import type { ReviewQuestion } from "./types";

/** 算法心得全书学习地图 复习题 */
export const hdLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "hd-learning-map-1",
    chapter: "hd-learning-map",
    level: 1,
    question: `全书分为哪四大板块？`,
    answer: `位操作基础（基本位运算、掩码）、算术技巧（无分支、位运算加减除）、高级技巧（快速幂、非常规进位制、浮点数）、实际应用（CRC、哈希搜索）。`,
    tags: ["全书结构"],
  },
  {
    id: "hd-learning-map-2",
    chapter: "hd-learning-map",
    level: 2,
    question: `Hacker's Delight 与普通算法教材的区别？`,
    answer: `普通教材关注数据结构和算法设计，Hacker's Delight 关注如何用位运算榨取每个 bit 的性能。教用数学等价替代昂贵操作（除法→移位、分支→位运算），适合 GPU/嵌入式等资源受限场景。`,
    tags: ["方法论"],
  },
  {
    id: "hd-learning-map-3",
    chapter: "hd-learning-map",
    level: 3,
    question: `CPU 上除法和位运算的周期差是多少？`,
    answer: `除法 20-40 周期，乘法 3-5 周期，位运算 1 周期。所以用乘法替代除法可快 4-8 倍，用移位替代除以2的幂可快 20-40 倍。`,
    tags: ["性能", "硬件"],
  },
  {
    id: "hd-learning-map-4",
    chapter: "hd-learning-map",
    level: 4,
    question: `请阐述位运算优化的核心原则。`,
    answer: `1.在性能关键路径上优化；2.理解硬件成本（除法贵、位运算便宜）；3.用数学等价替代（补码、XOR性质）；4.非关键路径保持可读性。先测量再优化，不盲目使用。`,
    tags: ["核心原则", "综合"],
  },
];
