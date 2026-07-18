import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-34-optimistic-offline-lock",
  title: "16.1 乐观离线锁",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
} as const;

export function Poeaa24Pattern34OptimisticOfflineLockBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern34OptimisticOfflineLockMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern34OptimisticOfflineLockTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
