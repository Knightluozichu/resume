import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 3 A Math and Geometry Primer";
const focus = "坐标约定 / 方向谓词 / 重心坐标 / 凸包结构 / 退化输入";
const stages = [
  "统一坐标约定",
  "构造几何谓词",
  "表达基本图元",
  "建立凸性结构",
  "验证退化输入",
];

export function RtcdChapter03MathGeometryPrimerMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter03MathGeometryPrimerExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter03MathGeometryPrimerEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
