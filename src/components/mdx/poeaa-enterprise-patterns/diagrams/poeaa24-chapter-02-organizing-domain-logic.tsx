import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-02-organizing-domain-logic",
  title: "第2章 组织领域逻辑",
  family: "domain",
  nodes: ["用例", "规则复杂度", "领域组织", "事务边界", "演化"],
  focuses: ["复杂度", "事务脚本", "领域模型", "表模块", "服务层"],
  concepts: ["第2章 组织领域逻辑", "2.1 抉择", "2.2 服务层"],
  decision:
    "能解释组织领域逻辑的边界与选择轴，逐项覆盖2个目录节点，并在同一应用切片中验证",
  healthy: "第2章 组织领域逻辑 的约束仍成立",
  failure: "第2章 组织领域逻辑 在“复杂度”处拒绝",
} as const;

// 领域逻辑：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter02OrganizingDomainLogicBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter02OrganizingDomainLogicMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter02OrganizingDomainLogicTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
