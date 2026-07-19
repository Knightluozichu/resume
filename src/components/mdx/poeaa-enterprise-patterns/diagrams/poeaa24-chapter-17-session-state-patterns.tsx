import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-17-session-state-patterns",
  title: "第17章 会话状态模式",
  family: "session",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
  concepts: ["第17章 会话状态模式"],
  decision:
    "能解释会话状态模式的边界与选择轴，逐项覆盖3个目录节点，并在同一应用切片中验证",
  healthy: "第17章 会话状态模式 的约束仍成立",
  failure: "第17章 会话状态模式 在“可信边界”处拒绝",
} as const;

// 会话状态：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter17SessionStatePatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter17SessionStatePatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter17SessionStatePatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
