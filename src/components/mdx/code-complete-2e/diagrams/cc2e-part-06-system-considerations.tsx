import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-06-system-considerations",
  title: "第6部分：系统考虑",
  nodes: ["规模边界", "管理基线", "集成策略", "工具链", "系统证据"],
  focuses: ["规模", "配置估算", "人员", "集成", "工具"],
} as const;

export function Cc2ePart06SystemConsiderationsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart06SystemConsiderationsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart06SystemConsiderationsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
