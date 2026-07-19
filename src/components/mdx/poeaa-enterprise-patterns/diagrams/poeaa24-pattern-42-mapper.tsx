import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-42-mapper",
  title: "18.2 映射器",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.2 映射器"],
  decision:
    "能双向映射两个模型并检测信息丢失，证明映射规则与任一模型的业务行为分离",
  healthy: "18.2 映射器 的约束仍成立",
  failure: "18.2 映射器 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern42MapperBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern42MapperMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern42MapperTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
