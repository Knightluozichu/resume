import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第25章 信号驱动式I/O",
  label: "广播多播与高级传输",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["列出描述符","注册兴趣集合","等待就绪","推进连接状态","处理短计数","注销并关闭"],
  concepts: ["第25章 信号驱动式I/O","25.1 概述","25.2 套接字的信号驱动式I/O","25.3 使用SIGIO的UDP回射服务器程序","25.4 小结"],
} as const;

export function Unp25SignalDrivenIoMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp25SignalDrivenIoExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp25SignalDrivenIoEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
