import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "《游戏编程模式》权威学习地图";
const focus = "问题证据 / 最小模式 / 依赖时序 / 可替换原型 / 移除条件";
const stages = [
  "描述变化与性能问题",
  "选择最小模式",
  "声明依赖和时序",
  "实现可替换原型",
  "用反例决定保留或移除",
];

export function GppOfficialLearningMapMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppOfficialLearningMapExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppOfficialLearningMapEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
