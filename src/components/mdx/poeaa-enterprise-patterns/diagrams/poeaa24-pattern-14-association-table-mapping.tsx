import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-14-association-table-mapping",
  title: "12.3 关联表映射",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.3 关联表映射"],
  decision:
    "能增删关联而不误删端点对象，并证明重复关系、顺序和并发更新得到控制",
  healthy: "12.3 关联表映射 的约束仍成立",
  failure: "12.3 关联表映射 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern14AssociationTableMappingBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern14AssociationTableMappingMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern14AssociationTableMappingTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
