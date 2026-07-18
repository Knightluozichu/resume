import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-33-breaking-temporal-coupling",
  title: "33 打破时域耦合",
  nodes: ["活动", "依赖", "并行候选", "同步点", "关键路径"],
  focuses: ["时域耦合", "工作流", "依赖图", "并行度", "关键路径"],
} as const;

export function Tpp20Topic33BreakingTemporalCouplingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic33BreakingTemporalCouplingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic33BreakingTemporalCouplingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
