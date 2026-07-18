import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-part-01",
  title: "第一部分 背景",
  nodes: ["哲学", "历史", "系统对比", "文化机制", "工程判断"],
  focuses: ["3章", "文化语境", "历史证据", "比较轴", "原则边界"],
} as const;

export function TaoupPart01CompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupPart01RepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupPart01EvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
