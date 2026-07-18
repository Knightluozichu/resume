import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 4 Bounding Volumes";
const focus = "紧致性 / 拟合成本 / 更新成本 / 分离轴 / 重叠测试";
const stages = [
  "选定包围体",
  "离线拟合",
  "运行时更新",
  "执行重叠测试",
  "比较紧致与成本",
];

export function RtcdChapter04BoundingVolumesMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter04BoundingVolumesExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter04BoundingVolumesEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
