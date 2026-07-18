import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-15-tools",
  title: "第15章 工具：开发的战术",
  nodes: ["源码变更", "生成构建", "版本追踪", "运行调试", "性能反馈"],
  focuses: ["编辑器", "make", "版本控制", "调试器", "性能分析"],
} as const;

export function TaoupChapter15ToolsCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter15ToolsRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter15ToolsEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
