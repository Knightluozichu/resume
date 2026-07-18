import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-index",
  title: "索引",
  nodes: ["检索词", "规范化", "位置集合", "上下文判断", "反向校验"],
  focuses: ["术语索引", "人物", "工具", "标准", "案例"],
} as const;

export function TaoupIndexCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupIndexRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupIndexEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
