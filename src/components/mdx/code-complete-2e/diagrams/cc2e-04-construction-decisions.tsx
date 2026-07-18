import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-04-construction-decisions",
  title: "第4章：关键的“构建”决策",
  nodes: ["产品约束", "语言选择", "约定基线", "实践组合", "决策复核"],
  focuses: ["语言适配", "约定一致", "技术风险", "深入语言", "实践权重"],
} as const;

export function Cc2e04ConstructionDecisionsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e04ConstructionDecisionsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e04ConstructionDecisionsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
