import type { ReviewQuestion } from "./types";

/** 综合复习：全书知识链与综合应用 复习题 */
export const cmFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cm-final-review-1",
    chapter: "cm-final-review",
    level: 1,
    question: "Concrete Mathematics 的核心方法论是什么？",
    answer: "先猜后证：用小例子猜闭式，用数学归纳法验证。配合成套方法处理参数化递归。全书工具链：递归→求和→数论→生成函数→概率。",
    tags: ["方法论"],
  },
  {
    id: "cm-final-review-2",
    chapter: "cm-final-review",
    level: 2,
    question: "面对组合问题如何选择工具？",
    answer: "决策树：有递归→递归+求和；有参数→成套方法或生成函数；有取整/mod→整函数；有随机性→PGF。先猜后证贯穿全程。",
    tags: ["工具选择"],
  },
  {
    id: "cm-final-review-3",
    chapter: "cm-final-review",
    level: 3,
    question: "用全书工具链分析 Catalan 数。",
    answer: "递推 C_{n+1}=ΣC_kC_{n-k} → 生成函数 C(z)=1+zC(z)² → 解二次方程 C(z)=(1-√(1-4z))/(2z) → 展开系数 C_n=C(2n,n)/(n+1)。每步用不同工具，完整展示工具链。",
    tags: ["综合"],
  },
  {
    id: "cm-final-review-4",
    chapter: "cm-final-review",
    level: 4,
    question: "散列分析如何综合运用概率与生成函数？",
    answer: "建模：探查次数 X 服从几何分布。PGF：G(z)=(1-α)/(1-αz)。求矩：E[X]=G'(1)=1/(1-α)（不成功查找）。成功查找需条件期望：(1/α)ln(1/(1-α))。PGF 把概率问题变成代数求导。",
    tags: ["综合", "PGF"],
  },
];
