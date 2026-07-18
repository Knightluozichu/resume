import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-09-functional-safety",
  title: "第9章：AUTOSAR与功能安全",
  nodes: ["安全目标", "隔离设计", "运行监控", "通信保护", "失效证据"],
  focuses: ["架构要求", "硬件与通信", "FFI", "程序流", "E2E"],
} as const;

export function Avc209FunctionalSafetyArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc209FunctionalSafetyConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc209FunctionalSafetyEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
