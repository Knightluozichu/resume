import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-official-learning-map",
  title: "《刻意练习》权威学习地图",
  nodes: ["核定版本", "区分练习", "建构表征", "设计反馈", "迁移应用"],
  focuses: ["目录覆盖", "练习分型", "表征机制", "证据边界", "迁移验收"],
} as const;

export function Pdp16OfficialLearningMapDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16OfficialLearningMapFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16OfficialLearningMapTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
