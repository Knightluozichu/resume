import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-28-decoupling",
  title: "28 解耦",
  nodes: ["依赖识别", "边界", "消息", "局部状态", "变化验证"],
  focuses: ["耦合", "调用链", "全局数据", "命令查询", "API边界"],
} as const;

export function Tpp20Topic28DecouplingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic28DecouplingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic28DecouplingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
