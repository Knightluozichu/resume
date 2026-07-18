import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 9 Convexity-based Methods";
const focus = "支持映射 / 最近特征 / 单纯形 / 接触流形 / 顶点缓存";
const stages = [
  "定义支持映射",
  "追踪最近特征",
  "求Minkowski单纯形",
  "生成距离或接触",
  "缓存时空一致性",
];

export function RtcdChapter09ConvexityMethodsMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter09ConvexityMethodsExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter09ConvexityMethodsEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
