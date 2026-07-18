import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-10-orthogonality",
  title: "10 正交性",
  nodes: ["职责", "依赖", "隔离", "局部变化", "影响验证"],
  focuses: ["正交性", "独立轴", "耦合矩阵", "副作用", "局部测试"],
} as const;

export function Tpp20Topic10OrthogonalitySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic10OrthogonalityFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic10OrthogonalityEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
