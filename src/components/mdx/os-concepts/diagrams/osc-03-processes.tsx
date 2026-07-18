"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "创建进程",
  "保存执行上下文",
  "调度就绪队列",
  "执行进程操作",
  "交换进程消息",
  "终止并回收",
] as const;
const concepts = [
  "第3章 进程",
  "3.1 进程的概念",
  "3.1.1 进程概述",
  "3.1.2 进程状态",
  "3.1.3 进程控制块",
  "3.1.4 线程",
  "3.2 进程调度",
  "3.2.1 调度队列",
  "3.2.2 CPU调度",
  "3.2.3 上下文切换",
  "3.3 进程操作",
  "3.3.1 进程创建",
  "3.3.2 进程终止",
  "3.4 进程间通信",
  "3.5 共享内存系统的IPC",
  "3.6 消息传递系统的IPC",
  "3.6.1 命名",
  "3.6.2 同步",
  "3.6.3 缓冲",
  "3.7 IPC系统示例",
  "3.7.1 POSIX共享内存",
  "3.7.2 Mach消息传递",
  "3.7.3 Windows",
  "3.7.4 管道",
  "3.8 客户机-服务器系统中的通信",
  "3.8.1 套接字",
  "3.8.2 远程过程调用",
  "3.9 本章小结",
] as const;
const common = {
  title: "第 3 章 进程",
  label: "第二部分 进程管理",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Osc03ProcessesMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc03ProcessesExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc03ProcessesEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
