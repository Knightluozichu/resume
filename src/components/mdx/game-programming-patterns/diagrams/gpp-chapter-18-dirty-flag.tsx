import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "18. Dirty Flag";
const focus = "主数据 / 脏状态 / 延迟计算 / 清理时机 / 跟踪粒度";
const stages = [
  "修改主数据",
  "传播脏状态",
  "延迟派生计算",
  "首次读取时清理",
  "验证遗漏与延迟",
];

export function GppChapter18DirtyFlagMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter18DirtyFlagExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter18DirtyFlagEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
