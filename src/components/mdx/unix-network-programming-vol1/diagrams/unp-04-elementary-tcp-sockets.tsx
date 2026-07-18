import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第4章 基本TCP套接字编程",
  label: "基本套接字编程",
  color: "#b45309",
  soft: "#fef3c7",
  chain: ["解析监听地址","创建绑定监听","接受连接","传输字节流","处理半关闭","回收连接"],
  concepts: ["第4章 基本TCP套接字编程","4.1 概述","4.2 socket函数","4.3 connect函数","4.4 bind函数","4.5 listen函数","4.6 accept函数","4.7 fork和exec函数","4.8 并发服务器","4.9 close函数","4.10 getsockname和getpeername函数","4.11 小结"],
} as const;

export function Unp04ElementaryTcpSocketsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp04ElementaryTcpSocketsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp04ElementaryTcpSocketsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
