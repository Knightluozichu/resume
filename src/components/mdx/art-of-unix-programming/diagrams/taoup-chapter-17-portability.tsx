import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-17-portability",
  title: "第17章 可移植性：软件可移植性与遵循标准",
  nodes: ["平台差异", "开放标准", "兼容层", "跨平台测试", "发布证据"],
  focuses: ["C标准", "Unix标准", "IETF", "系统依赖", "国际化"],
} as const;

export function TaoupChapter17PortabilityCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter17PortabilityRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter17PortabilityEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
