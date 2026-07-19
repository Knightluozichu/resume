import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-16-offline-concurrency-patterns",
  title: "第16章 离线并发模式",
  family: "concurrency",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
  concepts: ["第16章 离线并发模式"],
  decision:
    "能解释离线并发模式的边界与选择轴，逐项覆盖4个目录节点，并在同一应用切片中验证",
  healthy: "第16章 离线并发模式 的约束仍成立",
  failure: "第16章 离线并发模式 在“冲突概率”处拒绝",
} as const;

// 离线并发：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter16OfflineConcurrencyPatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter16OfflineConcurrencyPatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter16OfflineConcurrencyPatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
