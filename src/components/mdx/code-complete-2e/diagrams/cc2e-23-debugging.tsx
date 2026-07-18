import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-23-debugging",
  title: "第23章：调试",
  nodes: ["失败复现", "假设列表", "区分实验", "最小修正", "回归学习"],
  focuses: ["调试角色", "科学方法", "修正", "心理因素", "工具"],
} as const;

export function Cc2e23DebuggingStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e23DebuggingTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e23DebuggingEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
