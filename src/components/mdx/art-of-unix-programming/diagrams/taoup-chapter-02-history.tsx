import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-02-history",
  title: "第2章 历史——双流记",
  nodes: ["Unix起源", "制度演化", "黑客文化", "开源运动", "历史教训"],
  focuses: ["时间坐标", "技术约束", "社群机制", "路径依赖", "反事实"],
} as const;

export function TaoupChapter02HistoryCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter02HistoryRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter02HistoryEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
