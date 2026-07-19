import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-19-class-table-inheritance",
  title: "12.8 类表继承",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.8 类表继承"],
  decision: "能正确连接多级表并保持身份唯一，同时测量读取联接和写入事务的成本",
  healthy: "12.8 类表继承 的约束仍成立",
  failure: "12.8 类表继承 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern19ClassTableInheritanceBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern19ClassTableInheritanceMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern19ClassTableInheritanceTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
