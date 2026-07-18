import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-10-configuration",
  title: "第10章 配置：迈出正确的第一步",
  nodes: ["可变策略", "配置位置", "解析合并", "优先级", "来源追踪"],
  focuses: ["运行控制", "环境变量", "命令行", "默认值", "可移植性"],
} as const;

export function TaoupChapter10ConfigurationCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter10ConfigurationRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter10ConfigurationEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
