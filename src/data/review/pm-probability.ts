import type { ReviewQuestion } from "./types";

/** 概率论基础 复习题 */
export const pmProbabilityQuestions: ReviewQuestion[] = [
  {
    id: "pm-probability-1",
    chapter: "pm-probability",
    level: 1,
    question: `古典概率的定义和前提条件是什么？`,
    answer: `P(A) = 有利事件数 / 总事件数。前提是每个基本事件等可能（如公平骰子各面概率相同）。不等可能时不能用古典概率。`,
    tags: ["古典概率", "定义"],
  },
  {
    id: "pm-probability-2",
    chapter: "pm-probability",
    level: 2,
    question: `条件概率 P(A|B) 的公式是什么？`,
    answer: `P(A|B) = P(A∩B) / P(B)。即在 B 发生的条件下 A 发生的概率，等于 A 和 B 同时发生的概率除以 B 发生的概率。`,
    tags: ["条件概率", "公式"],
  },
  {
    id: "pm-probability-3",
    chapter: "pm-probability",
    level: 3,
    question: `贝叶斯定理的公式和含义是什么？`,
    answer: `P(B|A) = P(A|B)·P(B)/P(A)。从结果 A 推断原因 B 的概率，等于 B 导致 A 的概率乘以 B 的先验概率再除以 A 的总概率。`,
    tags: ["贝叶斯", "逆推理"],
  },
  {
    id: "pm-probability-4",
    chapter: "pm-probability",
    level: 4,
    question: `为什么检测准确率 99%、发病率 1% 时，阳性真阳性率仅约 16.7%？`,
    answer: `误报人数 = 0.05×0.99 = 4.95%（健康人误报），真阳性 = 0.99×0.01 = 0.99%。阳性中真阳性占比 = 0.99/(0.99+4.95) ≈ 16.7%。健康人基数大，少量误报就远超真阳性。这是「基础概率忽视」。`,
    tags: ["贝叶斯", "医学检测"],
  },
];
