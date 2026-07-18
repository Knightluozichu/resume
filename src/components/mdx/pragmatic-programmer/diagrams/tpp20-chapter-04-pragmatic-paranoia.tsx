import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-04-pragmatic-paranoia",
  title: "第4章 务实的偏执",
  nodes: ["契约", "校验", "失败隔离", "资源平衡", "反馈半径"],
  focuses: ["契约式设计", "快速失败", "断言", "资源所有权", "前灯范围"],
} as const;

export function Tpp20Chapter04PragmaticParanoiaSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter04PragmaticParanoiaFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter04PragmaticParanoiaEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
