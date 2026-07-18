"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "访问虚拟页面",
  "检测缺页",
  "选择物理帧",
  "执行页面置换",
  "更新驻留集合",
  "恢复故障指令",
] as const;
const concepts = [
  "第10章 虚拟内存",
  "10.1 背景",
  "10.2 请求调页",
  "10.2.1 基本概念",
  "10.2.2 空闲帧列表",
  "10.2.3 请求调页的性能",
  "10.3 写时复制",
  "10.4 页面置换",
  "10.4.1 基本页面置换",
  "10.4.2 FIFO页面置换",
  "10.4.3 最优页面置换",
  "10.4.4 LRU页面置换",
  "10.4.5 近似LRU页面置换",
  "10.4.6 基于计数的页面置换",
  "10.4.7 页面缓冲算法",
  "10.4.8 应用程序与页面置换",
  "10.5 帧分配",
  "10.5.1 帧的最小数",
  "10.5.2 分配算法",
  "10.5.3 全局分配与局部分配",
  "10.5.4 非均匀内存访问",
  "10.6 抖动",
  "10.6.1 抖动的原因",
  "10.6.2 工作集模型",
  "10.6.3 缺页错误频率",
  "10.6.4 当前做法",
  "10.7 内存压缩",
  "10.8 分配内核内存",
  "10.8.1 伙伴系统",
  "10.8.2 slab分配",
  "10.9 其他考虑因素",
  "10.9.1 预调页面",
  "10.9.2 页面大小",
  "10.9.3 TLB范围",
  "10.9.4 倒置页表",
  "10.9.5 程序结构",
  "10.9.6 I/O联锁与页面锁定",
  "10.10 操作系统示例",
  "10.10.1 Linux",
  "10.10.2 Windows",
  "10.10.3 Solaris",
  "10.11 本章小结",
] as const;
const common = {
  title: "第 10 章 虚拟内存",
  label: "第四部分 内存管理",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Osc10VirtualMemoryMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc10VirtualMemoryExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc10VirtualMemoryEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
