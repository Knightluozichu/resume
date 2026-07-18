import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-20-software-quality-landscape",
  title: "第20章：软件质量概述",
  nodes: ["质量目标", "技术组合", "缺陷发现", "修正反馈", "质量复盘"],
  focuses: ["质量特性", "过程目标", "技术效能", "缺陷成本", "前移原则"],
} as const;

export function Cc2e20SoftwareQualityLandscapeStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e20SoftwareQualityLandscapeTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e20SoftwareQualityLandscapeEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
