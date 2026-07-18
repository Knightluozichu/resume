import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第8章 基本UDP套接字编程",
  label: "基本套接字编程",
  color: "#047857",
  soft: "#d1fae5",
  chain: ["绑定数据报端点","发送单个报文","核对来源地址","检测截断丢失","施加流量边界","关闭并重放"],
  concepts: ["第8章 基本UDP套接字编程","8.1 概述","8.2 recvfrom和sendto函数","8.3 UDP回射服务器程序：main函数","8.4 UDP回射服务器程序：dg_echo函数","8.5 UDP回射客户程序：main函数","8.6 UDP回射客户程序：dg_cli函数","8.7 数据报的丢失","8.8 验证接收到的响应","8.9 服务器进程未运行","8.10 UDP程序例子小结","8.11 UDP的connect函数","8.12 dg_cli函数（修订版）","8.13 UDP缺乏流量控制","8.14 UDP中的外出接口的确定","8.15 使用select函数的TCP和UDP回射服务器程序","8.16 小结"],
} as const;

export function Unp08ElementaryUdpSocketsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp08ElementaryUdpSocketsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp08ElementaryUdpSocketsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
