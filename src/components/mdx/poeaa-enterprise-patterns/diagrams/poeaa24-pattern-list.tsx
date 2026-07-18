import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-list",
  title: "模式列表",
  nodes: ["问题分类", "模式族", "候选模式", "协作关系", "取舍复核"],
  focuses: ["51个模式", "10个模式族", "问题索引", "协作图", "替代方案"],
} as const;

export function Poeaa24PatternListBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24PatternListMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24PatternListTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
