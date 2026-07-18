"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "定义设计目标",
  "签发系统接口",
  "选择系统结构",
  "分离机制策略",
  "测量关键性能",
  "管理演进风险",
] as const;
const concepts = [
  "第12章 操作系统设计",
  "12.1 设计问题的本质",
  "12.1.1 目标",
  "12.1.2 设计操作系统为什么困难",
  "12.2 接口设计",
  "12.2.1 指导原则",
  "12.2.2 范型",
  "12.2.3 系统调用接口",
  "12.3 实现",
  "12.3.1 系统结构",
  "12.3.2 机制与策略",
  "12.3.3 正交性",
  "12.3.4 命名",
  "12.3.5 绑定的时机",
  "12.3.6 静态与动态结构",
  "12.3.7 自顶向下与自底向上的实现",
  "12.3.8 同步通信与异步通信",
  "12.3.9 实用技术",
  "12.4 性能",
  "12.4.1 操作系统为什么运行缓慢",
  "12.4.2 什么应该优化",
  "12.4.3 空间–时间的权衡",
  "12.4.4 缓存",
  "12.4.5 线索",
  "12.4.6 利用局部性",
  "12.4.7 优化常见的情况",
  "12.5 项目管理",
  "12.5.1 人月神话",
  "12.5.2 团队结构",
  "12.5.3 经验的作用",
  "12.5.4 没有银弹",
  "12.6 操作系统设计的趋势",
  "12.6.1 虚拟化与云",
  "12.6.2 众核芯片",
  "12.6.3 大型地址空间操作系统",
  "12.6.4 无缝的数据访问",
  "12.6.5 电池供电的计算机",
  "12.6.6 嵌入式系统",
  "12.7 小结",
] as const;
const common = {
  title: "第 12 章 操作系统设计",
  label: "现代操作系统 · 设计与实现",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;

export function Mos12OsDesignMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos12OsDesignExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos12OsDesignEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
