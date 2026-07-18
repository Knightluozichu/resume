import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-references",
  title: "参考文献",
  nodes: ["章节主张", "引用坐标", "原始证据", "口径比较", "引用结论"],
  focuses: ["来源层级", "年份", "方法", "版本", "冲突裁决"],
} as const;

export function Cc2eReferencesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eReferencesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eReferencesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
