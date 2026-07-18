import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-acknowledgments",
  title: "鸣谢",
  nodes: ["原始研究", "作者综合", "技术评审", "翻译审校", "读者复核"],
  focuses: ["贡献类型", "同行评审", "样例验证", "译名", "限制"],
} as const;

export function Cc2eAcknowledgmentsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eAcknowledgmentsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eAcknowledgmentsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
