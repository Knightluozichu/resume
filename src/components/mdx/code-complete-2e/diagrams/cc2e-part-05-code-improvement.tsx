import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-05-code-improvement",
  title: "第5部分：代码改善",
  nodes: ["质量目标", "协同检查", "测试调试", "安全重构", "性能复测"],
  focuses: ["质量", "协作", "测试", "重构", "调整"],
} as const;

export function Cc2ePart05CodeImprovementStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart05CodeImprovementTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart05CodeImprovementEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
