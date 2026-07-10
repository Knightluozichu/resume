import type { ReviewQuestion } from "./types";

/** 并查集：连通性判断 复习题 */
export const caUnionFindQuestions: ReviewQuestion[] = [
  {
    id: "ca-union-find-1",
    chapter: "ca-union-find",
    level: 1,
    question: `并查集的两种基本操作是什么？`,
    answer: `find(x) 查找 x 所在集合的代表元素（根），union(x,y) 合并 x 和 y 所在的两个集合。`,
    tags: ["基本操作"],
  },
  {
    id: "ca-union-find-2",
    chapter: "ca-union-find",
    level: 2,
    question: `路径压缩和按秩合并各解决什么问题？`,
    answer: `路径压缩解决 find 时树高导致慢的问题——压扁路径。按秩合并解决 union 时树高增长快的问题——矮树挂高树。两者结合达 O(α(n))。`,
    tags: ["优化"],
  },
  {
    id: "ca-union-find-3",
    chapter: "ca-union-find",
    level: 3,
    question: `并查集如何判断图是否有环？`,
    answer: `对每条边 (u,v)，若 find(u)==find(v) 则 u 和 v 已在同一集合，加入此边形成环。否则 union(u,v)。遍历所有边即可判断。`,
    tags: ["应用", "环检测"],
  },
  {
    id: "ca-union-find-4",
    chapter: "ca-union-find",
    level: 4,
    question: `并查集优化后的均摊复杂度 O(α(n)) 是多少？为什么几乎等于 O(1)？`,
    answer: `α 是反阿克曼函数，增长极慢。对任何实际 n（<10^80），α(n) < 5。所以实际中等同 O(1)。这是路径压缩+按秩合并的理论保证。`,
    tags: ["复杂度", "反阿克曼"],
  },
];
