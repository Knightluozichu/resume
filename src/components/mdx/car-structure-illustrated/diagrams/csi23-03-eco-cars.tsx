import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-03-eco-cars",
  title: "第3章：环境友善的汽车",
  nodes: ["一次能源", "车载储能", "能量转换", "电机驱动", "环境边界"],
  focuses: ["EV构造", "电机特性", "混动方式", "燃料电池", "生命周期"],
} as const;

export function Csi2303EcoCarsSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi2303EcoCarsAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi2303EcoCarsEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
