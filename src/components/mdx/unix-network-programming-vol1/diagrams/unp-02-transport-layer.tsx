import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第2章 传输层：TCP、UDP和SCTP",
  label: "简介与TCP/IP",
  color: "#047857",
  soft: "#d1fae5",
  chain: ["冻结测试网络","辨认协议层","建立端点","捕获分组","注入断开","关闭并重放"],
  concepts: ["第2章 传输层：TCP、UDP和SCTP","2.1 概述","2.2 总图","2.3 用户数据报协议（UDP）","2.4 传输控制协议（TCP）","2.5 流控制传输协议（SCTP）","2.6 TCP连接的建立和终止","2.7 TIME_WAIT状态","2.8 SCTP关联的建立和终止","2.9 端口号","2.10 TCP端口号与并发服务器","2.11 缓冲区大小及限制","2.12 标准因特网服务","2.13 常见因特网应用的协议使用","2.14 小结"],
} as const;

export function Unp02TransportLayerMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp02TransportLayerExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp02TransportLayerEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
