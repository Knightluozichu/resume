"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "启动 Windows",
  "进入 NT/Win32 接口",
  "创建内核对象",
  "调度进程线程",
  "访问缓存与 NTFS",
  "执行安全检查",
] as const;
const concepts = [
  "第11章 实例研究2：Windows 8",
  "11.1 Windows 8.1的历史",
  "11.1.1 20世纪80年代：MS-DOS",
  "11.1.2 20世纪90年代：基于MS-DOS的Windows",
  "11.1.3 21世纪00年代：基于NT的Windows",
  "11.1.4 Windows Vista",
  "11.1.5 21世纪10年代：现代Windows",
  "11.2 Windows 编程",
  "11.2.1 原生NT应用编程接口",
  "11.2.2 Win32应用编程接口",
  "11.2.3 Windows注册表",
  "11.3 系统结构",
  "11.3.1 操作系统结构",
  "11.3.2 启动Windows",
  "11.3.3 对象管理器的实现",
  "11.3.4 子系统、DLL和用户态服务",
  "11.4 Windows中的进程和线程",
  "11.4.1 基本概念",
  "11.4.2 作业、进程、线程和纤程管理API调用",
  "11.4.3 进程和线程的实现",
  "11.5 内存管理",
  "11.5.1 基本概念",
  "11.5.2 内存管理系统调用",
  "11.5.3 存储管理的实现",
  "11.6 Windows的高速缓存",
  "11.7 Windows的I/O",
  "11.7.1 基本概念",
  "11.7.2 I/O的API调用",
  "11.7.3 I/O实现",
  "11.8 Windows NT文件系统",
  "11.8.1 基本概念",
  "11.8.2 NTFS文件系统的实现",
  "11.9 Windows电源管理",
  "11.10 Windows 8中的安全",
  "11.10.1 基本概念",
  "11.10.2 安全相关的API调用",
  "11.10.3 安全实现",
  "11.10.4 安全缓解技术",
  "11.11 小结",
] as const;
const common = {
  title: "第 11 章 实例研究 2：Windows 8",
  label: "现代操作系统 · Windows 8 实例",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;

export function Mos11Windows8MapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos11Windows8ExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos11Windows8EvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
