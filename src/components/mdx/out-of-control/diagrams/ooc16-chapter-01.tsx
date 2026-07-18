import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-01",
  title: "第1章 人造与天生",
  nodes: [
    "识别机械假设",
    "引入生物属性",
    "允许局部自治",
    "观察涌现结果",
    "设置协同边界",
  ],
  focuses: ["新生物文明", "生物逻辑", "放弃全控", "活系统", "责任边界"],
} as const;

export function Ooc16Chapter01MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter01ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter01EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
