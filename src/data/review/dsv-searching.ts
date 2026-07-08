import type { ReviewQuestion } from "./types";

/** 查找 复习题 */
export const dsvSearchingQuestions: ReviewQuestion[] = [
  {
    id: "dsv-searching-1",
    chapter: "dsv-searching",
    level: 1,
    question: "二分查找的前提条件是什么？",
    answer: "数组有序且支持随机访问。二分查找需要：①数组有序（判断方向）②支持随机访问（O(1)取中间元素）③数据不频繁变动。",
    tags: ["二分查找", "前提条件"],
  },
  {
    id: "dsv-searching-2",
    chapter: "dsv-searching",
    level: 2,
    question: "哈希表查找的平均时间复杂度是？",
    answer: "O(1)。哈希表通过哈希函数直接定位，平均 O(1)。最坏 O(n)（冲突严重时），需好的哈希函数和扩容控制。",
    tags: ["哈希表", "查找"],
  },
  {
    id: "dsv-searching-3",
    chapter: "dsv-searching",
    level: 3,
    question: "哈希表不支持以下哪种操作？",
    answer: "范围查询（找区间内所有元素）。哈希表无序存储，不支持范围查询（找 50-100 之间的元素）。需要范围查询应选 BST 或有序数组+二分。",
    tags: ["哈希表", "范围查询"],
  },
  {
    id: "dsv-searching-4",
    chapter: "dsv-searching",
    level: 4,
    question: "n=100万时，二分查找大约需要多少次比较？",
    answer: "约 20 次。log₂(1000000) ≈ 20。二分查找每次排除一半，100 万数据仅需约 20 次比较。",
    tags: ["二分查找", "对数复杂度"],
  },
];
