import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-26-code-tuning-techniques",
  title: "第26章：代码调整方法",
  nodes: ["已证热点", "技术选择", "单点改写", "基准复测", "可移植性审查"],
  focuses: ["逻辑", "循环", "数据", "表达式", "低级改写"],
} as const;

export function Cc2e26CodeTuningTechniquesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e26CodeTuningTechniquesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e26CodeTuningTechniquesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
