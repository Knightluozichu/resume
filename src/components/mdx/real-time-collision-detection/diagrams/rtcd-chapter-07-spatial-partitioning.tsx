import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 7 Spatial Partitioning";
const focus = "空间尺度 / 对象分桶 / 查询遍历 / 候选对 / 测试去重";
const stages = [
  "选择空间尺度",
  "分配对象到单元",
  "遍历查询路径",
  "生成候选对",
  "消除重复测试",
];

export function RtcdChapter07SpatialPartitioningMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter07SpatialPartitioningExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter07SpatialPartitioningEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
