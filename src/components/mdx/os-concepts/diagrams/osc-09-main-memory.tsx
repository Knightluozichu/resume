"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "生成逻辑地址",
  "执行地址绑定",
  "查询 TLB 页表",
  "检查页面权限",
  "访问物理内存",
  "释放内存映射",
] as const;
const concepts = [
  "第9章 内存",
  "9.1 背景",
  "9.1.1 基本硬件",
  "9.1.2 地址绑定",
  "9.1.3 逻辑地址空间与物理地址空间",
  "9.1.4 动态加载",
  "9.1.5 动态链接与共享库",
  "9.2 连续内存分配",
  "9.2.1 内存保护",
  "9.2.2 内存分配",
  "9.2.3 碎片",
  "9.3 分页",
  "9.3.1 基本方法",
  "9.3.2 硬件支持",
  "9.3.3 保护",
  "9.3.4 共享页",
  "9.4 页表结构",
  "9.4.1 分层分页",
  "9.4.2 哈希页表",
  "9.4.3 倒置页表",
  "9.4.4 Oracle SPARC Solaris",
  "9.5 交换",
  "9.5.1 标准交换",
  "9.5.2 采用分页的交换",
  "9.5.3 移动系统的交换",
  "9.6 示例：Intel 32位与64位体系结构",
  "9.6.1 IA-32架构",
  "9.6.2 x86-64",
  "9.7 示例：ARMv8架构",
  "9.8 本章小结",
] as const;
const common = {
  title: "第 9 章 内存",
  label: "第四部分 内存管理",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Osc09MainMemoryMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc09MainMemoryExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc09MainMemoryEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
