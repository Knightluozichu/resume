import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-04-service-layer",
  title: "9.4 服务层",
  family: "domain",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
  concepts: ["9.4 服务层"],
  decision:
    "能让服务层只负责编排与事务，不复制领域规则，并给出客户端可依赖的稳定操作契约",
  healthy: "9.4 服务层 的约束仍成立",
  failure: "9.4 服务层 在“规则复杂度”处拒绝",
} as const;

// 领域逻辑：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern04ServiceLayerBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern04ServiceLayerMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern04ServiceLayerTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
