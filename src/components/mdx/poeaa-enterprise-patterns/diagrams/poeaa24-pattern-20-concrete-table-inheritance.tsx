import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-20-concrete-table-inheritance",
  title: "12.9 具体表继承",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.9 具体表继承"],
  decision: "能证明跨类型查询与字段演化仍一致，并量化重复列和标识生成的代价",
  healthy: "12.9 具体表继承 的约束仍成立",
  failure: "12.9 具体表继承 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern20ConcreteTableInheritanceBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern20ConcreteTableInheritanceMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern20ConcreteTableInheritanceTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
