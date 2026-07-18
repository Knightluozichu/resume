import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "III. Sequencing Patterns";
const focus = "帧边界 / 读取阶段 / 更新阶段 / 结果发布 / 时序一致";
const stages = [
  "冻结帧边界",
  "安排读取阶段",
  "执行状态更新",
  "发布可见结果",
  "检查时序一致",
];

export function GppSequencingPatternsMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppSequencingPatternsExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppSequencingPatternsEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
