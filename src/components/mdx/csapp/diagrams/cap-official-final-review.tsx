"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "还原位模式",
  "解释机器执行",
  "核对存储访问",
  "追踪进程资源",
  "验证通信并发",
  "签发系统证据",
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
  title: "《深入理解计算机系统》全书总复习",
  label: "CSAPP · 总复习",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;

export function CapOfficialFinalReviewMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function CapOfficialFinalReviewExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function CapOfficialFinalReviewEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
