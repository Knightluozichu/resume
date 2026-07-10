import type { ReviewQuestion } from "./types";

/** 尾声 复习题 */
export const ppEpilogQuestions: ReviewQuestion[] = [
  {
    id: "pp-epilog-1",
    chapter: "pp-epilog",
    level: 1,
    question: `Bentley编程哲学的核心是什么？`,
    answer: `在写代码之前先想清楚。问题理解优先于编码，正确性优先于效率，思考优先于行动。`,
    tags: ["编程哲学"],
  },
  {
    id: "pp-epilog-2",
    chapter: "pp-epilog",
    level: 2,
    question: `编程的三个层次是什么？`,
    answer: `正确（代码做对的事）→高效（用最少资源做对的事）→优雅（简洁可读可维护）。大多数停留在第一层，卓越者追求第三层。`,
    tags: ["三个层次"],
  },
  {
    id: "pp-epilog-3",
    chapter: "pp-epilog",
    level: 3,
    question: `为什么说编程的核心是思考而非打字？`,
    answer: `Bentley全书证明90%问题在思考阶段能解决。花1小时思考省1天调试。正确定义问题暴露最优方案，正确选择算法避免返工。`,
    tags: ["思考", "编程哲学"],
  },
  {
    id: "pp-epilog-4",
    chapter: "pp-epilog",
    level: 4,
    question: `请总结编程珠玑全书的核心智慧，并说明如何应用到日常编程中。`,
    answer: `核心智慧：1）问题定义优先——先理解再动手，正确定义问题已解决一半。2）正确性优先——简单算法的正确性验证比复杂优化更重要（二分搜索案例）。3）换角度思考——从不同维度看问题可能找到更优方案（位向量案例）。4）设计哲学——正确→简洁→效率，顺序不可颠倒。5）粗略估算——用数量级判断可行性，快速淘汰不可行方案。6）持续学习——编程是不断思考和改进的过程。\n\n日常应用：每次写代码前先花10分钟思考问题定义和方案选择；写完先用简单测试验证正确性再优化；遇到瓶颈先profile再优化；定期阅读优秀代码提升审美。`,
    tags: ["综合", "全书总结", "编程智慧"],
  },
];
