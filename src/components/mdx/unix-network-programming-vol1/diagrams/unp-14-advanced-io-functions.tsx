import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第14章 高级I/O函数",
  label: "高级套接字 · 内核接口",
  color: "#047857",
  soft: "#d1fae5",
  chain: ["列出描述符","注册兴趣集合","等待就绪","推进连接状态","处理短计数","注销并关闭"],
  concepts: ["第14章 高级I/O函数","14.1 概述","14.2 套接字超时","14.3 recv和send函数","14.4 readv和writev函数","14.5 recvmsg和sendmsg函数","14.6 辅助数据","14.7 排队的数据量","14.8 套接字和标准I/O","14.9 高级轮询技术","14.10 T/TCP：事务目的TCP","14.11 小结"],
} as const;

export function Unp14AdvancedIoFunctionsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp14AdvancedIoFunctionsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp14AdvancedIoFunctionsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
