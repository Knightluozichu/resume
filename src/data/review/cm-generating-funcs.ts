import type { ReviewQuestion } from "./types";

/** 生成函数：OGF、EGF 与解递归 复习题 */
export const cmGeneratingFuncsQuestions: ReviewQuestion[] = [
  {
    id: "cm-generating-funcs-1",
    chapter: "cm-generating-funcs",
    level: 1,
    question: "OGF 和 EGF 的定义分别是什么？",
    answer: "OGF: G(z)=Σa_n z^n（无标号组合）。EGF: EG(z)=Σa_n z^n/n!（有标号组合）。区别在于分母的 n!。",
    tags: ["定义"],
  },
  {
    id: "cm-generating-funcs-2",
    chapter: "cm-generating-funcs",
    level: 2,
    question: "用生成函数解递归的三个步骤是什么？",
    answer: "1. 把递推乘以 z^n 求和，用移位法则把各项用 G(z) 表示，得关于 G(z) 的方程；2. 解代数方程得 G(z)=...；3. 部分分式分解后展开为几何级数，读取系数 a_n。",
    tags: ["流程"],
  },
  {
    id: "cm-generating-funcs-3",
    chapter: "cm-generating-funcs",
    level: 3,
    question: "推导 Fibonacci 的生成函数和闭式。",
    answer: "G(z)-z=zG(z)+z²G(z) → G(z)=z/(1-z-z²)。分母=(1-φz)(1-φ̂z)，部分分式展开后 F_n=(φ^n-φ̂^n)/√5，φ=(1+√5)/2。",
    tags: ["Fibonacci"],
  },
  {
    id: "cm-generating-funcs-4",
    chapter: "cm-generating-funcs",
    level: 4,
    question: "Catalan 数的生成函数方程 C(z)=1+zC(z)² 怎么来的？",
    answer: "Catalan 递推 C_{n+1}=Σ_{k=0}^n C_k·C_{n-k} 是卷积形式。对应 G=1+z·G²（加 1 是 C_0=1 的基础项，z 是移位，G² 是卷积）。解二次方程取使 C(0)=1 的根得 C(z)=(1-√(1-4z))/(2z)。",
    tags: ["Catalan", "推导"],
  },
];
