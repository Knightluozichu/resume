import type { ReviewQuestion } from "./types";

/** 数据展示与可视化 复习题 */
export const hfsDataDisplayQuestions: ReviewQuestion[] = [
  {
    id: "hfs-data-display-1",
    chapter: "hfs-data-display",
    level: 1,
    question: "名目型数据和数值型数据分别用什么图表展示？",
    answer: "名目型用条形图（柱有间隔，离散）和饼图（占比）。数值型用直方图（柱相连，连续）、频率折线图、箱线图。",
    tags: ["数据类型", "图表"],
  },
  {
    id: "hfs-data-display-2",
    chapter: "hfs-data-display",
    level: 2,
    question: "直方图和条形图的关键区别是什么？",
    answer: "直方图柱相连（连续数据），条形图柱有间隔（离散类别）。直方图柱高=频率密度，条形图柱高=频数或频率。",
    tags: ["直方图", "条形图"],
  },
  {
    id: "hfs-data-display-3",
    chapter: "hfs-data-display",
    level: 3,
    question: "制作直方图时如何确定组数？",
    answer: "经验公式 Sturges: k=1+3.322·log(n)，或取 √n。组太少过度平滑，太多过度噪化。200 个数据通常用 10-15 组。组距=(max-min)/组数。",
    tags: ["直方图", "组数"],
  },
  {
    id: "hfs-data-display-4",
    chapter: "hfs-data-display",
    level: 4,
    question: "累积频率曲线有什么用途？",
    answer: "快速读取百分位数和中位数。横轴找值对应的纵轴累积频率即为「低于该值的比例」。50% 对应中位数。",
    tags: ["累积频率", "百分位数"],
  },
];
