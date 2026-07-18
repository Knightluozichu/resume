import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-13-complexity",
  title: "第13章 复杂度：尽可能简单，但别简单过了头",
  nodes: ["复杂度来源", "接口实现", "案例比较", "规模裁决", "简化验证"],
  focuses: ["本质复杂度", "偶然复杂度", "映射复杂度", "编辑器", "适度规模"],
} as const;

export function TaoupChapter13ComplexityCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter13ComplexityRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter13ComplexityEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
