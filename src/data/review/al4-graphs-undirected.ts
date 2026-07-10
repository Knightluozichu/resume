import type { ReviewQuestion } from "./types";

/** 无向图 复习题 */
export const al4GraphsUndirectedQuestions: ReviewQuestion[] = [
  {
    id: "al4-graphs-undirected-1",
    chapter: "al4-graphs-undirected",
    level: 1,
    question: `邻接表和邻接矩阵各适合什么场景？`,
    answer: `邻接表适合稀疏图（空间O(V+E)）。邻接矩阵适合稠密图或需频繁判断边存在（O(1)）。`,
    tags: ["邻接表", "邻接矩阵"],
  },
  {
    id: "al4-graphs-undirected-2",
    chapter: "al4-graphs-undirected",
    level: 2,
    question: `为什么BFS能找最短路径而DFS不能？`,
    answer: `BFS逐层扩展按距离递增，第一次到达即最短。DFS沿一条路走到底可能绕远。`,
    tags: ["BFS", "最短路径"],
  },
  {
    id: "al4-graphs-undirected-3",
    chapter: "al4-graphs-undirected",
    level: 3,
    question: `如何用DFS检测无向图中的环？`,
    answer: `遇到已访问的非父节点邻居则存在环。已访问意味着有另一条路径，加当前路径形成环。`,
    tags: ["环检测", "DFS"],
  },
  {
    id: "al4-graphs-undirected-4",
    chapter: "al4-graphs-undirected",
    level: 4,
    question: `设计社交网络好友推荐系统。`,
    answer: `用户=顶点，好友=边。推荐共同好友（邻居交集）；二度好友（BFS距离2）；社区发现（连通分量）；关系链（BFS最短路径）。`,
    tags: ["综合", "图算法", "社交网络"],
  },
];
