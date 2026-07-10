import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const dsaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dsa-learning-map-1",
    chapter: "dsa-learning-map",
    level: 1,
    question: `《数据结构与算法分析 C++描述》全书分为哪四大板块？`,
    answer: `基础、数据结构、散列与图、算法设计。四大板块：基础（复杂度分析）、数据结构（线性表与树）、散列与图（散列表/并查集/图算法）、算法设计（排序/动态规划）。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "dsa-learning-map-2",
    chapter: "dsa-learning-map",
    level: 2,
    question: `为什么说算法分析是全书的「基石」？`,
    answer: `后续每章都要用大O和均摊分析评估结构和算法效率。算法分析是评估工具：每章选择数据结构时都要用复杂度分析判断操作效率。不掌握分析就无法科学地选择结构。`,
    tags: ["算法分析", "基石"],
  },
  {
    id: "dsa-learning-map-3",
    chapter: "dsa-learning-map",
    level: 3,
    question: `本书与前两本书的关键区别是什么？`,
    answer: `C++实现与算法分析并重。本书用C++模板实现所有结构，同时用严格的数学分析量化每个操作的代价。实现是「怎么做」，分析是「为什么」。`,
    tags: ["C++实现", "算法分析"],
  },
  {
    id: "dsa-learning-map-4",
    chapter: "dsa-learning-map",
    level: 4,
    question: `动态数组的 push_back 采用倍增策略后，均摊时间复杂度是？`,
    answer: `O(1) 均摊。倍增扩容虽偶尔O(n)，但均摊到每次push_back是O(1)（等比数列求和/n=常数）。这是均摊分析的经典案例。`,
    tags: ["均摊分析", "push_back"],
  },
];
