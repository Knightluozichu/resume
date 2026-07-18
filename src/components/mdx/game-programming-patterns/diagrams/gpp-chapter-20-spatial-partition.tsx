import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "20. Spatial Partition";
const focus = "分区尺度 / 对象索引 / 相关单元 / 邻域查询 / 移动更新";
const stages = [
  "选择分区尺度",
  "插入对象位置",
  "枚举相关单元",
  "执行邻域查询",
  "更新跨单元移动",
];

export function GppChapter20SpatialPartitionMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter20SpatialPartitionExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter20SpatialPartitionEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
