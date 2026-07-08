import type { ReviewQuestion } from "./types";

/** 算法（第4版）总复习 复习题 */
export const al4FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "al4-final-review-1",
    chapter: "al4-final-review",
    level: 1,
    question: "全书四大板块的核心知识点各是什么？",
    answer: "基础：大O/栈队列/Union-Find。排序：选择/插入/归并/快排/堆排。查找：BST/红黑树/散列表。字符串与图：KMP/Trie/DFS/BFS/拓扑排序。",
    tags: ["全书结构"],
  },
  {
    id: "al4-final-review-2",
    chapter: "al4-final-review",
    level: 2,
    question: "排序算法板块引入了哪些算法设计范式？",
    answer: "分治（归并：分→排→合）、随机化（快排：随机pivot避免最坏）、堆结构（堆排：优先队列）。从O(n^2)到O(n log n)。",
    tags: ["排序", "设计范式"],
  },
  {
    id: "al4-final-review-3",
    chapter: "al4-final-review",
    level: 3,
    question: "给定需要在100万条记录中按频率取top-10，选什么算法？",
    answer: "用最小堆（PriorityQueue）。统计频率O(n)，维护大小10的堆O(n log k)。总O(n log k)。比排序O(n log n)更快因为k远小于n。",
    tags: ["堆", "top-K", "应用"],
  },
  {
    id: "al4-final-review-4",
    chapter: "al4-final-review",
    level: 4,
    question: "请阐述从基础到高级算法的完整知识链路及每步引入的新思想。",
    answer: "四级链路：1）基础：大O分析+数据结构（栈/队列/UF），引入分析语言。2）排序：分治（归并）+随机化（快排）+堆（堆排），引入算法设计范式，O(n^2)→O(n log n)。3）查找：BST+红黑树+散列表，引入树形结构和散列，O(n)→O(log n)/O(1)。4）字符串与图：KMP+Trie+DFS/BFS+拓扑排序，引入模式匹配和网络分析。每级解决前级瓶颈，引入新思想。",
    tags: ["综合", "知识链路", "进阶路径"],
  },
];
