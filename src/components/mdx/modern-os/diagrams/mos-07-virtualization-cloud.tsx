"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "截获敏感操作",
  "虚拟处理器状态",
  "映射客户内存",
  "虚拟化设备",
  "保存检查点",
  "迁移并恢复",
] as const;
const concepts = [
  "第7章 虚拟化和云",
  "7.1 历史",
  "7.2 虚拟化的必要条件",
  "7.3 第一类和第二类虚拟机管理程序",
  "7.4 高效虚拟化技术",
  "7.4.1 在不支持虚拟化的平台上实现虚拟化",
  "7.4.2 虚拟化的开销",
  "7.5 虚拟机管理程序是正确的微内核吗",
  "7.6 内存虚拟化",
  "7.7 I/O虚拟化",
  "7.8 虚拟装置",
  "7.9 多核CPU上的虚拟机",
  "7.10 授权问题",
  "7.11 云",
  "7.11.1 云即服务",
  "7.11.2 虚拟机迁移",
  "7.11.3 检查点",
  "7.12 案例研究：VMware",
  "7.12.1 VMware的早期历史",
  "7.12.2 VMware Workstation",
  "7.12.3 将虚拟化引入x86的挑战",
  "7.12.4 VMware Workstation解决方案概览",
  "7.12.5 VMware Workstation的演变",
  "7.12.6 VMware的第一类虚拟机管理程序ESX Server",
  "7.13 有关虚拟化和云的研究",
] as const;
const common = {
  title: "第 7 章 虚拟化和云",
  label: "现代操作系统 · 虚拟化与云",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;

export function Mos07VirtualizationCloudMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos07VirtualizationCloudExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos07VirtualizationCloudEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
