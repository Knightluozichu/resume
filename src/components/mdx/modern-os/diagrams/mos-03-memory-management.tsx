"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "生成虚拟地址",
  "查询地址映射",
  "检查页面权限",
  "处理缺页",
  "选择置换页",
  "更新驻留集合",
] as const;
const concepts = [
  "第3章 内存管理",
  "3.1 无存储器抽象",
  "3.2 一种存储器抽象：地址空间",
  "3.2.1 地址空间的概念",
  "3.2.2 交换技术",
  "3.2.3 空闲内存管理",
  "3.3 虚拟内存",
  "3.3.1 分页",
  "3.3.2 页表",
  "3.3.3 加速分页过程",
  "3.3.4 针对大内存的页表",
  "3.4 页面置换算法",
  "3.4.1 最优页面置换算法",
  "3.4.2 最近未使用页面置换算法",
  "3.4.3 先进先出页面置换算法",
  "3.4.4 第二次机会页面置换算法",
  "3.4.5 时钟页面置换算法",
  "3.4.6 最近最少使用页面置换算法",
  "3.4.7 用软件模拟LRU",
  "3.4.8 工作集页面置换算法",
  "3.4.9 工作集时钟页面置换算法",
  "3.4.10 页面置换算法小结",
  "3.5 分页系统中的设计问题",
  "3.5.1 局部分配策略与全局分配策略",
  "3.5.2 负载控制",
  "3.5.3 页面大小",
  "3.5.4 分离的指令空间和数据空间",
  "3.5.5 共享页面",
  "3.5.6 共享库",
  "3.5.7 内存映射文件",
  "3.5.8 清除策略",
  "3.5.9 虚拟内存接口",
  "3.6 有关实现的问题",
  "3.6.1 与分页有关的工作",
  "3.6.2 缺页中断处理",
  "3.6.3 指令备份",
  "3.6.4 锁定内存中的页面",
  "3.6.5 后备存储",
  "3.6.6 策略和机制的分离",
  "3.7 分段",
  "3.7.1 纯分段的实现",
  "3.7.2 分段和分页结合：MULTICS",
  "3.7.3 分段和分页结合：Intel x86",
  "3.8 有关内存管理的研究",
  "3.9 小结",
] as const;
const common = {
  title: "第 3 章 内存管理",
  label: "现代操作系统 · 地址空间",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;

export function Mos03MemoryManagementMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos03MemoryManagementExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos03MemoryManagementEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
