import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-19",
  title: "第19章 后达尔文主义",
  nodes: [
    "产生受约束变异",
    "经发育具象化",
    "形成可行聚类",
    "接受多层筛选",
    "修正谱系模型",
  ],
  focuses: ["理论边界", "变异供给", "生命网络", "发育约束", "可达空间"],
} as const;

export function Ooc16Chapter19MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter19ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter19EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
