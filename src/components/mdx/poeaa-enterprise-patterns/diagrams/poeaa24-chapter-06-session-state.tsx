import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-06-session-state",
  title: "第6章 会话状态",
  family: "session",
  nodes: ["请求", "会话标识", "状态读取", "状态更新", "过期恢复"],
  focuses: ["无状态", "会话数据", "存储位置", "伸缩", "失效"],
  concepts: [
    "第6章 会话状态",
    "6.1 无状态的价值",
    "6.2 会话状态",
    "6.3 存储会话状态的方法",
  ],
  decision:
    "能解释会话状态的边界与选择轴，逐项覆盖3个目录节点，并在同一应用切片中验证",
  healthy: "第6章 会话状态 的约束仍成立",
  failure: "第6章 会话状态 在“无状态”处拒绝",
} as const;

// 会话状态：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter06SessionStateBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter06SessionStateMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter06SessionStateTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
