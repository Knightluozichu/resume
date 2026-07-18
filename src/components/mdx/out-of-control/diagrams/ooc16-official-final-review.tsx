import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-official-final-review",
  title: "《失控》全书综合复核",
  nodes: [
    "冻结陌生案例",
    "定位局部规则",
    "测量整体涌现",
    "注入失效条件",
    "独立复核边界",
  ],
  focuses: ["跨章迁移", "机制辨析", "反例注入", "证据复算", "责任治理"],
} as const;

export function Ooc16OfficialFinalReviewMapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16OfficialFinalReviewExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16OfficialFinalReviewEvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
