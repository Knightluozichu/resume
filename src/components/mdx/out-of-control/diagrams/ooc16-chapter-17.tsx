import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-17",
  title: "第17章 开放的宇宙",
  nodes: [
    "提供生成基元",
    "允许组合变异",
    "保留可生存意外",
    "开放规则修改",
    "治理持续新奇",
  ],
  focuses: ["开放性", "生成基元", "偶然创新", "规则突破", "超生命治理"],
} as const;

export function Ooc16Chapter17MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter17ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter17EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
