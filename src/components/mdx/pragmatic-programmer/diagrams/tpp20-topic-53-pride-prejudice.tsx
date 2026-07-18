import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-53-pride-prejudice",
  title: "53 傲慢与偏见",
  nodes: ["专业判断", "责任", "署名", "伦理边界", "拒绝伤害"],
  focuses: ["作品署名", "职业自豪", "伦理", "伤害评估", "拒绝机制"],
} as const;

export function Tpp20Topic53PridePrejudiceSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic53PridePrejudiceFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic53PridePrejudiceEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
