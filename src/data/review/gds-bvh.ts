import type { ReviewQuestion } from "./types";

/** BVH：层次包围盒与 SAH 构建 复习题 */
export const gdsBvhQuestions: ReviewQuestion[] = [
  {
    id: "gds-bvh-1",
    chapter: "gds-bvh",
    level: 1,
    question: "BVH 的基本结构是什么？",
    answer: "每个内部节点的 AABB 包含所有子节点 AABB，叶节点存少量三角形。射线从根遍历，测 AABB 剪枝，O(log n) 节点访问。",
    tags: ["结构"],
  },
  {
    id: "gds-bvh-2",
    chapter: "gds-bvh",
    level: 2,
    question: "SAH 的原理是什么？",
    answer: "射线命中 AABB 概率正比于表面积。代价 C=C_trav+(SA_L/SA_P)·N_L·C_isect+(SA_R/SA_P)·N_R·C_isect。构建时选代价最小的分裂位置，优于中位数分裂。",
    tags: ["SAH"],
  },
  {
    id: "gds-bvh-3",
    chapter: "gds-bvh",
    level: 3,
    question: "BVH 射线遍历的剪枝策略是什么？",
    answer: "前向排序：近子树先访问。维护 t_best=当前最近交点距离。远子树 AABB 最近距离≥t_best 时跳过。把最坏 O(n) 降为 O(log n)。",
    tags: ["遍历", "剪枝"],
  },
  {
    id: "gds-bvh-4",
    chapter: "gds-bvh",
    level: 4,
    question: "对比 BVH 和 KD-Tree 的优劣。",
    answer: "BVH：对象分割、AABB 可重叠、构建快、动态更新友好（refit+选择性rebuild）、GPU 友好（紧凑节点）。KD-Tree：空间分割、无重叠、查询略快（无空 AABB 测试）、但构建慢、动态困难、GPU 实现复杂。现代光线追踪首选 BVH。",
    tags: ["对比"],
  },
];
