import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-14-languages",
  title: "第14章 语言：C还是非C",
  nodes: ["问题特征", "语言候选", "原型实现", "运行测量", "长期维护"],
  focuses: ["C", "脚本语言", "混合策略", "语言生态", "工具包"],
} as const;

export function TaoupChapter14LanguagesCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter14LanguagesRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter14LanguagesEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
