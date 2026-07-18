import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-official-learning-map",
  title: "《终身成长》权威学习地图",
  nodes: ["版次定位", "信念诊断", "场景检验", "教育传播", "持续改变"],
  focuses: ["目录覆盖", "机制主线", "场景迁移", "虚假成长", "行动复核"],
} as const;

export function Msg17OfficialLearningMapDiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17OfficialLearningMapExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17OfficialLearningMapTransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
