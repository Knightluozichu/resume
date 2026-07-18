import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-16-loops",
  title: "第16章：控制循环",
  nodes: ["循环前状态", "进入条件", "单次不变量", "退出条件", "循环后状态"],
  focuses: ["循环种类", "控制", "端点", "由内而外", "数组关系"],
} as const;

export function Cc2e16LoopsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e16LoopsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e16LoopsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
