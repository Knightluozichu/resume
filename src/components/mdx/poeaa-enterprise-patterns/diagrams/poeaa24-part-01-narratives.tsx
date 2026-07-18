import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-part-01-narratives",
  title: "第一部分 表述",
  nodes: ["分层", "领域逻辑", "数据映射", "并发会话", "分布组合"],
  focuses: ["8个叙述章", "选择问题", "模式协作", "技术约束", "通盘考虑"],
} as const;

export function Poeaa24Part01NarrativesBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Part01NarrativesMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Part01NarrativesTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
