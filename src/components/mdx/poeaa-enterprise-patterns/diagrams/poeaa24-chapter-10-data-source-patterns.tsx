import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-10-data-source-patterns",
  title: "第10章 数据源架构模式",
  family: "mapping",
  nodes: ["领域调用", "数据边界", "查询命令", "映射", "持久化"],
  focuses: ["SQL隔离", "对象身份", "行为位置", "映射成本", "测试替身"],
  concepts: ["第10章 数据源架构模式"],
  decision:
    "能解释数据源架构模式的边界与选择轴，逐项覆盖4个目录节点，并在同一应用切片中验证",
  healthy: "第10章 数据源架构模式 的约束仍成立",
  failure: "第10章 数据源架构模式 在“SQL隔离”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter10DataSourcePatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter10DataSourcePatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter10DataSourcePatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
