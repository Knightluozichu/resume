import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第27章 IP选项",
  label: "并发、原始网络与设计范式",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: ["确认最小权限","构造首部","计算长度校验","发送捕获","解析响应","撤销权限"],
  concepts: ["第27章 IP选项","27.1 概述","27.2 IPv4选项","27.3 IPv4源路径选项","27.4 IPv6扩展首部","27.5 IPv6步跳选项和目的地选项","27.6 IPv6路由首部","27.7 IPv6粘附选项","27.8 历史性IPv6高级API","27.9 小结"],
} as const;

export function Unp27IpOptionsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp27IpOptionsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp27IpOptionsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
