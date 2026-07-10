import type { ReviewQuestion } from "./types";

/** 矩阵表示与基变更 复习题 */
export const ladMatricesQuestions: ReviewQuestion[] = [
  {
    id: "lad-matrices-1",
    chapter: "lad-matrices",
    level: 1,
    question: `矩阵第 j 列代表什么？`,
    answer: `T(v_j) 在 W 基下的坐标，其中 v_j 是 V 的第 j 个基向量。`,
    tags: ["矩阵表示"],
  },
  {
    id: "lad-matrices-2",
    chapter: "lad-matrices",
    level: 2,
    question: `矩阵乘法对应什么？`,
    answer: `映射复合。M(ST)=M(S)M(T)，复合映射的矩阵等于各映射矩阵的乘积。`,
    tags: ["复合"],
  },
  {
    id: "lad-matrices-3",
    chapter: "lad-matrices",
    level: 3,
    question: `写出基变更公式。`,
    answer: `M'(T)=P⁻¹MP，其中 P 是新基在旧基下的换基矩阵。这就是相似关系。`,
    tags: ["基变更"],
  },
  {
    id: "lad-matrices-4",
    chapter: "lad-matrices",
    level: 4,
    question: `证明相似矩阵特征值相同。`,
    answer: `B=P⁻¹AP ⇒ B-λI=P⁻¹(A-λI)P，行列式 det(B-λI)=det(P⁻¹)det(A-λI)det(P)=det(A-λI)，特征多项式相同，故特征值相同。`,
    tags: ["证明", "相似"],
  },
];
