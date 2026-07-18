import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-38-client-session-state",
  title: "17.1 客户会话状态",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
} as const;

export function Poeaa24Pattern38ClientSessionStateBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern38ClientSessionStateMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern38ClientSessionStateTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
