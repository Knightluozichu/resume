import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-36-coarse-grained-lock",
  title: "16.3 粗粒度锁",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
} as const;

export function Poeaa24Pattern36CoarseGrainedLockBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern36CoarseGrainedLockMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern36CoarseGrainedLockTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
