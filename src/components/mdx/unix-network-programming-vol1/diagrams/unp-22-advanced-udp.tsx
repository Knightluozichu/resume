import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第22章 高级UDP套接字编程",
  label: "广播多播与高级传输",
  color: "#b45309",
  soft: "#fef3c7",
  chain: ["绑定数据报端点","发送单个报文","核对来源地址","检测截断丢失","施加流量边界","关闭并重放"],
  concepts: ["第22章 高级UDP套接字编程","22.1 概述","22.2 接收标志、目的IP地址和接口索引","22.3 数据报截断","22.4 何时用UDP代替TCP","22.5 给UDP应用增加可靠性","22.6 捆绑接口地址","22.7 并发UDP服务器","22.8 IPv6分组信息","22.9 IPv6路径MTU控制","22.10 小结"],
} as const;

export function Unp22AdvancedUdpMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp22AdvancedUdpExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp22AdvancedUdpEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
