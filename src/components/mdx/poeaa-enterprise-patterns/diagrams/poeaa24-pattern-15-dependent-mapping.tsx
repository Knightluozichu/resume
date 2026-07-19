import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-15-dependent-mapping",
  title: "12.4 依赖映射",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.4 依赖映射"],
  decision:
    "能证明从属对象不能脱离拥有者独立存在，并在替换或删除聚合时维持生命周期一致",
  healthy: "12.4 依赖映射 的约束仍成立",
  failure: "12.4 依赖映射 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern15DependentMappingBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern15DependentMappingMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern15DependentMappingTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
