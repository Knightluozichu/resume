import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-part-01-narratives",
  title: "第一部分 表述",
  family: "book",
  nodes: ["分层", "领域逻辑", "数据映射", "并发会话", "分布组合"],
  focuses: ["8个叙述章", "选择问题", "模式协作", "技术约束", "通盘考虑"],
  concepts: ["第一部分 表述"],
  decision: "能从第1至8章构造一个完整应用切片，并解释每个边界为什么存在",
  healthy: "第一部分 表述 的约束仍成立",
  failure: "第一部分 表述 在“8个叙述章”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Part01NarrativesBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Part01NarrativesMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Part01NarrativesTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
