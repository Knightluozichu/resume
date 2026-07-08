import type { ReviewQuestion } from "./types";

/** 基本数据结构：栈、队列与链表 复习题 */
export const ialDataStructuresQuestions: ReviewQuestion[] = [
  {
    id: "ial-data-structures-1",
    chapter: "ial-data-structures",
    level: 1,
    question: "栈和队列的核心区别？",
    answer: "栈 LIFO（后进先出），队列 FIFO（先进先出）。栈用于回退场景（函数调用、DFS），队列用于公平场景（BFS、调度）。",
    tags: ["栈与队列"],
  },
  {
    id: "ial-data-structures-2",
    chapter: "ial-data-structures",
    level: 2,
    question: "动态数组 push 为什么 amortized O(1)？",
    answer: "扩容发生在 size=1,2,4,...,2^k 时，总复制成本 1+2+4+...+2^k≤2n。n 次 push 总成本 O(n)，均摊每次 O(1)。",
    tags: ["摊还分析"],
  },
  {
    id: "ial-data-structures-3",
    chapter: "ial-data-structures",
    level: 3,
    question: "摊还分析有哪三种方法？",
    answer: "聚合法（总成本/n）、核算法（预付昂贵操作的信用）、势能法（定义势能函数分析状态变化）。三种方法等价，得出相同均摊界。",
    tags: ["摊还分析", "方法"],
  },
  {
    id: "ial-data-structures-4",
    chapter: "ial-data-structures",
    level: 4,
    question: "循环队列如何区分空和满？",
    answer: "两种方法：1.留一个空位，(rear+1)%size==front 为满，front==rear 为空；2.用 count 变量记录元素个数，count==0 空，count==size 满。",
    tags: ["循环队列", "实现"],
  },
];
