import type { ReviewQuestion } from "./types";

/** 散列表 复习题 */
export const dsaHashTablesQuestions: ReviewQuestion[] = [
  {
    id: "dsa-hash-tables-1",
    chapter: "dsa-hash-tables",
    level: 1,
    question: `散列表的平均查找时间复杂度是多少？`,
    answer: `O(1)。散列表通过散列函数将键直接映射到数组下标，平均查找 O(1)。最坏情况（所有键冲突）退化为 O(n)，但好的散列函数 + 合理装填因子下，平均接近 O(1)。`,
    tags: ["散列表", "查找复杂度"],
  },
  {
    id: "dsa-hash-tables-2",
    chapter: "dsa-hash-tables",
    level: 2,
    question: `分离链接法处理冲突时，装填因子 λ 可以大于 1 吗？`,
    answer: `可以，因为每个槽位可以挂多个元素的链表。分离链接法每个槽位挂链表，链表长度不受槽位数限制，所以 λ 可 >1。但 λ 越大链表越长，查找退化为 O(1+λ)，实践中仍需控制 λ。`,
    tags: ["分离链接", "装填因子"],
  },
  {
    id: "dsa-hash-tables-3",
    chapter: "dsa-hash-tables",
    level: 3,
    question: `开放寻址法（线性探测）为什么建议装填因子 λ < 0.75？`,
    answer: `λ 过高导致聚集严重，查找退化为 O(n)。线性探测会产生初级聚集（primary clustering），λ 越高连续占用块越长。查找代价 O(1/(1-λ))，λ→1 时趋向 O(n)。保持 λ<0.75 可控制聚集程度。`,
    tags: ["开放寻址", "聚集"],
  },
  {
    id: "dsa-hash-tables-4",
    chapter: "dsa-hash-tables",
    level: 4,
    question: `C++ std::unordered_map 通常用什么冲突处理策略？`,
    answer: `分离链接法（链表）。C++ 标准未规定实现，但主流实现（GCC libstdc++、Clang libc++）均用分离链接法。每个桶挂单链表，λ 超过阈值（通常 1.0）时再散列扩容。`,
    tags: ["unordered_map", "分离链接"],
  },
];
