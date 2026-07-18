import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-39-algorithm-speed",
  title: "39 算法速度",
  nodes: ["输入规模", "增长阶", "估算", "基准", "裁决"],
  focuses: ["算法阶", "输入分布", "常数项", "基准设计", "复杂度拐点"],
} as const;

export function Tpp20Topic39AlgorithmSpeedSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic39AlgorithmSpeedFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic39AlgorithmSpeedEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
