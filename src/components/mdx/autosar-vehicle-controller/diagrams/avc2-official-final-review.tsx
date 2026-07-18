import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-official-final-review",
  title: "《AUTOSAR规范与车用控制器软件开发》全书总复习",
  nodes: ["需求基线", "逻辑设计", "ECU配置", "集成镜像", "安全审计"],
  focuses: ["目录覆盖", "端到端追踪", "配置边界", "单故障", "独立复核"],
} as const;

export function Avc2OfficialFinalReviewArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc2OfficialFinalReviewConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc2OfficialFinalReviewEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
