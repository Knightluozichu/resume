import type { ReviewQuestion } from "./types";

/** 并查集 复习题 */
export const dsaDisjointSetsQuestions: ReviewQuestion[] = [
  {
    id: "dsa-disjoint-sets-1",
    chapter: "dsa-disjoint-sets",
    level: 1,
    question: "并查集使用按秩合并 + 路径压缩后，单次操作的均摊时间复杂度是多少？",
    answer: "O(α(n))，α 是反 Ackermann 函数，实际 ≤ 4。两种优化结合后，单次操作均摊 O(α(n))。α(n) 是反 Ackermann 函数，增长极慢，对任何实际数据（n < 10^80）α ≤ 4，可视为常数。",
    tags: ["并查集", "反Ackermann"],
  },
  {
    id: "dsa-disjoint-sets-2",
    chapter: "dsa-disjoint-sets",
    level: 2,
    question: "按秩合并中，「秩」代表什么？",
    answer: "树的高度上界（不使用路径压缩时等于高度）。秩（rank）是不带路径压缩时树的高度。按秩合并让矮树挂到高树根下，只有两棵等高树合并时秩才 +1，保证树高增长极慢（≤ log n）。",
    tags: ["按秩合并", "秩"],
  },
  {
    id: "dsa-disjoint-sets-3",
    chapter: "dsa-disjoint-sets",
    level: 3,
    question: "路径压缩在 Find 操作中做了什么？",
    answer: "把查找路径上的所有节点直接指向根。Find(x) 递归找到根后，回溯时将沿途节点（x 及其祖先）的父指针直接改为根。这使路径上的节点高度变为 1，后续 Find 更快。",
    tags: ["路径压缩", "Find"],
  },
  {
    id: "dsa-disjoint-sets-4",
    chapter: "dsa-disjoint-sets",
    level: 4,
    question: "Kruskal 算法求最小生成树时，并查集的作用是什么？",
    answer: "判断加入某条边是否会形成环。Kruskal 按权值排序边后逐一尝试加入。用并查集 Find 检查边的两端是否在同一集合：同集合则加入会成环，跳过；不同集合则 Union 合并并加入 MST。",
    tags: ["Kruskal", "最小生成树"],
  },
];
