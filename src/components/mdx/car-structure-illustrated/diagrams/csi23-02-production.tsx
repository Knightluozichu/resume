import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-02-production",
  title: "第2章：汽车的生产方式",
  nodes: ["材料零件", "车身成形", "表面防护", "总装汇流", "终检放行"],
  focuses: ["供应链", "冲压焊接", "涂装组装", "主副线", "成车检验"],
} as const;

export function Csi2302ProductionSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi2302ProductionAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi2302ProductionEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
