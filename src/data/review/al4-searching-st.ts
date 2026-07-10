import type { ReviewQuestion } from "./types";

/** 符号表与二叉搜索树 复习题 */
export const al4SearchingStQuestions: ReviewQuestion[] = [
  {
    id: "al4-searching-st-1",
    chapter: "al4-searching-st",
    level: 1,
    question: `BST 查找/插入/删除的时间复杂度？`,
    answer: `O(h)，h为树高。平衡时 O(log n)，退化时 O(n)。`,
    tags: ["BST", "复杂度"],
  },
  {
    id: "al4-searching-st-2",
    chapter: "al4-searching-st",
    level: 2,
    question: `为什么顺序插入导致 BST 退化？`,
    answer: `顺序插入总是插入右子树最右端，树变成链表，高度=n。随机插入期望 O(log n)。`,
    tags: ["BST", "退化"],
  },
  {
    id: "al4-searching-st-3",
    chapter: "al4-searching-st",
    level: 3,
    question: `BST 删除双子节点用什么策略？`,
    answer: `用后继（右子树最小值）替换被删节点。删除右子树中的后继，用后继继承左右子树。`,
    tags: ["BST删除", "后继"],
  },
  {
    id: "al4-searching-st-4",
    chapter: "al4-searching-st",
    level: 4,
    question: `分析 BST 从无序链表到平衡树的演进。`,
    answer: `链表（查找慢）→有序数组+二分（插入慢）→BST（动态）→平衡BST（保证O(log n)）。每步解决前一步瓶颈。`,
    tags: ["综合", "BST", "演进"],
  },
];
