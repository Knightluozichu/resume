import type { ReviewQuestion } from "./types";

/** Optimized C++ · 官方十三章学习地图复习题 */
export const opcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "opc-learning-map-1",
    chapter: "opc-learning-map",
    level: 1,
    question: "官方第一版 13 章怎样形成三阶段连续路线？",
    answer:
      "第1-3章建立 goal、machine-cost model 与 measurement evidence；第4-8章从 string、algorithm、dynamic variables、hot statements、libraries 删除/重塑 work；第9-13章处理 search/sort、containers、I/O、concurrency、memory management 的系统资源契约。后一阶段使用前一阶段的 baseline、ownership 和因果证据。",
    tags: ["官方13章", "学习地图", "阶段依赖"],
  },
  {
    id: "opc-learning-map-2",
    chapter: "opc-learning-map",
    level: 2,
    question:
      "为什么优化杠杆通常按 goal/workload → algorithm/work → representation/ownership → library/call path → statement/manager 排序？",
    answer:
      "越靠前越可能删除数量级或无关工作，端到端上限更大且 context specificity 更低；越靠后通常只缩小常数并增加 ABI、lifetime、thread 或维护风险。每轮仍要按当前 profile 和 Amdahl ceiling 决定；前级改动造成 bottleneck shift 后必须重新排序。",
    tags: ["杠杆顺序", "Amdahl", "bottleneck shift"],
  },
  {
    id: "opc-learning-map-3",
    chapter: "opc-learning-map",
    level: 3,
    question:
      "predict、baseline、controlled change、system validation、guard/rollback 五道证据门各拒绝什么？",
    answer:
      "Predict 拒绝无目标/机制的提案；baseline 拒绝无法复现的 before；controlled change 拒绝多变量和语义变化；system validation 拒绝局部快但 tail/CPU/RSS/queue 退化；guard/rollback 拒绝无法持续检测或安全撤销。失败实验进 notebook 并回滚代码。",
    tags: ["证据链", "实验", "回滚"],
  },
  {
    id: "opc-learning-map-4",
    chapter: "opc-learning-map",
    level: 4,
    question: "为一个陌生 C++ 服务写出读完 13 章后的最小性能工程交付物。",
    answer:
      "应包含 workload+correctness+resource/lifecycle contract、Amdahl 上限、representative baseline/raw samples、profile/counter causal decomposition、最高杠杆候选、ownership/structure/I-O/concurrency/storage contracts、单变量 A/B、p50/p99/throughput/CPU/RSS/queue/failure 结果、bottleneck shift、regression guard 与 feature-flag rollback。",
    tags: ["综合", "交付物", "工程闭环"],
  },
];
