import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-21",
  title: "第21章 水往高处流",
  nodes: [
    "收集长时序记录",
    "区分局部与全局",
    "提出趋势指标",
    "寻找逆向反例",
    "限制目的论表述",
  ],
  focuses: ["复杂性累积", "方向性", "超进化趋势", "自我修改", "历史偏差"],
} as const;

export function Ooc16Chapter21MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter21ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter21EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
