import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-postface",
  title: "跋",
  nodes: ["影响识别", "伤害评估", "专业判断", "升级拒绝", "责任复盘"],
  focuses: ["先勿伤害", "职业伦理", "协助边界", "风险升级", "责任记录"],
} as const;

export function Tpp20PostfaceSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20PostfaceFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20PostfaceEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
