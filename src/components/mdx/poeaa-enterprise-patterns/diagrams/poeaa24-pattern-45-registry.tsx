import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-45-registry",
  title: "18.5 注册表",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.5 注册表"],
  decision:
    "能限制注册表作用域和键类型，替换测试服务，并说明何时依赖注入更清楚",
  healthy: "18.5 注册表 的约束仍成立",
  failure: "18.5 注册表 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern45RegistryBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern45RegistryMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern45RegistryTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
