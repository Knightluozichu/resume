import type { ReviewQuestion } from "./types";

/** 二项式系数：恒等式与技巧 复习题 */
export const cmBinomialQuestions: ReviewQuestion[] = [
  {
    id: "cm-binomial-1",
    chapter: "cm-binomial",
    level: 1,
    question: `二项式系数的广义定义是什么？`,
    answer: `C(r,k)=r^k_/k!=r(r-1)...(r-k+1)/k!，对任意实数 r 和非负整数 k 有定义。正整数 n 时退化为组合数 n!/(k!(n-k)!)。`,
    tags: ["定义"],
  },
  {
    id: "cm-binomial-2",
    chapter: "cm-binomial",
    level: 2,
    question: `上指标反转公式是什么？有什么用？`,
    answer: `C(-r,k)=(-1)^k·C(r+k-1,k)。把负上指标转化为正上指标，使 (1+z)^{-r} 的展开有组合意义，是处理负参数二项式求和的关键。`,
    tags: ["上指标反转"],
  },
  {
    id: "cm-binomial-3",
    chapter: "cm-binomial",
    level: 3,
    question: `用吸收律求 Σk·C(n,k)。`,
    answer: `k·C(n,k)=n·C(n-1,k-1)，故 Σk·C(n,k)=n·ΣC(n-1,k-1)=n·2^{n-1}。吸收律把含 k 的项吸进系数内部。`,
    tags: ["吸收律", "求和"],
  },
  {
    id: "cm-binomial-4",
    chapter: "cm-binomial",
    level: 4,
    question: `用生成函数证明范德蒙恒等式。`,
    answer: `(1+z)^r·(1+z)^s=(1+z)^{r+s}。左端 z^n 系数为 Σ_k C(r,k)C(s,n-k)，右端为 C(r+s,n)。因两端为同一函数，对应系数相等，得范德蒙恒等式。`,
    tags: ["生成函数", "证明"],
  },
];
