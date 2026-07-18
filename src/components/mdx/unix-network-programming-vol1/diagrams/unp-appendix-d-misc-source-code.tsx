import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "附录D 杂凑的源代码",
  label: "附录",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["定位参考条目","写出协议合同","构造最小样本","捕获原始证据","验证反例","清理复盘"],
  concepts: ["附录D 杂凑的源代码"],
} as const;

export function UnpAppendixDMiscSourceCodeMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function UnpAppendixDMiscSourceCodeExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function UnpAppendixDMiscSourceCodeEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
