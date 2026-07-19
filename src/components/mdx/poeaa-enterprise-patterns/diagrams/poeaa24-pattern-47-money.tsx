import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-47-money",
  title: "18.7 货币",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.7 货币"],
  decision: "能拒绝跨币种直接相加，固定舍入策略，并用边界金额验证无浮点漂移",
  healthy: "18.7 货币 的约束仍成立",
  failure: "18.7 货币 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern47MoneyBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern47MoneyMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern47MoneyTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
