import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-10-outlook",
  title: "第10章：AUTOSAR技术展望",
  nodes: ["威胁边界", "密码服务", "安全通信", "CP/AP分工", "Adaptive运行时"],
  focuses: ["信息安全", "密码协议栈", "安全车载通信", "AP与CP", "Adaptive概念"],
} as const;

export function Avc210OutlookArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc210OutlookConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc210OutlookEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
