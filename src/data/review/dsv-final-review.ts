import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const dsvFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dsv-final-review-1",
    chapter: "dsv-final-review",
    level: 1,
    question: `全书的核心思想是什么？`,
    answer: `没有最好的数据结构，只有最适合场景的数据结构。全书核心：根据操作频率与场景选择数据结构。每种结构都有取舍，选择取决于哪些操作是高频的。`,
    tags: ["核心思想", "选型原则"],
  },
  {
    id: "dsv-final-review-2",
    chapter: "dsv-final-review",
    level: 2,
    question: `查找效率从 O(n) 到 O(1) 的三次跃迁中，每次跃迁增加什么前提？`,
    answer: `有序→额外空间→哈希函数。顺序查找无门槛→二分要有序+随机访问→哈希要额外空间+哈希函数。效率越高，前提越苛刻。`,
    tags: ["查找效率", "演进"],
  },
  {
    id: "dsv-final-review-3",
    chapter: "dsv-final-review",
    level: 3,
    question: `频繁查找最大值应该用什么数据结构？`,
    answer: `最大堆。最大堆堆顶即最大值，取最值 O(1)，插入 O(log n)。数组取最大值 O(n)，链表也是 O(n)。`,
    tags: ["堆", "选型"],
  },
  {
    id: "dsv-final-review-4",
    chapter: "dsv-final-review",
    level: 4,
    question: `全书三大主线中，「存储方式演进」的正确顺序是？`,
    answer: `数组→链表→BST→堆→图。存储演进：数组(连续)→链表(链式)→BST(树形查找)→堆(完全二叉树取最值)→图(多对多关系)。`,
    tags: ["存储演进", "全书主线"],
  },
];
