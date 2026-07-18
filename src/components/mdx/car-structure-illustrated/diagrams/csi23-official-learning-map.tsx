import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-official-learning-map",
  title: "《汽车构造&知识全图解》权威学习地图",
  nodes: ["使用方法", "序章", "汽车构造", "生产方式", "环保与未来"],
  focuses: ["65节点", "整车坐标", "构造链", "制造链", "社会边界"],
} as const;

export function Csi23OfficialLearningMapSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi23OfficialLearningMapAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi23OfficialLearningMapEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
