import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-18-single-table-inheritance",
  title: "12.7 单表继承",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.7 单表继承"],
  decision:
    "能验证类型标识与字段约束，量化空列和宽表代价，并保证新增子类迁移可回退",
  healthy: "12.7 单表继承 的约束仍成立",
  failure: "12.7 单表继承 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern18SingleTableInheritanceBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern18SingleTableInheritanceMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern18SingleTableInheritanceTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
