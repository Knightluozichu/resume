import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-09-generation",
  title: "第9章 生成：提升规格说明的层次",
  nodes: ["重复知识", "权威规格", "生成器", "产物校验", "漂移检测"],
  focuses: ["数据驱动", "代码生成", "规格层级", "可重复构建", "生成边界"],
} as const;

export function TaoupChapter09GenerationCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter09GenerationRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter09GenerationEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
