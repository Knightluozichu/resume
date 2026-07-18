import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第28章 原始套接字",
  label: "并发、原始网络与设计范式",
  color: "#b45309",
  soft: "#fef3c7",
  chain: ["确认最小权限","构造首部","计算长度校验","发送捕获","解析响应","撤销权限"],
  concepts: ["第28章 原始套接字","28.1 概述","28.2 原始套接字创建","28.3 原始套接字输出","28.4 原始套接字输入","28.5 ping程序","28.6 traceroute程序","28.7 一个ICMP消息守护程序","28.8 小结"],
} as const;

export function Unp28RawSocketsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp28RawSocketsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp28RawSocketsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
