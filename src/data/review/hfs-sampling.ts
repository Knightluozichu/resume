import type { ReviewQuestion } from "./types";

/** 抽样与中心极限定理 复习题 */
export const hfsSamplingQuestions: ReviewQuestion[] = [
  {
    id: "hfs-sampling-1",
    chapter: "hfs-sampling",
    level: 1,
    question: "中心极限定理的内容是什么？",
    answer: "无论总体分布如何，n≥30 时样本均值近似正态 N(μ,σ²/n)。不需要知道总体分布形状就能用正态分布做统计推断。统计推断的理论基石。",
    tags: ["中心极限定理", "核心"],
  },
  {
    id: "hfs-sampling-2",
    chapter: "hfs-sampling",
    level: 2,
    question: "样本均值的期望和标准误是什么？",
    answer: "E[x̄]=μ（等于总体均值），SE=σ/√n（标准误）。n 越大 SE 越小，样本均值越集中在 μ 附近。n 翻4倍 SE 减半。",
    tags: ["标准误", "样本均值"],
  },
  {
    id: "hfs-sampling-3",
    chapter: "hfs-sampling",
    level: 3,
    question: "简单随机抽样、分层抽样、整群抽样的区别？",
    answer: "简单随机：每个个体等概率。分层：分层后层内抽样，保证各层代表。整群：抽群后全查，省成本但精度可能低。分层通常最精确。",
    tags: ["抽样方法", "对比"],
  },
  {
    id: "hfs-sampling-4",
    chapter: "hfs-sampling",
    level: 4,
    question: "为什么说抽样质量比样本量更重要？",
    answer: "有偏抽样（如只在网上调查）再大样本也只精确估计错误目标——「精确地犯错」。1936年《文学文摘》240万人调查预测失败就是抽样偏差案例。无偏小样本优于有偏大样本。",
    tags: ["抽样偏差", "质量"],
  },
];
