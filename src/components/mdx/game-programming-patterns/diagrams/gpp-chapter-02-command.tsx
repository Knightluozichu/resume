import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "2. Command";
const focus = "动作对象 / 目标参数 / 执行时序 / 撤销日志 / 确定重放";
const stages = [
  "捕获动作意图",
  "绑定目标参数",
  "排队或立即执行",
  "记录逆操作",
  "重放并核对结果",
];

export function GppChapter02CommandMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter02CommandExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter02CommandEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
