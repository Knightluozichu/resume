import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-book-guide",
  title: "本书的使用方法",
  nodes: ["图题与对象", "主结构", "工作路径", "控制保护", "复核证据"],
  focuses: ["读图顺序", "对象边界", "结构卡", "证据复核", "版次坐标"],
} as const;

export function Csi23BookGuideSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi23BookGuideAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi23BookGuideEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
