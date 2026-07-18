import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-02-networks",
  title: "第2章：车载通信网络",
  nodes: ["物理媒介", "链路访问", "网络传输", "服务协议", "时间确定性"],
  focuses: ["传统总线", "以太网物理层", "TCP/IP", "SOME/IP", "AVB/TSN"],
} as const;

export function Aes2302NetworksTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes2302NetworksProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes2302NetworksEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
