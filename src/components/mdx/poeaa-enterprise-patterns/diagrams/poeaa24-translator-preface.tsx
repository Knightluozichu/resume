import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-translator-preface",
  title: "译者序",
  family: "book",
  nodes: ["原文概念", "中文术语", "模式坐标", "技术语境", "读者复核"],
  focuses: ["译者责任", "术语一致", "版本差异", "模式名", "适用边界"],
  concepts: ["译者序"],
  decision: "能为一个模式名列出英文原名、中文译名、上下文含义与可能误读",
  healthy: "译者序 的约束仍成立",
  failure: "译者序 在“译者责任”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24TranslatorPrefaceBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24TranslatorPrefaceMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24TranslatorPrefaceTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
