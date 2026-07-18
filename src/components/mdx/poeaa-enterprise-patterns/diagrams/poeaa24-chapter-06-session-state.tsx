import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-06-session-state",
  title: "第6章 会话状态",
  nodes: ["请求", "会话标识", "状态读取", "状态更新", "过期恢复"],
  focuses: ["无状态", "会话数据", "存储位置", "伸缩", "失效"],
} as const;

export function Poeaa24Chapter06SessionStateBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter06SessionStateMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter06SessionStateTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
