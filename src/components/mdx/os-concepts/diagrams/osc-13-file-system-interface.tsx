"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "命名文件对象",
  "解析目录路径",
  "检查访问权限",
  "执行文件操作",
  "维护共享语义",
  "卸载并清理",
] as const;
const concepts = [
  "第13章 文件系统接口",
  "13.1 文件概念",
  "13.1.1 文件属性",
  "13.1.2 文件操作",
  "13.1.3 文件类型",
  "13.1.4 文件结构",
  "13.1.5 内部文件结构",
  "13.2 访问方法",
  "13.2.1 顺序访问",
  "13.2.2 直接访问",
  "13.2.3 其他访问方法",
  "13.3 目录结构",
  "13.3.1 单级目录",
  "13.3.2 两级目录",
  "13.3.3 树形目录",
  "13.3.4 无环图目录",
  "13.3.5 通用图目录",
  "13.4 保护",
  "13.4.1 访问类型",
  "13.4.2 访问控制",
  "13.4.3 其他保护方式",
  "13.5 内存映射文件",
  "13.5.1 基本机制",
  "13.5.2 共享内存的WindowsAPI",
  "13.6 本章小结",
] as const;
const common = {
  title: "第 13 章 文件系统接口",
  label: "第六部分 文件系统",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Osc13FileSystemInterfaceMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc13FileSystemInterfaceExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc13FileSystemInterfaceEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
