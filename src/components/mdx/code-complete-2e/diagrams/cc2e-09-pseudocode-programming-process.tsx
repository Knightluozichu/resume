import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-09-pseudocode-programming-process",
  title: "第9章：伪代码编程过程",
  nodes: ["职责声明", "伪代码设计", "实现翻译", "代码检查", "收尾复核"],
  focuses: ["类步骤", "子程序步骤", "伪代码层次", "迭代", "替代方案"],
} as const;

export function Cc2e09PseudocodeProgrammingProcessStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e09PseudocodeProgrammingProcessTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e09PseudocodeProgrammingProcessEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
