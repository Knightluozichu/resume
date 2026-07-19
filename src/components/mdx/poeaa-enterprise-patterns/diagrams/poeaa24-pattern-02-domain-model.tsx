import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-02-domain-model",
  title: "9.2 领域模型",
  family: "domain",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
  concepts: ["9.2 领域模型"],
  decision:
    "能把跨多个用例的复杂规则放入领域对象，并证明持久化与表示层没有吞掉领域行为",
  healthy: "9.2 领域模型 的约束仍成立",
  failure: "9.2 领域模型 在“规则复杂度”处拒绝",
} as const;

// 领域逻辑：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern02DomainModelBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern02DomainModelMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern02DomainModelTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
