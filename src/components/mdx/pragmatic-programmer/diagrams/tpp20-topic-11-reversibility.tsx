import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-11-reversibility",
  title: "11 可逆性",
  nodes: ["假设", "期限", "隔离层", "替代方案", "撤回演练"],
  focuses: ["可逆性", "锁定成本", "决策期限", "适配边界", "退出路径"],
} as const;

export function Tpp20Topic11ReversibilitySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic11ReversibilityFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic11ReversibilityEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
