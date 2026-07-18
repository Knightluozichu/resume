import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 13 Optimization";
const focus = "缓存基线 / 数据布局 / 紧凑树 / SIMD批处理 / 分支成本";
const stages = [
  "建立性能基线",
  "压紧代码与数据",
  "重排缓存友好结构",
  "向量化批量测试",
  "以分位数复核",
];

export function RtcdChapter13OptimizationMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter13OptimizationExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter13OptimizationEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
