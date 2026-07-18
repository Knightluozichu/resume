"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "提交 I/O 请求",
  "配置设备控制器",
  "搬运数据",
  "触发中断",
  "完成驱动回调",
  "返回设备无关结果",
] as const;
const concepts = [
  "第5章 输入/输出",
  "5.1 I/O硬件原理",
  "5.1.1 I/O设备",
  "5.1.2 设备控制器",
  "5.1.3 内存映射I/O",
  "5.1.4 直接存储器存取",
  "5.1.5 重温中断",
  "5.2 I/O软件原理",
  "5.2.1 I/O软件的目标",
  "5.2.2 程序控制I/O",
  "5.2.3 中断驱动I/O",
  "5.2.4 使用DMA的I/O",
  "5.3 I/O软件层次",
  "5.3.1 中断处理程序",
  "5.3.2 设备驱动程序",
  "5.3.3 与设备无关的I/O软件",
  "5.3.4 用户空间的I/O软件",
  "5.4 盘",
  "5.4.1 盘的硬件",
  "5.4.2 磁盘格式化",
  "5.4.3 磁盘臂调度算法",
  "5.4.4 错误处理",
  "5.4.5 稳定存储器",
  "5.5 时钟",
  "5.5.1 时钟硬件",
  "5.5.2 时钟软件",
  "5.5.3 软定时器",
  "5.6 用户界面：键盘、鼠标和监视器",
  "5.6.1 输入软件",
  "5.6.2 输出软件",
  "5.7 瘦客户机",
  "5.8 电源管理",
  "5.8.1 硬件问题",
  "5.8.2 操作系统问题",
  "5.8.3 应用程序问题",
  "5.9 有关输入/输出的研究",
  "5.10 小结",
] as const;
const common = {
  title: "第 5 章 输入/输出",
  label: "现代操作系统 · 设备与 I/O",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;

export function Mos05InputOutputMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos05InputOutputExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos05InputOutputEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
