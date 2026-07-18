import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-17-session-state-patterns",
  title: "第17章 会话状态模式",
  nodes: ["请求", "会话键", "状态位置", "更新", "过期"],
  focuses: ["可信边界", "容量", "多节点", "持久性", "清理"],
} as const;

export function Poeaa24Chapter17SessionStatePatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter17SessionStatePatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter17SessionStatePatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
