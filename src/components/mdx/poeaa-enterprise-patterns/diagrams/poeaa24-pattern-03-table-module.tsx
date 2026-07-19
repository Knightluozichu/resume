import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-03-table-module",
  title: "9.3 表模块",
  family: "domain",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
  concepts: ["9.3 表模块"],
  decision:
    "能以表模块处理一组记录并保持事务边界清楚，同时说明它相对领域模型的表达限制",
  healthy: "9.3 表模块 的约束仍成立",
  failure: "9.3 表模块 在“规则复杂度”处拒绝",
} as const;

// 领域逻辑：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern03TableModuleBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern03TableModuleMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern03TableModuleTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
