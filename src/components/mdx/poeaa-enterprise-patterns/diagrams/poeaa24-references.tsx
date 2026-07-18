import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-references",
  title: "参考文献",
  nodes: ["模式主张", "引用坐标", "原始来源", "适用边界", "当前复核"],
  focuses: ["来源类型", "证据等级", "引用坐标", "时间边界", "交叉核对"],
} as const;

export function Poeaa24ReferencesBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24ReferencesMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24ReferencesTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
