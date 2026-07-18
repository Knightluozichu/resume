import { OfficialCsi23BookLab } from "./official-csi23-book-lab";

const props = {
  unitId: "csi23-prologue",
  title: "序章：汽车的前世今生",
  nodes: ["需求变化", "动力源", "传动布置", "车体形态", "整车权衡"],
  focuses: ["汽车进化", "零件层级", "驱动布置", "动力来源", "车体风格"],
} as const;

export function Csi23PrologueSystemLab() {
  return <OfficialCsi23BookLab {...props} mode="system" />;
}

export function Csi23PrologueAssemblyLab() {
  return <OfficialCsi23BookLab {...props} mode="assembly" />;
}

export function Csi23PrologueEvidenceLab() {
  return <OfficialCsi23BookLab {...props} mode="evidence" />;
}
