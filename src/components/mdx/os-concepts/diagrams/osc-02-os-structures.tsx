"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "提交用户请求",
  "进入系统调用",
  "分派内核服务",
  "执行结构通信",
  "调试性能",
  "返回应用结果",
] as const;
const concepts = [
  "第2章 操作系统结构",
  "2.1 操作系统的服务",
  "2.2 用户与操作系统的界面",
  "2.2.1 命令解释器",
  "2.2.2 图形用户界面",
  "2.2.3 触摸屏界面",
  "2.2.4 界面的选择",
  "2.3 系统调用",
  "2.3.1 系统调用示例",
  "2.3.2 应用编程接口",
  "2.3.3 系统调用的类型",
  "2.4 系统服务",
  "2.5 链接器与加载器",
  "2.6 应用程序特定于操作系统的原因",
  "2.7 操作系统的设计与实现",
  "2.7.1 设计目标",
  "2.7.2 机制与策略",
  "2.7.3 实现",
  "2.8 操作系统的结构",
  "2.8.1 简单结构",
  "2.8.2 分层法",
  "2.8.3 微内核",
  "2.8.4 模块",
  "2.8.5 混合系统",
  "2.9 操作系统的构建与引导",
  "2.9.1 操作系统的生成",
  "2.9.2 操作系统的引导",
  "2.10 操作系统的调试",
  "2.10.1 故障分析",
  "2.10.2 性能优化",
  "2.10.3 跟踪",
  "2.10.4 BCC",
  "2.11 本章小结",
] as const;
const common = {
  title: "第 2 章 操作系统结构",
  label: "第一部分 概论",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;
export function Osc02OsStructuresMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc02OsStructuresExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc02OsStructuresEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
