import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-official-final-review",
  title: "《卓有成效的管理者》全书综合复核",
  nodes: [
    "冻结真实职责",
    "重算时间分配",
    "核验贡献接收",
    "检查优先取舍",
    "复盘决策兑现",
  ],
  focuses: ["陌生迁移", "工作证据", "外部验收", "反例注入", "独立复核"],
} as const;

export function Eex19OfficialFinalReviewMapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19OfficialFinalReviewExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19OfficialFinalReviewEvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
