import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-references",
  title: "参考文献",
  family: "book",
  nodes: ["模式主张", "引用坐标", "原始来源", "适用边界", "当前复核"],
  focuses: ["来源类型", "证据等级", "引用坐标", "时间边界", "交叉核对"],
  concepts: ["参考文献"],
  decision: "能为一个模式选择建立来源链，并说明引用支持什么、不支持什么",
  healthy: "参考文献 的约束仍成立",
  failure: "参考文献 在“来源类型”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24ReferencesBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24ReferencesMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24ReferencesTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
