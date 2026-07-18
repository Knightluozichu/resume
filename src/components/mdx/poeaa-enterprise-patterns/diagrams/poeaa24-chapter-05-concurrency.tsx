import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-05-concurrency",
  title: "第5章 并发",
  nodes: ["业务事务", "读取版本", "并发修改", "冲突检测", "提交恢复"],
  focuses: ["执行语境", "隔离", "不变量", "乐观悲观", "事务"],
} as const;

export function Poeaa24Chapter05ConcurrencyBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter05ConcurrencyMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter05ConcurrencyTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
