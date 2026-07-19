import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-introduction",
  title: "引言",
  family: "book",
  nodes: ["架构边界", "应用类型", "质量约束", "性能预算", "模式选择"],
  focuses: ["架构", "企业应用", "应用种类", "性能", "模式"],
  concepts: [
    "引言",
    "0.1 架构",
    "0.2 企业应用",
    "0.3 企业应用的种类",
    "0.4 关于性能的考虑",
    "0.5 模式",
  ],
  decision: "能判定一个系统是否属于本书讨论的企业应用，并写出架构和性能边界",
  healthy: "引言 的约束仍成立",
  failure: "引言 在“架构”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24IntroductionBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24IntroductionMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24IntroductionTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
