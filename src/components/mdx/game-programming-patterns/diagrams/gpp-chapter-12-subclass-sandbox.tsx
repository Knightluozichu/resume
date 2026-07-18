import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "12. Subclass Sandbox";
const focus = "沙箱入口 / 安全原语 / 共享状态 / 特化组合 / 能力边界";
const stages = [
  "限定子类入口",
  "提供安全原语",
  "隐藏共享状态",
  "组合特化行为",
  "审计能力边界",
];

export function GppChapter12SubclassSandboxMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter12SubclassSandboxExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter12SubclassSandboxEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
