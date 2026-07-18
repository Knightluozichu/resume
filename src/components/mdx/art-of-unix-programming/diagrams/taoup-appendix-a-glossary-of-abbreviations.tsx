import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-appendix-a-glossary-of-abbreviations",
  title: "附录A 缩写词表",
  nodes: ["缩写", "全称", "所属语境", "首次使用", "交叉引用"],
  focuses: ["术语一致", "语境", "歧义", "来源", "检索"],
} as const;

export function TaoupAppendixAGlossaryOfAbbreviationsCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupAppendixAGlossaryOfAbbreviationsRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupAppendixAGlossaryOfAbbreviationsEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
