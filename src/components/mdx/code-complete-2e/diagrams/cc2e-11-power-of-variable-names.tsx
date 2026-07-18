import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-11-power-of-variable-names",
  title: "第11章：变量名的力量",
  nodes: ["领域概念", "语义命名", "规则一致", "作用域阅读", "维护判断"],
  focuses: ["问题导向", "长度", "特定类型", "命名规则", "避免名称"],
} as const;

export function Cc2e11PowerOfVariableNamesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e11PowerOfVariableNamesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e11PowerOfVariableNamesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
