import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-04-modularity",
  title: "第4章 模块性：保持清晰，保持简洁",
  nodes: ["需求切片", "模块边界", "正交接口", "薄层组合", "缺陷反馈"],
  focuses: ["封装", "模块尺寸", "紧凑性", "正交性", "SPOT"],
} as const;

export function TaoupChapter04ModularityCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter04ModularityRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter04ModularityEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
