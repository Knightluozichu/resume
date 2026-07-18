import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-19-general-control-issues",
  title: "第19章：一般控制问题",
  nodes: ["业务判断", "布尔规范", "结构化块", "嵌套压平", "复杂度测量"],
  focuses: ["布尔表达式", "块", "空语句", "深层嵌套", "结构复杂度"],
} as const;

export function Cc2e19GeneralControlIssuesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e19GeneralControlIssuesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e19GeneralControlIssuesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
