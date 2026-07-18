"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "启动 Linux",
  "创建调度任务",
  "管理虚拟内存",
  "执行 I/O 与文件操作",
  "通过 Binder 通信",
  "隔离 Android 应用",
] as const;
const concepts = [
  "第10章 实例研究1：UNIX、Linux和Android",
  "10.1 UNIX与Linux的历史",
  "10.1.1 UNICS",
  "10.1.2 PDP-11 UNIX",
  "10.1.3 可移植的UNIX",
  "10.1.4 Berkeley UNIX",
  "10.1.5 标准UNIX",
  "10.1.6 MINIX",
  "10.1.7 Linux",
  "10.2 Linux简介",
  "10.2.1 Linux的设计目标",
  "10.2.2 到Linux的接口",
  "10.2.3 shell",
  "10.2.4 Linux应用程序",
  "10.2.5 内核结构",
  "10.3 Linux中的进程",
  "10.3.1 基本概念",
  "10.3.2 Linux中进程管理相关的系统调用",
  "10.3.3 Linux中进程与线程的实现",
  "10.3.4 Linux中的调度",
  "10.3.5 启动Linux系统",
  "10.4 Linux中的内存管理",
  "10.4.1 基本概念",
  "10.4.2 Linux中的内存管理系统调用",
  "10.4.3 Linux中内存管理的实现",
  "10.4.4 Linux中的分页",
  "10.5 Linux中的I/O系统",
  "10.5.1 基本概念",
  "10.5.2 网络",
  "10.5.3 Linux中的I/O系统调用",
  "10.5.4 I/O在Linux中的实现",
  "10.5.5 Linux中的模块",
  "10.6 Linux文件系统",
  "10.6.1 基本概念",
  "10.6.2 Linux中的文件系统调用",
  "10.6.3 Linux文件系统的实现",
  "10.6.4 NFS：网络文件系统",
  "10.7 Linux的安全性",
  "10.7.1 基本概念",
  "10.7.2 Linux中安全相关的系统调用",
  "10.7.3 Linux中的安全实现",
  "10.8 Android",
  "10.8.1 Android与Google",
  "10.8.2 Android的历史",
  "10.8.3 设计目标",
  "10.8.4 Android体系结构",
  "10.8.5 Linux扩展",
  "10.8.6 Dalvik",
  "10.8.7 Binder IPC",
  "10.8.8 Android应用",
  "10.8.9 意图",
  "10.8.10 应用程序沙箱",
  "10.8.11 安全性",
  "10.8.12 进程模型",
  "10.9 小结",
] as const;
const common = {
  title: "第 10 章 实例研究 1：UNIX、Linux 和 Android",
  label: "现代操作系统 · Linux/Android 实例",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;

export function Mos10UnixLinuxAndroidMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos10UnixLinuxAndroidExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos10UnixLinuxAndroidEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
