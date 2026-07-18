import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第6章 I/O复用：select和poll函数",
  label: "基本套接字编程",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: ["列出描述符","注册兴趣集合","等待就绪","推进连接状态","处理短计数","注销并关闭"],
  concepts: ["第6章 I/O复用：select和poll函数","6.1 概述","6.2 I/O模型","6.3 select函数","6.4 str_cli函数（修订版）","6.5 批量输入","6.6 shutdown函数","6.7 str_cli函数（再修订版）","6.8 TCP回射服务器程序（修订版）","6.9 pselect函数","6.10 poll函数","6.11 TCP回射服务器程序（再修订版）","6.12 小结"],
} as const;

export function Unp06IoMultiplexingMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp06IoMultiplexingExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp06IoMultiplexingEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
