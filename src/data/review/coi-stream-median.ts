import type { ReviewQuestion } from "./types";

export const streamMedianQuestions: ReviewQuestion[] = [
  {
    id: "coi-stream-median-1",
    chapter: "coi-stream-median",
    level: 1,
    question: `这道题的目标约束是什么？`,
    answer: `支持在线插入（每次 O(log n)）并支持任意时刻查询中位数（O(1) 或 O(log n)），同时保证左堆全为较小一半、右堆全为较大一半的平衡不变量。`,
    tags: ["边界条件", "复杂度"],
  },
  {
    id: "coi-stream-median-2",
    chapter: "coi-stream-median",
    level: 2,
    question: `你会优先选双堆结构吗？`,
    answer: `是。双堆能在插入时以有序分区方式保持中位数边界，查询时直接看堆顶，逻辑清晰且复杂度稳定；比维护完整有序列表的 O(n) 插入更稳。`,
    tags: ["策略选择", "算法思维"],
  },
  {
    id: "coi-stream-median-3",
    chapter: "coi-stream-median",
    level: 2,
    question: `给出该题的时间复杂度和空间复杂度。`,
    answer: `\`addNum\` 触发一次堆插入+可能一次迁移，故 O(log n)。\`findMedian\` 只读堆顶 O(1)。空间 O(n)，两堆共同存储全部已插入元素。`,
    tags: ["复杂度", "性能"],
  },
  {
    id: "coi-stream-median-4",
    chapter: "coi-stream-median",
    level: 3,
    question: `请给出一版 TypeScript 代码的主流程。`,
    answer:
      `\`\`\`typescript\nclass MedianFinder {\n  private maxHeap = new MaxHeap(); // 小数端\n  private minHeap = new MinHeap(); // 大数端\n\n  addNum(num: number): void {\n    if (this.maxHeap.size === 0 || num <= this.maxHeap.peek()) {\n      this.maxHeap.push(num);\n    } else {\n      this.minHeap.push(num);\n    }\n\n    if (this.maxHeap.size > this.minHeap.size + 1) {\n      this.minHeap.push(this.maxHeap.pop());\n    } else if (this.minHeap.size > this.maxHeap.size) {\n      this.maxHeap.push(this.minHeap.pop());\n    }\n  }\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-stream-median-5",
    chapter: "coi-stream-median",
    level: 4,
    question: `平衡规则如何避免偏差？`,
    answer: `始终维护 \`maxHeap.size()\` 与 \`minHeap.size()\` 差不超过 1，且 \`maxHeap.size()\` 不小于 \`minHeap.size()\`。这样奇数时中位数在 max 堆根，偶数时是两根平均。`,
    tags: ["测试设计", "边界"],
  },
];
