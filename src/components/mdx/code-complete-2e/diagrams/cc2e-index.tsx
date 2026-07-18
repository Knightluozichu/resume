import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-index",
  title: "索引",
  nodes: ["问题术语", "索引词", "章节坐标", "上下文比较", "实践路径"],
  focuses: ["术语规范", "同义词", "页码", "交叉引用", "反向验证"],
} as const;

export function Cc2eIndexStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eIndexTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eIndexEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
