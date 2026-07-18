import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-46-impossible-puzzles",
  title: "46 处理无法解决的难题",
  nodes: ["目标", "约束盘点", "假设检验", "边界重构", "解法"],
  focuses: ["约束", "隐含假设", "框框", "必要条件", "反例"],
} as const;

export function Tpp20Topic46ImpossiblePuzzlesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic46ImpossiblePuzzlesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic46ImpossiblePuzzlesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
