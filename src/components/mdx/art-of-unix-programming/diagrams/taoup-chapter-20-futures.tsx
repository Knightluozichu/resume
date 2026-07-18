import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-20-futures",
  title: "第20章 未来：危机与机遇",
  nodes: ["传统基线", "问题清单", "替代系统", "演化假设", "未来验证"],
  focuses: ["本质与偶然", "Plan 9", "设计缺陷", "文化问题", "演化"],
} as const;

export function TaoupChapter20FuturesCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter20FuturesRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter20FuturesEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
