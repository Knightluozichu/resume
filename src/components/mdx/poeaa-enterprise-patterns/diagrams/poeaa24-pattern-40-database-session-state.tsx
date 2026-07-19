import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-40-database-session-state",
  title: "17.3 数据库会话状态",
  family: "session",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
  concepts: ["17.3 数据库会话状态"],
  decision: "能事务化读写会话、设置过期清理并测量数据库热点，说明何时不应使用",
  healthy: "17.3 数据库会话状态 的约束仍成立",
  failure: "17.3 数据库会话状态 在“可信边界”处拒绝",
} as const;

// 会话状态：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern40DatabaseSessionStateBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern40DatabaseSessionStateMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern40DatabaseSessionStateTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
