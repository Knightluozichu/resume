import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-06-working-classes",
  title: "第6章：可以工作的类",
  nodes: ["领域概念", "ADT契约", "类接口", "实现封装", "使用验证"],
  focuses: ["抽象质量", "封装边界", "组合", "继承", "包组织"],
} as const;

export function Cc2e06WorkingClassesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e06WorkingClassesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e06WorkingClassesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
