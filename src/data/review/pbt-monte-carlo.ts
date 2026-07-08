import type { ReviewQuestion } from "./types";

/** 蒙特卡洛积分 复习题 */
export const pbtMonteCarloQuestions: ReviewQuestion[] = [
  {
    id: "pbt-monte-carlo-1",
    chapter: "pbt-monte-carlo",
    level: 1,
    question: "蒙特卡洛积分估计量的公式是什么？",
    answer: "F_N = (1/N) Σ f(Xi)/p(Xi)，其中 Xi 是按概率密度 p(x) 采样的随机变量，N 是采样数。",
    tags: ["蒙特卡洛", "公式"],
  },
  {
    id: "pbt-monte-carlo-2",
    chapter: "pbt-monte-carlo",
    level: 2,
    question: "为什么蒙特卡洛积分适合求解光传输方程？",
    answer: "光传输方程是高维积分（每次反射增加2维），解析解不可能，传统数值积分（如梯形法）维度灾难导致计算量爆炸。蒙特卡洛的收敛速率 O(1/√N) 与维度无关，是求解高维积分的唯一可行方法。",
    tags: ["光传输", "维度无关"],
  },
  {
    id: "pbt-monte-carlo-3",
    chapter: "pbt-monte-carlo",
    level: 3,
    question: "证明俄罗斯轮盘赌保持无偏性。",
    answer: "设路径贡献为 L，以概率 q 继续追踪。继续时返回 L/q，终止时返回0。期望 E = q·(L/q) + (1-q)·0 = L，等于不截断的真实值，所以无偏。方差增加但期望不变。",
    tags: ["俄罗斯轮盘赌", "无偏性"],
  },
  {
    id: "pbt-monte-carlo-4",
    chapter: "pbt-monte-carlo",
    level: 4,
    question: "设计一个对 Lambert 漫反射表面的重要性采样方案，分析其方差缩减效果。",
    answer: "Lambert BRDF 为常数 ρ/π，被积函数 ∝ cosθ。取采样分布 p(ω) = cosθ/π（余弦加权半球分布），则 f/p = 常数，方差为零。实现：φ=2πu1, cosθ=√(1-u2)。相比均匀采样（f/p ∝ cosθ/(1/2π)，方差正比于 E[cos²θ]），余弦采样消除了 cosθ 的随机性，理论上方差为零，实际中因光源分布非均匀仍有残余方差，但已大幅降低。",
    tags: ["重要性采样", "Lambert", "综合"],
  },
];