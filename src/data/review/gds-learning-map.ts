import type { ReviewQuestion } from "./types";

/** 几何体数据结构全书学习地图 复习题 */
export const gdsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gds-learning-map-1",
    chapter: "gds-learning-map",
    level: 1,
    question: "全书四大板块是什么？",
    answer: "基础（图元与空间关系）、数据结构（四叉树与 BVH）、算法（三角剖分/Voronoi/空间索引）、应用（碰撞检测与光线追踪）。",
    tags: ["全书结构"],
  },
  {
    id: "gds-learning-map-2",
    chapter: "gds-learning-map",
    level: 2,
    question: "为什么需要空间数据结构？",
    answer: "暴力遍历 O(n) 在大规模场景（10万+三角形）时性能崩溃。空间结构通过分割/层次化把查询降为 O(log n)，是生产环境的必需品。",
    tags: ["动机"],
  },
  {
    id: "gds-learning-map-3",
    chapter: "gds-learning-map",
    level: 3,
    question: "如何根据场景选择空间结构？",
    answer: "均匀数据→网格/哈希；非均匀→四叉树/八叉树；射线查询→BVH(SAH)；范围查询→R-Tree；动态更新频繁→空间哈希/动态BVH。关键是匹配查询类型和数据分布。",
    tags: ["结构选择"],
  },
  {
    id: "gds-learning-map-4",
    chapter: "gds-learning-map",
    level: 4,
    question: "对比 BVH 和 KD-Tree 在光线追踪中的优劣。",
    answer: "BVH：对象分割，构建快，动态更新友好，GPU 友好（紧凑节点），现代 RTX 首选。KD-Tree：空间分割，查询略快（无空 AABB 测试），但构建慢、不适合动态场景、GPU 实现复杂。实际中 BVH 的灵活性和 GPU 友好性使其成为主流。",
    tags: ["对比", "BVH"],
  },
];
