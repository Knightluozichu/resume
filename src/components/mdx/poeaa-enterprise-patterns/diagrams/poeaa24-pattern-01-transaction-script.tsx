import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-01-transaction-script",
  title: "9.1 事务脚本",
  family: "domain",
  nodes: ["请求", "业务规则", "领域组织", "事务", "结果"],
  focuses: ["规则复杂度", "对象协作", "表结构", "服务边界", "演化成本"],
  concepts: ["9.1 事务脚本"],
  decision:
    "能用一条事务脚本完成简单用例，并证明规则增长后何时应迁移到领域模型",
  healthy: "9.1 事务脚本 的约束仍成立",
  failure: "9.1 事务脚本 在“规则复杂度”处拒绝",
} as const;

// 领域逻辑：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern01TransactionScriptBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern01TransactionScriptMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern01TransactionScriptTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
