"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "创建逻辑流",
  "保存进程状态",
  "调度线程",
  "同步临界区",
  "传递进程消息",
  "终止并回收",
] as const;
const concepts = [
  "第2章 进程与线程",
  "2.1 进程",
  "2.1.1 进程模型",
  "2.1.2 进程的创建",
  "2.1.3 进程的终止",
  "2.1.4 进程的层次结构",
  "2.1.5 进程的状态",
  "2.1.6 进程的实现",
  "2.1.7 多道程序设计模型",
  "2.2 线程",
  "2.2.1 线程的使用",
  "2.2.2 经典的线程模型",
  "2.2.3 POSIX线程",
  "2.2.4 在用户空间中实现线程",
  "2.2.5 在内核中实现线程",
  "2.2.6 混合实现",
  "2.2.7 调度程序激活机制",
  "2.2.8 弹出式线程",
  "2.2.9 使单线程代码多线程化",
  "2.3 进程间通信",
  "2.3.1 竞争条件",
  "2.3.2 临界区",
  "2.3.3 忙等待的互斥",
  "2.3.4 睡眠与唤醒",
  "2.3.5 信号量",
  "2.3.6 互斥量",
  "2.3.7 管程",
  "2.3.8 消息传递",
  "2.3.9 屏障",
  "2.3.10 避免锁：读–复制–更新",
  "2.4 调度",
  "2.4.1 调度简介",
  "2.4.2 批处理系统中的调度",
  "2.4.3 交互式系统中的调度",
  "2.4.4 实时系统中的调度",
  "2.4.5 策略和机制",
  "2.4.6 线程调度",
  "2.5 经典的IPC问题",
  "2.5.1 哲学家就餐问题",
  "2.5.2 读者–写者问题",
  "2.6 有关进程与线程的研究",
  "2.7 小结",
] as const;
const common = {
  title: "第 2 章 进程与线程",
  label: "现代操作系统 · 进程与并发",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;

export function Mos02ProcessesThreadsMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos02ProcessesThreadsExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos02ProcessesThreadsEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
