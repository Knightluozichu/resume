import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-16-embedded-value",
  title: "12.5 嵌入值",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.5 嵌入值"],
  decision:
    "能把多列重建为不可变值对象，处理空值组合，并证明更新不会破坏值语义",
  healthy: "12.5 嵌入值 的约束仍成立",
  failure: "12.5 嵌入值 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern16EmbeddedValueBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern16EmbeddedValueMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern16EmbeddedValueTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
