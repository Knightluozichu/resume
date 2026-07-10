import type { ReviewQuestion } from "./types";

/** 四叉树与八叉树：自适应空间分割 复习题 */
export const gdsQuadtreesQuestions: ReviewQuestion[] = [
  {
    id: "gds-quadtrees-1",
    chapter: "gds-quadtrees",
    level: 1,
    question: `四叉树的基本结构是什么？`,
    answer: `每个内部节点分 4 个象限（NE/NW/SE/SW），叶节点存少量对象（如 ≤4），超阈值则分裂。八叉树是 3D 推广，每节点分 8 卦限。`,
    tags: ["结构"],
  },
  {
    id: "gds-quadtrees-2",
    chapter: "gds-quadtrees",
    level: 2,
    question: `四叉树范围查询的流程和复杂度？`,
    answer: `从根递归进入与查询矩形相交的子节点，收集叶节点中的对象。平均 O(log n + k)，最坏 O(n)（树退化时）。`,
    tags: ["查询"],
  },
  {
    id: "gds-quadtrees-3",
    chapter: "gds-quadtrees",
    level: 3,
    question: `四叉树在什么情况下退化？如何解决？`,
    answer: `所有点集中在同一位置或一条线时，反复细分同一象限导致深度爆炸。解决：设最大深度限制、用松散四叉树、或改用 BVH（对象分割不受空间退化影响）。`,
    tags: ["退化"],
  },
  {
    id: "gds-quadtrees-4",
    chapter: "gds-quadtrees",
    level: 4,
    question: `对比四叉树和均匀网格的优劣。`,
    answer: `网格：O(1) 定位 + O(k) 遍历，简单快速，但密度不均时退化（空格子浪费内存、密格子性能差）。四叉树：自适应密度（密区域更深），但树遍历有常数开销、缓存局部性差。均匀数据选网格，非均匀选四叉树。`,
    tags: ["对比"],
  },
];
