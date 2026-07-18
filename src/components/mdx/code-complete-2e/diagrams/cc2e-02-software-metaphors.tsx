import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-02-software-metaphors",
  title: "第2章：用隐喻来更充分地理解软件开发",
  nodes: ["陌生问题", "候选隐喻", "结构启发", "反例检查", "工程决定"],
  focuses: ["解释力", "遗漏项", "适用阶段", "组合方式", "退出条件"],
} as const;

export function Cc2e02SoftwareMetaphorsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e02SoftwareMetaphorsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e02SoftwareMetaphorsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
