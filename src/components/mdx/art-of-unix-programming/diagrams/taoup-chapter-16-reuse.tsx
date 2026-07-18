import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-16-reuse",
  title: "第16章 重用：论不要重新发明轮子",
  nodes: ["需求识别", "候选检索", "透明审计", "许可证", "维护退出"],
  focuses: ["重用", "开放源码", "可检查性", "许可证", "供应风险"],
} as const;

export function TaoupChapter16ReuseCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter16ReuseRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter16ReuseEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
