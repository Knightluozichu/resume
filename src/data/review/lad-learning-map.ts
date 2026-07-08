import type { ReviewQuestion } from "./types";

/** 线性代数应该这样学全书学习地图 复习题 */
export const ladLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "lad-learning-map-1",
    chapter: "lad-learning-map",
    level: 1,
    question: "全书四大板块的顺序是什么？",
    answer: "向量空间 → 线性映射 → 特征值与内积 → 高级主题（行列式/迹、复化、总复习）。",
    tags: ["全书结构"],
  },
  {
    id: "lad-learning-map-2",
    chapter: "lad-learning-map",
    level: 2,
    question: "为什么 Axler 把行列式放到最后？",
    answer: "行列式先行会掩盖算子结构。先讲算子与不变子空间，可对角化靠特征向量凑基判断，几何更清晰；det 只是特征值之积，作为全局量末尾汇总即可。",
    tags: ["Axler哲学"],
  },
  {
    id: "lad-learning-map-3",
    chapter: "lad-learning-map",
    level: 3,
    question: "给定一个线性映射，如何不提行列式判断它是否可逆？",
    answer: "看核与像：T 可逆当且仅当 null T = {0}（单射）且 range T = W（满射）。有限维等维空间中，null T = {0} 即可推出可逆，无需算 det。",
    tags: ["可逆", "核与像"],
  },
  {
    id: "lad-learning-map-4",
    chapter: "lad-learning-map",
    level: 4,
    question: "请用一条主线串联全书，并说明谱定理的位置。",
    answer: "空间→映射（秩-零度）→矩阵（相似）→特征值（不变子空间）→内积（正交投影）→谱定理（正规算子正交对角化）→行列式/迹/复化收尾。谱定理是几何部分的高潮，把算子结构与内积几何合二为一。",
    tags: ["综合", "谱定理"],
  },
];
