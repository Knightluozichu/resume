import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-41-gateway",
  title: "18.1 入口",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.1 入口"],
  decision:
    "能以测试替身替换外部系统，统一翻译错误，并证明调用者只依赖内部契约",
  healthy: "18.1 入口 的约束仍成立",
  failure: "18.1 入口 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern41GatewayBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern41GatewayMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern41GatewayTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
