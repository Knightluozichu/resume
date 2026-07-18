import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第16章 非阻塞式I/O",
  label: "高级套接字 · 内核接口",
  color: "#b45309",
  soft: "#fef3c7",
  chain: ["列出描述符","注册兴趣集合","等待就绪","推进连接状态","处理短计数","注销并关闭"],
  concepts: ["第16章 非阻塞式I/O","16.1 概述","16.2 非阻塞读和写：str_cli函数（修订版）","16.3 非阻塞connect","16.4 非阻塞connect：时间获取客户程序","16.5 非阻塞connect：Web客户程序","16.6 非阻塞accept","16.7 小结"],
} as const;

export function Unp16NonblockingIoMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp16NonblockingIoExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp16NonblockingIoEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
