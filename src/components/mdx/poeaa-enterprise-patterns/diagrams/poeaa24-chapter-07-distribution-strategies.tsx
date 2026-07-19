import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-07-distribution-strategies",
  title: "第7章 分布策略",
  family: "distribution",
  nodes: ["本地模型", "分布边界", "远程契约", "网络调用", "故障恢复"],
  focuses: ["远程本地", "往返次数", "序列化", "部分失败", "边界粒度"],
  concepts: [
    "第7章 分布策略",
    "7.1 分布对象的诱惑",
    "7.2 远程接口和本地接口",
    "7.3 必须使用分布的情况",
    "7.4 关于分布边界",
    "7.5 分布接口",
  ],
  decision:
    "能解释分布策略的边界与选择轴，逐项覆盖5个目录节点，并在同一应用切片中验证",
  healthy: "第7章 分布策略 的约束仍成立",
  failure: "第7章 分布策略 在“远程本地”处拒绝",
} as const;

// 分布边界：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter07DistributionStrategiesBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter07DistributionStrategiesMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter07DistributionStrategiesTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
