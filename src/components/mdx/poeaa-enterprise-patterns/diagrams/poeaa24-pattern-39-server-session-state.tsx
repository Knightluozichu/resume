import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-39-server-session-state",
  title: "17.2 服务器会话状态",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
} as const;

export function Poeaa24Pattern39ServerSessionStateBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern39ServerSessionStateMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern39ServerSessionStateTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
