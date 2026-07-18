import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "附录C 调试技术",
  label: "附录",
  color: "#b45309",
  soft: "#fef3c7",
  chain: ["定位参考条目","写出协议合同","构造最小样本","捕获原始证据","验证反例","清理复盘"],
  concepts: ["附录C 调试技术"],
} as const;

export function UnpAppendixCDebuggingTechniquesMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function UnpAppendixCDebuggingTechniquesExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function UnpAppendixCDebuggingTechniquesEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
