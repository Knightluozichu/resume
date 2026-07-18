import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-09-domain-logic-patterns",
  title: "第9章 领域逻辑模式",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
} as const;

export function Poeaa24Chapter09DomainLogicPatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter09DomainLogicPatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter09DomainLogicPatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
