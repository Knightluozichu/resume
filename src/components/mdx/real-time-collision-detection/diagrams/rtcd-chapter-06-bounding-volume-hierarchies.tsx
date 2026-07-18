import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 6 Bounding Volume Hierarchies";
const focus = "层次代价 / 构建策略 / 双树遍历 / 紧凑布局 / 时空缓存";
const stages = [
  "定义层次代价",
  "构建树结构",
  "执行双树遍历",
  "压紧节点布局",
  "利用时空一致性",
];

export function RtcdChapter06BoundingVolumeHierarchiesMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter06BoundingVolumeHierarchiesExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter06BoundingVolumeHierarchiesEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
