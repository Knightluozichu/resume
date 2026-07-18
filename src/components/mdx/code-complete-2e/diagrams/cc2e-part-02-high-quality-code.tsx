import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-02-high-quality-code",
  title: "第2部分：创建高质量的代码",
  nodes: ["复杂度", "抽象类", "子程序", "防御边界", "伪代码实现"],
  focuses: ["设计", "类", "子程序", "防御", "过程"],
} as const;

export function Cc2ePart02HighQualityCodeStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart02HighQualityCodeTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart02HighQualityCodeEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
