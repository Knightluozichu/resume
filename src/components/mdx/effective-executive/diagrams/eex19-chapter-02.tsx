import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-02",
  title: "第2章 掌握自己的时间",
  nodes: [
    "连续记录时间",
    "标记成果价值",
    "删除授权浪费",
    "合并连续时段",
    "用结果复盘",
  ],
  focuses: ["时间压力", "时间诊断", "系统浪费", "连续时段", "真实记录"],
} as const;

export function Eex19Chapter02MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter02ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter02EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
