import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-04",
  title: "第4章 组装复杂性",
  nodes: [
    "保留可活模块",
    "安排局部互动",
    "并行小步试验",
    "筛选稳定组合",
    "逐层扩大边界",
  ],
  focuses: ["生长式设计", "生态恢复", "路径依赖", "并行装配", "不可逆关系"],
} as const;

export function Ooc16Chapter04MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter04ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter04EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
