import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-11-object-relational-behavior",
  title: "第11章 对象-关系行为模式",
  nodes: ["事务范围", "身份缓存", "对象访问", "变更集合", "提交"],
  focuses: ["工作单元", "唯一实例", "加载时机", "写出顺序", "并发"],
} as const;

export function Poeaa24Chapter11ObjectRelationalBehaviorBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter11ObjectRelationalBehaviorMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter11ObjectRelationalBehaviorTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
