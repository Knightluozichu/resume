import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-38-client-session-state",
  title: "17.1 客户会话状态",
  family: "session",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
  concepts: ["17.1 客户会话状态"],
  decision: "能防篡改、控制大小与过期，并证明敏感或权威状态没有交给客户端决定",
  healthy: "17.1 客户会话状态 的约束仍成立",
  failure: "17.1 客户会话状态 在“可信边界”处拒绝",
} as const;

// 会话状态：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern38ClientSessionStateBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern38ClientSessionStateMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern38ClientSessionStateTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
