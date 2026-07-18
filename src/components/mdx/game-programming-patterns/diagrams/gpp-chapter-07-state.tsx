import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "7. State";
const focus = "状态集合 / 转换守卫 / 进入退出 / 行为委托 / 层次并发";
const stages = [
  "枚举有效状态",
  "定义转换守卫",
  "执行退出进入",
  "委托状态行为",
  "验证并发与层次",
];

export function GppChapter07StateMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter07StateExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter07StateEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
