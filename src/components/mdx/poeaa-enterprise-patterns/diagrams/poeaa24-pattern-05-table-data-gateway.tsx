import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-05-table-data-gateway",
  title: "10.1 表数据入口",
  family: "mapping",
  nodes: ["领域调用", "数据边界", "查询命令", "映射", "持久化"],
  focuses: ["SQL隔离", "对象身份", "行为位置", "映射成本", "测试替身"],
  concepts: ["10.1 表数据入口"],
  decision:
    "能把SQL集中在表数据入口，验证调用者不再依赖数据库细节，并说明多表用例如何协调",
  healthy: "10.1 表数据入口 的约束仍成立",
  failure: "10.1 表数据入口 在“SQL隔离”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern05TableDataGatewayBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern05TableDataGatewayMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern05TableDataGatewayTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
