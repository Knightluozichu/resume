import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-20",
  title: "第20章 沉睡的蝴蝶",
  nodes: [
    "增加关系密度",
    "跨越连通阈值",
    "形成自催化环",
    "由选择检验功能",
    "反馈调节自身",
  ],
  focuses: ["自发秩序", "网络阈值", "自催化", "选择耦合", "自调节"],
} as const;

export function Ooc16Chapter20MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter20ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter20EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
