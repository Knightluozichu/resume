"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "读取文件系统布局",
  "定位元数据",
  "映射数据块",
  "管理空闲空间",
  "缓存读写路径",
  "提交恢复日志",
] as const;
const concepts = [
  "第14章 文件系统实现",
  "14.1 文件系统结构",
  "14.2 文件系统操作",
  "14.2.1 概述",
  "14.2.2 用途",
  "14.3 目录实现",
  "14.3.1 线性列表",
  "14.3.2 哈希表",
  "14.4 分配方法",
  "14.4.1 连续分配",
  "14.4.2 链接分配",
  "14.4.3 索引分配",
  "14.4.4 性能",
  "14.5 空闲空间管理",
  "14.5.1 位向量",
  "14.5.2 链表",
  "14.5.3 组合",
  "14.5.4 计数",
  "14.5.5 空间图",
  "14.5.6 修整未使用的块",
  "14.6 效率与性能",
  "14.6.1 效率",
  "14.6.2 性能",
  "14.7 恢复",
  "14.7.1 一致性检查",
  "14.7.2 基于日志的文件系统",
  "14.7.3 其他解决方法",
  "14.7.4 备份与恢复",
  "14.8 示例：WAFL文件系统",
  "14.9 本章小结",
] as const;
const common = {
  title: "第 14 章 文件系统实现",
  label: "第六部分 文件系统",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;
export function Osc14FileSystemImplementationMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc14FileSystemImplementationExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc14FileSystemImplementationEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
