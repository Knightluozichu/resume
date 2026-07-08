import type { ReviewQuestion } from "./types";

/** 图 复习题 */
export const dsvGraphsQuestions: ReviewQuestion[] = [
  {
    id: "dsv-graphs-1",
    chapter: "dsv-graphs",
    level: 1,
    question: "BFS 广度优先搜索用什么数据结构实现？",
    answer: "队列。BFS 用队列（FIFO）实现：出队一个节点，未访问邻居入队，实现逐层扩展。",
    tags: ["BFS", "队列"],
  },
  {
    id: "dsv-graphs-2",
    chapter: "dsv-graphs",
    level: 2,
    question: "无权图中找最短路径应该用哪种遍历？",
    answer: "BFS。BFS 逐层扩展，第一次到达目标就是最短路径。DFS 不保证最短。带权图才需 Dijkstra。",
    tags: ["BFS", "最短路径"],
  },
  {
    id: "dsv-graphs-3",
    chapter: "dsv-graphs",
    level: 3,
    question: "稀疏图（边数远小于 n²）应该用什么存储方式？",
    answer: "邻接表。邻接表空间 O(V+E)，适合稀疏图。邻接矩阵空间 O(n²)，适合稠密图。",
    tags: ["邻接表", "稀疏图"],
  },
  {
    id: "dsv-graphs-4",
    chapter: "dsv-graphs",
    level: 4,
    question: "BFS 和 DFS 的时间复杂度都是？",
    answer: "O(V + E)。两者每个顶点和每条边各访问一次，时间复杂度均为 O(V+E)。",
    tags: ["BFS", "DFS", "时间复杂度"],
  },
];
