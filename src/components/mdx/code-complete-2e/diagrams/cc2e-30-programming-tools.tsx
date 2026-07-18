import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-30-programming-tools",
  title: "第30章：编程工具",
  nodes: ["设计产物", "源代码工具", "构建执行", "测试分析", "工具链证据"],
  focuses: ["设计工具", "源代码", "可执行码", "自制工具", "工具幻境"],
} as const;

export function Cc2e30ProgrammingToolsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e30ProgrammingToolsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e30ProgrammingToolsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
