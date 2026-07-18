import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-16-offline-concurrency-patterns",
  title: "第16章 离线并发模式",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
} as const;

export function Poeaa24Chapter16OfflineConcurrencyPatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter16OfflineConcurrencyPatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter16OfflineConcurrencyPatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
