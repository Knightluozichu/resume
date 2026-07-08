import type { ReviewQuestion } from "./types";

/** Voronoi 图：空间分割与对偶性 复习题 */
export const gdsVoronoiQuestions: ReviewQuestion[] = [
  {
    id: "gds-voronoi-1",
    chapter: "gds-voronoi",
    level: 1,
    question: "Voronoi 图的定义是什么？",
    answer: "每个站点 p_i 的区域 V(p_i) 包含所有离 p_i 最近的点。边界是两站点中垂线段，顶点是三站点外接圆心。",
    tags: ["定义"],
  },
  {
    id: "gds-voronoi-2",
    chapter: "gds-voronoi",
    level: 2,
    question: "Voronoi 和 Delaunay 的对偶关系是什么？",
    answer: "Voronoi 顶点↔Delaunay 三角形外心，边↔边，区域↔星形。从 Delaunay 可推导 Voronoi，反之亦然。",
    tags: ["对偶"],
  },
  {
    id: "gds-voronoi-3",
    chapter: "gds-voronoi",
    level: 3,
    question: "Fortune 扫描线算法的原理和复杂度？",
    answer: "扫描线从上到下扫过站点，海滩线（抛物线弧）跟踪 Voronoi 边界。站点事件插入弧段，圆事件删除弧段产生顶点。优先队列管理事件，O(n log n) 最优。",
    tags: ["Fortune"],
  },
  {
    id: "gds-voronoi-4",
    chapter: "gds-voronoi",
    level: 4,
    question: "Voronoi 图有哪些典型应用？",
    answer: "最近邻查询（定位 O(log n)）、设施选址（最大空圆=最大 Voronoi 顶点）、生物学建模（细胞/竞争区）、路径规划（Voronoi 路径最大化与障碍距离）。",
    tags: ["应用"],
  },
];
