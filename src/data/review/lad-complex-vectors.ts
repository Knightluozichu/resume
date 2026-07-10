import type { ReviewQuestion } from "./types";

/** 复向量空间与算子 复习题 */
export const ladComplexVectorsQuestions: ReviewQuestion[] = [
  {
    id: "lad-complex-vectors-1",
    chapter: "lad-complex-vectors",
    level: 1,
    question: `什么是复化 V_C？`,
    answer: `V_C=V+iV，元素 u+iv，把实空间扩张为复空间，实算子扩张为对复标量线性的 T_C。`,
    tags: ["复化"],
  },
  {
    id: "lad-complex-vectors-2",
    chapter: "lad-complex-vectors",
    level: 2,
    question: `实算子复化后特征值有什么规律？`,
    answer: `成共轭对出现。实系数特征多项式的非实根成 λ,λ̄ 对，特征向量也共轭。`,
    tags: ["共轭对"],
  },
  {
    id: "lad-complex-vectors-3",
    chapter: "lad-complex-vectors",
    level: 3,
    question: `90° 旋转矩阵复化后的特征值？`,
    answer: `λ=±i，成共轭对。实空间无实特征值，复化补齐缺口。`,
    tags: ["旋转"],
  },
  {
    id: "lad-complex-vectors-4",
    chapter: "lad-complex-vectors",
    level: 4,
    question: `用复化解释实谱定理只需自伴。`,
    answer: `T 自伴⇒T_C 自伴(正规)⇒复谱定理给正交特征基；自伴特征值 λ=⟨Tv,v⟩∈R 为实，特征向量可取实回流到 V 得实正交基。实正规(如旋转)特征值非实不能回流，故实谱定理需更强前提自伴。`,
    tags: ["证明", "实谱定理"],
  },
];
