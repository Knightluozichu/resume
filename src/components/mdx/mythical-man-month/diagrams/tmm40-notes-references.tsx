import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-notes-references",
  title: "注解与参考文献：证据坐标与版本裁决",
  nodes: ["观点编号", "原始来源", "数据口径", "版本差异", "引用结论"],
  focuses: ["来源层级", "页码坐标", "历史版本", "数据分母", "冲突裁决"],
} as const;

export function Tmm40NotesReferencesDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm40NotesReferencesScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm40NotesReferencesEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
