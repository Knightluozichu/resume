import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-18-documentation",
  title: "第18章 文档：向网络世界阐释代码",
  nodes: ["读者任务", "结构化源", "文档工具链", "多格式产物", "漂移检查"],
  focuses: ["Unix风格", "troff", "TeX", "DocBook", "写作实践"],
} as const;

export function TaoupChapter18DocumentationCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter18DocumentationRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter18DocumentationEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
