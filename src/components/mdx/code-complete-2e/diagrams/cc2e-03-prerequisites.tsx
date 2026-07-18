import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-03-prerequisites",
  title: "第3章：三思而后行：前期准备",
  nodes: ["问题定义", "需求基线", "架构风险", "生命周期选择", "构建就绪"],
  focuses: ["准备收益", "项目类型", "稳定性", "架构要素", "时间投入"],
} as const;

export function Cc2e03PrerequisitesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e03PrerequisitesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e03PrerequisitesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
