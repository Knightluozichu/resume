import type { ReviewQuestion } from "./types";

/** Stirling 数：两类转换与互逆关系 复习题 */
export const cmStirlingQuestions: ReviewQuestion[] = [
  {
    id: "cm-stirling-1",
    chapter: "cm-stirling",
    level: 1,
    question: `两类 Stirling 数的组合意义分别是什么？`,
    answer: `第二类 S(n,k)：n 元素分成 k 个非空无标号子集。第一类 s(n,k)：n 元素排成 k 个轮换（有内部顺序）。`,
    tags: ["定义"],
  },
  {
    id: "cm-stirling-2",
    chapter: "cm-stirling",
    level: 2,
    question: `普通幂与下降幂的 Stirling 转换公式是什么？`,
    answer: `x^n=ΣS(n,k)·x^k_（普通→下降），x^n_=Σs(n,k)·x^k（下降→普通）。两类 Stirling 矩阵互逆。`,
    tags: ["转换"],
  },
  {
    id: "cm-stirling-3",
    chapter: "cm-stirling",
    level: 3,
    question: `离散微积分的基本求和公式是什么？`,
    answer: `Σ_{k=0}^{n-1}k^m_=(n)^{m+1}_/(m+1)，类比 ∫x^m dx=x^{m+1}/(m+1)。差分 Δx^m_=m·x^{m-1}_ 类比微分。`,
    tags: ["离散微积分"],
  },
  {
    id: "cm-stirling-4",
    chapter: "cm-stirling",
    level: 4,
    question: `用 Stirling 数和离散微积分求 Σk²。`,
    answer: `k²=k_+k²_（因 S(2,1)=1,S(2,2)=1）。Σk_=n(n+1)/2，Σk²_=(n+1)n(n-1)/3。故 Σk²=n(n+1)/2+n(n+1)(n-1)/3=n(n+1)(2n+1)/6。`,
    tags: ["计算", "离散微积分"],
  },
];
