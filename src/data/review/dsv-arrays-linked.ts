import type { ReviewQuestion } from "./types";

/** 数组与链表 复习题 */
export const dsvArraysLinkedQuestions: ReviewQuestion[] = [
  {
    id: "dsv-arrays-linked-1",
    chapter: "dsv-arrays-linked",
    level: 1,
    question: `数组支持 O(1) 随机访问的原因是？`,
    answer: `内存连续，地址可由基地址+下标×元素大小直接算出。数组内存连续，arr[i] 的地址 = 基地址 + i × 元素大小，一步算出，所以是 O(1)。`,
    tags: ["数组", "随机访问"],
  },
  {
    id: "dsv-arrays-linked-2",
    chapter: "dsv-arrays-linked",
    level: 2,
    question: `链表中间插入节点的时间复杂度（已知插入位置）是？`,
    answer: `O(1)。已知位置时，链表插入只需修改指针（两步），无需移动其他元素，所以是 O(1)。`,
    tags: ["链表", "插入"],
  },
  {
    id: "dsv-arrays-linked-3",
    chapter: "dsv-arrays-linked",
    level: 3,
    question: `频繁在头部插入元素，应该选择哪种数据结构？`,
    answer: `链表。链表头部插入 O(1)，数组头部插入需所有元素后移 O(n)。频繁头部插入选链表。`,
    tags: ["链表", "选型"],
  },
  {
    id: "dsv-arrays-linked-4",
    chapter: "dsv-arrays-linked",
    level: 4,
    question: `动态数组扩容采用倍增策略后，尾部插入的均摊复杂度是？`,
    answer: `O(1)。倍增扩容虽然偶尔 O(n)，但均摊到每次插入是 O(1)（等比数列求和除以 n）。`,
    tags: ["动态数组", "均摊分析"],
  },
];
