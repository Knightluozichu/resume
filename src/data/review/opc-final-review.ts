import type { ReviewQuestion } from "./types";

/** Optimized C++ · 十三章综合复盘题 */
export const opcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "opc-final-review-1",
    chapter: "opc-final-review",
    level: 1,
    question: "如何把一个 p99 性能事故映射到官方 13 章，而不是列优化技巧？",
    answer:
      "先用第1-3章定义目标、机器机制和可复现测量；第4-8章分解 string/algorithm/allocation/dispatch/library work；第9-10章核算 key/lookup/container 完整生命周期；第11-13章审计 I/O boundary、execution/queue/backpressure 与 storage/object lifetime。每个 cause 都要有 counter-experiment 和系统上限。",
    tags: ["十三章", "事故分析", "因果分解"],
  },
  {
    id: "opc-final-review-2",
    chapter: "opc-final-review",
    level: 2,
    question:
      "为什么 parse、lookup、I/O、queue、allocator 应分成多个 optimization waves？",
    answer:
      "每波只改变一个主要 mechanism，才能归因 effect、定位 correctness regression 并独立回滚。顺序从删除 parse/string work、替换 lookup/layout、batch I/O+bounded queue，到 allocation 仍 material 时才 specialize storage。每波结束必须重新 profile/Amdahl；旧占比不能预先决定后续。",
    tags: ["wave", "单变量", "reprofile"],
  },
  {
    id: "opc-final-review-3",
    chapter: "opc-final-review",
    level: 3,
    question:
      "一个 lookup microbenchmark 快 3 倍，但端到端只省 4 ms、RSS 超预算，应该怎样处理？",
    answer:
      "拒绝并回滚：它未通过 material performance 和 resource gate。分解 RSS 来自 duplicated keys、buckets、dual index 或 retention，再把透明 lookup、compact key/flat structure 作为新的单变量候选。局部倍数不能覆盖端到端 Amdahl 上限、RSS、build/update/export 与 correctness contract。",
    tags: ["发布门", "局部优化", "资源预算"],
  },
  {
    id: "opc-final-review-4",
    chapter: "opc-final-review",
    level: 4,
    question:
      "达到 product goal 后，什么条件下还允许做 lock-free queue 或 custom arena？",
    answer:
      "默认停止并写 regression guard。只有新目标/容量预测显示不足，且新 profile 证明 queue/allocation 是 material hotspot、Amdahl ceiling 覆盖 correctness/maintenance 风险，才各开独立 wave。lock-free 需 memory-order/reclamation/MPMC tests；arena 需 alignment/lifetime/thread/throw tests；都要端到端 A/B 和 rollback。",
    tags: ["停止规则", "高风险优化", "守卫"],
  },
];
