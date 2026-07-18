import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-31-layout-and-style",
  title: "第31章：布局与风格",
  nodes: ["阅读任务", "格式规则", "自动格式化", "差异审查", "风格维护"],
  focuses: ["基本原则", "技术", "风格", "控制结构", "文件布局"],
} as const;

export function Cc2e31LayoutAndStyleStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e31LayoutAndStyleTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e31LayoutAndStyleEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
