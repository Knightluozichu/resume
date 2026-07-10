import type { ReviewQuestion } from "./types";

/** 连续概率分布 复习题 */
export const hfsContinuousDistributionsQuestions: ReviewQuestion[] = [
  {
    id: "hfs-continuous-distributions-1",
    chapter: "hfs-continuous-distributions",
    level: 1,
    question: `概率密度函数的值是概率吗？单点概率是多少？`,
    answer: `不是。PDF 值 f(x) 是密度，可大于1。概率是曲线下面积（积分）。连续变量单点概率为0——只有区间概率才有意义：P(a<X<b)=∫f(x)dx。`,
    tags: ["概率密度", "单点"],
  },
  {
    id: "hfs-continuous-distributions-2",
    chapter: "hfs-continuous-distributions",
    level: 2,
    question: `正态分布的 68-95-99.7 法则是什么？`,
    answer: `约 68% 数据在 μ±1σ 内，95% 在 μ±2σ 内，99.7% 在 μ±3σ 内。用于快速判断数据是否异常（偏离3σ可能是异常值）。`,
    tags: ["正态分布", "法则"],
  },
  {
    id: "hfs-continuous-distributions-3",
    chapter: "hfs-continuous-distributions",
    level: 3,
    question: `Z 分数的公式和用途是什么？`,
    answer: `Z=(x-μ)/σ。将任意正态分布 N(μ,σ²) 标准化为标准正态 N(0,1)，便于查表求概率。如 Z=1 对应 P(X<x)=0.8413。`,
    tags: ["Z分数", "标准化"],
  },
  {
    id: "hfs-continuous-distributions-4",
    chapter: "hfs-continuous-distributions",
    level: 4,
    question: `指数分布和泊松分布的关系是什么？`,
    answer: `对偶关系。泊松描述单位时间事件次数（离散计数），指数描述两次事件间等待时间（连续时间）。泊松的 λ 对应指数的 1/期望。`,
    tags: ["指数分布", "泊松分布"],
  },
];
