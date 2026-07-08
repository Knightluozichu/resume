import type { ReviewQuestion } from "./types";

/** 图算法：BFS、DFS 与最短路 复习题 */
export const ialGraphAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "ial-graph-algorithms-1",
    chapter: "ial-graph-algorithms",
    level: 1,
    question: "BFS 和 DFS 各用什么数据结构？复杂度？",
    answer: "BFS 用队列，DFS 用栈/递归。都是 O(V+E)。BFS 逐层扩展适合无权最短路，DFS 一路到底适合拓扑排序。",
    tags: ["BFS/DFS"],
  },
  {
    id: "ial-graph-algorithms-2",
    chapter: "ial-graph-algorithms",
    level: 2,
    question: "Dijkstra 为什么不能处理负权边？",
    answer: "Dijkstra 每次确定最小距离点不再更新。负权边可能让更长路径变短，已确定的点需要更新，违背假设。",
    tags: ["Dijkstra", "负权"],
  },
  {
    id: "ial-graph-algorithms-3",
    chapter: "ial-graph-algorithms",
    level: 3,
    question: "Bellman-Ford 如何检测负权环？",
    answer: "对所有边松弛 V-1 轮（最短路最多 V-1 条边）。第 V 轮还能松弛说明存在可无限缩短的路径，即负环。",
    tags: ["Bellman-Ford", "负环检测"],
  },
  {
    id: "ial-graph-algorithms-4",
    chapter: "ial-graph-algorithms",
    level: 4,
    question: "Dijkstra、Bellman-Ford、Floyd-Warshall 各适合什么场景？",
    answer: "Dijkstra：单源非负权 O((V+E)logV)。Bellman-Ford：单源有负权 O(VE)。Floyd-Warshall：全源 O(V^3) 适合小图。",
    tags: ["对比", "选型"],
  },
];
