import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第26章 线程",
  label: "并发、原始网络与设计范式",
  color: "#047857",
  soft: "#d1fae5",
  chain: ["选择并发范式","建立工作单元","分派连接","同步共享状态","施加过载","停机回收"],
  concepts: ["第26章 线程","26.1 概述","26.2 基本线程函数：创建和终止","26.3 使用线程的str_cli函数","26.4 使用线程的TCP回射服务器程序","26.5 线程特定数据","26.6 Web客户与同时连接","26.7 互斥锁","26.8 条件变量","26.9 Web客户与同时连接（续）","26.10 小结"],
} as const;

export function Unp26ThreadsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp26ThreadsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp26ThreadsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
