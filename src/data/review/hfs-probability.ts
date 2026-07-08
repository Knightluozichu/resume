import type { ReviewQuestion } from "./types";

/** 概率基础 复习题 */
export const hfsProbabilityQuestions: ReviewQuestion[] = [
  {
    id: "hfs-probability-1",
    chapter: "hfs-probability",
    level: 1,
    question: "样本空间和事件的定义是什么？",
    answer: "样本空间 Ω 是随机试验所有可能结果的集合。事件是样本空间的子集。等可能时 P(A) = 有利结果数/总结果数。",
    tags: ["样本空间", "事件"],
  },
  {
    id: "hfs-probability-2",
    chapter: "hfs-probability",
    level: 2,
    question: "加法法则和乘法法则的公式分别是什么？",
    answer: "加法（或）：P(A∪B)=P(A)+P(B)-P(A∩B)，互斥时 P(A∪B)=P(A)+P(B)。乘法（且）：P(A∩B)=P(A)×P(B|A)，独立时 P(A∩B)=P(A)×P(B)。",
    tags: ["概率法则", "公式"],
  },
  {
    id: "hfs-probability-3",
    chapter: "hfs-probability",
    level: 3,
    question: "独立事件和互斥事件的区别是什么？",
    answer: "独立：P(B|A)=P(B)，A不影响B，可以同时发生。互斥：P(A∩B)=0，不可能同时发生。互斥一定不独立（除非概率为0）。",
    tags: ["独立", "互斥"],
  },
  {
    id: "hfs-probability-4",
    chapter: "hfs-probability",
    level: 4,
    question: "赌徒谬误的本质错误是什么？",
    answer: "将「长期频率趋近概率」（大数定律）误用于短期序列。每次抛硬币独立，连续10次正面后第11次正面概率仍为1/2。之前的结果不影响独立事件。",
    tags: ["赌徒谬误", "独立性"],
  },
];
