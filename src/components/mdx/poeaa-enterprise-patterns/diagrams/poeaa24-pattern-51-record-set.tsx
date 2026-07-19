import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-51-record-set",
  title: "18.11 记录集",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.11 记录集"],
  decision:
    "能保持列模式、空值和类型信息，批量处理记录，并说明何时对象模型更适合复杂行为",
  healthy: "18.11 记录集 的约束仍成立",
  failure: "18.11 记录集 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern51RecordSetBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern51RecordSetMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern51RecordSetTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
