import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-figure-index",
  title: "图目录",
  nodes: ["问题", "图号定位", "节点解释", "边的语义", "代码验证"],
  focuses: ["图号", "对象", "关系", "方向", "反例"],
} as const;

export function Cc2eFigureIndexStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eFigureIndexTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eFigureIndexEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
