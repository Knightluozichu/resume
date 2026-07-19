import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-15-distribution-patterns",
  title: "第15章 分布模式",
  family: "distribution",
  nodes: ["客户端意图", "远程外观", "DTO", "网络", "服务端用例"],
  focuses: ["契约粒度", "往返", "序列化", "版本", "部分失败"],
  concepts: ["第15章 分布模式"],
  decision:
    "能解释分布模式的边界与选择轴，逐项覆盖2个目录节点，并在同一应用切片中验证",
  healthy: "第15章 分布模式 的约束仍成立",
  failure: "第15章 分布模式 在“契约粒度”处拒绝",
} as const;

// 分布边界：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter15DistributionPatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter15DistributionPatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter15DistributionPatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
