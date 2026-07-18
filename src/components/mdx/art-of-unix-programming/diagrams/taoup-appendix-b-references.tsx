import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-appendix-b-references",
  title: "附录B 参考文献",
  nodes: ["主张", "引用坐标", "原始来源", "适用范围", "当前复核"],
  focuses: ["来源类型", "时间边界", "版本", "交叉核对", "引用责任"],
} as const;

export function TaoupAppendixBReferencesCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupAppendixBReferencesRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupAppendixBReferencesEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
