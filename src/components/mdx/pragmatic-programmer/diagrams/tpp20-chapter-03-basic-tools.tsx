import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-03-basic-tools",
  title: "第3章 基础工具",
  nodes: ["可读表示", "组合工具", "自动变换", "历史追踪", "证据记录"],
  focuses: ["纯文本", "Shell", "编辑器", "版本控制", "工程日记"],
} as const;

export function Tpp20Chapter03BasicToolsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter03BasicToolsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter03BasicToolsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
