import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-21-inheritance-mappers",
  title: "12.10 继承映射器",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.10 继承映射器"],
  decision:
    "能让父子映射器协作完成加载与保存，并避免映射器继承复制领域继承的全部耦合",
  healthy: "12.10 继承映射器 的约束仍成立",
  failure: "12.10 继承映射器 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern21InheritanceMappersBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern21InheritanceMappersMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern21InheritanceMappersTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
