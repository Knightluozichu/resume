import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-colophon",
  title: "Colophon",
  nodes: ["内容源", "排版工具", "字体资源", "生成过程", "成品复核"],
  focuses: ["出版工具", "字体", "格式", "生成链", "可重现"],
} as const;

export function TaoupColophonCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupColophonRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupColophonEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
