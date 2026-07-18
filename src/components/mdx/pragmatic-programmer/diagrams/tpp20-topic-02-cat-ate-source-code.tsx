import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-02-cat-ate-source-code",
  title: "2 我的源码被猫吃了",
  nodes: ["事实", "影响", "责任", "备选方案", "承诺"],
  focuses: ["事故事实", "用户影响", "可行选项", "恢复时限", "回归证据"],
} as const;

export function Tpp20Topic02CatAteSourceCodeSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic02CatAteSourceCodeFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic02CatAteSourceCodeEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
