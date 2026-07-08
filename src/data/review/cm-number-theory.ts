import type { ReviewQuestion } from "./types";

/** 数论：整除、素数与同余 复习题 */
export const cmNumberTheoryQuestions: ReviewQuestion[] = [
  {
    id: "cm-number-theory-1",
    chapter: "cm-number-theory",
    level: 1,
    question: "Euclid 算法的基本递归是什么？",
    answer: "gcd(a,b)=gcd(a mod b, b)，基础情况 gcd(a,0)=a。复杂度 O(log n)，最坏情况是 Fibonacci 数。",
    tags: ["Euclid"],
  },
  {
    id: "cm-number-theory-2",
    chapter: "cm-number-theory",
    level: 2,
    question: "Euler φ 函数的公式和积性是什么？",
    answer: "φ(n)=n·∏(1-1/p)（p|n）。积性：gcd(m,n)=1 时 φ(mn)=φ(m)φ(n)。恒等式 Σ_{d|n}φ(d)=n。",
    tags: ["Euler φ"],
  },
  {
    id: "cm-number-theory-3",
    chapter: "cm-number-theory",
    level: 3,
    question: "中国剩余定理如何构造解？",
    answer: "令 M=∏m_i, M_i=M/m_i, 求 M_i 模 m_i 的逆 M_i^{-1}。解 x=Σa_i·M_i·M_i^{-1} mod M。前提是 m_i 两两互素。",
    tags: ["CRT"],
  },
  {
    id: "cm-number-theory-4",
    chapter: "cm-number-theory",
    level: 4,
    question: "用双射论证证明 Σ_{d|n}φ(d)=n。",
    answer: "考虑 n 个分数 k/n（k=1..n）。约分后分母为 d（d|n）的恰有 φ(d) 个（因分子需与 d 互素）。每个分数约分后分母唯一确定一个 d|n，故 Σ_{d|n}φ(d)=n。",
    tags: ["证明", "Euler φ"],
  },
];
