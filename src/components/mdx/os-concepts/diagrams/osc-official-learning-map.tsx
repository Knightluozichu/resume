"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "核验第10版",
  "建立系统结构",
  "管理进程同步",
  "组织内存存储",
  "实施安全虚拟化",
  "对照 Linux Windows",
] as const;
const concepts = [
  "第1章 导论",
  "第2章 操作系统结构",
  "第3章 进程",
  "第4章 线程与并发",
  "第5章 CPU调度",
  "第6章 同步工具",
  "第7章 同步案例",
  "第8章 死锁",
  "第9章 内存",
  "第10章 虚拟内存",
  "第11章 大容量存储",
  "第12章 I/O系统",
  "第13章 文件系统接口",
  "第14章 文件系统实现",
  "第15章 文件系统内部细节",
  "第16章 安全",
  "第17章 保护",
  "第18章 虚拟机",
  "第19章 网络与分布式系统",
  "第20章 Linux",
  "第21章 Windows 10",
] as const;
const common = {
  title: "《操作系统概念（原书第10版）》权威学习地图",
  label: "操作系统概念 · 导学",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function OscOfficialLearningMapMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function OscOfficialLearningMapExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function OscOfficialLearningMapEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
