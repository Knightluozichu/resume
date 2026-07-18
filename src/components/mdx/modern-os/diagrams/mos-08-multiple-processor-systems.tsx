"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "划分计算节点",
  "同步共享内存",
  "发送节点消息",
  "执行远程调用",
  "维护分布式状态",
  "平衡系统负载",
] as const;
const concepts = [
  "第8章 多处理机系统",
  "8.1 多处理机",
  "8.1.1 多处理机硬件",
  "8.1.2 多处理机操作系统类型",
  "8.1.3 多处理机同步",
  "8.1.4 多处理机调度",
  "8.2 多计算机",
  "8.2.1 多计算机硬件",
  "8.2.2 低层通信软件",
  "8.2.3 用户层通信软件",
  "8.2.4 远程过程调用",
  "8.2.5 分布式共享存储器",
  "8.2.6 多计算机调度",
  "8.2.7 负载平衡",
  "8.3 分布式系统",
  "8.3.1 网络硬件",
  "8.3.2 网络服务和协议",
  "8.3.3 基于文档的中间件",
  "8.3.4 基于文件系统的中间件",
  "8.3.5 基于对象的中间件",
  "8.3.6 基于协作的中间件",
  "8.4 有关多处理机系统的研究",
  "8.5 小结",
] as const;
const common = {
  title: "第 8 章 多处理机系统",
  label: "现代操作系统 · 多核与分布式",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;

export function Mos08MultipleProcessorSystemsMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos08MultipleProcessorSystemsExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos08MultipleProcessorSystemsEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
