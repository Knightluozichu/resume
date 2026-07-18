import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-11-interfaces",
  title: "第11章 接口：Unix环境下的用户接口设计模式",
  nodes: ["用户意图", "接口模式", "输入契约", "输出语义", "组合前端"],
  focuses: ["最小立异", "CLI", "可视界面", "接口模式", "沉默原则"],
} as const;

export function TaoupChapter11InterfacesCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter11InterfacesRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter11InterfacesEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
