import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "IV. Behavioral Patterns";
const focus = "行为描述 / 安全原语 / 运行组合 / 实例差异 / 扩展边界";
const stages = [
  "分离行为描述",
  "限制安全原语",
  "组合运行逻辑",
  "驱动实例差异",
  "验证扩展边界",
];

export function GppBehavioralPatternsMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppBehavioralPatternsExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppBehavioralPatternsEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
