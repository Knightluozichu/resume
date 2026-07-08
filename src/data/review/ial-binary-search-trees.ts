import type { ReviewQuestion } from "./types";

/** 二叉搜索树与红黑树 复习题 */
export const ialBinarySearchTreesQuestions: ReviewQuestion[] = [
  {
    id: "ial-binary-search-trees-1",
    chapter: "ial-binary-search-trees",
    level: 1,
    question: "BST 的基本性质是什么？",
    answer: "每个节点的左子树所有值小于该节点，右子树所有值大于该节点。中序遍历得到有序序列。",
    tags: ["BST"],
  },
  {
    id: "ial-binary-search-trees-2",
    chapter: "ial-binary-search-trees",
    level: 2,
    question: "普通 BST 为什么需要红黑树？",
    answer: "BST 高度取决于插入顺序，顺序插入退化为链 O(n)。红黑树通过五条性质保证高度≤2log(n+1)，所有操作最坏 O(log n)。",
    tags: ["红黑树", "平衡"],
  },
  {
    id: "ial-binary-search-trees-3",
    chapter: "ial-binary-search-trees",
    level: 3,
    question: "红黑树五条性质是什么？",
    answer: "1.每个节点红或黑；2.根是黑；3.叶(NIL)是黑；4.红节点的子节点是黑；5.任意节点到叶的所有路径黑高相同。",
    tags: ["红黑树性质"],
  },
  {
    id: "ial-binary-search-trees-4",
    chapter: "ial-binary-search-trees",
    level: 4,
    question: "红黑树的五条性质如何保证树高 O(log n)？",
    answer: "性质4(不连续红)+性质5(黑高相同)→最长路径≤最短路径×2。设黑高 bh，n≥2^bh-1，bh≤log(n+1)，树高≤2bh≤2log(n+1)。",
    tags: ["红黑树", "高度证明"],
  },
];
