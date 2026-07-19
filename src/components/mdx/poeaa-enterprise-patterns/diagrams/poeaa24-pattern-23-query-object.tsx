import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-23-query-object",
  title: "13.2 查询对象",
  family: "mapping",
  nodes: ["领域意图", "查询对象", "映射元数据", "执行", "对象结果"],
  focuses: ["元数据校验", "查询组合", "资源库边界", "参数化", "类型恢复"],
  concepts: ["13.2 查询对象"],
  decision:
    "能组合条件而不泄漏SQL，参数化所有值，并验证同一查询对象在边界输入下语义稳定",
  healthy: "13.2 查询对象 的约束仍成立",
  failure: "13.2 查询对象 在“元数据校验”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern23QueryObjectBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern23QueryObjectMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern23QueryObjectTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
