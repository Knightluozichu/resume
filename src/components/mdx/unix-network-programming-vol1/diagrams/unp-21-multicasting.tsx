import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第21章 多播",
  label: "广播多播与高级传输",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: ["选择接口地址","配置广播多播","加入接收组","发送数据报","观察复制范围","离组并关闭"],
  concepts: ["第21章 多播","21.1 概述","21.2 多播地址","21.3 局域网上多播和广播的比较","21.4 广域网上的多播","21.5 源特定多播","21.6 多播套接字选项","21.7 mcast_join和相关函数","21.8 使用多播的dg_cli函数","21.9 接收IP多播基础设施会话声明","21.10 发送和接收","21.11 SNTP：简单网络时间协议","21.12 小结"],
} as const;

export function Unp21MulticastingMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp21MulticastingExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp21MulticastingEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
