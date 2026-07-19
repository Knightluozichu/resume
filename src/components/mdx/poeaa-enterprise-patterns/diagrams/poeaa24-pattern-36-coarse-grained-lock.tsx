import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-36-coarse-grained-lock",
  title: "16.3 粗粒度锁",
  family: "concurrency",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
  concepts: ["16.3 粗粒度锁"],
  decision: "能证明聚合内对象共享同一锁根，既不漏锁也不过度扩大到无关对象",
  healthy: "16.3 粗粒度锁 的约束仍成立",
  failure: "16.3 粗粒度锁 在“冲突概率”处拒绝",
} as const;

// 离线并发：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern36CoarseGrainedLockBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern36CoarseGrainedLockMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern36CoarseGrainedLockTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
