import type { ReviewQuestion } from "./types";

/** 置信区间 复习题 */
export const hfsConfidenceIntervalsQuestions: ReviewQuestion[] = [
  {
    id: "hfs-confidence-intervals-1",
    chapter: "hfs-confidence-intervals",
    level: 1,
    question: `置信区间的公式是什么？各部分含义？`,
    answer: `x̄ ± z·(σ/√n)。x̄ 是样本均值，z 是置信水平对应的临界值（95%→1.96），σ/√n 是标准误。z·SE 是边际误差。`,
    tags: ["置信区间", "公式"],
  },
  {
    id: "hfs-confidence-intervals-2",
    chapter: "hfs-confidence-intervals",
    level: 2,
    question: `95% 置信区间的频率学派正确解释是什么？`,
    answer: `重复抽样100次构造100个区间，约95个包含真值。真值是固定的不是随机的，不能说「这个区间有95%概率包含真值」。95%是对方法的置信度。`,
    tags: ["置信水平", "解释"],
  },
  {
    id: "hfs-confidence-intervals-3",
    chapter: "hfs-confidence-intervals",
    level: 3,
    question: `置信水平从 95% 提高到 99%，区间变宽还是变窄？为什么？`,
    answer: `变宽。置信水平越高 z 越大（1.96→2.576），边际误差 ME=z·SE 越大，区间越宽。这是可靠性与精度的权衡。99% 更可靠但更不精确。`,
    tags: ["置信水平", "区间宽度"],
  },
  {
    id: "hfs-confidence-intervals-4",
    chapter: "hfs-confidence-intervals",
    level: 4,
    question: `样本量翻 4 倍，边际误差怎么变？`,
    answer: `减半。ME = z·σ/√n，n 翻4倍 √n 翻2倍，ME 减半。但边际效益递减——n 翻4倍才让精度翻倍。实际中需权衡成本和精度。`,
    tags: ["边际误差", "样本量"],
  },
];
