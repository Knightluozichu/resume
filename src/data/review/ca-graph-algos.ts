import type { ReviewQuestion } from "./types";

/** 图算法：最短路、最小生成树与拓扑排序 复习题 */
export const caGraphAlgosQuestions: ReviewQuestion[] = [
  {
    id: "ca-graph-algos-1",
    chapter: "ca-graph-algos",
    level: 1,
    question: `Dijkstra 算法的复杂度和适用条件？`,
    answer: `O((V+E)log V)（优先队列版）。只适用于非负权图，不能处理负权边。`,
    tags: ["Dijkstra"],
  },
  {
    id: "ca-graph-algos-2",
    chapter: "ca-graph-algos",
    level: 2,
    question: `Dijkstra 为什么不能处理负权边？`,
    answer: `Dijkstra 每次取最小距离点\"确定\"不再更新。但负权边可能让更长路径通过负权变短，已确定的点需要更新，违背算法假设。`,
    tags: ["负权边", "正确性"],
  },
  {
    id: "ca-graph-algos-3",
    chapter: "ca-graph-algos",
    level: 3,
    question: `Kruskal 算法的步骤和复杂度？`,
    answer: `1.所有边按权值排序；2.从小到大遍历，用并查集判连通，选不构成环的边；3.选满 n-1 条边即完成。复杂度 O(E log E)。`,
    tags: ["Kruskal", "最小生成树"],
  },
  {
    id: "ca-graph-algos-4",
    chapter: "ca-graph-algos",
    level: 4,
    question: `Dijkstra 和 Floyd 分别适合什么场景？`,
    answer: `Dijkstra 适合单源最短路（一个起点到所有点），O((V+E)logV)。Floyd 适合全源最短路（所有点对），O(V^3) 但代码极短，适合 V≤500 的小图。`,
    tags: ["对比", "选型"],
  },
];
