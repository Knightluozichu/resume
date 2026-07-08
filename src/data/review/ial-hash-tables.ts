import type { ReviewQuestion } from "./types";

/** 散列表 复习题 */
export const ialHashTablesQuestions: ReviewQuestion[] = [
  {
    id: "ial-hash-tables-1",
    chapter: "ial-hash-tables",
    level: 1,
    question: "散列表期望和最坏复杂度？",
    answer: "期望 O(1)（好的散列函数均匀分布），最坏 O(n)（所有键冲突到一个位置）。",
    tags: ["复杂度"],
  },
  {
    id: "ial-hash-tables-2",
    chapter: "ial-hash-tables",
    level: 2,
    question: "链地址法和开放寻址法的区别？",
    answer: "链地址法：冲突键挂链表，不怕满但需指针空间。开放寻址法：冲突时找下一个空位，不需指针、缓存友好但怕满、删除需标记。",
    tags: ["冲突处理"],
  },
  {
    id: "ial-hash-tables-3",
    chapter: "ial-hash-tables",
    level: 3,
    question: "全域散列解决什么问题？",
    answer: "防止对手构造恶意输入攻击。随机选散列函数使任意两键冲突概率≤1/m，无论输入如何分布。",
    tags: ["全域散列", "安全"],
  },
  {
    id: "ial-hash-tables-4",
    chapter: "ial-hash-tables",
    level: 4,
    question: "什么是完美散列？适用什么场景？",
    answer: "对静态键集合构造两级散列表，保证无冲突、最坏 O(1) 查找。适用于键集合固定不变的场景（如编译器关键字表）。",
    tags: ["完美散列", "静态集合"],
  },
];
