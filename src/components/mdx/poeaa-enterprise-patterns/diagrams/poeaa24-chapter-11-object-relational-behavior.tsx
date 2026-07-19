import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-11-object-relational-behavior",
  title: "第11章 对象-关系行为模式",
  family: "mapping",
  nodes: ["事务范围", "身份缓存", "对象访问", "变更集合", "提交"],
  focuses: ["工作单元", "唯一实例", "加载时机", "写出顺序", "并发"],
  concepts: ["第11章 对象-关系行为模式"],
  decision:
    "能解释对象-关系行为模式的边界与选择轴，逐项覆盖3个目录节点，并在同一应用切片中验证",
  healthy: "第11章 对象-关系行为模式 的约束仍成立",
  failure: "第11章 对象-关系行为模式 在“工作单元”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter11ObjectRelationalBehaviorBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter11ObjectRelationalBehaviorMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter11ObjectRelationalBehaviorTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
