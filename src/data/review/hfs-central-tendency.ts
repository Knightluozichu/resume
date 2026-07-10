import type { ReviewQuestion } from "./types";

/** 集中趋势度量 复习题 */
export const hfsCentralTendencyQuestions: ReviewQuestion[] = [
  {
    id: "hfs-central-tendency-1",
    chapter: "hfs-central-tendency",
    level: 1,
    question: `均值、中位数、众数分别适合什么数据？`,
    answer: `均值适合对称无异常值的数值数据。中位数适合偏态或有异常值的数值数据。众数适合名目型数据或找最常见值。`,
    tags: ["集中趋势", "选择"],
  },
  {
    id: "hfs-central-tendency-2",
    chapter: "hfs-central-tendency",
    level: 2,
    question: `右偏分布中均值、中位数、众数的大小关系是什么？`,
    answer: `均值 > 中位数 > 众数。高端异常值拉高均值。收入数据是典型右偏。左偏则相反：均值 < 中位数 < 众数。`,
    tags: ["偏态", "大小关系"],
  },
  {
    id: "hfs-central-tendency-3",
    chapter: "hfs-central-tendency",
    level: 3,
    question: `为什么收入数据用中位数而非均值？`,
    answer: `收入右偏——少数极高收入拉高均值，使均值远超大多数人实际收入。中位数不受极端值影响，更能代表「典型收入」。`,
    tags: ["中位数", "收入"],
  },
  {
    id: "hfs-central-tendency-4",
    chapter: "hfs-central-tendency",
    level: 4,
    question: `众数在什么场景下最合适？`,
    answer: `名目型数据（如品牌偏好、最热销尺码）和找最常见值。众数是唯一适用于名目型数据的集中趋势度量，因为均值和中位数对类别无意义。`,
    tags: ["众数", "应用"],
  },
];
