import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-28-managing-construction",
  title: "第28章：管理“构建”",
  nodes: ["实践标准", "配置基线", "估算跟踪", "人员环境", "管理反馈"],
  focuses: ["编码实践", "配置管理", "进度估算", "度量", "程序员因素"],
} as const;

export function Cc2e28ManagingConstructionStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e28ManagingConstructionTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e28ManagingConstructionEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
