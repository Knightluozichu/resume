import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-official-final-review",
  title: "《刻意练习》全书综合复核",
  nodes: ["抽取技能", "建立基线", "设计专项", "反馈更新", "跨境迁移"],
  focuses: ["版本复核", "定义辨析", "心理表征", "反例拒绝", "迁移证据"],
} as const;

export function Pdp16OfficialFinalReviewDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16OfficialFinalReviewFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16OfficialFinalReviewTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
