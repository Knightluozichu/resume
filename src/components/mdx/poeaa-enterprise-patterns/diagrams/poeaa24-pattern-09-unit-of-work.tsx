import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-09-unit-of-work",
  title: "11.1 工作单元",
  nodes: ["事务范围", "身份缓存", "对象访问", "变更集合", "提交"],
  focuses: ["工作单元", "唯一实例", "加载时机", "写出顺序", "并发"],
} as const;

export function Poeaa24Pattern09UnitOfWorkBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern09UnitOfWorkMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern09UnitOfWorkTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
