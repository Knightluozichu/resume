import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第23章 高级SCTP套接字编程",
  label: "广播多播与高级传输",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["建立多宿主端点","创建关联","选择流","接收通知","注入路径故障","终止关联"],
  concepts: ["第23章 高级SCTP套接字编程","23.1 概述","23.2 自动关闭的一到多式服务器程序","23.3 部分递送","23.4 通知","23.5 无序的数据","23.6 捆绑地址子集","23.7 确定对端和本端地址信息","23.8 给定IP地址找出关联ID","23.9 心搏和地址不可达","23.10 关联剥离","23.11 定时控制","23.12 何时改用SCTP代替TCP","23.13 小结"],
} as const;

export function Unp23AdvancedSctpMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp23AdvancedSctpExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp23AdvancedSctpEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
