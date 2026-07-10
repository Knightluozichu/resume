import type { ReviewQuestion } from "./types";

/** 特征值与特征向量 复习题 */
export const ladEigenvaluesQuestions: ReviewQuestion[] = [
  {
    id: "lad-eigenvalues-1",
    chapter: "lad-eigenvalues",
    level: 1,
    question: `特征值的等价定义是什么？`,
    answer: `λ 是特征值当且仅当 T-λI 不可逆（null(T-λI)≠{0}），即存在非零 v 使 Tv=λv。`,
    tags: ["定义"],
  },
  {
    id: "lad-eigenvalues-2",
    chapter: "lad-eigenvalues",
    level: 2,
    question: `代数重数与几何重数的关系？`,
    answer: `几何重数 ≤ 代数重数。严格小于时该特征值缺特征向量，算子不可对角化。`,
    tags: ["重数"],
  },
  {
    id: "lad-eigenvalues-3",
    chapter: "lad-eigenvalues",
    level: 3,
    question: `3×3 矩阵有三个不同特征值，可对角化吗？`,
    answer: `可以。不同特征值对应特征向量线性无关，三个凑成三维空间的基，故可对角化。`,
    tags: ["可对角化"],
  },
  {
    id: "lad-eigenvalues-4",
    chapter: "lad-eigenvalues",
    level: 4,
    question: `为什么复数域上每个算子都有特征值？`,
    answer: `复数域上特征多项式 p(z)=det(T-zI) 是非常数多项式，由代数基本定理必有根，根即特征值。实数域多项式可能无实根（如旋转），故无保证。`,
    tags: ["证明", "复数域"],
  },
];
