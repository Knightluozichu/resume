import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-12-optimization",
  title: "第12章 优化",
  nodes: ["性能合同", "基线测量", "热点定位", "局部改动", "回归验证"],
  focuses: ["测量", "非局部性", "吞吐", "延迟", "缓存"],
} as const;

export function TaoupChapter12OptimizationCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter12OptimizationRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter12OptimizationEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
