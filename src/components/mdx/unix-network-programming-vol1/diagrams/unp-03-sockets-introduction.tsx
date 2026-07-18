import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第3章 套接字编程简介",
  label: "基本套接字编程",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: ["解析监听地址","创建绑定监听","接受连接","传输字节流","处理半关闭","回收连接"],
  concepts: ["第二部分 基本套接字编程","第3章 套接字编程简介","3.1 概述","3.2 套接字地址结构","3.3 值-结果参数","3.4 字节排序函数","3.5 字节操纵函数","3.6 inet_aton、inet_addr和inet_ntoa函数","3.7 inet_pton和inet_ntop函数","3.8 sock_ntop和相关函数","3.9 readn、writen和readline函数","3.10 小结"],
} as const;

export function Unp03SocketsIntroductionMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp03SocketsIntroductionExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp03SocketsIntroductionEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
