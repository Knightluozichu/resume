"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "发起 I/O 调用",
  "进入内核子系统",
  "配置控制器 DMA",
  "处理中断完成",
  "驱动错误恢复",
  "返回应用结果",
] as const;
const concepts = [
  "第12章 I/O系统",
  "12.1 概述",
  "12.2 I/O硬件",
  "12.2.1 内存映射I/O",
  "12.2.2 轮询",
  "12.2.3 中断",
  "12.2.4 直接内存访问",
  "12.2.5 I/O硬件概要",
  "12.3 应用程序I/O接口",
  "12.3.1 块与字符设备",
  "12.3.2 网络设备",
  "12.3.3 时钟与定时器",
  "12.3.4 非阻塞与异步I/O",
  "12.3.5 向量I/O",
  "12.4 内核I/O子系统",
  "12.4.1 I/O调度",
  "12.4.2 缓冲",
  "12.4.3 缓存",
  "12.4.4 假脱机与设备预留",
  "12.4.5 错误处理",
  "12.4.6 I/O保护",
  "12.4.7 内核数据结构",
  "12.4.8 能耗管理",
  "12.4.9 内核I/O子系统小结",
  "12.5 将I/O请求转换为硬件操作",
  "12.6 流",
  "12.7 性能",
  "12.8 本章小结",
] as const;
const common = {
  title: "第 12 章 I/O 系统",
  label: "第五部分 存储管理",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Osc12IoSystemsMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc12IoSystemsExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc12IoSystemsEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
