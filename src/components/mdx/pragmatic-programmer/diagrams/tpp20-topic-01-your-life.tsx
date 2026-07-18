import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-01-your-life",
  title: "1 人生是你的",
  nodes: ["现状", "约束", "选项", "最小行动", "反馈"],
  focuses: ["自主权", "选择成本", "可逆行动", "反馈周期", "职业边界"],
} as const;

export function Tpp20Topic01YourLifeSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic01YourLifeFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic01YourLifeEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
