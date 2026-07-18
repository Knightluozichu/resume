import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "附录A IPv4、IPv6、ICMPv4和ICMPv6",
  label: "附录",
  color: "#047857",
  soft: "#d1fae5",
  chain: ["定位参考条目","写出协议合同","构造最小样本","捕获原始证据","验证反例","清理复盘"],
  concepts: ["附录A IPv4、IPv6、ICMPv4和ICMPv6"],
} as const;

export function UnpAppendixAInternetProtocolsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function UnpAppendixAInternetProtocolsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function UnpAppendixAInternetProtocolsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
