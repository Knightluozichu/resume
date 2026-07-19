import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-39-server-session-state",
  title: "17.2 服务器会话状态",
  family: "session",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
  concepts: ["17.2 服务器会话状态"],
  decision:
    "能在多节点环境定位会话、处理失效与清理，并演练节点故障后的恢复或明确丢失语义",
  healthy: "17.2 服务器会话状态 的约束仍成立",
  failure: "17.2 服务器会话状态 在“可信边界”处拒绝",
} as const;

// 会话状态：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern39ServerSessionStateBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern39ServerSessionStateMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern39ServerSessionStateTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
