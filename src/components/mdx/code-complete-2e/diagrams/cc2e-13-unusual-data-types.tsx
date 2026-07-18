import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-13-unusual-data-types",
  title: "第13章：不常见的数据类型",
  nodes: ["数据结构", "所有权", "指针访问", "共享边界", "生命周期验证"],
  focuses: ["结构", "指针模型", "语言差异", "全局风险", "访问封装"],
} as const;

export function Cc2e13UnusualDataTypesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e13UnusualDataTypesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e13UnusualDataTypesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
