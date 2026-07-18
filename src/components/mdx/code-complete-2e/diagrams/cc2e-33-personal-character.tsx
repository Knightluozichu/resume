import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-33-personal-character",
  title: "第33章：个人性格",
  nodes: ["能力边界", "反馈学习", "诚实报告", "合作实践", "习惯固化"],
  focuses: ["谦虚", "求知", "诚实", "合作纪律", "习惯"],
} as const;

export function Cc2e33PersonalCharacterStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e33PersonalCharacterTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e33PersonalCharacterEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
