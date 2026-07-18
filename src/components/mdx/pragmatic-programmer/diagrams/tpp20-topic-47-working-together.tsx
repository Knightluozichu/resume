import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-47-working-together",
  title: "47 携手共建",
  nodes: ["共同目标", "同步工作", "即时反馈", "角色轮换", "复盘"],
  focuses: ["结对编程", "群体编程", "知识流", "心理安全", "共同所有权"],
} as const;

export function Tpp20Topic47WorkingTogetherSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic47WorkingTogetherFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic47WorkingTogetherEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
