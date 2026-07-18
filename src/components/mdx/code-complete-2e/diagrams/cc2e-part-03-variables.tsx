import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-03-variables",
  title: "第3部分：变量",
  nodes: ["业务数据", "类型", "命名", "局部生命周期", "共享边界"],
  focuses: ["变量使用", "命名", "基本类型", "不常见类型", "全局风险"],
} as const;

export function Cc2ePart03VariablesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart03VariablesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart03VariablesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
