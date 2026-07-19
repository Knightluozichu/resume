import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-33-data-transfer-object",
  title: "15.2 数据传输对象",
  family: "distribution",
  nodes: ["客户端意图", "远程外观", "DTO", "网络", "服务端用例"],
  focuses: ["契约粒度", "往返", "序列化", "版本", "部分失败"],
  concepts: ["15.2 数据传输对象"],
  decision: "能版本化DTO并批量传输所需数据，证明领域对象没有直接越过进程边界",
  healthy: "15.2 数据传输对象 的约束仍成立",
  failure: "15.2 数据传输对象 在“契约粒度”处拒绝",
} as const;

// 分布边界：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern33DataTransferObjectBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern33DataTransferObjectMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern33DataTransferObjectTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
