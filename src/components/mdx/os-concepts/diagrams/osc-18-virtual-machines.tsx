"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "截获敏感指令",
  "虚拟处理器",
  "映射客户内存",
  "虚拟化 I/O",
  "隔离运行环境",
  "迁移恢复",
] as const;
const concepts = [
  "第18章 虚拟机",
  "18.1 概述",
  "18.2 历史",
  "18.3 优点与功能",
  "18.4 构建模块",
  "18.4.1 陷阱模拟",
  "18.4.2 二进制翻译",
  "18.4.3 硬件协助",
  "18.5 虚拟机的主要类型及其实现",
  "18.5.1 虚拟机的生命周期",
  "18.5.2 类型0虚拟机管理器",
  "18.5.3 类型1虚拟机管理器",
  "18.5.4 类型2虚拟机管理器",
  "18.5.5 半虚拟化",
  "18.5.6 编程环境的虚拟化",
  "18.5.7 仿真",
  "18.5.8 应用程序遏制",
  "18.6 虚拟化和操作系统组件",
  "18.6.1 CPU调度",
  "18.6.2 内存管理",
  "18.6.3 I/O",
  "18.6.4 存储管理",
  "18.6.5 实时迁移",
  "18.7 实例",
  "18.7.1 VMware",
  "18.7.2 Java虚拟机",
  "18.8 虚拟化研究",
  "18.9 本章小结",
] as const;
const common = {
  title: "第 18 章 虚拟机",
  label: "第八部分 高级主题",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Osc18VirtualMachinesMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc18VirtualMachinesExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc18VirtualMachinesEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
