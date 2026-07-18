import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-13-prototypes-post-it-notes",
  title: "13 原型与便签",
  nodes: ["未知量", "原型", "观察", "结论", "丢弃"],
  focuses: ["学习问题", "原型保真度", "观察指标", "丢弃条件", "生产边界"],
} as const;

export function Tpp20Topic13PrototypesPostItNotesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic13PrototypesPostItNotesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic13PrototypesPostItNotesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
