import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-08-minilanguages",
  title: "第8章 微型语言：寻找歌唱的乐符",
  nodes: ["问题语汇", "语言层级", "语法语义", "解释执行", "失控边界"],
  focuses: ["DSL", "正则表达式", "嵌入扩展", "自定义语法", "宏风险"],
} as const;

export function TaoupChapter08MinilanguagesCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter08MinilanguagesRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter08MinilanguagesEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
