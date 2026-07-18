import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-27-headlights",
  title: "27 不要冲出前灯范围",
  nodes: ["可见范围", "小步", "反馈", "调整", "再规划"],
  focuses: ["前灯范围", "反馈半径", "步长", "不确定性", "停止线"],
} as const;

export function Tpp20Topic27HeadlightsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic27HeadlightsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic27HeadlightsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
