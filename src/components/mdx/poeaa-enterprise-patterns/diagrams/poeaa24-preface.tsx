import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-preface",
  title: "前言",
  family: "book",
  nodes: ["企业问题", "经验提炼", "模式形式", "叙述导航", "目录复核"],
  focuses: ["企业应用", "模式语言", "经验来源", "使用方式", "平台边界"],
  concepts: ["前言"],
  decision: "能说明为什么先读第1至8章的选择问题，再用第9至18章的51个模式作参考",
  healthy: "前言 的约束仍成立",
  failure: "前言 在“企业应用”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24PrefaceBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24PrefaceMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24PrefaceTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
