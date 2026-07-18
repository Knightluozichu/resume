"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "收集就绪任务",
  "计算调度优先级",
  "选择运行实体",
  "执行上下文切换",
  "更新性能指标",
  "平衡多处理器",
] as const;
const concepts = [
  "第5章 CPU调度",
  "5.1 基本概念",
  "5.1.1 CPU-I/O突发周期",
  "5.1.2 CPU调度程序",
  "5.1.3 抢占式和非抢占式调度",
  "5.1.4 分派程序",
  "5.2 调度准则",
  "5.3 调度算法",
  "5.3.1 先到先服务调度",
  "5.3.2 最短作业优先调度",
  "5.3.3 轮转调度",
  "5.3.4 优先级调度",
  "5.3.5 多级队列调度",
  "5.3.6 多级反馈队列调度",
  "5.4 线程调度",
  "5.4.1 竞争范围",
  "5.4.2 Pthreads调度",
  "5.5 多处理器调度",
  "5.5.1 多处理器调度的方法",
  "5.5.2 多核处理器",
  "5.5.3 负载平衡",
  "5.5.4 处理器亲和性",
  "5.5.5 异构多处理",
  "5.6 实时CPU调度",
  "5.6.1 最小化延迟",
  "5.6.2 基于优先级的调度",
  "5.6.3 单调速率调度",
  "5.6.4 最早截止期限优先调度",
  "5.6.5 比例分享调度",
  "5.6.6 POSIX实时调度",
  "5.7 操作系统示例",
  "5.7.1 示例：Linux调度",
  "5.7.2 示例：Windows调度",
  "5.7.3 示例：Solaris调度",
  "5.8 算法评估",
  "5.8.1 确定性模型",
  "5.8.2 排队模型",
  "5.8.3 仿真",
  "5.8.4 实现",
  "5.9 本章小结",
] as const;
const common = {
  title: "第 5 章 CPU 调度",
  label: "第二部分 进程管理",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;
export function Osc05CpuSchedulingMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc05CpuSchedulingExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc05CpuSchedulingEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
