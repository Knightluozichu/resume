import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-02-pragmatic-approach",
  title: "第2章 务实的方法",
  nodes: ["变化目标", "知识单源", "独立设计", "反馈探索", "迭代估算"],
  focuses: ["ETC", "DRY", "正交性", "可逆性", "曳光反馈"],
} as const;

export function Tpp20Chapter02PragmaticApproachSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter02PragmaticApproachFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter02PragmaticApproachEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
