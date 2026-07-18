import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-29-integration",
  title: "第29章：集成",
  nodes: ["构件基线", "集成顺序", "每日构建", "冒烟测试", "系统回归"],
  focuses: ["频率", "策略", "风险排序", "daily build", "持续集成"],
} as const;

export function Cc2e29IntegrationStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e29IntegrationTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e29IntegrationEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
