import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-09-dry-duplication",
  title: "9 DRY——邪恶的重复",
  nodes: ["知识识别", "权威源", "投影", "漂移检测", "修复"],
  focuses: ["知识重复", "代码重复", "单一源", "生成物", "漂移率"],
} as const;

export function Tpp20Topic09DryDuplicationSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic09DryDuplicationFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic09DryDuplicationEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
