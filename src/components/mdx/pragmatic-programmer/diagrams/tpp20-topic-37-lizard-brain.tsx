import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-37-lizard-brain",
  title: "37 听从蜥蜴脑",
  nodes: ["感觉信号", "暂停", "假设", "小实验", "解释"],
  focuses: ["蜥蜴脑", "认知阻力", "未知量", "实验", "休息"],
} as const;

export function Tpp20Topic37LizardBrainSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic37LizardBrainFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic37LizardBrainEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
