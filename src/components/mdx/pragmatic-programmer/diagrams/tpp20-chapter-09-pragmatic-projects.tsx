import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-09-pragmatic-projects",
  title: "第9章 务实的项目",
  nodes: ["稳定团队", "语境选择", "自动流水线", "用户结果", "作品责任"],
  focuses: ["务实团队", "反货物崇拜", "持续交付", "用户价值", "职业伦理"],
} as const;

export function Tpp20Chapter09PragmaticProjectsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter09PragmaticProjectsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter09PragmaticProjectsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
