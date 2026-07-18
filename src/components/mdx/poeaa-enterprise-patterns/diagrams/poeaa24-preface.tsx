import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-preface",
  title: "前言",
  nodes: ["企业问题", "经验提炼", "模式形式", "叙述导航", "目录复核"],
  focuses: ["企业应用", "模式语言", "经验来源", "使用方式", "平台边界"],
} as const;

export function Poeaa24PrefaceBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24PrefaceMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24PrefaceTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
