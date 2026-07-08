import type { ReviewQuestion } from "./types";

/** 树 复习题 */
export const dsaTreesQuestions: ReviewQuestion[] = [
  {
    id: "dsa-trees-1",
    chapter: "dsa-trees",
    level: 1,
    question: "AVL 树的平衡条件是什么？",
    answer: "任意节点左右子树高度差 ≤ 1。AVL 要求任意节点平衡因子 |BF|=|左子树高-右子树高| ≤ 1。通过四种旋转维护，保证高度 O(log n)。",
    tags: ["AVL树", "平衡因子"],
  },
  {
    id: "dsa-trees-2",
    chapter: "dsa-trees",
    level: 2,
    question: "BST 按顺序插入 1,2,3,4,5 会退化成什么？",
    answer: "向右倾斜的链表，高度 O(n)。每次插入都比根大，只能往右走，退化为向右链表，查找 O(n)。需要 AVL/红黑树的自平衡机制。",
    tags: ["BST", "退化"],
  },
  {
    id: "dsa-trees-3",
    chapter: "dsa-trees",
    level: 3,
    question: "为什么数据库索引用 B+ 树而不是 AVL 树？",
    answer: "B+ 树每节点多关键字，减少磁盘 I/O 次数。B+ 树每节点填满磁盘块（多关键字），高度 O(log_m n) 远小于 AVL 的 O(log_2 n)。10亿数据 B+ 树约 4 次 I/O vs AVL 约 30 次。",
    tags: ["B+树", "数据库索引"],
  },
  {
    id: "dsa-trees-4",
    chapter: "dsa-trees",
    level: 4,
    question: "C++ std::map 通常用什么数据结构实现？",
    answer: "红黑树。std::map/set 通常用红黑树。红黑树弱平衡（高度≤2log n），插入删除最多 3 次旋转（比 AVL 少），适合修改密集场景。",
    tags: ["std::map", "红黑树"],
  },
];
