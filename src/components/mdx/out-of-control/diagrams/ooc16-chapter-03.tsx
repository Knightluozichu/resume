import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-03",
  title: "第3章 有心智的机器",
  nodes: [
    "感知局部状态",
    "触发低层行为",
    "层级竞争抑制",
    "作用真实环境",
    "用后果再校准",
  ],
  focuses: ["具身性", "包容架构", "简单代理", "环境反馈", "模型盲区"],
} as const;

export function Ooc16Chapter03MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter03ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter03EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
