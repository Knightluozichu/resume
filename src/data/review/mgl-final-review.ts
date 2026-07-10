import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const mglFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "mgl-final-review-1",
    chapter: "mgl-final-review",
    level: 1,
    question: `全书的核心思想是什么？`,
    answer: `数学是算法的理论基础，数学驱动计算。全书核心：数学驱动计算。数论驱动密码学，线性代数驱动ML，概率驱动随机算法，组合驱动复杂度分析。`,
    tags: ["核心思想", "数学驱动计算"],
  },
  {
    id: "mgl-final-review-2",
    chapter: "mgl-final-review",
    level: 2,
    question: `数学与编程的对应关系中，函数复合 f∘g 对应编程中的什么？`,
    answer: `函数组合/链式调用。数学函数复合 f(g(x)) 对应编程中的函数组合/管道操作。逆函数对应反操作/解码。这是函数式编程的数学基础。`,
    tags: ["函数复合", "函数式编程"],
  },
  {
    id: "mgl-final-review-3",
    chapter: "mgl-final-review",
    level: 3,
    question: `以下哪个案例同时用到了多个数学分支？`,
    answer: `神经网络训练（线性代数+微积分+概率）。神经网络训练同时用到线性代数（矩阵乘法）、微积分（链式法则求梯度）、概率论（损失函数、随机梯度）。数学各分支在计算中综合应用。`,
    tags: ["综合应用", "神经网络"],
  },
  {
    id: "mgl-final-review-4",
    chapter: "mgl-final-review",
    level: 4,
    question: `全书四大板块的递进关系是？`,
    answer: `数论→代数→离散数学→算法与ML。递进：数论（质数/模运算）→代数（方程/函数）→离散数学（组合/图论/概率）→算法与ML（分治/贪心/DP/梯度下降）。`,
    tags: ["递进关系", "全书结构"],
  },
];
