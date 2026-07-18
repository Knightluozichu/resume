import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-01-philosophy",
  title: "第1章 哲学",
  nodes: ["文化语境", "得失判断", "哲学规则", "一课总结", "工程态度"],
  focuses: ["模块化", "清晰", "组合", "分离", "简洁"],
} as const;

export function TaoupChapter01PhilosophyCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter01PhilosophyRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter01PhilosophyEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
