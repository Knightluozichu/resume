import type { ReviewQuestion } from "./types";

/** 线段树：区间查询与更新 复习题 */
export const caSegmentTreeQuestions: ReviewQuestion[] = [
  {
    id: "ca-segment-tree-1",
    chapter: "ca-segment-tree",
    level: 1,
    question: "线段树的基本操作复杂度是多少？",
    answer: "建树 O(n)，单点更新 O(log n)，区间查询 O(log n)，区间更新 O(log n)（带懒标记）。",
    tags: ["复杂度"],
  },
  {
    id: "ca-segment-tree-2",
    chapter: "ca-segment-tree",
    level: 2,
    question: "懒标记的作用是什么？",
    answer: "区间更新时在完全覆盖节点打标记，不立即更新子节点。后续访问子节点时才下传标记，保证区间更新 O(log n) 而非 O(n)。",
    tags: ["懒标记"],
  },
  {
    id: "ca-segment-tree-3",
    chapter: "ca-segment-tree",
    level: 3,
    question: "线段树数组为什么需要开 4n？",
    answer: "线段树是近似完全二叉树，但最后一层可能不满。n 个元素的线段树最多有 2*2^ceil(log2(n)+1)-1 个节点，最坏约 4n。开 4n 保证不越界。",
    tags: ["空间", "实现"],
  },
  {
    id: "ca-segment-tree-4",
    chapter: "ca-segment-tree",
    level: 4,
    question: "pushdown 忘记调用会导致什么问题？请举例。",
    answer: "区间更新打标记后查询子区间，子节点保留旧值导致结果错误。如对 [1,4] 各加 5，查询 [1,2] 时若不 pushdown，返回的是加 5 前的值。",
    tags: ["pushdown", "错误分析"],
  },
];
