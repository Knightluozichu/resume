import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-18-power-editing",
  title: "18 加强编辑能力",
  nodes: ["定位", "选择", "变换", "预览", "验证"],
  focuses: ["编辑器流畅度", "结构导航", "宏", "批量修改", "撤销边界"],
} as const;

export function Tpp20Topic18PowerEditingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic18PowerEditingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic18PowerEditingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
