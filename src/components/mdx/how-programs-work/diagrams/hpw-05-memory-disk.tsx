"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "读取磁盘块",
  "填充页缓存",
  "映射虚拟页",
  "触发缺页",
  "选择置换页面",
  "写回并释放",
] as const;
const concepts = [
  "第5章 内存和磁盘的亲密关系",
  "5.1 不读入内存就无法运行",
  "5.2 磁盘缓存加快了磁盘访问速度",
  "5.3 虚拟内存把磁盘作为部分内存来使用",
  "5.4 节约内存的编程方法",
  "5.5 磁盘的物理结构",
] as const;
const common = {
  title: "第 5 章 内存和磁盘的亲密关系",
  label: "程序怎样运行 · 内存与存储",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain,
  concepts,
} as const;
export function Hpw05MemoryDiskMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw05MemoryDiskExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw05MemoryDiskEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
