import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-list",
  title: "模式列表",
  family: "book",
  nodes: ["问题分类", "模式族", "候选模式", "协作关系", "取舍复核"],
  focuses: ["51个模式", "10个模式族", "问题索引", "协作图", "替代方案"],
  concepts: ["模式列表"],
  decision: "能从一个架构问题定位候选模式族，比较至少两个模式并记录拒绝理由",
  healthy: "模式列表 的约束仍成立",
  failure: "模式列表 在“51个模式”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24PatternListBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24PatternListMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24PatternListTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
