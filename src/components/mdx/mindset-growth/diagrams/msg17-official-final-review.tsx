import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-official-final-review",
  title: "《终身成长》全书综合复核",
  nodes: ["抽取触发", "解释分岔", "选择策略", "收集证据", "跨场景迁移"],
  focuses: ["版本复核", "核心机制", "反例拒绝", "场景迁移", "持续计划"],
} as const;

export function Msg17OfficialFinalReviewDiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17OfficialFinalReviewExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17OfficialFinalReviewTransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
