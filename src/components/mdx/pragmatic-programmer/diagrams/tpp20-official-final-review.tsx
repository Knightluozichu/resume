import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-official-final-review",
  title: "《程序员修炼之道（第2版）》全书总复习",
  nodes: ["个人责任", "设计反馈", "工具证据", "并发安全", "用户价值"],
  focuses: ["版次闭环", "目录覆盖", "跨章迁移", "故障注入", "独立复核"],
} as const;

export function Tpp20OfficialFinalReviewSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20OfficialFinalReviewFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20OfficialFinalReviewEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
