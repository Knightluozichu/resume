import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-part-03",
  title: "第三部分 实现",
  nodes: ["语言选择", "工具链", "构建调试", "依赖重用", "交付证据"],
  focuses: ["3章", "混合语言", "自动构建", "版本控制", "开放重用"],
} as const;

export function TaoupPart03CompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupPart03RepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupPart03EvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
