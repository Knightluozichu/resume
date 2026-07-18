import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-02",
  title: "第2章 蜂群思维",
  nodes: [
    "分散状态",
    "执行局部规则",
    "聚合差异信号",
    "观察整体模式",
    "抑制级联失效",
  ],
  focuses: ["分布治理", "集体智慧", "网络异质性", "群体记忆", "群集边界"],
} as const;

export function Ooc16Chapter02MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter02ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter02EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
