import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "V. Decoupling Patterns";
const focus = "变化轴 / 模块边界 / 通信合同 / 生命周期 / 变化传播";
const stages = [
  "识别变化轴",
  "建立模块边界",
  "定义通信合同",
  "隔离生命周期",
  "测量变化传播",
];

export function GppDecouplingPatternsMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppDecouplingPatternsExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppDecouplingPatternsEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
