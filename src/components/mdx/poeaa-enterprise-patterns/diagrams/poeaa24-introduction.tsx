import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-introduction",
  title: "引言",
  nodes: ["架构边界", "应用类型", "质量约束", "性能预算", "模式选择"],
  focuses: ["架构", "企业应用", "应用种类", "性能", "模式"],
} as const;

export function Poeaa24IntroductionBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24IntroductionMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24IntroductionTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
