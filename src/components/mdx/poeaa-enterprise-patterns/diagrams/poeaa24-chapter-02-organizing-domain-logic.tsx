import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-02-organizing-domain-logic",
  title: "第2章 组织领域逻辑",
  nodes: ["用例", "规则复杂度", "领域组织", "事务边界", "演化"],
  focuses: ["复杂度", "事务脚本", "领域模型", "表模块", "服务层"],
} as const;

export function Poeaa24Chapter02OrganizingDomainLogicBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter02OrganizingDomainLogicMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter02OrganizingDomainLogicTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
