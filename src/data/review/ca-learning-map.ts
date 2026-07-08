import type { ReviewQuestion } from "./types";

/** 深入浅出竞赛算法全书学习地图 复习题 */
export const caLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ca-learning-map-1",
    chapter: "ca-learning-map",
    level: 1,
    question: "全书分为哪四大板块？",
    answer: "竞赛基础（I/O、复杂度）、数据结构（线段树、并查集）、核心算法（贪心、DP、图论）、高级技巧（数学、字符串）。",
    tags: ["全书结构"],
  },
  {
    id: "ca-learning-map-2",
    chapter: "ca-learning-map",
    level: 2,
    question: "为什么数据结构在核心算法之前学习？",
    answer: "数据结构（线段树、并查集）是核心算法的实现基础。DP 和图算法常需要高效数据结构优化，如线段树优化 DP、并查集实现 Kruskal。",
    tags: ["学习路径"],
  },
  {
    id: "ca-learning-map-3",
    chapter: "ca-learning-map",
    level: 3,
    question: "一道区间更新+区间查询的题应该用哪个板块的知识？",
    answer: "数据结构板块的线段树。线段树支持 O(log n) 的区间更新（懒标记）和区间查询。",
    tags: ["线段树", "应用"],
  },
  {
    id: "ca-learning-map-4",
    chapter: "ca-learning-map",
    level: 4,
    question: "请阐述从竞赛基础到高级技巧的能力进阶路径。",
    answer: "四级：基础（复杂度分析+I/O）→数据结构（区间/连通操作工具）→核心算法（贪心/DP/图论三大范式）→高级技巧（数学/字符串攻坚）。每级引入新的解题维度。",
    tags: ["综合", "进阶路径"],
  },
];
