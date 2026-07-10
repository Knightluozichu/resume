import type { ReviewQuestion } from "./types";

/** 离散概率：均值、方差与 PGF 复习题 */
export const cmDiscreteProbQuestions: ReviewQuestion[] = [
  {
    id: "cm-discrete-prob-1",
    chapter: "cm-discrete-prob",
    level: 1,
    question: `期望和方差的定义是什么？`,
    answer: `E[X]=Σx·P(X=x)。V[X]=E[X²]-E[X]²。独立时 V[X+Y]=V[X]+V[Y]，E[aX+b]=aE[X]+b。`,
    tags: ["定义"],
  },
  {
    id: "cm-discrete-prob-2",
    chapter: "cm-discrete-prob",
    level: 2,
    question: `PGF 如何求期望和方差？`,
    answer: `E[X]=G'_X(1)（一阶导在 1 处）。V[X]=G''_X(1)+G'_X(1)-G'_X(1)²。独立和的 PGF 是各自 PGF 的乘积。`,
    tags: ["PGF"],
  },
  {
    id: "cm-discrete-prob-3",
    chapter: "cm-discrete-prob",
    level: 3,
    question: `散列表中装载因子 α 与期望探查数的关系？`,
    answer: `不成功查找：1/(1-α)。成功查找：(1/α)·ln(1/(1-α))。α→1 时两者都趋于无穷，故需保持 α 充分小（如 <0.75）。`,
    tags: ["散列"],
  },
  {
    id: "cm-discrete-prob-4",
    chapter: "cm-discrete-prob",
    level: 4,
    question: `用 PGF 推导二项分布的期望和方差。`,
    answer: `G(z)=(q+pz)^n。G'(1)=np=E[X]。G''(1)=n(n-1)p²。V[X]=G''(1)+G'(1)-G'(1)²=n(n-1)p²+np-n²p²=np(1-p)=npq。`,
    tags: ["推导", "PGF"],
  },
];
