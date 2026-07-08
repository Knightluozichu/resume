import type { ReviewQuestion } from "./types";

/** 离散程度度量 复习题 */
export const hfsDispersionQuestions: ReviewQuestion[] = [
  {
    id: "hfs-dispersion-1",
    chapter: "hfs-dispersion",
    level: 1,
    question: "极差和四分位距哪个对异常值更鲁棒？为什么？",
    answer: "四分位距。极差=max-min只利用两个极端值，单个异常值就能极大改变极差。IQR=Q3-Q1衡量中间50%数据的散布，不受极端值影响。",
    tags: ["极差", "IQR"],
  },
  {
    id: "hfs-dispersion-2",
    chapter: "hfs-dispersion",
    level: 2,
    question: "样本标准差为什么除以 n-1？",
    answer: "无偏估计。样本集中在样本均值附近比集中在总体均值附近更紧，除以 n 系统性低估总体方差。除以 n-1 修正这个偏差。小样本时差异显著。",
    tags: ["标准差", "无偏"],
  },
  {
    id: "hfs-dispersion-3",
    chapter: "hfs-dispersion",
    level: 3,
    question: "68-95-99.7 法则的内容是什么？",
    answer: "近似正态分布中约 68% 数据在均值±1标准差内，95% 在±2标准差内，99.7% 在±3标准差内。偏离3σ以上可能是异常值。",
    tags: ["经验法则", "标准差"],
  },
  {
    id: "hfs-dispersion-4",
    chapter: "hfs-dispersion",
    level: 4,
    question: "两个班级均值相同但标准差不同，说明什么？",
    answer: "标准差小的班级成绩集中、一致性高；标准差大的班级成绩分散、差距大。均值相同但离散不同意味着完全不同的分布形态。需要离散程度补充集中趋势的信息。",
    tags: ["标准差", "离散"],
  },
];
