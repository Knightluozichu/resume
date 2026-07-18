"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "选择研究主题",
  "定位原始文献",
  "核对版本语境",
  "提取可证伪主张",
  "复现实验",
  "记录后续问题",
] as const;
const concepts = [
  "第13章 参考书目与文献",
  "13.1 进行深入阅读的建议",
  "13.1.1 引论",
  "13.1.2 进程与线程",
  "13.1.3 内存管理",
  "13.1.4 文件系统",
  "13.1.5 输入/输出",
  "13.1.6 死锁",
  "13.1.7 虚拟化和云",
  "13.1.8 多处理机系统",
  "13.1.9 安全",
  "13.1.10 实例研究1：UNIX、Linux和Android",
  "13.1.11 实例研究2：Windows 8",
  "13.1.12 操作系统设计",
  "13.2 按字母顺序排序的参考文献",
] as const;
const common = {
  title: "第 13 章 参考书目与文献",
  label: "现代操作系统 · 研究导航",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;

export function Mos13BibliographyMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos13BibliographyExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos13BibliographyEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
