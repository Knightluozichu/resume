import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-14",
  title: "第14章 在形式的图书馆中",
  nodes: [
    "编码生成规则",
    "产生候选变异",
    "按目标评价",
    "保留重组片段",
    "迭代探索空间",
  ],
  focuses: ["可能空间", "生成形态", "变异选择", "重组", "进化艺术"],
} as const;

export function Ooc16Chapter14MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter14ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter14EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
