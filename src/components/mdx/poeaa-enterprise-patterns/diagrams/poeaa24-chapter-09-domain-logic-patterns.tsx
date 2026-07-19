import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-09-domain-logic-patterns",
  title: "第9章 领域逻辑模式",
  family: "domain",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
  concepts: ["第9章 领域逻辑模式"],
  decision:
    "能解释领域逻辑模式的边界与选择轴，逐项覆盖4个目录节点，并在同一应用切片中验证",
  healthy: "第9章 领域逻辑模式 的约束仍成立",
  failure: "第9章 领域逻辑模式 在“规则复杂度”处拒绝",
} as const;

// 领域逻辑：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter09DomainLogicPatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter09DomainLogicPatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter09DomainLogicPatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
