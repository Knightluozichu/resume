import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-official-learning-map",
  title: "《码农翻身》权威学习地图",
  nodes: ["计算机基础", "Java平台", "Web后端", "工程反馈", "语言与成长"],
  focuses: ["版次", "目录覆盖", "前置依赖", "实验顺序", "总体验收"],
} as const;

export function Crv18OfficialLearningMapModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18OfficialLearningMapFlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18OfficialLearningMapEvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
