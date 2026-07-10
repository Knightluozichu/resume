import type { ReviewQuestion } from "./types";

/** 空间索引：网格、哈希与 R-Tree 复习题 */
export const gdsSpatialIndexingQuestions: ReviewQuestion[] = [
  {
    id: "gds-spatial-indexing-1",
    chapter: "gds-spatial-indexing",
    level: 1,
    question: `均匀网格的优缺点是什么？`,
    answer: `优点：简单、O(1) 定位格子 + O(k) 遍历。缺点：密度不均时退化（密格子变链表）、稀疏场景内存浪费。`,
    tags: ["网格"],
  },
  {
    id: "gds-spatial-indexing-2",
    chapter: "gds-spatial-indexing",
    level: 2,
    question: `空间哈希为什么适合游戏引擎？`,
    answer: `插入/删除 O(1)，每帧全量更新 O(n)。稀疏场景内存高效（只有非空格子有桶）。实现简单、缓存友好。R-Tree/BVH 每帧更新成本高。`,
    tags: ["空间哈希"],
  },
  {
    id: "gds-spatial-indexing-3",
    chapter: "gds-spatial-indexing",
    level: 3,
    question: `R-Tree 的结构和查询流程是什么？`,
    answer: `层次 MBR：节点存多个 MBR 条目，叶节点 MBR 包含实际对象。范围查询从根递归进入与查询矩形相交的 MBR 子节点。O(log n + k)。`,
    tags: ["R-Tree"],
  },
  {
    id: "gds-spatial-indexing-4",
    chapter: "gds-spatial-indexing",
    level: 4,
    question: `如何根据场景选择空间索引？`,
    answer: `均匀分布+精确查询→网格 O(1)；稀疏+动态→空间哈希 O(1)；射线查询→BVH(SAH) O(log n)；范围查询→R-Tree O(log n+k)；最近邻→KD-Tree O(log n)；2D自适应→四叉树。关键是匹配查询类型和数据分布。`,
    tags: ["选择"],
  },
];
