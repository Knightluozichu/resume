import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-11",
  title: "第11章 网络经济学",
  nodes: [
    "数字化可复制",
    "建立互操作连接",
    "触发网络效应",
    "管理噪声错误",
    "分配共同价值",
  ],
  focuses: ["非实体价值", "连接效应", "信息生产", "错误治理", "系统性风险"],
} as const;

export function Ooc16Chapter11MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter11ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter11EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
