"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "创建受控执行",
  "调度并同步",
  "映射内存文件",
  "驱动设备与存储",
  "隔离虚拟分布式资源",
  "验证实例与设计",
] as const;
const concepts = [
  "第1章 引论",
  "第2章 进程与线程",
  "第3章 内存管理",
  "第4章 文件系统",
  "第5章 输入/输出",
  "第6章 死锁",
  "第7章 虚拟化和云",
  "第8章 多处理机系统",
  "第9章 安全",
  "第10章 实例研究1：UNIX、Linux和Android",
  "第11章 实例研究2：Windows 8",
  "第12章 操作系统设计",
  "第13章 参考书目与文献",
] as const;
const common = {
  title: "《现代操作系统（原书第4版）》全书总复习",
  label: "现代操作系统 · 总复习",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;

export function MosOfficialFinalReviewMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function MosOfficialFinalReviewExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function MosOfficialFinalReviewEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
