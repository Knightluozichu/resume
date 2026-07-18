import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "14. Component";
const focus = "领域职责 / 组件接口 / 实体装配 / 组件通信 / 共同生命周期";
const stages = [
  "识别领域职责",
  "拆分组件接口",
  "装配实体能力",
  "路由组件消息",
  "管理共同生命周期",
];

export function GppChapter14ComponentMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter14ComponentExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter14ComponentEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
