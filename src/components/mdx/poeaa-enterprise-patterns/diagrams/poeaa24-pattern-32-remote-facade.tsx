import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-32-remote-facade",
  title: "15.1 远程外观",
  family: "distribution",
  nodes: ["客户端意图", "远程外观", "DTO", "网络", "服务端用例"],
  focuses: ["契约粒度", "往返", "序列化", "版本", "部分失败"],
  concepts: ["15.1 远程外观"],
  decision:
    "能把多次远程调用合并为用例级操作，测量往返下降，并保持远程外观不承载领域规则",
  healthy: "15.1 远程外观 的约束仍成立",
  failure: "15.1 远程外观 在“契约粒度”处拒绝",
} as const;

// 分布边界：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern32RemoteFacadeBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern32RemoteFacadeMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern32RemoteFacadeTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
