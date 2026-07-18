import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第7章 套接字选项",
  label: "基本套接字编程",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["解析监听地址","创建绑定监听","接受连接","传输字节流","处理半关闭","回收连接"],
  concepts: ["第7章 套接字选项","7.1 概述","7.2 getsockopt和setsockopt函数","7.3 检查选项是否受支持并获取默认值","7.4 套接字状态","7.5 通用套接字选项","7.6 IPv4套接字选项","7.7 ICMPv6套接字选项","7.8 IPv6套接字选项","7.9 TCP套接字选项","7.10 SCTP套接字选项","7.11 fcntl函数","7.12 小结"],
} as const;

export function Unp07SocketOptionsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp07SocketOptionsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp07SocketOptionsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
