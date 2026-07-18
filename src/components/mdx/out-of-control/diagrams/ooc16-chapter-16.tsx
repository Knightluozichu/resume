import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-16",
  title: "第16章 控制的未来",
  nodes: [
    "定义简化世界",
    "赋予局部目标",
    "代理竞争动作",
    "人与系统共调",
    "按风险收回权限",
  ],
  focuses: ["卡通物理", "合成角色", "软件身体", "行为代理", "协同控制"],
} as const;

export function Ooc16Chapter16MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter16ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter16EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
