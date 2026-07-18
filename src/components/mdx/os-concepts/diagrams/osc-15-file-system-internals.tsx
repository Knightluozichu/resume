"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "发现存储设备",
  "识别分区卷",
  "挂载文件系统",
  "路由 VFS 操作",
  "协调共享状态",
  "卸载恢复",
] as const;
const concepts = [
  "第15章 文件系统内部细节",
  "15.1 文件系统",
  "15.2 文件系统挂载",
  "15.3 分区与挂载",
  "15.4 文件共享",
  "15.5 虚拟文件系统",
  "15.6 远程文件系统",
  "15.6.1 客户端-服务器模型",
  "15.6.2 分布式信息系统",
  "15.6.3 故障模式",
  "15.7 一致性语义",
  "15.7.1 UNIX语义",
  "15.7.2 会话语义",
  "15.7.3 不可变共享文件语义",
  "15.8 NFS",
  "15.8.1 概述",
  "15.8.2 挂载协议",
  "15.8.3 NFS协议",
  "15.8.4 路径名称转换",
  "15.8.5 远程操作",
  "15.9 本章小结",
] as const;
const common = {
  title: "第 15 章 文件系统内部细节",
  label: "第六部分 文件系统",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Osc15FileSystemInternalsMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc15FileSystemInternalsExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc15FileSystemInternalsEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
