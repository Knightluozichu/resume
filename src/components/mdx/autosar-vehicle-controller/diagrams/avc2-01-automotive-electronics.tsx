import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-01-automotive-electronics",
  title: "第1章：汽车电子控制系统介绍",
  nodes: ["物理对象", "传感采样", "控制决策", "执行输出", "反馈诊断"],
  focuses: ["发展历史", "应用现状", "系统构成", "OSEK边界", "AUTOSAR动因"],
} as const;

export function Avc201AutomotiveElectronicsArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc201AutomotiveElectronicsConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc201AutomotiveElectronicsEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
