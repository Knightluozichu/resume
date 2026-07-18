import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-official-final-review",
  title: "《汽车构造&知识全图解》全书总复习",
  nodes: ["目录定位", "结构建模", "工况推演", "故障首差", "独立复核"],
  focuses: ["整车复原", "能量守恒", "制造质量", "单故障", "跨章验收"],
} as const;

export function Csi23OfficialFinalReviewSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi23OfficialFinalReviewAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi23OfficialFinalReviewEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
