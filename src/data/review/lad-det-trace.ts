import type { ReviewQuestion } from "./types";

/** 行列式与迹 复习题 */
export const ladDetTraceQuestions: ReviewQuestion[] = [
  {
    id: "lad-det-trace-1",
    chapter: "lad-det-trace",
    level: 1,
    question: "行列式的几何含义？",
    answer: "单位平行体的体积缩放因子（带符号反映定向），det=0 表示把空间压扁，不可逆。",
    tags: ["行列式"],
  },
  {
    id: "lad-det-trace-2",
    chapter: "lad-det-trace",
    level: 2,
    question: "det/trace 与特征值的关系？",
    answer: "det=特征值之积，trace=特征值之和（计重数，复数域上）。",
    tags: ["特征值"],
  },
  {
    id: "lad-det-trace-3",
    chapter: "lad-det-trace",
    level: 3,
    question: "两个矩阵迹相等，行列式一定相等吗？",
    answer: "不一定。diag(2,2) 与 diag(1,3) trace 都为 4，但 det 分别为 4 和 3。和相同积可不同。",
    tags: ["反例"],
  },
  {
    id: "lad-det-trace-4",
    chapter: "lad-det-trace",
    level: 4,
    question: "证明 trace 相似不变。",
    answer: "trace(P⁻¹AP)=trace(APP⁻¹)=trace(A)，用到 trace(ST)=trace(TS)（令 S=P⁻¹A, T=P）。故 trace 与基无关，是映射不变量。",
    tags: ["证明", "迹"],
  },
];
