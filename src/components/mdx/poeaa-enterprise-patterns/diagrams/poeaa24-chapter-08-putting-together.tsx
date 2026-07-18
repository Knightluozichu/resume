import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-08-putting-together",
  title: "第8章 通盘考虑",
  nodes: ["领域选择", "数据映射", "表示入口", "部署技术", "替代分层"],
  focuses: ["模式组合", "领域起点", "数据源", "表示层", "技术约束"],
} as const;

export function Poeaa24Chapter08PuttingTogetherBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter08PuttingTogetherMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter08PuttingTogetherTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
