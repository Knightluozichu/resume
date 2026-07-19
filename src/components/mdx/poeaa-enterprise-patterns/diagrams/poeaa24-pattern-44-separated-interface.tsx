import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-44-separated-interface",
  title: "18.4 分离接口",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.4 分离接口"],
  decision:
    "能从高层模块替换一个实现，检查依赖方向，并证明接口包不反向引用实现",
  healthy: "18.4 分离接口 的约束仍成立",
  failure: "18.4 分离接口 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern44SeparatedInterfaceBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern44SeparatedInterfaceMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern44SeparatedInterfaceTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
