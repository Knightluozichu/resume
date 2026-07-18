import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "附录B 虚拟网络",
  label: "附录",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: ["定位参考条目","写出协议合同","构造最小样本","捕获原始证据","验证反例","清理复盘"],
  concepts: ["附录B 虚拟网络"],
} as const;

export function UnpAppendixBVirtualNetworksMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function UnpAppendixBVirtualNetworksExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function UnpAppendixBVirtualNetworksEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
