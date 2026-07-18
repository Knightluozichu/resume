import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-official-final-review",
  title: "《企业应用架构模式》全书总复习",
  nodes: ["请求入口", "领域事务", "对象映射", "并发会话", "远程边界"],
  focuses: ["版次闭环", "模式协作", "替代方案", "故障注入", "独立复核"],
} as const;

export function Poeaa24OfficialFinalReviewBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24OfficialFinalReviewMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24OfficialFinalReviewTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
