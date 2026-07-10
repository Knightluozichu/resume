import type { ReviewQuestion } from "./types";

/** 描述统计 复习题 */
export const pmStatisticsQuestions: ReviewQuestion[] = [
  {
    id: "pm-statistics-1",
    chapter: "pm-statistics",
    level: 1,
    question: `均值和中位数哪个对异常值更敏感？为什么？`,
    answer: `均值更敏感。均值利用所有数据点的值，一个极端值就能大幅拉偏。中位数只看中间位置，不受极端值影响。收入数据应报告中位数。`,
    tags: ["均值", "中位数"],
  },
  {
    id: "pm-statistics-2",
    chapter: "pm-statistics",
    level: 2,
    question: `样本方差为什么除以 n-1 而非 n？`,
    answer: `除以 n-1 是无偏估计。样本集中在样本均值附近比集中在总体均值附近更紧，除以 n 会系统性低估总体方差。除以 n-1 修正了这个偏差。`,
    tags: ["方差", "无偏估计"],
  },
  {
    id: "pm-statistics-3",
    chapter: "pm-statistics",
    level: 3,
    question: `数据 [65,70,72,68,75,80,72,68,90,72] 的均值是多少？`,
    answer: `732/10 = 73.2。排序后中位数为 (72+72)/2 = 72。均值>中位数说明略右偏。`,
    tags: ["均值", "计算"],
  },
  {
    id: "pm-statistics-4",
    chapter: "pm-statistics",
    level: 4,
    question: `标准差和方差的关系是什么？`,
    answer: `标准差是方差的平方根。方差单位是原始数据单位的平方，不易解读；标准差与原始数据同单位，更直观。经验法则中 68% 数据在均值±1标准差内。`,
    tags: ["标准差", "方差"],
  },
];
