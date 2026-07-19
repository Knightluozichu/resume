import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-18-base-patterns",
  title: "第18章 基本模式",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["第18章 基本模式"],
  decision:
    "能解释基本模式的边界与选择轴，逐项覆盖11个目录节点，并在同一应用切片中验证",
  healthy: "第18章 基本模式 的约束仍成立",
  failure: "第18章 基本模式 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter18BasePatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter18BasePatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter18BasePatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
