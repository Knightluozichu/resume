import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-34-optimistic-offline-lock",
  title: "16.1 乐观离线锁",
  family: "concurrency",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
  concepts: ["16.1 乐观离线锁"],
  decision:
    "能让两个离线事务产生可重复冲突，拒绝后提交者，并提供用户可理解的重试或合并路径",
  healthy: "16.1 乐观离线锁 的约束仍成立",
  failure: "16.1 乐观离线锁 在“冲突概率”处拒绝",
} as const;

// 离线并发：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern34OptimisticOfflineLockBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern34OptimisticOfflineLockMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern34OptimisticOfflineLockTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
