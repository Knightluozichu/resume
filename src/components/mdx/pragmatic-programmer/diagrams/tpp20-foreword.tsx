import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-foreword",
  title: "序",
  nodes: ["历史影响", "新版问题", "读者边界", "实践期待", "证据契约"],
  focuses: ["行业语境", "经典影响", "新版价值", "读者角色", "验证边界"],
} as const;

export function Tpp20ForewordSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20ForewordFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20ForewordEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
