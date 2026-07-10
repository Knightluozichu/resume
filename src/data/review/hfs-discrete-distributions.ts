import type { ReviewQuestion } from "./types";

/** 离散概率分布 复习题 */
export const hfsDiscreteDistributionsQuestions: ReviewQuestion[] = [
  {
    id: "hfs-discrete-distributions-1",
    chapter: "hfs-discrete-distributions",
    level: 1,
    question: `二项分布的概率公式、期望和方差是什么？`,
    answer: `P(X=k)=C(n,k)·p^k·(1-p)^(n-k)。E[X]=np，Var(X)=np(1-p)。描述 n 次独立伯努利试验成功 k 次的概率。`,
    tags: ["二项分布", "公式"],
  },
  {
    id: "hfs-discrete-distributions-2",
    chapter: "hfs-discrete-distributions",
    level: 2,
    question: `几何分布描述什么？期望是什么？`,
    answer: `首次成功所需试验次数。P(X=k)=(1-p)^(k-1)·p。E[X]=1/p。如命中率40%平均需投2.5次首次命中。`,
    tags: ["几何分布", "期望"],
  },
  {
    id: "hfs-discrete-distributions-3",
    chapter: "hfs-discrete-distributions",
    level: 3,
    question: `泊松分布何时近似二项分布？`,
    answer: `n 大（≥20）、p 小（≤0.05）时，Poisson(λ=np) 近似 B(n,p)。泊松只有一个参数 λ 更简洁，计算量更小。`,
    tags: ["泊松", "近似"],
  },
  {
    id: "hfs-discrete-distributions-4",
    chapter: "hfs-discrete-distributions",
    level: 4,
    question: `泊松分布的期望和方差有什么特殊性质？`,
    answer: `期望和方差都等于 λ。这是泊松分布的独有特性——均值和方差相等，可用于检验数据是否服从泊松分布（样本均值≈样本方差则可能泊松）。`,
    tags: ["泊松", "E=Var=λ"],
  },
];
