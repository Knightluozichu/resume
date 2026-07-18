"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "触发控制转移",
  "进入内核处理",
  "保存上下文",
  "调度逻辑流",
  "递送信号",
  "恢复或终止",
] as const;
const concepts = [
  "第8章 异常控制流",
  "8.1 异常",
  "8.1.1 异常处理",
  "8.1.2 异常的类别",
  "8.1.3 Linux/x86-64系统中的异常",
  "8.2 进程",
  "8.2.1 逻辑控制流",
  "8.2.2 并发流",
  "8.2.3 私有地址空间",
  "8.2.4 用户模式和内核模式",
  "8.2.5 上下文切换",
  "8.3 系统调用错误处理",
  "8.4 进程控制",
  "8.4.1 获取进程ID",
  "8.4.2 创建和终止进程",
  "8.4.3 回收子进程",
  "8.4.4 让进程休眠",
  "8.4.5 加载并运行程序",
  "8.4.6 利用fork和execve运行程序",
  "8.5 信号",
  "8.5.1 信号术语",
  "8.5.2 发送信号",
  "8.5.3 接收信号",
  "8.5.4 阻塞和解除阻塞信号",
  "8.5.5 编写信号处理程序",
  "8.5.6 同步流以避免讨厌的并发错误",
  "8.5.7 显式地等待信号",
  "8.6 非本地跳转",
  "8.7 操作进程的工具",
  "8.8 小结",
] as const;
const common = {
  title: "第 8 章 异常控制流",
  label: "在系统上运行程序 · 异常控制流",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;

export function Cap08ExceptionalControlMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function Cap08ExceptionalControlExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function Cap08ExceptionalControlEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
