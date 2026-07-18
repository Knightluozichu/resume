import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-15-estimating",
  title: "15 估算",
  nodes: ["问题拆分", "单位", "数量级", "区间", "校准"],
  focuses: ["估算单位", "假设清单", "误差区间", "反馈样本", "进度更新"],
} as const;

export function Tpp20Topic15EstimatingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic15EstimatingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic15EstimatingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
