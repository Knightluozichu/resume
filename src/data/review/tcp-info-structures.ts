import type { ReviewQuestion } from "./types";

/** 信息结构 复习题 */
export const tcpInfoStructuresQuestions: ReviewQuestion[] = [
  {
    id: "tcp-info-structures-1",
    chapter: "tcp-info-structures",
    level: 1,
    question: `线性表的两种基本物理实现是什么？各自的时间复杂度特点？`,
    answer: `数组（顺序存储）：访问 O(1)，插入删除 O(n)；链表（链式存储）：访问 O(n)，已知位置插入删除 O(1)。`,
    tags: ["线性表", "复杂度"],
  },
  {
    id: "tcp-info-structures-2",
    chapter: "tcp-info-structures",
    level: 2,
    question: `二叉搜索树的平均查找复杂度是多少？什么情况下退化？`,
    answer: `平均 O(log n)，最坏 O(n)。当插入有序数据时，二叉搜索树退化为链表，查找变为 O(n)。平衡树（如 AVL、红黑树）可保证最坏 O(log n)。`,
    tags: ["树结构", "退化"],
  },
  {
    id: "tcp-info-structures-3",
    chapter: "tcp-info-structures",
    level: 3,
    question: `多链结构的典型应用场景有哪些？`,
    answer: `稀疏矩阵（十字链表）、图（邻接表）、数据库索引（B+树）、操作系统空闲块管理。任何需要多维度访问的数据都适用。`,
    tags: ["多链结构", "应用"],
  },
  {
    id: "tcp-info-structures-4",
    chapter: "tcp-info-structures",
    level: 4,
    question: `为什么 Knuth 用「信息结构」而非「数据结构」？`,
    answer: `Knuth 强调信息的逻辑组织关系（元素如何关联和检索）而非物理存储。同一信息结构可有不同物理实现——线性表可用数组或链表实现。「信息结构」更准确反映概念抽象。`,
    tags: ["信息结构", "概念"],
  },
];
