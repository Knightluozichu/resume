import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-08-data-mapper",
  title: "10.4 数据映射器",
  family: "mapping",
  nodes: ["领域调用", "数据边界", "查询命令", "映射", "持久化"],
  focuses: ["SQL隔离", "对象身份", "行为位置", "映射成本", "测试替身"],
  concepts: ["10.4 数据映射器"],
  decision:
    "能在不修改领域对象的情况下替换存储结构，并用映射测试证明身份、关系和更新正确",
  healthy: "10.4 数据映射器 的约束仍成立",
  failure: "10.4 数据映射器 在“SQL隔离”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern08DataMapperBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern08DataMapperMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern08DataMapperTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
