import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-03-software-entropy",
  title: "3 软件的熵",
  nodes: ["坏味道", "默认容忍", "复制扩散", "修复", "守护"],
  focuses: ["破窗", "技术债", "扩散率", "修复预算", "回归门禁"],
} as const;

export function Tpp20Topic03SoftwareEntropySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic03SoftwareEntropyFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic03SoftwareEntropyEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
