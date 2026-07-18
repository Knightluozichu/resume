"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "声明案例不变量",
  "选择同步原语",
  "枚举线程交错",
  "检查安全性",
  "检查活性",
  "对照系统实现",
] as const;
const concepts = [
  "第7章 同步案例",
  "7.1 经典同步问题",
  "7.1.1 有界缓冲区问题",
  "7.1.2 读者-作者问题",
  "7.1.3 哲学家就餐问题",
  "7.2 内核的同步",
  "7.2.1 Windows的同步",
  "7.2.2 Linux的同步",
  "7.3 POSIX的同步",
  "7.3.1 POSIX 互斥锁",
  "7.3.2 POSIX信号量",
  "7.3.3 POSIX条件变量",
  "7.4 Java的同步",
  "7.4.1 Java管程",
  "7.4.2 重入锁",
  "7.4.3 信号量",
  "7.4.4 条件变量",
  "7.5 其他方法",
  "7.5.1 事务内存",
  "7.5.2 OpenMP",
  "7.5.3 函数式编程语言",
  "7.6 本章小结",
] as const;
const common = {
  title: "第 7 章 同步案例",
  label: "第三部分 进程同步",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Osc07SynchronizationExamplesMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc07SynchronizationExamplesExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc07SynchronizationExamplesEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
