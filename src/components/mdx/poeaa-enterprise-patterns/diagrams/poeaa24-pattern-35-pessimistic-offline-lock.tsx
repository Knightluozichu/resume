import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-35-pessimistic-offline-lock",
  title: "16.2 悲观离线锁",
  family: "concurrency",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
  concepts: ["16.2 悲观离线锁"],
  decision: "能定义锁的获取、超时、释放和失主恢复，并量化等待与死锁风险",
  healthy: "16.2 悲观离线锁 的约束仍成立",
  failure: "16.2 悲观离线锁 在“冲突概率”处拒绝",
} as const;

// 离线并发：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern35PessimisticOfflineLockBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern35PessimisticOfflineLockMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern35PessimisticOfflineLockTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
