import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-08",
  title: "第8章 封闭系统",
  nodes: [
    "声明系统边界",
    "盘点输入输出",
    "闭合物质循环",
    "监测慢变量",
    "保留外部救援",
  ],
  focuses: ["生态边界", "物质循环", "互补代谢", "慢性级联", "合成自然"],
} as const;

export function Ooc16Chapter08MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter08ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter08EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
