import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-43-layer-supertype",
  title: "18.3 层超类型",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.3 层超类型"],
  decision:
    "能把真正跨层内类型的共同机制放入超类型，并拒绝与具体业务无关的便利方法膨胀",
  healthy: "18.3 层超类型 的约束仍成立",
  failure: "18.3 层超类型 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern43LayerSupertypeBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern43LayerSupertypeMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern43LayerSupertypeTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
