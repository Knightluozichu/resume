import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-12-identity-field",
  title: "12.1 标识字段",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.1 标识字段"],
  decision:
    "能区分对象身份与值相等，处理新对象临时身份，并在写回后保持引用稳定",
  healthy: "12.1 标识字段 的约束仍成立",
  failure: "12.1 标识字段 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern12IdentityFieldBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern12IdentityFieldMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern12IdentityFieldTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
