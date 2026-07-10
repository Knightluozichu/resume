import type { ReviewQuestion } from "./types";

/** 堆 复习题 */
export const dsvHeapsQuestions: ReviewQuestion[] = [
  {
    id: "dsv-heaps-1",
    chapter: "dsv-heaps",
    level: 1,
    question: `大顶堆中，父节点与子节点的关系是？`,
    answer: `父节点值 ≥ 子节点值。大顶堆要求每个父节点值≥其子节点值，所以堆顶是最大值。小顶堆则相反。`,
    tags: ["堆", "大顶堆"],
  },
  {
    id: "dsv-heaps-2",
    chapter: "dsv-heaps",
    level: 2,
    question: `堆用数组存储时，节点 i 的左子节点下标是？`,
    answer: `2i + 1。左子 = 2i+1，右子 = 2i+2，父 = (i-1)//2。这是堆数组表示的标准下标关系。`,
    tags: ["堆", "数组表示"],
  },
  {
    id: "dsv-heaps-3",
    chapter: "dsv-heaps",
    level: 3,
    question: `堆的插入操作（上浮）时间复杂度是？`,
    answer: `O(log n)。插入放末尾后上浮，每层比较交换 O(1)，树高 O(log n)，总计 O(log n)。`,
    tags: ["堆", "上浮", "时间复杂度"],
  },
  {
    id: "dsv-heaps-4",
    chapter: "dsv-heaps",
    level: 4,
    question: `建堆（heapify）的时间复杂度是？`,
    answer: `O(n)。虽然看似 n/2 个节点各下沉 O(log n)，但底层节点下沉距离短，数学求和证明建堆是 O(n)。`,
    tags: ["建堆", "时间复杂度"],
  },
];
