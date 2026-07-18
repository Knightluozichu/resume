import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-recommendation-03",
  title: "推荐序三（珍妮·达罗克）",
  nodes: [
    "还原原始问题",
    "更新工作场景",
    "选择外部成果",
    "比较前后表现",
    "标注时代边界",
  ],
  focuses: ["经典持续性", "当代工作", "外部成果", "时代差异", "可迁移习惯"],
} as const;

export function Eex19Recommendation03MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Recommendation03ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Recommendation03EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
