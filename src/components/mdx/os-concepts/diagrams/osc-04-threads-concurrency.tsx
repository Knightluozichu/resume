"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "划分并发任务",
  "创建用户线程",
  "映射内核线程",
  "调度多核工作",
  "处理线程取消",
  "汇合并清理",
] as const;
const concepts = [
  "第4章 线程与并发",
  "4.1 概述",
  "4.1.1 动机",
  "4.1.2 优点",
  "4.2 多核编程",
  "4.2.1 编程挑战",
  "4.2.2 并行的类型",
  "4.3 多线程模型",
  "4.3.1 多对一模型",
  "4.3.2 一对一模型",
  "4.3.3 多对多模型",
  "4.4 线程库",
  "4.4.1 Pthreads",
  "4.4.2 Windows线程",
  "4.4.3 Java线程",
  "4.5 隐式线程",
  "4.5.1 线程池",
  "4.5.2 复刻加入",
  "4.5.3 OpenMP",
  "4.5.4 大中央调度",
  "4.5.5 Intel线程构建模块",
  "4.6 多线程问题",
  "4.6.1 系统调用fork()和exec()",
  "4.6.2 信号处理",
  "4.6.3 线程撤销",
  "4.6.4 线程本地存储",
  "4.6.5 调度程序激活",
  "4.7 操作系统示例",
  "4.7.1 Windows线程",
  "4.7.2 Linux线程",
  "4.8 本章小结",
] as const;
const common = {
  title: "第 4 章 线程与并发",
  label: "第二部分 进程管理",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Osc04ThreadsConcurrencyMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc04ThreadsConcurrencyExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc04ThreadsConcurrencyEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
