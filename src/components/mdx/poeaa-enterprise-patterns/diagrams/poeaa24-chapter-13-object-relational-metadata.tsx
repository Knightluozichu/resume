import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-13-object-relational-metadata",
  title: "第13章 对象-关系元数据映射模式",
  family: "mapping",
  nodes: ["领域意图", "查询对象", "映射元数据", "执行", "对象结果"],
  focuses: ["元数据校验", "查询组合", "资源库边界", "参数化", "类型恢复"],
  concepts: ["第13章 对象-关系元数据映射模式"],
  decision:
    "能解释对象-关系元数据映射模式的边界与选择轴，逐项覆盖3个目录节点，并在同一应用切片中验证",
  healthy: "第13章 对象-关系元数据映射模式 的约束仍成立",
  failure: "第13章 对象-关系元数据映射模式 在“元数据校验”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter13ObjectRelationalMetadataBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter13ObjectRelationalMetadataMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter13ObjectRelationalMetadataTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
