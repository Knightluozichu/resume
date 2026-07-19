import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-13-foreign-key-mapping",
  title: "12.2 外键映射",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.2 外键映射"],
  decision:
    "能在加载与保存时维持外键和对象引用一致，并处理可空、级联和循环关联边界",
  healthy: "12.2 外键映射 的约束仍成立",
  failure: "12.2 外键映射 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern13ForeignKeyMappingBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern13ForeignKeyMappingMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern13ForeignKeyMappingTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
