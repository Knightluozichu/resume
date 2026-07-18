"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "打开对象",
  "读取元数据",
  "循环传输字节",
  "处理短计数",
  "共享内核表项",
  "关闭并清理",
] as const;
const concepts = [
  "第10章 系统级I/O",
  "10.1 Unix I/O",
  "10.2 文件",
  "10.3 打开和关闭文件",
  "10.4 读和写文件",
  "10.5 用RIO包健壮地读写",
  "10.5.1 RIO的无缓冲的输入输出函数",
  "10.5.2 RIO的带缓冲的输入函数",
  "10.6 读取文件元数据",
  "10.7 读取目录内容",
  "10.8 共享文件",
  "10.9 I/O重定向",
  "10.10 标准I/O",
  "10.11 综合：我该使用哪些I/O函数？",
  "10.12 小结",
] as const;
const common = {
  title: "第 10 章 系统级 I/O",
  label: "程序间的交互和通信 · 系统级 I/O",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;

export function Cap10SystemIoMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function Cap10SystemIoExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function Cap10SystemIoEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
