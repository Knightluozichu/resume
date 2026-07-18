import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-02-autosar-foundations",
  title: "第2章：AUTOSAR规范基础理论",
  nodes: ["应用软件层", "端口接口", "虚拟功能总线", "RTE", "基础软件层"],
  focuses: ["原则与历程", "分层架构", "SWC契约", "VFB方法论", "应用接口"],
} as const;

export function Avc202AutosarFoundationsArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc202AutosarFoundationsConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc202AutosarFoundationsEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
