import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-18-table-driven-methods",
  title: "第18章：表驱动方法",
  nodes: ["业务规则", "表结构", "查询键", "访问策略", "结果验证"],
  focuses: ["使用条件", "直接访问", "索引访问", "阶梯访问", "表查询"],
} as const;

export function Cc2e18TableDrivenMethodsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e18TableDrivenMethodsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e18TableDrivenMethodsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
