import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "II. Design Patterns Revisited";
const focus = "问题识别 / GoF意图 / 游戏约束 / 模式代价 / 替代方案";
const stages = [
  "识别真实问题",
  "回溯GoF意图",
  "映射游戏约束",
  "比较模式代价",
  "验证替代方案",
];

export function GppDesignPatternsRevisitedMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppDesignPatternsRevisitedExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppDesignPatternsRevisitedEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
