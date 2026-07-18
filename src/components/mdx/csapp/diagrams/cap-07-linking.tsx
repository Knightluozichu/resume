"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "生成目标节",
  "登记符号",
  "解析引用",
  "合并输入节",
  "应用重定位",
  "装载映像",
] as const;
const concepts = [
  "第7章 链接",
  "7.1 编译器驱动程序",
  "7.2 静态链接",
  "7.3 目标文件",
  "7.4 可重定位目标文件",
  "7.5 符号和符号表",
  "7.6 符号解析",
  "7.6.1 链接器如何解析多重定义的全局符号",
  "7.6.2 与静态库链接",
  "7.6.3 链接器如何使用静态库来解析引用",
  "7.7 重定位",
  "7.7.1 重定位条目",
  "7.7.2 重定位符号引用",
  "7.8 可执行目标文件",
  "7.9 加载可执行目标文件",
  "7.10 动态链接共享库",
  "7.11 从应用程序中加载和链接共享库",
  "7.12 位置无关代码",
  "7.13 库打桩机制",
  "7.13.1 编译时打桩",
  "7.13.2 链接时打桩",
  "7.13.3 运行时打桩",
  "7.14 处理目标文件的工具",
  "7.15 小结",
] as const;
const common = {
  title: "第 7 章 链接",
  label: "在系统上运行程序 · 链接",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;

export function Cap07LinkingMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function Cap07LinkingExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function Cap07LinkingEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
