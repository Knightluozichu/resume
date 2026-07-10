import type { ReviewQuestion } from "./types";

/** 程序员的数学总复习 复习题 */
export const pmFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "pm-final-review-1",
    chapter: "pm-final-review",
    level: 1,
    question: `全书四大板块的递进关系是什么？`,
    answer: `数学基础（0和1）→概率思维（排列组合→概率→贝叶斯）→统计思维（描述统计→随机变量→分布）→高级数学（递归→加密）。排列组合支撑概率，概率支撑统计，递归和加密是综合应用。`,
    tags: ["全书结构", "复习"],
  },
  {
    id: "pm-final-review-2",
    chapter: "pm-final-review",
    level: 2,
    question: `程序员的数学核心方法论是什么？`,
    answer: `三步循环：直觉（日常语言建立概念）→形式化（数学语言精确定义）→代码验证（Python实现验证理论）。确保既理解为什么又掌握怎么做。`,
    tags: ["方法论", "核心"],
  },
  {
    id: "pm-final-review-3",
    chapter: "pm-final-review",
    level: 3,
    question: `贝叶斯定理在全书中的地位是什么？`,
    answer: `贝叶斯定理是概率论的核心，将条件概率逆转（从结果推原因）。是机器学习、医学诊断、垃圾邮件过滤的数学基础。连接了概率思维和统计思维。`,
    tags: ["贝叶斯", "核心"],
  },
  {
    id: "pm-final-review-4",
    chapter: "pm-final-review",
    level: 4,
    question: `排列组合如何支撑概率论？`,
    answer: `古典概率 = 有利/总数，计算这两个数需要排列组合。不掌握排列组合就无法正确计数，概率就算不对。排列组合是概率论的计数基础。`,
    tags: ["排列组合", "概率基础"],
  },
];
