import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-36-blackboards",
  title: "36 黑板",
  nodes: ["事实", "黑板", "代理触发", "新事实", "收敛"],
  focuses: ["黑板", "知识源", "代理", "触发规则", "收敛条件"],
} as const;

export function Tpp20Topic36BlackboardsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic36BlackboardsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic36BlackboardsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
