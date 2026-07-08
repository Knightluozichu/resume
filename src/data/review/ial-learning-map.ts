import type { ReviewQuestion } from "./types";

/** 算法导论全书学习地图 复习题 */
export const ialLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ial-learning-map-1",
    chapter: "ial-learning-map",
    level: 1,
    question: "CLRS 全书分为哪四大板块？",
    answer: "基础（渐近分析、递归）、排序与查找（堆排、快排、线性排序、中位数）、数据结构（栈/队列/链表、散列表、BST/红黑树）、高级算法（图算法、DP）。",
    tags: ["全书结构"],
  },
  {
    id: "ial-learning-map-2",
    chapter: "ial-learning-map",
    level: 2,
    question: "CLRS 与其他算法教材的核心区别是什么？",
    answer: "CLRS 强调严密性：每个算法都有正确性证明（循环不变式）和完整复杂度分析（渐近记号）。不只教算法，更教算法为什么对、为什么快。",
    tags: ["方法论"],
  },
  {
    id: "ial-learning-map-3",
    chapter: "ial-learning-map",
    level: 3,
    question: "给定需要频繁查找的场景，用哪部分知识？",
    answer: "数据结构板块的散列表（期望 O(1) 查找）或红黑树（最坏 O(log n) 查找）。需有序遍历用红黑树，只需精确匹配用散列表。",
    tags: ["应用"],
  },
  {
    id: "ial-learning-map-4",
    chapter: "ial-learning-map",
    level: 4,
    question: "请阐述 CLRS 的学习路径和各板块的关系。",
    answer: "基础提供数学语言（渐近分析+递归）→排序是分治范式入门→数据结构是后续算法的基础设施→高级算法综合运用前三者。递进关系，前者是后者的工具。",
    tags: ["综合", "进阶路径"],
  },
];
