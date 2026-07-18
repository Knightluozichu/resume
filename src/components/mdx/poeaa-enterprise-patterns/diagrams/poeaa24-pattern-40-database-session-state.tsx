import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-40-database-session-state",
  title: "17.3 数据库会话状态",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
} as const;

export function Poeaa24Pattern40DatabaseSessionStateBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern40DatabaseSessionStateMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern40DatabaseSessionStateTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
