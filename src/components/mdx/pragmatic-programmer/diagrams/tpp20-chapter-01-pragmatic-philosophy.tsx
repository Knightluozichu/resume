import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-01-pragmatic-philosophy",
  title: "第1章 务实的哲学",
  nodes: ["自主选择", "责任承担", "控制熵增", "知识复利", "有效沟通"],
  focuses: ["职业自主", "责任边界", "软件熵", "质量需求", "知识组合"],
} as const;

export function Tpp20Chapter01PragmaticPhilosophySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter01PragmaticPhilosophyFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter01PragmaticPhilosophyEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
