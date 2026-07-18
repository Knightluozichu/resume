import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-06-transparency",
  title: "第6章 透明性：来点儿光",
  nodes: ["运行状态", "可见表示", "诊断入口", "故障定位", "恢复维护"],
  focuses: ["透明性", "可显性", "可编辑", "故障诊断", "维护成本"],
} as const;

export function TaoupChapter06TransparencyCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter06TransparencyRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter06TransparencyEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
