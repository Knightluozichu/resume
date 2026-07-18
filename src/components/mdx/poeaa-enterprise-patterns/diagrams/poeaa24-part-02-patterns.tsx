import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-part-02-patterns",
  title: "第二部分 模式",
  nodes: ["问题识别", "模式族", "模式机制", "协作组合", "取舍验证"],
  focuses: ["10个模式族", "51个模式", "使用时机", "协作模式", "失败边界"],
} as const;

export function Poeaa24Part02PatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Part02PatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Part02PatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
