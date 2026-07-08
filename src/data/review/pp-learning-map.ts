import type { ReviewQuestion } from "./types";

/** 编程珠玑全书学习地图 复习题 */
export const ppLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "pp-learning-map-1",
    chapter: "pp-learning-map",
    level: 1,
    question: "全书分为哪四大板块？",
    answer: "基础思维（问题定义、拆解）、算法优化（二分搜索、位向量）、程序设计（设计原则、代码调优、粗略估算）、专题文章（视角、尾声、总复习）。",
    tags: ["全书结构"],
  },
  {
    id: "pp-learning-map-2",
    chapter: "pp-learning-map",
    level: 2,
    question: "为什么编程珠玑把问题定义放在第一章？",
    answer: "大多数编程失败不是编码错误而是问题理解错误。正确定义问题（输入/输出/约束）是所有后续工作的前提。",
    tags: ["问题定义", "方法论"],
  },
  {
    id: "pp-learning-map-3",
    chapter: "pp-learning-map",
    level: 3,
    question: "给定找出10亿整数中缺失整数的问题，如何用编程珠玑思维解决？",
    answer: "先定义问题：10亿32位整数找一个缺失的，内存有限。位向量方案：10亿bit=125MB。更优方案：分治按高位分成两半，缺失的在那半数量少，递归缩小，O(n)时间O(1)额外空间。",
    tags: ["问题分析", "位向量"],
  },
  {
    id: "pp-learning-map-4",
    chapter: "pp-learning-map",
    level: 4,
    question: "编程珠玑与常规算法教材在方法论上的根本区别是什么？",
    answer: "算法教材从算法本身出发讲原理和复杂度。编程珠玑从真实问题出发讲如何分析和选择方案。前者给工具箱，后者给思维方式。先读教材学工具，再读珠玑学怎么用。",
    tags: ["综合", "方法论对比"],
  },
];
