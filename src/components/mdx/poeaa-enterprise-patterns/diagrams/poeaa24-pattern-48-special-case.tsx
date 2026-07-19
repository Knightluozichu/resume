import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-48-special-case",
  title: "18.8 特殊情况",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.8 特殊情况"],
  decision:
    "能让特殊对象遵守同一接口，删除散落空值判断，并验证它不会掩盖真正错误",
  healthy: "18.8 特殊情况 的约束仍成立",
  failure: "18.8 特殊情况 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern48SpecialCaseBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern48SpecialCaseMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern48SpecialCaseTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
