import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-12-fundamental-data-types",
  title: "第12章：基本数据类型",
  nodes: ["业务量", "类型选择", "范围约束", "运算规则", "边界测试"],
  focuses: ["数值规则", "精度", "文本编码", "枚举常量", "自定义类型"],
} as const;

export function Cc2e12FundamentalDataTypesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e12FundamentalDataTypesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e12FundamentalDataTypesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
