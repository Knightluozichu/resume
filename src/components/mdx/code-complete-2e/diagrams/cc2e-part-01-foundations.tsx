import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-01-foundations",
  title: "第1部分：打好基础",
  nodes: ["构建范围", "思维模型", "问题需求", "架构准备", "实践基线"],
  focuses: ["构建定义", "隐喻", "先决条件", "语言", "约定"],
} as const;

export function Cc2ePart01FoundationsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart01FoundationsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart01FoundationsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
