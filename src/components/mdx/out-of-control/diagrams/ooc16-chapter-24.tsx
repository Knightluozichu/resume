import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-24",
  title: "第24章 九律",
  nodes: [
    "分布与自下而上",
    "模块生长与边缘",
    "错误与多目标",
    "持久非均衡",
    "变化改变变化",
  ],
  focuses: ["九律全表", "涌现设计", "多目标", "非均衡", "适用边界"],
} as const;

export function Ooc16Chapter24MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter24ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter24EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
