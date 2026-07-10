import type { ReviewQuestion } from "./types";

/** 随机变量与期望 复习题 */
export const pmRandomVariablesQuestions: ReviewQuestion[] = [
  {
    id: "pm-random-variables-1",
    chapter: "pm-random-variables",
    level: 1,
    question: `离散型和连续型随机变量的区别是什么？`,
    answer: `离散型取可数个值（如骰子点数1-6），用概率质量函数 P(X=x) 描述。连续型取连续区间（如身高），用概率密度函数 f(x) 描述，单点概率为0。`,
    tags: ["随机变量", "分类"],
  },
  {
    id: "pm-random-variables-2",
    chapter: "pm-random-variables",
    level: 2,
    question: `期望的定义公式是什么？为什么叫加权平均？`,
    answer: `E[X] = Σ x·P(X=x)。每个值乘以其概率再求和，概率大的值贡献大。与等权重普通平均不同，期望按概率加权。`,
    tags: ["期望", "加权平均"],
  },
  {
    id: "pm-random-variables-3",
    chapter: "pm-random-variables",
    level: 3,
    question: `掷骰子的期望是多少？为什么不可能掷出这个值？`,
    answer: `E[X] = (1+2+3+4+5+6)/6 = 3.5。期望是加权平均（长期平均值的预测），不一定是可能值。骰子只有整数面，不可能掷出 3.5。`,
    tags: ["期望", "骰子"],
  },
  {
    id: "pm-random-variables-4",
    chapter: "pm-random-variables",
    level: 4,
    question: `Var(X+Y) = Var(X) + Var(Y) 什么时候成立？`,
    answer: `当 X 和 Y 独立时。一般情况 Var(X+Y) = Var(X)+Var(Y)+2Cov(X,Y)。正相关时方差更大，负相关时更小。这是分散投资降低风险的原理。`,
    tags: ["方差", "独立性"],
  },
];
