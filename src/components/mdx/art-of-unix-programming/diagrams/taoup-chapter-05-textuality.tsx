import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-05-textuality",
  title: "第5章 文本化：好协议产生好实践",
  nodes: ["数据语义", "表示选择", "文本协议", "工具链", "兼容演化"],
  focuses: ["文本化", "元格式", "协议设计", "压缩权衡", "版本兼容"],
} as const;

export function TaoupChapter05TextualityCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter05TextualityRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter05TextualityEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
