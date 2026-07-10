import type { ReviewQuestion } from "./types";

/** 线性表 复习题 */
export const dsaListsQuestions: ReviewQuestion[] = [
  {
    id: "dsa-lists-1",
    chapter: "dsa-lists",
    level: 1,
    question: `vector 的随机访问 operator[] 的复杂度是？`,
    answer: `O(1)。vector 连续内存，operator[] 通过 基地址+下标×元素大小 直接算地址，O(1)。`,
    tags: ["vector", "随机访问"],
  },
  {
    id: "dsa-lists-2",
    chapter: "dsa-lists",
    level: 2,
    question: `list 的已知位置（持有迭代器）插入的复杂度是？`,
    answer: `O(1)。list 已知位置插入只需修改前后节点的指针，O(1)。但如果先要定位到该位置（at(i)），则需要 O(n)。`,
    tags: ["list", "插入"],
  },
  {
    id: "dsa-lists-3",
    chapter: "dsa-lists",
    level: 3,
    question: `vector 扩容时迭代器会发生什么？`,
    answer: `全部失效（指向旧内存被释放）。vector 扩容分配新内存并搬迁元素，旧内存被释放。所有指向旧内存的迭代器、指针、引用全部失效。`,
    tags: ["vector", "迭代器失效"],
  },
  {
    id: "dsa-lists-4",
    chapter: "dsa-lists",
    level: 4,
    question: `大多数场景优先选 vector 而非 list 的主要原因是什么？`,
    answer: `连续内存缓存友好，实际性能常优于 list。vector 连续内存对 CPU 缓存友好（空间局部性），即使理论复杂度相同甚至更优，实际运行常比 list 快。`,
    tags: ["vector", "缓存友好"],
  },
];
