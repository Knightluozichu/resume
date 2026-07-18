import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-12-object-relational-structure",
  title: "第12章 对象-关系结构模式",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
} as const;

export function Poeaa24Chapter12ObjectRelationalStructureBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter12ObjectRelationalStructureMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter12ObjectRelationalStructureTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
