"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "核验第三版",
  "解释程序表示",
  "建立处理器模型",
  "追踪系统运行",
  "实现程序通信",
  "用实验闭环",
] as const;
const concepts = [
  "第1章 计算机系统漫游",
  "第2章 信息的表示和处理",
  "第3章 程序的机器级表示",
  "第4章 处理器体系结构",
  "第5章 优化程序性能",
  "第6章 存储器层次结构",
  "第7章 链接",
  "第8章 异常控制流",
  "第9章 虚拟内存",
  "第10章 系统级I/O",
  "第11章 网络编程",
  "第12章 并发编程",
  "附录A 错误处理",
] as const;
const common = {
  title: "《深入理解计算机系统》权威学习地图",
  label: "CSAPP · 导学",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;

export function CapOfficialLearningMapMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function CapOfficialLearningMapExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function CapOfficialLearningMapEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
