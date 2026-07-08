import type { ReviewQuestion } from "./types";

/** 算法（第4版）全书学习地图 复习题 */
export const al4LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "al4-learning-map-1",
    chapter: "al4-learning-map",
    level: 1,
    question: "全书分为哪四大板块？",
    answer: "基础（算法分析、栈/队列、Union-Find）、排序（选择/插入/归并/快排/堆排）、查找（BST/红黑树/散列表）、字符串与图。",
    tags: ["全书结构"],
  },
  {
    id: "al4-learning-map-2",
    chapter: "al4-learning-map",
    level: 2,
    question: "为什么排序在基础之后、查找之前？",
    answer: "排序依赖基础的分析工具，是经典算法范式的入门。查找需有序数据，符号表与排序紧密联系。排序是桥梁。",
    tags: ["学习路径"],
  },
  {
    id: "al4-learning-map-3",
    chapter: "al4-learning-map",
    level: 3,
    question: "给定需频繁查找的场景，用哪部分算法？",
    answer: "用查找板块的符号表。需范围查询用红黑树 O(log n)，只需精确匹配用散列表 O(1)。",
    tags: ["符号表", "应用"],
  },
  {
    id: "al4-learning-map-4",
    chapter: "al4-learning-map",
    level: 4,
    question: "请阐述从初级排序到字符串算法的能力进阶路径。",
    answer: "四级：初级排序（比较交换，O(n^2)）→高效排序（分治/随机化，O(n log n)）→查找结构（树/散列）→字符串算法（模式匹配/自动机）。每级引入新思想。",
    tags: ["综合", "进阶路径"],
  },
];
