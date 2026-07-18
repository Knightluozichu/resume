import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第30章 客户/服务器程序设计范式",
  label: "并发、原始网络与设计范式",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: ["选择并发范式","建立工作单元","分派连接","同步共享状态","施加过载","停机回收"],
  concepts: ["第30章 客户/服务器程序设计范式","30.1 概述","30.2 TCP客户程序设计范式","30.3 TCP测试用客户程序","30.4 TCP迭代服务器程序","30.5 TCP并发服务器程序，每个客户一个子进程","30.6 TCP预先派生子进程服务器程序，accept无上锁保护","30.7 TCP预先派生子进程服务器程序，accept使用文件上锁保护","30.8 TCP预先派生子进程服务器程序，accept使用线程上锁保护","30.9 TCP预先派生子进程服务器程序，传递描述符","30.10 TCP并发服务器程序，每个客户一个线程","30.11 TCP预先创建线程服务器程序，每个线程各自accept","30.12 TCP预先创建线程服务器程序，主线程统一accept","30.13 小结"],
} as const;

export function Unp30ClientServerDesignMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp30ClientServerDesignExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp30ClientServerDesignEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
