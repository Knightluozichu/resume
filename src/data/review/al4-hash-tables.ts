import type { ReviewQuestion } from "./types";

/** 散列表 复习题 */
export const al4HashTablesQuestions: ReviewQuestion[] = [
  {
    id: "al4-hash-tables-1",
    chapter: "al4-hash-tables",
    level: 1,
    question: "散列表的期望和最坏时间复杂度？",
    answer: "期望 O(1)，最坏 O(n)（所有键哈希到同一桶）。",
    tags: ["散列表", "复杂度"],
  },
  {
    id: "al4-hash-tables-2",
    chapter: "al4-hash-tables",
    level: 2,
    question: "拉链法和线性探测法的负载因子要求？",
    answer: "拉链法可>1（通常2-5），线性探测必须<0.5。超过阈值需 rehash。",
    tags: ["负载因子"],
  },
  {
    id: "al4-hash-tables-3",
    chapter: "al4-hash-tables",
    level: 3,
    question: "为什么重写 equals 必须同时重写 hashCode？",
    answer: "Java 约定 equals 相等的对象 hashCode 必须相等。否则散列表中相等的键哈希到不同桶，get 找不到 put 的值。",
    tags: ["equals", "hashCode"],
  },
  {
    id: "al4-hash-tables-4",
    chapter: "al4-hash-tables",
    level: 4,
    question: "对比散列表和平衡树，给出选择决策。",
    answer: "散列表：O(1)期望，不支持有序操作，需好hashCode。平衡树：O(log n)保证，支持有序操作。不需有序→散列表，需有序/最坏保证→平衡树。",
    tags: ["综合", "散列表", "平衡树"],
  },
];
