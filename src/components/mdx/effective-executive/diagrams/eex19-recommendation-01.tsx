import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-recommendation-01",
  title: "推荐序一（邵明路）",
  nodes: [
    "识别推荐主张",
    "定位正文依据",
    "区分评价证据",
    "寻找组织反例",
    "形成阅读合同",
  ],
  focuses: ["传播语境", "管理实践", "证据等级", "适用边界", "阅读承诺"],
} as const;

export function Eex19Recommendation01MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Recommendation01ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Recommendation01EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
