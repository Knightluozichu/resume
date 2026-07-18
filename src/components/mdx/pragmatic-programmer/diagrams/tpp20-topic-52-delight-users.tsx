import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-52-delight-users",
  title: "52 取悦用户",
  nodes: ["用户结果", "成功指标", "解决方案", "使用反馈", "价值复核"],
  focuses: ["用户价值", "业务结果", "体验", "交付", "反馈"],
} as const;

export function Tpp20Topic52DelightUsersSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic52DelightUsersFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic52DelightUsersEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
