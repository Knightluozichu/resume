import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const dsaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dsa-final-review-1",
    chapter: "dsa-final-review",
    level: 1,
    question: "Top-K 问题（找出频率前 K 高的元素）的最优时间复杂度是？",
    answer: "O(n log k)，散列表统计 + 小顶堆维护。散列表统计频率 O(n)，小顶堆维护大小 K 的堆 O(n log k)。当 k << n 时远优于排序的 O(n log n)。综合了散列表（频率统计）和堆（Top-K 维护）两种数据结构。",
    tags: ["Top-K", "小顶堆"],
  },
  {
    id: "dsa-final-review-2",
    chapter: "dsa-final-review",
    level: 2,
    question: "C++ std::map 和 std::unordered_map 的核心区别是什么？",
    answer: "map 基于红黑树 O(log n) 有序，unordered_map 基于散列表 O(1) 无序。std::map 用红黑树，操作 O(log n)，键有序，支持范围查询。std::unordered_map 用散列表，平均 O(1) 但最坏 O(n)，无序。需有序遍历/范围查询选 map，仅需精确查找选 unordered_map。",
    tags: ["std::map", "unordered_map"],
  },
  {
    id: "dsa-final-review-3",
    chapter: "dsa-final-review",
    level: 3,
    question: "判断有向图是否有环，最优方法是什么？",
    answer: "DFS 三色标记或 Kahn 拓扑排序，O(V+E)。有向图判环用 DFS 三色标记（遇灰色节点即成环）或 Kahn 拓扑排序（输出数 < 节点数即有环），均为 O(V+E)。并查集仅适用于无向图判环。Kahn 额外给出拓扑序。",
    tags: ["有向图", "判环", "拓扑排序"],
  },
  {
    id: "dsa-final-review-4",
    chapter: "dsa-final-review",
    level: 4,
    question: "为什么复杂度低的算法在实际中不一定更快？",
    answer: "缓存局部性等硬件因素使实际性能偏离理论复杂度。复杂度分析忽略常数和硬件效应。CPU 缓存对连续访问（数组）远友好于跳跃访问（链表/堆）。小数组上线性搜索可能比二分搜索快（缓存效应）。实际选型需要 benchmark 验证。",
    tags: ["缓存局部性", "实际性能"],
  },
];
