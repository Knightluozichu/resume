import type { ReviewQuestion } from "./types";

/** 概率分布 复习题 */
export const pmDistributionsQuestions: ReviewQuestion[] = [
  {
    id: "pm-distributions-1",
    chapter: "pm-distributions",
    level: 1,
    question: "二项分布的概率公式、期望和方差是什么？",
    answer: "P(X=k) = C(n,k)·p^k·(1-p)^(n-k)。期望 E[X]=np，方差 Var(X)=np(1-p)。描述 n 次独立伯努利试验成功 k 次的概率。",
    tags: ["二项分布", "公式"],
  },
  {
    id: "pm-distributions-2",
    chapter: "pm-distributions",
    level: 2,
    question: "正态分布的 68-95-99.7 法则是什么？",
    answer: "约 68% 数据在 μ±1σ 内，95% 在 μ±2σ 内，99.7% 在 μ±3σ 内。用于快速判断数据是否异常。",
    tags: ["正态分布", "法则"],
  },
  {
    id: "pm-distributions-3",
    chapter: "pm-distributions",
    level: 3,
    question: "泊松分布的参数、期望和方差是什么？",
    answer: "参数 λ（单位时间平均事件数）。期望和方差都等于 λ。描述单位时间/空间内稀有事件发生次数。",
    tags: ["泊松分布", "参数"],
  },
  {
    id: "pm-distributions-4",
    chapter: "pm-distributions",
    level: 4,
    question: "为什么正态分布被称为「分布之王」？",
    answer: "1) 中心极限定理：大量独立变量之和趋近正态；2) 统计推断基础：t/χ²/F 分布从正态导出；3) 数学性质优美：仅由 μ 和 σ 决定，线性变换保持正态性。",
    tags: ["正态分布", "核心地位"],
  },
];
