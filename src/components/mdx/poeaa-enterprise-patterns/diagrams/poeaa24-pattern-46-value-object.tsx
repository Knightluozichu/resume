import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-46-value-object",
  title: "18.6 值对象",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.6 值对象"],
  decision: "能证明相等值可互换、修改产生新值，并让无效组合无法构造",
  healthy: "18.6 值对象 的约束仍成立",
  failure: "18.6 值对象 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern46ValueObjectBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern46ValueObjectMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern46ValueObjectTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
