import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-35-more-information",
  title: "第35章：何处有更多信息",
  nodes: ["能力缺口", "来源选择", "阅读计划", "实践产物", "同行反馈"],
  focuses: ["创建资料", "工程综览", "期刊", "分级书单", "专业组织"],
} as const;

export function Cc2e35MoreInformationStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e35MoreInformationTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e35MoreInformationEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
