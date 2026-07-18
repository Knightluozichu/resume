import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-index",
  title: "索引：术语与系统反向定位",
  nodes: ["查询词", "同义词", "正式主题", "系统上下游", "复核结论"],
  focuses: ["术语入口", "目录坐标", "上下位关系", "跨章连接", "检索证据"],
} as const;

export function Csi23IndexSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi23IndexAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi23IndexEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
