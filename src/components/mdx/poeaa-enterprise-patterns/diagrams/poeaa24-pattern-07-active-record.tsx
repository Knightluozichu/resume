import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-07-active-record",
  title: "10.3 活动记录",
  family: "mapping",
  nodes: ["领域调用", "数据边界", "查询命令", "映射", "持久化"],
  focuses: ["SQL隔离", "对象身份", "行为位置", "映射成本", "测试替身"],
  concepts: ["10.3 活动记录"],
  decision:
    "能用活动记录完成简单领域的读写与校验，并识别复杂协作使其失效的阈值",
  healthy: "10.3 活动记录 的约束仍成立",
  failure: "10.3 活动记录 在“SQL隔离”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern07ActiveRecordBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern07ActiveRecordMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern07ActiveRecordTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
