import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-final-future",
  title: "终章：未来的汽车与汽车社会",
  nodes: ["社会需求", "基础设施", "车辆能力", "人机边界", "价值验收"],
  focuses: ["氢能社会", "自动驾驶", "车载信息", "人机协作", "驾驶价值"],
} as const;

export function Csi23FinalFutureSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi23FinalFutureAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi23FinalFutureEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
