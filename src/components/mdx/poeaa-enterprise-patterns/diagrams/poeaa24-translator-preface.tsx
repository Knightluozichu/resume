import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-translator-preface",
  title: "译者序",
  nodes: ["原文概念", "中文术语", "模式坐标", "技术语境", "读者复核"],
  focuses: ["译者责任", "术语一致", "版本差异", "模式名", "适用边界"],
} as const;

export function Poeaa24TranslatorPrefaceBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24TranslatorPrefaceMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24TranslatorPrefaceTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
