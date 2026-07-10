import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const dsvLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dsv-learning-map-1",
    chapter: "dsv-learning-map",
    level: 1,
    question: `《大话数据结构》全书分为哪四大板块？`,
    answer: `入门、线性、树、算法。全书分为入门（概念与复杂度）、线性结构（数组链表栈队列）、树结构（树堆图）、算法应用（排序查找复习）四大板块。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "dsv-learning-map-2",
    chapter: "dsv-learning-map",
    level: 2,
    question: `四大板块之间的递进关系是什么？`,
    answer: `数据怎么存 → 结构怎么变 → 数据怎么处理。递进关系是「数据怎么存 → 结构怎么变 → 数据怎么处理」，后段依赖前段的理解。`,
    tags: ["递进关系", "全书结构"],
  },
  {
    id: "dsv-learning-map-3",
    chapter: "dsv-learning-map",
    level: 3,
    question: `为什么说「没有最好的数据结构，只有最适合场景的数据结构」？`,
    answer: `每种结构都有取舍，选择取决于操作频率与场景。每种数据结构都有擅长与不擅长的操作，选择取决于具体场景中哪些操作是高频的。`,
    tags: ["选型原则", "核心思想"],
  },
  {
    id: "dsv-learning-map-4",
    chapter: "dsv-learning-map",
    level: 4,
    question: `学习全书时，哪一步是后续所有章节的分析工具？`,
    answer: `算法复杂度（大 O 表示法）。入门板块的算法复杂度（大 O 表示法）是后续每一章分析操作效率时的通用度量工具。`,
    tags: ["复杂度", "分析工具"],
  },
];
