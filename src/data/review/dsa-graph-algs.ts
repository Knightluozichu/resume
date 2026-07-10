import type { ReviewQuestion } from "./types";

/** 图算法 复习题 */
export const dsaGraphAlgsQuestions: ReviewQuestion[] = [
  {
    id: "dsa-graph-algs-1",
    chapter: "dsa-graph-algs",
    level: 1,
    question: `BFS 和 DFS 的时间复杂度（邻接表表示）分别是多少？`,
    answer: `都是 O(V+E)。BFS 和 DFS 都需访问每个顶点一次、每条边一次，邻接表下均为 O(V+E)。邻接矩阵下则都是 O(V²)（每个顶点要扫描整行）。`,
    tags: ["BFS", "DFS", "时间复杂度"],
  },
  {
    id: "dsa-graph-algs-2",
    chapter: "dsa-graph-algs",
    level: 2,
    question: `Dijkstra 算法使用优先队列（最小堆）时的复杂度是多少？`,
    answer: `O((V+E) log V)。每个顶点出队一次 O(V log V)，每条边可能触发一次松弛入队 O(E log V)，总计 O((V+E) log V)。用 Fibonacci 堆可优化到 O(E + V log V)，但常数大，实际中二叉堆更常用。`,
    tags: ["Dijkstra", "优先队列"],
  },
  {
    id: "dsa-graph-algs-3",
    chapter: "dsa-graph-algs",
    level: 3,
    question: `为什么 Dijkstra 不能处理负权边？`,
    answer: `贪心假设已确定节点不会被更新，负权边可能打破此假设。Dijkstra 标记已确定节点后不再修改，但负权边使后续路径可能更短，已确定节点需更新——贪心失效。负权图应用 Bellman-Ford（O(VE)）或 SPFA。`,
    tags: ["Dijkstra", "负权边"],
  },
  {
    id: "dsa-graph-algs-4",
    chapter: "dsa-graph-algs",
    level: 4,
    question: `Kruskal 算法求最小生成树时用什么数据结构判断是否成环？`,
    answer: `并查集（Union-Find）。Kruskal 排序所有边后逐条尝试加入，用并查集 Find 检查边的两端是否在同一集合：同集合则成环跳过，否则 Union 合并并加入 MST。并查集 O(α(n)) 使总复杂度为 O(E log E)（排序为主）。`,
    tags: ["Kruskal", "并查集"],
  },
];
