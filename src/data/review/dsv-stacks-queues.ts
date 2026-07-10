import type { ReviewQuestion } from "./types";

/** 栈与队列 复习题 */
export const dsvStacksQueuesQuestions: ReviewQuestion[] = [
  {
    id: "dsv-stacks-queues-1",
    chapter: "dsv-stacks-queues",
    level: 1,
    question: `栈的核心操作特性是什么？`,
    answer: `后进先出（LIFO）。栈只在栈顶操作，最后压入的元素最先弹出，即后进先出（LIFO）。`,
    tags: ["栈", "LIFO"],
  },
  {
    id: "dsv-stacks-queues-2",
    chapter: "dsv-stacks-queues",
    level: 2,
    question: `用 Python 列表实现队列出队，应该用哪个方法保证 O(1)？`,
    answer: `collections.deque 的 popleft()。list.pop(0) 是 O(n) 需前移所有元素；deque.popleft() 是 O(1) 的双端队列操作。`,
    tags: ["队列", "deque"],
  },
  {
    id: "dsv-stacks-queues-3",
    chapter: "dsv-stacks-queues",
    level: 3,
    question: `BFS 广度优先搜索应该使用哪种数据结构？`,
    answer: `队列。BFS 需要「先发现的先处理」（FIFO），所以用队列。用栈会变成 DFS 的效果。`,
    tags: ["BFS", "队列"],
  },
  {
    id: "dsv-stacks-queues-4",
    chapter: "dsv-stacks-queues",
    level: 4,
    question: `循环队列为什么要牺牲一个存储位置？`,
    answer: `为了区分队空和队满两种状态。如果不牺牲一个位置，队空和队满时 front==rear 无法区分。牺牲后队空 front==rear，队满 (rear+1)%capacity==front。`,
    tags: ["循环队列", "判空判满"],
  },
];
