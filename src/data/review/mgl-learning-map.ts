import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const mglLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mgl-learning-map-1",
    chapter: "mgl-learning-map",
    level: 1,
    question: `数学女孩系列全书分为哪四大板块？`,
    answer: `数学与编程、代数、离散数学、算法与ML。四大板块：数学与编程（数论）、代数世界（方程函数）、离散数学（组合图论概率）、算法与ML（算法设计与机器学习）。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "mgl-learning-map-2",
    chapter: "mgl-learning-map",
    level: 2,
    question: `四大板块之间的递进关系是什么？`,
    answer: `数学基础 → 代数工具 → 离散建模 → 算法应用。递进：数论奠基→代数提供工具→离散数学建模→算法与ML应用，后段依赖前段的数学基础。`,
    tags: ["递进关系", "全书结构"],
  },
  {
    id: "mgl-learning-map-3",
    chapter: "mgl-learning-map",
    level: 3,
    question: `为什么说数学是算法的理论基础？`,
    answer: `复杂度分析靠组合，图算法靠图论，ML靠线代和概率。算法效率分析依赖组合数学，图算法依赖图论，随机算法依赖概率论，机器学习依赖线性代数和概率论。`,
    tags: ["数学基础", "算法"],
  },
  {
    id: "mgl-learning-map-4",
    chapter: "mgl-learning-map",
    level: 4,
    question: `数论在编程中的典型应用是？`,
    answer: `密码学（如RSA）和哈希算法。数论是密码学（RSA依赖大数分解和模运算）和哈希算法的理论基础。`,
    tags: ["数论", "密码学"],
  },
];
