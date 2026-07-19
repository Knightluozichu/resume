import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-08-putting-together",
  title: "第8章 通盘考虑",
  family: "distribution",
  nodes: ["领域选择", "数据映射", "表示入口", "部署技术", "替代分层"],
  focuses: ["模式组合", "领域起点", "数据源", "表示层", "技术约束"],
  concepts: [
    "第8章 通盘考虑",
    "8.1 从领域层开始",
    "8.2 深入到数据源层",
    "8.3 表示层",
    "8.4 一些关于具体技术的建议",
    "8.5 其他分层方式",
  ],
  decision:
    "能解释通盘考虑的边界与选择轴，逐项覆盖5个目录节点，并在同一应用切片中验证",
  healthy: "第8章 通盘考虑 的约束仍成立",
  failure: "第8章 通盘考虑 在“模式组合”处拒绝",
} as const;

// 分布边界：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter08PuttingTogetherBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter08PuttingTogetherMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter08PuttingTogetherTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
