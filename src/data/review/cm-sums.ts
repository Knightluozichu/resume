import type { ReviewQuestion } from "./types";

/** 求和：记号、法则与扰动法 复习题 */
export const cmSumsQuestions: ReviewQuestion[] = [
  {
    id: "cm-sums-1",
    chapter: "cm-sums",
    level: 1,
    question: "求和的三条基本法则是什么？",
    answer: "分配律 Σc·a_k=c·Σa_k，结合律 Σ(a_k+b_k)=Σa_k+Σb_k，交换律（可改变求和顺序）。",
    tags: ["求和法则"],
  },
  {
    id: "cm-sums-2",
    chapter: "cm-sums",
    level: 2,
    question: "扰动法的核心操作是什么？",
    answer: "在 S_n 两端各加一项：S_n+a_{n+1}=a_0+Σ_{k=1}^{n+1}a_k。右端换元令 j=k-1 使下标从 0 开始，消去 a_0 后右端化为含 S_n 的表达式，移项解出 S_n。",
    tags: ["扰动法"],
  },
  {
    id: "cm-sums-3",
    chapter: "cm-sums",
    level: 3,
    question: "用扰动法求 Σ k·2^k 的闭式。",
    answer: "S_n+(n+1)2^{n+1}=2S_n+2(2^{n+1}-1)，移项得 S_n=(n+1)2^{n+1}-2^{n+2}+2=(n-1)2^{n+1}+2。",
    tags: ["扰动法", "计算"],
  },
  {
    id: "cm-sums-4",
    chapter: "cm-sums",
    level: 4,
    question: "为什么 Σk³=(Σk)²？用下降幂解释。",
    answer: "k³=k³_+3k²_+k_。Σk³_=6C(n+1,3)，Σ3k²_=6C(n+1,2)，Σk_=C(n+1,1)。组合化简后 Σk³=C(n+1,1)·[2C(n+1,2)+C(n+1,1)]... 实际上 Σk³=n²(n+1)²/4=(n(n+1)/2)²=(Σk)²。根源在于 k³ 的下降幂展开与组合计数的自然对应。",
    tags: ["下降幂", "证明"],
  },
];
