import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-part-02-patterns",
  title: "第二部分 模式",
  family: "book",
  nodes: ["问题识别", "模式族", "模式机制", "协作组合", "取舍验证"],
  focuses: ["10个模式族", "51个模式", "使用时机", "协作模式", "失败边界"],
  concepts: ["第二部分 模式"],
  decision: "能按问题而非流行框架选择模式，并用基线、临界与受控故障场景验证",
  healthy: "第二部分 模式 的约束仍成立",
  failure: "第二部分 模式 在“10个模式族”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Part02PatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Part02PatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Part02PatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
