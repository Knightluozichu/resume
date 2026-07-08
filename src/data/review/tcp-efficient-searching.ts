import type { ReviewQuestion } from "./types";

/** 高效搜索 复习题 */
export const tcpEfficientSearchingQuestions: ReviewQuestion[] = [
  {
    id: "tcp-efficient-searching-1",
    chapter: "tcp-efficient-searching",
    level: 1,
    question: "哈希表的平均和最坏查找复杂度分别是什么？",
    answer: "平均 O(1)，最坏 O(n)。最坏情况发生在所有键冲突（映射到同一位置）。好的哈希函数和适当的负载因子可将冲突概率保持在低水平。",
    tags: ["哈希表", "复杂度"],
  },
  {
    id: "tcp-efficient-searching-2",
    chapter: "tcp-efficient-searching",
    level: 2,
    question: "B 树相比二叉搜索树在磁盘存储上的核心优势是什么？",
    answer: "B 树每个节点存储多个键（匹配磁盘块大小），树高很低（3-4 层覆盖数十亿记录），磁盘 I/O 次数少。二叉树 10⁹ 记录需 30 层 = 30 次 I/O，B 树只需 3-4 次。",
    tags: ["B树", "磁盘I/O"],
  },
  {
    id: "tcp-efficient-searching-3",
    chapter: "tcp-efficient-searching",
    level: 3,
    question: "二分搜索的时间复杂度和前提条件是什么？",
    answer: "O(log n)。前提：数据有序且支持随机访问（如数组）。链表虽然可以有序，但不支持 O(1) 随机访问，不能用二分搜索。",
    tags: ["二分搜索", "复杂度"],
  },
  {
    id: "tcp-efficient-searching-4",
    chapter: "tcp-efficient-searching",
    level: 4,
    question: "为什么数据库索引普遍用 B+ 树而非哈希表？",
    answer: "B+ 树支持范围查询、有序遍历和前缀匹配（O(log n + k)），同时支持精确查找。哈希表只支持精确查找 O(1)，不支持范围查询。数据库的大多数查询（WHERE、ORDER BY、BETWEEN）需要范围能力。",
    tags: ["B+树", "数据库索引"],
  },
];
