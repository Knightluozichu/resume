import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-10-general-variable-use",
  title: "第10章：使用变量的一般事项",
  nodes: ["数据含义", "变量定义", "可靠初始化", "局部使用", "生命周期结束"],
  focuses: ["数据认知", "隐式声明", "初始化", "作用域存活期", "单一用途"],
} as const;

export function Cc2e10GeneralVariableUseStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e10GeneralVariableUseTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e10GeneralVariableUseEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
