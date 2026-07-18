import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-24-refactoring",
  title: "第24章：重构",
  nodes: ["坏味道", "行为基线", "小步变换", "测试确认", "结构复盘"],
  focuses: ["进化类型", "重构理由", "数据语句子程序", "类系统", "安全策略"],
} as const;

export function Cc2e24RefactoringStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e24RefactoringTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e24RefactoringEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
