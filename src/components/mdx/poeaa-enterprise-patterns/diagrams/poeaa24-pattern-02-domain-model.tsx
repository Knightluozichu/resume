import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-02-domain-model",
  title: "9.2 领域模型",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
} as const;

export function Poeaa24Pattern02DomainModelBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern02DomainModelMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern02DomainModelTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
