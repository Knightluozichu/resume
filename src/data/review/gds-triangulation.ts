import type { ReviewQuestion } from "./types";

/** 三角剖分：Delaunay 与约束 复习题 */
export const gdsTriangulationQuestions: ReviewQuestion[] = [
  {
    id: "gds-triangulation-1",
    chapter: "gds-triangulation",
    level: 1,
    question: "什么是 Delaunay 三角剖分的空圆性质？",
    answer: "每个三角形的外接圆内不包含任何其他点。这保证了最大化最小角，避免瘦长三角形。",
    tags: ["Delaunay"],
  },
  {
    id: "gds-triangulation-2",
    chapter: "gds-triangulation",
    level: 2,
    question: "Bowyer-Watson 算法的流程是什么？",
    answer: "1.创建超大初始三角形；2.逐点插入：找外接圆包含该点的坏三角形，删除形成空腔，连接新点到空腔边界；3.移除初始三角形相关边。复杂度 O(n²) 朴素，O(n log n) 用空间索引优化。",
    tags: ["算法"],
  },
  {
    id: "gds-triangulation-3",
    chapter: "gds-triangulation",
    level: 3,
    question: "Delaunay 和 Voronoi 的对偶关系是什么？",
    answer: "Delaunay 三角形的外心=Voronoi 顶点；Delaunay 边↔Voronoi 边；Delaunay 星形↔Voronoi 区域。两者可互相推导，从任一结构可构造另一个。",
    tags: ["对偶"],
  },
  {
    id: "gds-triangulation-4",
    chapter: "gds-triangulation",
    level: 4,
    question: "什么是约束三角剖分（CDT）？何时使用？",
    answer: "CDT 强制保留指定边（约束边），只对非约束边保持 Delaunay 性质。标准 Delaunay 可能不保留指定边（如山脊线、道路）。CDT 用于需要保留特定线段的场景：地形建模、道路网络、建筑轮廓、有限元网格。",
    tags: ["CDT"],
  },
];
