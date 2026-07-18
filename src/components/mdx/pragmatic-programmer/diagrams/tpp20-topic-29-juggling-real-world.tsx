import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-29-juggling-real-world",
  title: "29 在现实世界中抛球杂耍",
  nodes: ["事件", "分类", "状态迁移", "副作用", "恢复"],
  focuses: ["事件流", "状态机", "乱序", "去重", "背压"],
} as const;

export function Tpp20Topic29JugglingRealWorldSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic29JugglingRealWorldFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic29JugglingRealWorldEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
