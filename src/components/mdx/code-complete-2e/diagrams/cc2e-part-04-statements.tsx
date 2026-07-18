import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-04-statements",
  title: "第4部分：语句",
  nodes: ["顺序语句", "条件", "循环", "特殊结构", "复杂度复核"],
  focuses: ["直线代码", "条件", "循环", "表驱动", "结构化"],
} as const;

export function Cc2ePart04StatementsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart04StatementsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart04StatementsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
