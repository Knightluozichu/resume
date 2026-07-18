import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-40-refactoring",
  title: "40 重构",
  nodes: ["坏味道", "保护测试", "小变换", "验证", "提交"],
  focuses: ["重构", "行为保持", "坏味道", "小步提交", "回退"],
} as const;

export function Tpp20Topic40RefactoringSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic40RefactoringFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic40RefactoringEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
