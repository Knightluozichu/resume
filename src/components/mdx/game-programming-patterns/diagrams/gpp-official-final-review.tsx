import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "《游戏编程模式》全书总复习";
const focus = "变化传播 / 帧级时序 / 行为扩展 / 隐藏依赖 / 移除条件";
const stages = [
  "重放需求变化",
  "检查帧级时序",
  "注入行为扩展",
  "审计隐藏依赖",
  "签收性能与移除条件",
];

export function GppOfficialFinalReviewMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppOfficialFinalReviewExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppOfficialFinalReviewEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
