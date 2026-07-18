import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-official-final-review",
  title: "《UNIX编程艺术》全书总复习",
  nodes: ["问题规格", "小工具", "文本管道", "可移植交付", "开放协作"],
  focuses: ["原则选择", "工具实现", "故障证据", "时代边界", "独立复核"],
} as const;

export function TaoupOfficialFinalReviewCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupOfficialFinalReviewRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupOfficialFinalReviewEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
