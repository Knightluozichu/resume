import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-17-serialized-lob",
  title: "12.6 序列化LOB",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["12.6 序列化LOB"],
  decision:
    "能版本化序列格式、检测损坏并演练迁移，同时明确哪些查询和并发需求使该模式不可用",
  healthy: "12.6 序列化LOB 的约束仍成立",
  failure: "12.6 序列化LOB 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern17SerializedLobBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern17SerializedLobMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern17SerializedLobTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
