import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-official-final-review",
  title: "《代码大全（第2版）》全书总复习",
  nodes: ["问题基线", "结构重建", "测试保护", "增量交付", "工艺复盘"],
  focuses: ["先决条件", "复杂度", "数据控制", "质量证据", "系统工艺"],
} as const;

export function Cc2eOfficialFinalReviewStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eOfficialFinalReviewTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eOfficialFinalReviewEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
