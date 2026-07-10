import type { ReviewQuestion } from "./types";

/** 深入浅出统计学总复习 复习题 */
export const hfsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "hfs-final-review-1",
    chapter: "hfs-final-review",
    level: 1,
    question: `全书四大板块的递进关系是什么？`,
    answer: `统计基础（数据展示）→集中趋势与离散（描述统计）→概率与分布（模型化）→统计推断（从样本推总体）。描述→建模→推断，中心极限定理是关键桥梁。`,
    tags: ["全书结构", "复习"],
  },
  {
    id: "hfs-final-review-2",
    chapter: "hfs-final-review",
    level: 2,
    question: `统计学核心方法论是什么？`,
    answer: `三步循环：描述（均值/方差/图表）→建模（概率分布）→推断（置信区间/假设检验）。核心是「从局部推断全局，在不确定性中做决策」。`,
    tags: ["方法论", "核心"],
  },
  {
    id: "hfs-final-review-3",
    chapter: "hfs-final-review",
    level: 3,
    question: `中心极限定理如何连接概率分布与统计推断？`,
    answer: `无论总体分布如何，n≥30 时样本均值近似正态。这使得我们可以用正态分布构造置信区间和假设检验，不需要知道总体分布形状。CLT 是描述统计到推断统计的桥梁。`,
    tags: ["中心极限定理", "桥梁"],
  },
  {
    id: "hfs-final-review-4",
    chapter: "hfs-final-review",
    level: 4,
    question: `95% 置信区间的正确解释是什么？`,
    answer: `重复抽样100次构造100个区间，约95个包含真值。真值固定，区间随机。不能说「这个区间有95%概率包含真值」。95%是对方法的置信度。`,
    tags: ["置信区间", "解释"],
  },
];
