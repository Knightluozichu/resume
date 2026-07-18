import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第29章 数据链路访问",
  label: "并发、原始网络与设计范式",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["确认最小权限","构造首部","计算长度校验","发送捕获","解析响应","撤销权限"],
  concepts: ["第29章 数据链路访问","29.1 概述","29.2 BPF：BSD分组过滤器","29.3 DLPI：数据链路提供者接口","29.4 Linux：SOCK_PACKET和 PFPACKET","29.5 libpcap：分组捕获函数库","29.6 libnet：分组构造与输出函数库","29.7 检查UDP的校验和字段","29.8 小结"],
} as const;

export function Unp29DatalinkAccessMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp29DatalinkAccessExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp29DatalinkAccessEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
