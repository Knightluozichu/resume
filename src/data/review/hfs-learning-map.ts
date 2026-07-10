import type { ReviewQuestion } from "./types";

/** 深入浅出统计学全书学习地图 复习题 */
export const hfsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "hfs-learning-map-1",
    chapter: "hfs-learning-map",
    level: 1,
    question: `深入浅出统计学全书分为哪四大板块？`,
    answer: `统计基础（数据展示）、集中趋势与离散、概率与分布、统计推断。全书按「描述→模型化→推断」递进。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "hfs-learning-map-2",
    chapter: "hfs-learning-map",
    level: 2,
    question: `描述统计和推断统计的区别是什么？`,
    answer: `描述统计总结已知数据（均值/方差/图表），回答「数据长什么样」。推断统计从样本推断总体（置信区间/假设检验），回答「总体长什么样」。描述是基础，推断是目标。`,
    tags: ["描述统计", "推断统计"],
  },
  {
    id: "hfs-learning-map-3",
    chapter: "hfs-learning-map",
    level: 3,
    question: `概率论和统计学的方向有什么不同？`,
    answer: `概率论是「已知模型推结果」（已知公平骰子求掷出6的概率）。统计学是「已知结果推模型」（掷1000次骰子推断是否公平）。方向相反，工具相通。`,
    tags: ["概率论", "统计学"],
  },
  {
    id: "hfs-learning-map-4",
    chapter: "hfs-learning-map",
    level: 4,
    question: `为什么正态分布是统计推断的理论基础？`,
    answer: `中心极限定理保证样本均值近似正态分布（无论总体分布），使得置信区间和假设检验可以基于正态分布构造。许多统计方法都假设正态性。`,
    tags: ["正态分布", "统计推断"],
  },
];
