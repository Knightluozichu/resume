import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-12-object-relational-structure",
  title: "第12章 对象-关系结构模式",
  family: "mapping",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
  concepts: ["第12章 对象-关系结构模式"],
  decision:
    "能解释对象-关系结构模式的边界与选择轴，逐项覆盖10个目录节点，并在同一应用切片中验证",
  healthy: "第12章 对象-关系结构模式 的约束仍成立",
  failure: "第12章 对象-关系结构模式 在“标识”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter12ObjectRelationalStructureBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter12ObjectRelationalStructureMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter12ObjectRelationalStructureTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
