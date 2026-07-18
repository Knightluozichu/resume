import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-official-final-review",
  title: "《码农翻身》全书综合复核",
  nodes: ["系统基础", "Java机制", "Web链路", "工程过程", "迁移与成长"],
  focuses: ["跨章因果", "边界条件", "替代方案", "单故障", "独立复核"],
} as const;

export function Crv18OfficialFinalReviewModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18OfficialFinalReviewFlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18OfficialFinalReviewEvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
