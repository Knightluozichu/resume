import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-20-concrete-table-inheritance",
  title: "12.9 具体表继承",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
} as const;

export function Poeaa24Pattern20ConcreteTableInheritanceBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern20ConcreteTableInheritanceMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern20ConcreteTableInheritanceTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
