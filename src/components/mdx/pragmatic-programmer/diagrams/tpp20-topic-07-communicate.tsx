import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-07-communicate",
  title: "7 交流！",
  nodes: ["受众", "意图", "结构", "媒介", "反馈"],
  focuses: ["受众模型", "信息层级", "更新时间", "文档源头", "理解证据"],
} as const;

export function Tpp20Topic07CommunicateSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic07CommunicateFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic07CommunicateEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
