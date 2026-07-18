import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-table-index",
  title: "表目录",
  nodes: ["问题", "表格定位", "口径核对", "数据比较", "决策引用"],
  focuses: ["表号", "数据口径", "单位", "版本", "引用结论"],
} as const;

export function Cc2eTableIndexStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eTableIndexTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eTableIndexEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
