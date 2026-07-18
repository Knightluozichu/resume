"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "解析路径名",
  "定位目录项",
  "读取文件元数据",
  "映射数据块",
  "提交日志事务",
  "检查崩溃一致性",
] as const;
const concepts = [
  "第4章 文件系统",
  "4.1 文件",
  "4.1.1 文件命名",
  "4.1.2 文件结构",
  "4.1.3 文件类型",
  "4.1.4 文件访问",
  "4.1.5 文件属性",
  "4.1.6 文件操作",
  "4.1.7 使用文件系统调用的一个示例程序",
  "4.2 目录",
  "4.2.1 一级目录系统",
  "4.2.2 层次目录系统",
  "4.2.3 路径名",
  "4.2.4 目录操作",
  "4.3 文件系统的实现",
  "4.3.1 文件系统布局",
  "4.3.2 文件的实现",
  "4.3.3 目录的实现",
  "4.3.4 共享文件",
  "4.3.5 日志结构文件系统",
  "4.3.6 日志文件系统",
  "4.3.7 虚拟文件系统",
  "4.4 文件系统管理和优化",
  "4.4.1 磁盘空间管理",
  "4.4.2 文件系统备份",
  "4.4.3 文件系统的一致性",
  "4.4.4 文件系统性能",
  "4.4.5 磁盘碎片整理",
  "4.5 文件系统实例",
  "4.5.1 MS-DOS文件系统",
  "4.5.2 UNIX V7文件系统",
  "4.5.3 CD-ROM文件系统",
  "4.6 有关文件系统的研究",
  "4.7 小结",
] as const;
const common = {
  title: "第 4 章 文件系统",
  label: "现代操作系统 · 持久存储",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;

export function Mos04FileSystemsMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos04FileSystemsExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos04FileSystemsEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
