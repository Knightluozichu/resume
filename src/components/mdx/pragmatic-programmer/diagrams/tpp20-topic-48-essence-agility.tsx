import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-48-essence-agility",
  title: "48 敏捷的本质",
  nodes: ["目标", "小步交付", "观察", "学习", "调整"],
  focuses: ["敏捷", "反馈", "适应", "实验周期", "仪式"],
} as const;

export function Tpp20Topic48EssenceAgilitySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic48EssenceAgilityFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic48EssenceAgilityEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
