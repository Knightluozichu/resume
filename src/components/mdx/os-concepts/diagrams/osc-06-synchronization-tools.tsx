"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "标记共享数据",
  "识别竞争窗口",
  "进入临界区",
  "执行原子更新",
  "唤醒等待者",
  "验证进度属性",
] as const;
const concepts = [
  "第6章 同步工具",
  "6.1 背景",
  "6.2 临界区问题",
  "6.3 Peterson解决方案",
  "6.4 硬件同步支持",
  "6.4.1 内存屏障",
  "6.4.2 硬件指令",
  "6.4.3 原子变量",
  "6.5 互斥锁",
  "6.6 信号量",
  "6.6.1 信号量的使用",
  "6.6.2 信号量的实现",
  "6.7 管程",
  "6.7.1 管程的使用",
  "6.7.2 采用信号量的管程实现",
  "6.7.3 管程内的进程重启",
  "6.8 活性",
  "6.8.1 死锁",
  "6.8.2 优先级反转",
  "6.9 评估",
  "6.10 本章小结",
] as const;
const common = {
  title: "第 6 章 同步工具",
  label: "第三部分 进程同步",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Osc06SynchronizationToolsMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc06SynchronizationToolsExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc06SynchronizationToolsEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
