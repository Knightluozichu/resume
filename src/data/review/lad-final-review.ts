import type { ReviewQuestion } from "./types";

/** 线性代数应该这样学总复习 复习题 */
export const ladFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "lad-final-review-1",
    chapter: "lad-final-review",
    level: 1,
    question: `全书主线是什么？`,
    answer: `算子中心论：空间→映射→矩阵→特征值→内积→谱定理→行列式/迹/复化，结构先行计算收尾。`,
    tags: ["主线"],
  },
  {
    id: "lad-final-review-2",
    chapter: "lad-final-review",
    level: 2,
    question: `三大支柱分别是什么？`,
    answer: `秩-零度定理(维数守恒)、谱定理(正交对角化)、行列式与迹(特征值积与和)。`,
    tags: ["三大支柱"],
  },
  {
    id: "lad-final-review-3",
    chapter: "lad-final-review",
    level: 3,
    question: `如何不提行列式地刻画一个算子？`,
    answer: `先求核与像套秩-零度，再求特征结构判可对角化，内积空间看是否正规/自伴用谱定理，最后才用 det/trace 汇总。结构先行。`,
    tags: ["算子分析"],
  },
  {
    id: "lad-final-review-4",
    chapter: "lad-final-review",
    level: 4,
    question: `为什么说谱定理是全书高潮？`,
    answer: `它把算子结构(特征值/不变子空间)与内积几何(正交)合二为一：正规/自伴算子存在正交特征基，映射在正交方向各自独立缩放。这是 SVD、主成分分析的根基，也是结构先行走到的顶点。`,
    tags: ["综合", "谱定理"],
  },
];
