import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-recommendation",
  title: "推荐序",
  nodes: ["识别误读", "还原研究", "区分时长", "检查质量", "重写计划"],
  focuses: ["传播误读", "研究来源", "时间变量", "练习质量", "行动修正"],
} as const;

export function Pdp16RecommendationDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16RecommendationFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16RecommendationTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
