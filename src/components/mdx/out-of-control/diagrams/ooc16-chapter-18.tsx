import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-18",
  title: "第18章 有组织的变化之架构",
  nodes: [
    "个体状态更新",
    "跨代差异保留",
    "环境重塑选择",
    "变化规则再变",
    "分层验证机制",
  ],
  focuses: ["快速进化", "信息回路", "学习进化", "元进化", "解释边界"],
} as const;

export function Ooc16Chapter18MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter18ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter18EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
