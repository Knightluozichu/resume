import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-01-vehicle-structure",
  title: "第1章：汽车的构造",
  nodes: ["动力产生", "转矩变换", "路面作用", "车身承载", "控制保护"],
  focuses: ["发动机", "变速传动", "底盘操控", "车身舾装", "电装安全"],
} as const;

export function Csi2301VehicleStructureSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi2301VehicleStructureAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi2301VehicleStructureEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
