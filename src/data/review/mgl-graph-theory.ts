import type { ReviewQuestion } from "./types";

/** 图论 复习题 */
export const mglGraphTheoryQuestions: ReviewQuestion[] = [
  {
    id: "mgl-graph-theory-1",
    chapter: "mgl-graph-theory",
    level: 1,
    question: "欧拉路径存在的条件是？",
    answer: "图连通且奇度顶点数为 0 或 2。欧拉路径（过每边一次）：图连通 + 奇度顶点 0 个（回路）或 2 个（路径）。哥尼斯堡 4 个奇度顶点故不存在。",
    tags: ["欧拉路径", "奇度顶点"],
  },
  {
    id: "mgl-graph-theory-2",
    chapter: "mgl-graph-theory",
    level: 2,
    question: "哈密顿回路的判定是什么复杂度问题？",
    answer: "NP 完全。哈密顿回路判定（过每点一次）是 NP 完全问题，无已知多项式算法。TSP 是其优化版本，NP 困难。",
    tags: ["哈密顿回路", "NP完全"],
  },
  {
    id: "mgl-graph-theory-3",
    chapter: "mgl-graph-theory",
    level: 3,
    question: "n 个顶点的树有多少条边？",
    answer: "n - 1。树是连通无环图，n 个顶点恰好 n-1 条边。每加一个顶点恰好一条边连接（连通+无环）。",
    tags: ["树", "边数"],
  },
  {
    id: "mgl-graph-theory-4",
    chapter: "mgl-graph-theory",
    level: 4,
    question: "欧拉路径和哈密顿回路的区别是？",
    answer: "欧拉过每条边一次，哈密顿过每个顶点一次。欧拉路径经过每条边恰好一次（判定简单），哈密顿回路经过每个顶点恰好一次（NP 完全）。",
    tags: ["欧拉路径", "哈密顿回路"],
  },
];
