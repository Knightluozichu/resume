import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-10",
  title: "第10章 工业生态学",
  nodes: [
    "感知资源流",
    "连接互补节点",
    "回收副产物",
    "局部适应调节",
    "审计系统外部性",
  ],
  focuses: ["普适连接", "环境智能", "人机冲突", "工业共同体", "闭环适应"],
} as const;

export function Ooc16Chapter10MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter10ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter10EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
