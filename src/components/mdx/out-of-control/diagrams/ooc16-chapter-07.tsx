import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-07",
  title: "第7章 控制的兴起",
  nodes: [
    "感知当前状态",
    "与目标比较",
    "产生偏差信号",
    "执行校正动作",
    "重新感知结果",
  ],
  focuses: ["人工自我", "机械反馈", "负反馈", "自我因果", "闭环能动"],
} as const;

export function Ooc16Chapter07MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter07ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter07EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
