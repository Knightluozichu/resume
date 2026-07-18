import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 11 Numerical Robustness";
const focus = "浮点误差 / 尺度容差 / 厚平面 / 区间算术 / 精确谓词";
const stages = [
  "识别误差来源",
  "设计尺度相关容差",
  "共享关键计算",
  "升级区间或整数谓词",
  "回归退化样本",
];

export function RtcdChapter11NumericalRobustnessMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter11NumericalRobustnessExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter11NumericalRobustnessEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
