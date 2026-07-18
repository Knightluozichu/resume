import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-21-text-manipulation",
  title: "21 文本处理",
  nodes: ["文本源", "解析", "筛选", "变换", "校验"],
  focuses: ["文本处理", "结构解析", "正则边界", "批处理", "结果校验"],
} as const;

export function Tpp20Topic21TextManipulationSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic21TextManipulationFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic21TextManipulationEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
